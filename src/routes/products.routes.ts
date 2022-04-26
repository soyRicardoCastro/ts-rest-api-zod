import { Router } from 'express'
import { createProduct, updateProduct } from '../controllers/products.controller';
import { schemaValidator } from '../middlewares/schemaValidator.middleware';
import { CreateProductSchema, UpdateProductSchema } from '../schemas/products.schema';

const router = Router()

router.post('/products', schemaValidator(CreateProductSchema), createProduct)
router.put('/products/:id', schemaValidator(UpdateProductSchema), updateProduct)

export default router