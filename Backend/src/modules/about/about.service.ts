import { Prisma } from "@prisma/client";
import prisma from "../../config/prisma";

/*
|--------------------------------------------------------------------------
| Get About Configuration
|--------------------------------------------------------------------------
*/

export async function getAbout() {
  let about = await prisma.about.findFirst();

  // Automatically create the first record if it doesn't exist
  if (!about) {
    about = await prisma.about.create({
      data: {
        instituteName: "",

        about: "",
        motto: "",
        vision: "",
        mission: "",
        objectives: "",

        principalName: "",
        principalPhotoUrl: "",
        principalPhotoPublicId: null,
        principalMessage: "",
      },
    });
  }

  return about;
}

/*
|--------------------------------------------------------------------------
| Update About Configuration
|--------------------------------------------------------------------------
*/

export async function updateAbout(
  data: Prisma.AboutUpdateInput
) {
  let about = await prisma.about.findFirst();

  // Create if it doesn't exist
  if (!about) {
    about = await prisma.about.create({
      data: {
        instituteName: "",

        about: "",
        motto: "",
        vision: "",
        mission: "",
        objectives: "",

        principalName: "",
        principalPhotoUrl: "",
        principalPhotoPublicId: null,
        principalMessage: "",
      },
    });
  }

  const oldAbout = about;

  const updatedAbout = await prisma.about.update({
    where: {
      id: about.id,
    },
    data,
  });

  return {
    oldAbout,
    updatedAbout,
  };
}