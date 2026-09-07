import { prisma } from "../lib/prisma"

export const findWorkspacesByUserId = async (id: number) => {
  const memberships = await prisma.workspaceMember.findMany({ 
    where: {
      userId: id
    },
    select: {
      workspace: true,
      role: true,
    },
    
  });
  return memberships.map((membership) => ({
    ...membership.workspace,
    role: membership.role
  }));
}

export const createWorkspace = async (userId: number, name: string, description?: string) => {
  return prisma.$transaction(async (tx) => {
    const workspace = await tx.workspace.create({
      data: {
        name,
        description
      }
    });
    await tx.workspaceMember.create({
      data: {
        userId,
        workspaceId: workspace.id,
        role: "OWNER"
      }
    }); 
    return workspace;
  })
}

export const deleteWorkspaceById = async (workspaceId: string): Promise<void> => {
  await prisma.workspace.delete({
    where: {
      id: workspaceId
    },
  });
}

export const findMember = async (id: number, workspaceId: string) => {
  return await prisma.workspaceMember.findUnique({
    where: {
       userId_workspaceId: {
        userId: id,
        workspaceId: workspaceId,
      },
    },
    select: {
      role: true
    },
  });
}

export const findAccessibleWorkspace = async (userId: number, workspaceId: string) => {
  const workspace = await prisma.workspace.findFirst({
    where: {
      id: workspaceId,
        members: {
          some: {
            userId,
          }
        }
    }
  });

  return workspace;
}

export const findWorkspaceById = async (userId: number, workspaceId: string) => {
  const workspace = await prisma.workspace.findFirst({
    where: {
      id: workspaceId
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
  return workspace;
}