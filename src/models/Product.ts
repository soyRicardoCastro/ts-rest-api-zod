import { getModelForClass, prop } from '@typegoose/typegoose'
import { Comment } from './Comment'
import { nanoid } from 'nanoid'

class Product {
  @prop({ required: true, trim: true })
  name: string

  @prop({ required: true, trim: true })
  description: string

  @prop({ default: 0 })
  price: number

  @prop()
  image: {
    url: string,
    public_id: string
  }

  @prop({ lowercase: true })
  url: string

  @prop({ type: () => [String] })
  tags: string[]

  @prop({ type: () => [Comment] })
  comments: Comment[]

  @prop({ required: true, default: () => nanoid() })
  sku: string
}

const ProductModel = getModelForClass(Product)

export default ProductModel