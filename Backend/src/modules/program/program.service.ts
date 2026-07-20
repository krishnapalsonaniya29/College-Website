import { Prisma, ProgramCategory } from "@prisma/client";
import prisma from "../../config/prisma";

/*
|--------------------------------------------------------------------------
| Get Public Programs
|--------------------------------------------------------------------------
*/

interface GetProgramOptions {
  category?: ProgramCategory;
}

export async function getPrograms({
  category,
}: GetProgramOptions = {}) {
  const where: Prisma.ProgramWhereInput = {};

  // If you add isActive later
  // where.isActive = true;

  if (category) {
    where.category = category;
  }

  return prisma.program.findMany({
    where,
    include: {
      subjects: true,
    },
    orderBy: [
      {
        category: "asc",
      },
      {
        name: "asc",
      },
    ],
  });
}

/*
|--------------------------------------------------------------------------
| Get Programs (Admin)
|--------------------------------------------------------------------------
*/

export async function getAdminPrograms() {
  return prisma.program.findMany({
    include: {
      subjects: true,
    },
    orderBy: [
      {
        category: "asc",
      },
      {
        name: "asc",
      },
    ],
  });
}

/*
|--------------------------------------------------------------------------
| Get Program By ID
|--------------------------------------------------------------------------
*/

export async function getProgramById(id: number) {
  return prisma.program.findUnique({
    where: {
      id,
    },
    include: {
      subjects: {
        orderBy: {
          subjectName: "asc",
        },
      },
    },
  });
}

/*
|--------------------------------------------------------------------------
| Create Program
|--------------------------------------------------------------------------
*/

export async function createProgram(
  data: Prisma.ProgramCreateInput
) {
  return prisma.program.create({
    data,
  });
}

/*
|--------------------------------------------------------------------------
| Update Program
|--------------------------------------------------------------------------
*/

export async function updateProgram(
  id: number,
  data: Prisma.ProgramUpdateInput
) {
  const oldProgram = await prisma.program.findUnique({
    where: {
      id,
    },
  });

  if (!oldProgram) {
    return null;
  }

  const updatedProgram = await prisma.program.update({
    where: {
      id,
    },
    data,
  });

  return {
    oldProgram,
    updatedProgram,
  };
}

/*
|--------------------------------------------------------------------------
| Delete Program
|--------------------------------------------------------------------------
*/

export async function deleteProgram(id: number) {
  const program = await prisma.program.findUnique({
    where: {
      id,
    },
  });

  if (!program) {
    return null;
  }

  await prisma.program.delete({
    where: {
      id,
    },
  });

  return program;
}