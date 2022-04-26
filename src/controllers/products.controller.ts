import { Request, Response } from 'express'
import { CreateProductType, UpdateProductParamsType, UpdateProductBodyType, UpdateProductQueryType } from '../schemas/products.schema'
import { uploadImage, deleteImage } from '../lib/cloudinary'
import fs from 'fs-extra'
import Product from '../models/Product'

export const getProducts = async (_req: Request<unknown, unknown, CreateProductType>, res: Response) => {
  try {
    const products = await Product.find()

    console.log(products)
    
  } catch (error) {
    console.error(error)
    return res.status(500).json({message: error})
  }  
}

export const createProduct = async (req: Request<unknown, unknown, CreateProductType>, res: Response) => {
  try {
    const { name, description, price, url, tags, img } = req.body
    let image: object;
      
    if (img != null) {
      const result = await uploadImage(img.tempFilePath)
      await fs.remove(img.tempFilePath)
      image = {
        url: result.secure_url,
        public_id: result.public_id
      }
      console.log(result)
    }
    const product = await Product.create({
      name,
      description,
      price,
      url,
      tags,
      image
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error })
  }  
}

export const updateProduct = async (
  req: Request<
    UpdateProductParamsType,
    unknown,
    UpdateProductBodyType,
    UpdateProductQueryType
  >,
   res: Response) => {
  try {
    const { id } = req.params

    const product = await Product.findByIdAndUpdate(id, req.body, { new: true })

    res.send(product)
    console.log(product)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error })
  }
}

export const deleteProduct = async (
  req: Request<
    UpdateProductParamsType,
    unknown,
    UpdateProductBodyType,
    UpdateProductQueryType
  >,
   res: Response) => {
  try {
    const { id } = req.params

    const product = await Product.findByIdAndDelete(id)

    if (!product) return res.sendStatus(204)

    if (product.image.public_id) {
      await deleteImage(product.image.public_id)
    }

    return res.sendStatus(204)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error })
  }
}

export const getProduct = async (
  req: Request<
    UpdateProductParamsType,
    unknown,
    UpdateProductBodyType,
    UpdateProductQueryType
  >,
   res: Response) => {
  try {
    const { id } = req.params

    const product = await Product.findById(id)

    if (!product) return res.sendStatus(204)

    return res.sendStatus(204)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error })
  }
}
