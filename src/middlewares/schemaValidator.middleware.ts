import { Request, Response, NextFunction } from 'express'
import { AnyZodObject, ZodError } from 'zod'

export const schemaValidator =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {

  try {
    schema.parse({
      body: req.body,
      params: req.params,
      query: req.query
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return res
        .status(400)
        .json(error.issues.map((issue) => ({ message: issue.message, path: issue.path })))
    }
    
    return res.status(400).json({ message: 'Internal Server Error' })
  }

  next()
}