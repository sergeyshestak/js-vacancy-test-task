import { z } from 'zod';

import { EMAIL_REGEX } from 'app-constants';

import { emailSchema, passwordSchema } from './common.schema';
import dbSchema from './db.schema';

export const userSchema = dbSchema
  .extend({
    email: z.string().toLowerCase().regex(EMAIL_REGEX, 'Email format is incorrect.'),
    passwordHash: z.string().nullable().optional(),

    isEmailVerified: z.boolean().default(false),
    isShadow: z.boolean().optional().nullable(),

    signupToken: z.string().nullable().optional(),
    resetPasswordToken: z.string().nullable().optional(),

    avatarUrl: z.string().nullable().optional(),

    lastRequest: z.date().optional(),
  })
  .strip();

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = signInSchema;

export const resendEmailSchema = z.object({
  email: emailSchema,
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  password: passwordSchema,
});

export const updateUserSchema = userSchema
  .extend({
    password: passwordSchema,
  })
  .partial();
