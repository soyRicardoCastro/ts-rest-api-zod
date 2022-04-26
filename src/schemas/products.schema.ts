import { z } from 'zod'

export const CreateProductSchema = z.object({
  body: z.object({
    name: z
      .string()
      .nonempty('Name is required'),
    description: z
      .string()
      .nonempty('Description is required'),
    price: z
      .number()
      .nonnegative()
      .optional(),
    url: z
      .string()
      .optional(),
    tags: z
      .array(z.string())
      .optional(),
    img: z.object({
      url: z.object({
        secure_url: z.string().optional()
      }),
      object_id: z.object({
        public_id: z.string().optional()
      })
    })
    }),
})

export const UpdateProductSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().nonnegative().optional(),
    url: z.string().optional(),
    tags: z.array(z.string()).optional(),
    img: z.object({
      url: z.string().optional(),
      object_id: z.string().optional()
    })
  }),
  params: z.object({
    id: z.string().min(3)
  }),
  query: z.object({
    title: z.string()
  }),
})

export type CreateProductType = z.infer<typeof CreateProductSchema>["body"]
export type UpdateProductParamsType = z.infer<typeof UpdateProductSchema>["params"]
export type UpdateProductBodyType = z.infer<typeof UpdateProductSchema>["body"]
export type UpdateProductQueryType = z.infer<typeof UpdateProductSchema>["query"]

