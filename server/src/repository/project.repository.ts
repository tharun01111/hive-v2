import { ProjectRole, ProjectVisibility } from "@prisma/client"
import { prisma } from "../lib/prisma"

type CreateProjectInput = {
  userId: number;
  workspaceId: string;
  name: string;
  description?: string;
  visibility?: ProjectVisibility
};

export const getProjectsById = async (userId: number, workspaceId: string) => {
  const projects = await prisma.project.findMany({
    where: {
      workspaceId,
      OR: [
      {
        visibility: ProjectVisibility.PUBLIC,
      },
      {
        members: {
          some: {
            userId
          }
        }
      }
    ]
    },
    select: {
      id: true,
      name: true,
      description: true,
      members: {
        where: {
          userId
        },
        select: {
          role: true
        }
      }
    }
  });

  return projects.map((project) => ({
    id: project.id,
    name: project.name,
    description: project.description,
    role: project.members[0]?.role ?? null,
  }));
}

export const createProject = async ({ userId, name, description, visibility, workspaceId }: CreateProjectInput) => {
  return prisma.$transaction(async (tx) => {
    const project = await tx.project.create({
      data: {
        name,
        description,
        visibility,
        workspace: {
          connect: {
            id: workspaceId
          }
        }
      },
      select: {
        id: true,
        name: true,
        description: true,
        visibility: true,
      }
    });
    const member = await tx.projectMember.create({
      data: { 
        userId,
        projectId: project.id,
        role: ProjectRole.OWNER
      },
      select: {
        role: true
      }
    });
    return {
      ...project,
      role: member.role
    };
  });
}

export const deleteProject = async (workspaceId: string, projectId: string) => {
  await prisma.project.delete({
    where: {
      id: projectId,
      workspaceId
    }
  })
}

export const findProjectById = async (projectId: string) => {
  const project = prisma.project.findFirst({
    where:{ 
      id: projectId
    },
    select: {
      id: true,
      name: true,
      description: true,
      members: {
        select: {
          role: true
        }
      }
    }
  });
  return project;
}

export const findAccessibleProject = async (userId: number, workspaceId: string, projectId: string) => {
  return await prisma.project.findFirst({
    where: {
      id: projectId,
      workspaceId,
      OR: [
        {
          visibility: ProjectVisibility.PUBLIC
        }
      ],
      members: {
        some: {
          userId,
        }
      },
    },
  });
}