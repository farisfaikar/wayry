import { z } from "zod";

export const ResetPasswordEmailSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
})