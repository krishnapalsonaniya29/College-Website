import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

interface JwtPayload {
  id: number;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      admin?: {
        id: number;
        email: string;
        name: string;
      };
    }
  }
}

export const verifyJWT = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Unauthorized");
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    const admin = await prisma.admin.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!admin) {
      throw new ApiError(401, "Unauthorized");
    }

    req.admin = {
      id: admin.id,
      name: admin.name,
      email: admin.email,
    };

    next();
  }
);