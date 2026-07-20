import { Prisma } from "@prisma/client";
import prisma from "../../config/prisma";
import { ApiError } from "../../utils/ApiError";

/*
|--------------------------------------------------------------------------
| Get All Hero Slides
|--------------------------------------------------------------------------
*/

export async function getHeroSlides() {
  return prisma.heroSlide.findMany({
    orderBy: {
      displayOrder: "asc",
    },
  });
}

/*
|--------------------------------------------------------------------------
| Get Hero Slide By ID
|--------------------------------------------------------------------------
*/

export async function getHeroSlideById(id: number) {
  const slide = await prisma.heroSlide.findUnique({
    where: { id },
  });

  if (!slide) {
    throw new ApiError(404, "Hero slide not found");
  }

  return slide;
}

/*
|--------------------------------------------------------------------------
| Create Hero Slide
|--------------------------------------------------------------------------
*/

export async function createHeroSlide(
  data: Prisma.HeroSlideCreateInput
) {
  return prisma.heroSlide.create({
    data,
  });
}

/*
|--------------------------------------------------------------------------
| Update Hero Slide
|--------------------------------------------------------------------------
*/

export async function updateHeroSlide(
  id: number,
  data: Prisma.HeroSlideUpdateInput
) {
  const oldSlide = await prisma.heroSlide.findUnique({
    where: { id },
  });

  if (!oldSlide) {
    throw new ApiError(404, "Hero slide not found");
  }

  const updatedSlide = await prisma.heroSlide.update({
    where: { id },
    data,
  });

  return {
    oldSlide,
    updatedSlide,
  };
}

/*
|--------------------------------------------------------------------------
| Delete Hero Slide
|--------------------------------------------------------------------------
*/

export async function deleteHeroSlide(id: number) {
  const slide = await prisma.heroSlide.findUnique({
    where: { id },
  });

  if (!slide) {
    throw new ApiError(404, "Hero slide not found");
  }

  await prisma.heroSlide.delete({
    where: { id },
  });

  return slide;
}