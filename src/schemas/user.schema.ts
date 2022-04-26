import { z } from 'zod'

export const UpdateUserSchema = z.object({
  params: z.object({
    id: z.string().min(3)
  }),
  body: z.object({
    username: z.string().optional(),
    email: z.string().optional(),
    password: z.promise(z.string()).optional()
  })
})

export type UpdateUserParamsType = z.infer<typeof UpdateUserSchema>["params"]
export type UpdateUserBodyType = z.infer<typeof UpdateUserSchema>["body"]
