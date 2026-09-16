import * as dashboardRepository from "../repository/dashboard.repository"

export const getStats = async (userId: number) => {
  const stats = await dashboardRepository.getDashboardStats(userId);

  return stats;
}