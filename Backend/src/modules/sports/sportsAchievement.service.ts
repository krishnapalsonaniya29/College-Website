import { Prisma } from "@prisma/client";
import prisma from "../../config/prisma";

/*
|--------------------------------------------------------------------------
| Get Public Sports Achievements
|--------------------------------------------------------------------------
*/

export const getSportsAchievements = async () => {
  return prisma.sportsAchievement.findMany({
    where: {
      isActive: true,
    },
    orderBy: [
      {
        achievementDate: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
  });
};

/*
|--------------------------------------------------------------------------
| Get Admin Sports Achievements
|--------------------------------------------------------------------------
*/

export const getAdminSportsAchievements = async () => {
  return prisma.sportsAchievement.findMany({
    orderBy: [
      {
        achievementDate: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
  });
};

/*
|--------------------------------------------------------------------------
| Get Sports Achievement By ID
|--------------------------------------------------------------------------
*/

export const getSportsAchievementById = async (
  id: number
) => {
  return prisma.sportsAchievement.findUnique({
    where: {
      id,
    },
  });
};

/*
|--------------------------------------------------------------------------
| Create Sports Achievement
|--------------------------------------------------------------------------
*/

export const createSportsAchievement = (
  data: Prisma.SportsAchievementCreateInput
) => {
  return prisma.sportsAchievement.create({
    data,
  });
};

/*
|--------------------------------------------------------------------------
| Update Sports Achievement
|--------------------------------------------------------------------------
*/

export const updateSportsAchievement = async (
  id: number,
  data: Prisma.SportsAchievementUpdateInput
) => {
  const achievement =
    await prisma.sportsAchievement.findUnique({
      where: {
        id,
      },
    });

  if (!achievement) {
    return null;
  }

  const updatedAchievement =
    await prisma.sportsAchievement.update({
      where: {
        id,
      },
      data,
    });

  return {
    oldAchievement: achievement,
    updatedAchievement,
  };
};

/*
|--------------------------------------------------------------------------
| Delete Sports Achievement
|--------------------------------------------------------------------------
*/

export const deleteSportsAchievement = async (
  id: number
) => {
  const achievement =
    await prisma.sportsAchievement.findUnique({
      where: {
        id,
      },
    });

  if (!achievement) {
    return null;
  }

  await prisma.sportsAchievement.delete({
    where: {
      id,
    },
  });

  return achievement;
};



