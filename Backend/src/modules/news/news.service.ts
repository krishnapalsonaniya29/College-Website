import { NewsCategory, Prisma } from "@prisma/client";
import prisma from "../../config/prisma";

/*
|--------------------------------------------------------------------------
| Get Public News
|--------------------------------------------------------------------------
*/

export const getNews = async (
  category?: NewsCategory
) => {
  const where: Prisma.NewsWhereInput = {
    isActive: true,
  };

  if (category) {
    where.category = category;
  }

  return prisma.news.findMany({
    where,
    orderBy: [
      {
        publishedAt: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
  });
};

/*
|--------------------------------------------------------------------------
| Get Admin News
|--------------------------------------------------------------------------
*/

export const getAdminNews = async () => {
  return prisma.news.findMany({
    orderBy: [
      {
        publishedAt: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
  });
};

/*
|--------------------------------------------------------------------------
| Get News By ID
|--------------------------------------------------------------------------
*/

export const getNewsById = async (id: number) => {
  return prisma.news.findUnique({
    where: {
      id,
    },
  });
};

/*
|--------------------------------------------------------------------------
| Create News
|--------------------------------------------------------------------------
*/

export const createNews = (
  data: Prisma.NewsCreateInput
) => {
  return prisma.news.create({
    data,
  });
};

/*
|--------------------------------------------------------------------------
| Update News
|--------------------------------------------------------------------------
*/

export const updateNews = async (
  id: number,
  data: Prisma.NewsUpdateInput
) => {
  const news = await prisma.news.findUnique({
    where: {
      id,
    },
  });

  if (!news) {
    return null;
  }

  const updatedNews = await prisma.news.update({
    where: {
      id,
    },
    data,
  });

  return {
    oldNews: news,
    updatedNews,
  };
};

/*
|--------------------------------------------------------------------------
| Delete News
|--------------------------------------------------------------------------
*/

export const deleteNews = async (id: number) => {
  const news = await prisma.news.findUnique({
    where: {
      id,
    },
  });

  if (!news) {
    return null;
  }

  await prisma.news.delete({
    where: {
      id,
    },
  });

  return news;
};