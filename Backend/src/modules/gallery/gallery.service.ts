import { Prisma, GalleryCategory } from "@prisma/client";
import prisma from "../../config/prisma";
import { ApiError } from "../../utils/ApiError";

export interface GalleryFilters {
  category?: GalleryCategory;
  departmentId?: number;
  isActive?: boolean;
}

export async function createGallery(data: Prisma.GalleryCreateInput) {
  return prisma.gallery.create({
    data,
    include: {
      department: true,
    },
  });
}

export async function getAllGallery(filters: GalleryFilters) {
  const where: Prisma.GalleryWhereInput = {};

  if (filters.category) {
    where.category = filters.category;
  }

  if (filters.departmentId) {
    where.departmentId = filters.departmentId;
  }

  if (filters.isActive !== undefined) {
    where.isActive = filters.isActive;
  }

  return prisma.gallery.findMany({
    where,
    include: {
      department: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getGalleryById(id: number) {
  const gallery = await prisma.gallery.findUnique({
    where: { id },
    include: {
      department: true,
    },
  });

  if (!gallery) {
    throw new ApiError(404, "Gallery item not found");
  }

  return gallery;
}

export async function updateGallery(
  id: number,
  data: Prisma.GalleryUpdateInput
) {
  const gallery = await prisma.gallery.findUnique({
    where: { id },
  });

  if (!gallery) {
    throw new ApiError(404, "Gallery item not found");
  }

  return prisma.gallery.update({
    where: { id },
    data,
    include: {
      department: true,
    },
  });
}

export async function deleteGallery(id: number) {
  const gallery = await prisma.gallery.findUnique({
    where: { id },
  });

  if (!gallery) {
    throw new ApiError(404, "Gallery item not found");
  }

  return prisma.gallery.delete({
    where: { id },
  });
}