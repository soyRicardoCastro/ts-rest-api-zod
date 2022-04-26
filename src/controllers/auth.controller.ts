import { Request, Response } from 'express'
import { RegisterTypes, LoginTypes } from '../schemas/auth.schema'
import User from '../models/User'

export const Login = async (req: Request<unknown, unknown, LoginTypes>, res: Response) => {
  try {
    const { email, password } = req.body

    const userFound = User.findOne({email}).populate('roles')

    if (!userFound) return res.status(400).json({ message: 'User not found' })

    const matchPassword = await User.comparePassword(password, userFound.password)

    if (!matchPassword) return res.status(401).json({ message: 'Invalid Password' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const Register = async (req: Request<unknown, unknown, RegisterTypes>, res: Response) => {
  try {
    const { username, email, password } = req.body

    const user = new User({
      username,
      email,
      password
    })

    await user.save()

    console.log(user)

    res.json(user)
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}