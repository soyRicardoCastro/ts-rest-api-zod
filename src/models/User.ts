import { prop, getModelForClass, Ref, ReturnModelType, pre } from '@typegoose/typegoose'
import { Role } from './Role'
import bcrypt from 'bcryptjs'

@pre<User>('save', async function () {
  this.password = await bcrypt.hash(this.password, 10)
})
export class User {
  @prop({ required: true })
  username: string

  @prop({ required: true, trim: true, unique: true })
  email: string

  @prop({ required: true, minlength: 6 })
  password: string

  @prop({ ref: () => Role })
  roles: Ref<Role>[]

  static async findByUsername(this: ReturnModelType<typeof User>, username: string) {
    return this.find({username})
  }

  static async comparePassword(password: string, receivedPassword: string) {
    return await bcrypt.compare(password, receivedPassword)
  }
}

const UserModel = getModelForClass(User)
export default UserModel