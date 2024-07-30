import * as z from 'zod';

export const SignupFormSchema = z.object({
  email: z.string().email().describe('Email'),
  password: z
    .string()
    .describe('Password')
    .min(8, 'Password should be at least 8 characters'),
  firstName: z.string().describe('First Name'),
  lastName: z.string().describe('Last Name'),
  username: z.string().describe('Username'),
});

export const SigninFormSchema = z.object({
  email: z.string().email().describe('Email'),
  password: z.string().describe('Password'),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email().describe('Email'),
  code: z.string().describe('Code'),
  password: z.string().describe('Password'),
});
