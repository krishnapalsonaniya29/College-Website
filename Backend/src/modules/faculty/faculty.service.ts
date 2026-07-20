import { Prisma } from "@prisma/client";
import prisma from "../../config/prisma";

/*
|--------------------------------------------------------------------------
| Get Public Faculty
|--------------------------------------------------------------------------
*/

interface GetFacultyOptions {
  departmentId?: number;
}

export async function getFaculty({
  departmentId,
}: GetFacultyOptions) {
  const where: Prisma.FacultyWhereInput = {
    isActive: true,
  };

  if (departmentId) {
    where.departmentId = departmentId;
  }

  return prisma.faculty.findMany({
    where,
    include: {
      department: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
    orderBy: [
      {
        isHOD: "desc",
      },
      {
        name: "asc",
      },
    ],
  });
}

/*
|--------------------------------------------------------------------------
| Get Faculty (Admin)
|--------------------------------------------------------------------------
*/

export async function getAdminFaculty() {
  return prisma.faculty.findMany({
    include: {
      department: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
    orderBy: [
      {
        department: {
          name: "asc",
        },
      },
      {
        isHOD: "desc",
      },
      {
        name: "asc",
      },
    ],
  });
}

/*
|--------------------------------------------------------------------------
| Get Faculty By ID
|--------------------------------------------------------------------------
*/

export async function getFacultyById(id: number) {
  return prisma.faculty.findUnique({
    where: {
      id,
    },
    include: {
      department: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });
}

/*
|--------------------------------------------------------------------------
| Create Faculty
|--------------------------------------------------------------------------
*/

export async function createFaculty(
  data: Prisma.FacultyCreateInput
) {
  return prisma.faculty.create({
    data,
    include: {
      department: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });
}

/*
|--------------------------------------------------------------------------
| Update Faculty
|--------------------------------------------------------------------------
*/

export async function updateFaculty(
  id: number,
  data: Prisma.FacultyUpdateInput
) {
  const oldFaculty = await prisma.faculty.findUnique({
    where: {
      id,
    },
  });

  if (!oldFaculty) {
    return null;
  }

  const updatedFaculty = await prisma.faculty.update({
    where: {
      id,
    },
    data,
    include: {
      department: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });

  return {
    oldFaculty,
    updatedFaculty,
  };
}

/*
|--------------------------------------------------------------------------
| Delete Faculty
|--------------------------------------------------------------------------
*/

export async function deleteFaculty(id: number) {
  const faculty = await prisma.faculty.findUnique({
    where: {
      id,
    },
  });

  if (!faculty) {
    return null;
  }

  await prisma.faculty.delete({
    where: {
      id,
    },
  });

  return faculty;
}