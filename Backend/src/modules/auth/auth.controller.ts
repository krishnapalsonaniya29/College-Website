import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiResponse } from "../../utils/ApiResponse";
import { loginSchema } from "./auth.validation";
import * as authService from "./auth.service";

export const login = asyncHandler(async (req: Request, res: Response) => {
  const body = loginSchema.parse(req.body);

  const data = await authService.login(body.email, body.password);

  res.json(new ApiResponse(true, "Login successful", data));
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  const admin = await authService.getCurrentAdmin(req.admin!.id);

  res.json(
    new ApiResponse(true, "Current admin", admin)
  );
});