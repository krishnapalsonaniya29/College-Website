import { Prisma } from "@prisma/client";
import prisma from "../../config/prisma";

/*
|--------------------------------------------------------------------------
| Get Public Alumni
|--------------------------------------------------------------------------
*/

export const getAlumni = async (filters?: {
  batch?: number;
  course?: string;
}) => {
  const where: Prisma.AlumniWhereInput = {
    isActive: true,
  };

  if (filters?.batch) {
    where.batch = filters.batch;
  }

  if (filters?.course) {
    where.course = {
      equals: filters.course,
      mode: "insensitive",
    };
  }

  return prisma.alumni.findMany({
    where,
    orderBy: [
      {
        batch: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
  });
};

/*
|--------------------------------------------------------------------------
| Get Admin Alumni
|--------------------------------------------------------------------------
*/

export const getAdminAlumni = async () => {
  return prisma.alumni.findMany({
    orderBy: [
      {
        batch: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
  });
};

/*
|--------------------------------------------------------------------------
| Get Alumni By ID
|--------------------------------------------------------------------------
*/

export const getAlumniById = async (id: number) => {
  return prisma.alumni.findUnique({
    where: {
      id,
    },
  });
};

/*
|--------------------------------------------------------------------------
| Create Alumni
|--------------------------------------------------------------------------
*/

export const createAlumni = (
  data: Prisma.AlumniCreateInput
) => {
  return prisma.alumni.create({
    data,
  });
};

/*
|--------------------------------------------------------------------------
| Update Alumni
|--------------------------------------------------------------------------
*/

export const updateAlumni = async (
  id: number,
  data: Prisma.AlumniUpdateInput
) => {
  const alumni = await prisma.alumni.findUnique({
    where: {
      id,
    },
  });

  if (!alumni) {
    return null;
  }

  const updatedAlumni = await prisma.alumni.update({
    where: {
      id,
    },
    data,
  });

  return {
    oldAlumni: alumni,
    updatedAlumni,
  };
};

/*
|--------------------------------------------------------------------------
| Delete Alumni
|--------------------------------------------------------------------------
*/

export const deleteAlumni = async (id: number) => {
  const alumni = await prisma.alumni.findUnique({
    where: {
      id,
    },
  });

  if (!alumni) {
    return null;
  }

  await prisma.alumni.delete({
    where: {
      id,
    },
  });

  return alumni;
};