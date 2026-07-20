import { Prisma } from "@prisma/client";
import prisma from "../../config/prisma";

/*
|--------------------------------------------------------------------------
| Get Public Departments
|--------------------------------------------------------------------------
*/

export async function getDepartments() {
  return prisma.department.findMany({
    where: {
      isActive: true,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      logoUrl: true,
      description: true,
      createdAt: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}

/*
|--------------------------------------------------------------------------
| Get Admin Departments
|--------------------------------------------------------------------------
*/

export async function getAdminDepartments() {
  return prisma.department.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

/*
|--------------------------------------------------------------------------
| Get Department By Slug
|--------------------------------------------------------------------------
*/

export async function getDepartmentBySlug(slug: string) {
  return prisma.department.findFirst({
      where: {
        slug,
        isActive: true,
      },
      include: {
        faculty: {
          where: {
            isActive: true,
          },
          orderBy: [
            {
              isHOD: "desc",
            },
            {
              name: "asc",
            },
          ],
        },

        gallery: {
          where: {
            isActive: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
}

/*
|--------------------------------------------------------------------------
| Get Department By ID (Admin)
|--------------------------------------------------------------------------
*/

export async function getDepartmentById(id: number) {
  return prisma.department.findUnique({
    where: {
      id,
    },
    include: {
      faculty: true,
      gallery: true,
    },
  });
}

/*
|--------------------------------------------------------------------------
| Create Department
|--------------------------------------------------------------------------
*/

export async function createDepartment(
  data: Prisma.DepartmentCreateInput
) {
  return prisma.department.create({
    data,
  });
}

/*
|--------------------------------------------------------------------------
| Update Department
|--------------------------------------------------------------------------
*/

export async function updateDepartment(
  id: number,
  data: Prisma.DepartmentUpdateInput
) {
  const oldDepartment = await prisma.department.findUnique({
    where: {
      id,
    },
  });

  if (!oldDepartment) {
    return null;
  }

  const updatedDepartment = await prisma.department.update({
    where: {
      id,
    },
    data,
  });

  return {
    oldDepartment,
    updatedDepartment,
  };
}

/*
|--------------------------------------------------------------------------
| Delete Department
|--------------------------------------------------------------------------
*/

export async function deleteDepartment(id: number) {
  const department = await prisma.department.findUnique({
    where: {
      id,
    },
  });

  if (!department) {
    return null;
  }

  await prisma.department.delete({
    where: {
      id,
    },
  });

  return department;
}