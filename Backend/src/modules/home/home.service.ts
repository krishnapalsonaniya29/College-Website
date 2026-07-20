import { Prisma } from "@prisma/client";
import prisma from "../../config/prisma";

/*
|--------------------------------------------------------------------------
| Get Home Configuration
|--------------------------------------------------------------------------
*/

export async function getHomeConfig() {
  let homeConfig = await prisma.homeConfig.findFirst();

  // Automatically create the first record if it doesn't exist
  if (!homeConfig) {
    homeConfig = await prisma.homeConfig.create({
      data: {
        directorName: "",
        directorPhotoUrl: "",
        directorPhotoPublicId: null,
        directorMessage: "",

        totalStudents: 0,
        ugStudents: 0,
        pgStudents: 0,
        girls: 0,
        boys: 0,

        academicSession: "",

        thought: "",
        thoughtAuthor: "",
      },
    });
  }

  return homeConfig;
}

/*
|--------------------------------------------------------------------------
| Update Home Configuration
|--------------------------------------------------------------------------
*/

export async function updateHomeConfig(
  data: Prisma.HomeConfigUpdateInput
) {
  let homeConfig = await prisma.homeConfig.findFirst();

  // Create if it doesn't exist
  if (!homeConfig) {
    homeConfig = await prisma.homeConfig.create({
      data: {
        directorName: "",
        directorPhotoUrl: "",
        directorPhotoPublicId: null,
        directorMessage: "",

        totalStudents: 0,
        ugStudents: 0,
        pgStudents: 0,
        girls: 0,
        boys: 0,

        academicSession: "",

        thought: "",
        thoughtAuthor: "",
      },
    });
  }

  const oldConfig = homeConfig;

  const updatedConfig = await prisma.homeConfig.update({
    where: {
      id: homeConfig.id,
    },
    data,
  });

  return {
    oldConfig,
    updatedConfig,
  };
}