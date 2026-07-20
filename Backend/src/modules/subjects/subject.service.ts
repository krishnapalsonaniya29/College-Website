import { Prisma } from "@prisma/client";
import prisma from "../../config/prisma";

/*
|--------------------------------------------------------------------------
| Get Public Subjects
|--------------------------------------------------------------------------
*/

interface GetSubjectOptions {
  programId?: number;
}

export async function getSubjects({
  programId,
}: GetSubjectOptions = {}) {
  const where: Prisma.SubjectWhereInput = {};

  // Uncomment if you add isActive to Subject model
  // where.isActive = true;

  if (programId) {
    where.programId = programId;
  }

  return prisma.subject.findMany({
    where,
    include: {
      program: {
        select: {
          id: true,
          name: true,
          category: true,
        },
      },
    },
    orderBy: [
      {
        subjectCode: "asc",
      },
      {
        subjectName: "asc",
      },
    ],
  });
}

/*
|--------------------------------------------------------------------------
| Get Subjects (Admin)
|--------------------------------------------------------------------------
*/

export async function getAdminSubjects() {
  return prisma.subject.findMany({
    include: {
      program: {
        select: {
          id: true,
          name: true,
          category: true,
        },
      },
    },
    orderBy: [
      {
        program: {
          name: "asc",
        },
      },
      {
        subjectCode: "asc",
      },
    ],
  });
}

/*
|--------------------------------------------------------------------------
| Get Subject By ID
|--------------------------------------------------------------------------
*/

export async function getSubjectById(id: number) {
  return prisma.subject.findUnique({
    where: {
      id,
    },
    include: {
      program: {
        select: {
          id: true,
          name: true,
          category: true,
        },
      },
      syllabus: {
        orderBy: {
          semester: "asc",
        },
      },
    },
  });
}

/*
|--------------------------------------------------------------------------
| Create Subject
|--------------------------------------------------------------------------
*/

export async function createSubject(
  data: Prisma.SubjectCreateInput
) {
  return prisma.subject.create({
    data,
    include: {
      program: {
        select: {
          id: true,
          name: true,
          category: true,
        },
      },
    },
  });
}

/*
|--------------------------------------------------------------------------
| Update Subject
|--------------------------------------------------------------------------
*/

export async function updateSubject(
  id: number,
  data: Prisma.SubjectUpdateInput
) {
  const oldSubject = await prisma.subject.findUnique({
    where: {
      id,
    },
  });

  if (!oldSubject) {
    return null;
  }

  const updatedSubject = await prisma.subject.update({
    where: {
      id,
    },
    data,
    include: {
      program: {
        select: {
          id: true,
          name: true,
          category: true,
        },
      },
    },
  });

  return {
    oldSubject,
    updatedSubject,
  };
}

/*
|--------------------------------------------------------------------------
| Delete Subject
|--------------------------------------------------------------------------
*/

export async function deleteSubject(id: number) {
  const subject = await prisma.subject.findUnique({
    where: {
      id,
    },
  });

  if (!subject) {
    return null;
  }

  await prisma.subject.delete({
    where: {
      id,
    },
  });

  return subject;
}