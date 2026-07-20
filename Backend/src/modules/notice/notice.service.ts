import { Prisma } from "@prisma/client";
import prisma from "../../config/prisma";

/*
|--------------------------------------------------------------------------
| Get Public Notices
|--------------------------------------------------------------------------
*/

export async function getNotices(page = 1, limit = 10) {
  const skip = (page - 1) * limit;

  const [notices, total] = await Promise.all([
    prisma.notice.findMany({
      where: {
        isActive: true,
      },
      orderBy: [
        {
          isPinned: "desc",
        },
        {
          noticeDate: "desc",
        },
      ],
      skip,
      take: limit,
    }),

    prisma.notice.count({
      where: {
        isActive: true,
      },
    }),
  ]);

  return {
    notices,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

/*
|--------------------------------------------------------------------------
| Get All Notices (Admin)
|--------------------------------------------------------------------------
*/

export async function getAdminNotices(page = 1, limit = 10) {
  const skip = (page - 1) * limit;

  const [notices, total] = await Promise.all([
    prisma.notice.findMany({
      orderBy: [
        {
          isPinned: "desc",
        },
        {
          noticeDate: "desc",
        },
      ],
      skip,
      take: limit,
    }),

    prisma.notice.count(),
  ]);

  return {
    notices,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

/*
|--------------------------------------------------------------------------
| Get Notice By ID
|--------------------------------------------------------------------------
*/

export async function getNoticeById(id: number) {
  return prisma.notice.findUnique({
    where: {
      id,
    },
  });
}

/*
|--------------------------------------------------------------------------
| Create Notice
|--------------------------------------------------------------------------
*/

export async function createNotice(
  data: Prisma.NoticeCreateInput
) {
  return prisma.notice.create({
    data,
  });
}

/*
|--------------------------------------------------------------------------
| Update Notice
|--------------------------------------------------------------------------
*/

export async function updateNotice(
  id: number,
  data: Prisma.NoticeUpdateInput
) {
  const oldNotice = await prisma.notice.findUnique({
    where: {
      id,
    },
  });

  if (!oldNotice) {
    return null;
  }

  const updatedNotice = await prisma.notice.update({
    where: {
      id,
    },
    data,
  });

  return {
    oldNotice,
    updatedNotice,
  };
}

/*
|--------------------------------------------------------------------------
| Delete Notice
|--------------------------------------------------------------------------
*/

export async function deleteNotice(id: number) {
  const notice = await prisma.notice.findUnique({
    where: {
      id,
    },
  });

  if (!notice) {
    return null;
  }

  await prisma.notice.delete({
    where: {
      id,
    },
  });

  return notice;
}