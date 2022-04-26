import { z } from 'zod'

export const LoginSchema = z.object({
  body: z.object({
    email: z
      .string()
      .nonempty('Email is required')
      .email(),
    password: z
      .promise(z.string())
  })
})

export const RegisterSchema = z.object({
  body: z.object({
    username: z
      .string()
      .nonempty('Username is required')
      .min(2),
    email: z
      .string()
      .nonempty('Email is required')
      .email(),
    password: z
      .promise(z.string())
  })
})

export type LoginTypes = z.infer<typeof LoginSchema>['body']
export type RegisterTypes = z.infer<typeof RegisterSchema>['body']