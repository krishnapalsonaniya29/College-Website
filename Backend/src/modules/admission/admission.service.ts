import { Prisma } from "@prisma/client";
import prisma from "../../config/prisma";

/*
|--------------------------------------------------------------------------
| Get Public Admissions
|--------------------------------------------------------------------------
*/

export const getAdmissions = async () => {
  return prisma.admission.findMany({
    where: {
      isActive: true,
    },
    orderBy: [
      {
        admissionDate: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
  });
};

/*
|--------------------------------------------------------------------------
| Get Admin Admissions
|--------------------------------------------------------------------------
*/

export const getAdminAdmissions = async () => {
  return prisma.admission.findMany({
    orderBy: [
      {
        admissionDate: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
  });
};

/*
|--------------------------------------------------------------------------
| Get Admission By ID
|--------------------------------------------------------------------------
*/

export const getAdmissionById = async (id: number) => {
  return prisma.admission.findUnique({
    where: {
      id,
    },
  });
};

/*
|--------------------------------------------------------------------------
| Create Admission
|--------------------------------------------------------------------------
*/

export const createAdmission = (
  data: Prisma.AdmissionCreateInput
) => {
  return prisma.admission.create({
    data,
  });
};

/*
|--------------------------------------------------------------------------
| Update Admission
|--------------------------------------------------------------------------
*/

export const updateAdmission = async (
  id: number,
  data: Prisma.AdmissionUpdateInput
) => {
  const admission = await prisma.admission.findUnique({
    where: {
      id,
    },
  });

  if (!admission) {
    return null;
  }

  const updatedAdmission = await prisma.admission.update({
    where: {
      id,
    },
    data,
  });

  return {
    oldAdmission: admission,
    updatedAdmission,
  };
};

/*
|--------------------------------------------------------------------------
| Delete Admission
|--------------------------------------------------------------------------
*/

export const deleteAdmission = async (id: number) => {
  const admission = await prisma.admission.findUnique({
    where: {
      id,
    },
  });

  if (!admission) {
    return null;
  }

  await prisma.admission.delete({
    where: {
      id,
    },
  });

  return admission;
};