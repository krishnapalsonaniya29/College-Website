import bcrypt from "bcrypt";
import prisma from "../../config/prisma";
import { ApiError } from "../../utils/ApiError";
import { generateToken } from "../../utils/jwt";

export async function login(email: string, password: string) {
  const admin = await prisma.admin.findUnique({
    where: {
      email,
    },
  });

  if (!admin) {
    throw new ApiError(401, "Invalid email or password");
  }

  const matched = await bcrypt.compare(password, admin.password);

  if (!matched) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = generateToken({
    id: admin.id,
    email: admin.email,
  });

  return {
    token,

    admin: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
    },
  };
}

export async function getCurrentAdmin(id: number) {
  const admin = await prisma.admin.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  return admin;
}