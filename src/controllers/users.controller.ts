import { Request, Response } from 'express'
import User from '../models/User'
import { UpdateUserParamsType, UpdateUserBodyType } from '../schemas/user.schema'

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find({}, {username: 1, _id: 0})
    console.log(users)
    res.json(users)
  } catch (error) {
    console.error(error)
  }
}

export const getUser = async (
  req: Request<
    UpdateUserParamsType,
    unknown,
    UpdateUserBodyType,
    unknown
  >,
  res: Response
  ) => {
  try {
    const { id } = req.params

    const user = await User.findById(id, {username: 1, _id: 0})
    console.log(user)

    res.json(user)
  } catch (error) {
    console.error(error)
  }
}

export const updateUser = async (
  req: Request<
    UpdateUserParamsType,
    unknown,
    UpdateUserBodyType,
    unknown
  >,
  res: Response
) => {
  try {
    const { id } = req.params
    const { username, email, password } = req.body
    
    const user = await User.findByIdAndUpdate(
      id,
      {username: username, email: email, password: password},
      {new: true}  
    )
    console.log(user)
    res.json(user)
  } catch (error) {
    console.error(error)
  }
}

export const deleteUser = async (req: Request<UpdateUserParamsType>, res: Response) => {
  try {
    const { id } = req.params

    const user = await User.findByIdAndDelete(id)
    console.log(user)
  } catch (error) {
    console.error(error)
    return res.status(500).send({message: 'Internal server error'})    
  }
}