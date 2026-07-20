import { Prisma } from "@prisma/client";
import prisma from "../../config/prisma";

/*
|--------------------------------------------------------------------------
| Get Public Syllabus
|--------------------------------------------------------------------------
*/

interface GetSyllabusOptions {
  subjectId?: number;
  semester?: Prisma.EnumSemesterFilter | string;
}

export async function getSyllabus({
  subjectId,
  semester,
}: GetSyllabusOptions = {}) {
  const where: Prisma.SyllabusWhereInput = {
    // Uncomment if using isActive
    // isActive: true,
  };

  if (subjectId) {
    where.subjectId = subjectId;
  }

  if (semester) {
    where.semester = semester as any;
  }

  return prisma.syllabus.findMany({
    where,
    include: {
      subject: {
        include: {
          program: {
            select: {
              id: true,
              name: true,
              category: true,
            },
          },
        },
      },
    },
    orderBy: [
      {
        semester: "asc",
      },
      {
        createdAt: "desc",
      },
    ],
  });
}

/*
|--------------------------------------------------------------------------
| Get Admin Syllabus
|--------------------------------------------------------------------------
*/

export async function getAdminSyllabus() {
  return prisma.syllabus.findMany({
    include: {
      subject: {
        include: {
          program: {
            select: {
              id: true,
              name: true,
              category: true,
            },
          },
        },
      },
    },
    orderBy: [
      {
        subject: {
          subjectCode: "asc",
        },
      },
      {
        semester: "asc",
      },
    ],
  });
}

/*
|--------------------------------------------------------------------------
| Get Syllabus By ID
|--------------------------------------------------------------------------
*/

export async function getSyllabusById(id: number) {
  return prisma.syllabus.findUnique({
    where: {
      id,
    },
    include: {
      subject: {
        include: {
          program: {
            select: {
              id: true,
              name: true,
              category: true,
            },
          },
        },
      },
    },
  });
}

/*
|--------------------------------------------------------------------------
| Create Syllabus
|--------------------------------------------------------------------------
*/

export async function createSyllabus(
  data: Prisma.SyllabusCreateInput
) {
  return prisma.syllabus.create({
    data,
    include: {
      subject: {
        include: {
          program: {
            select: {
              id: true,
              name: true,
              category: true,
            },
          },
        },
      },
    },
  });
}

/*
|--------------------------------------------------------------------------
| Update Syllabus
|--------------------------------------------------------------------------
*/

export async function updateSyllabus(
  id: number,
  data: Prisma.SyllabusUpdateInput
) {
  const oldSyllabus = await prisma.syllabus.findUnique({
    where: {
      id,
    },
  });

  if (!oldSyllabus) {
    return null;
  }

  const updatedSyllabus = await prisma.syllabus.update({
    where: {
      id,
    },
    data,
    include: {
      subject: {
        include: {
          program: {
            select: {
              id: true,
              name: true,
              category: true,
            },
          },
        },
      },
    },
  });

  return {
    oldSyllabus,
    updatedSyllabus,
  };
}

/*
|--------------------------------------------------------------------------
| Delete Syllabus
|--------------------------------------------------------------------------
*/

export async function deleteSyllabus(id: number) {
  const syllabus = await prisma.syllabus.findUnique({
    where: {
      id,
    },
  });

  if (!syllabus) {
    return null;
  }

  await prisma.syllabus.delete({
    where: {
      id,
    },
  });

  return syllabus;
}