import prisma from "../../config/prisma";

export const createStudentAchievement = (data: any) => {
  return prisma.studentAchievement.create({
    data,
  });
};

export const getAllStudentAchievements = () => {
  return prisma.studentAchievement.findMany({
    orderBy: {
      achievementDate: "desc",
    },
  });
};

export const getActiveStudentAchievements = () => {
  return prisma.studentAchievement.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      achievementDate: "desc",
    },
  });
};

export const getStudentAchievementById = (id: number) => {
  return prisma.studentAchievement.findUnique({
    where: { id },
  });
};

export const updateStudentAchievement = (
  id: number,
  data: any
) => {
  return prisma.studentAchievement.update({
    where: { id },
    data,
  });
};

export const deleteStudentAchievement = (id: number) => {
  return prisma.studentAchievement.delete({
    where: { id },
  });
};