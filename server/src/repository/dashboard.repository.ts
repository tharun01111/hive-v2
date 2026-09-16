import { prisma } from "../lib/prisma";

export const getDashboardStats = async (userId: number) => {
  const [workspaceCount, projectCount, memberCount] = await Promise.all([
    prisma.workspaceMember.count({
      where: {
        userId,
      },
    }),
    prisma.projectMember.count({
      where: {
        userId,
      },
    }),
    prisma.workspaceMember.count({
      where: {
        workspace: {
          members: {
            some: {
              userId,
            },
          },
        },
      },
    }),
  ]);

  return { workspaceCount, projectCount, memberCount };
};
