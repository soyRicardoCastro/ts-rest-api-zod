import { prop, ModelOptions } from '@typegoose/typegoose'

@ModelOptions({
  schemaOptions: {
    timestamps: true,
    _id: false
  }
})
export class Comment {
  @prop()
  text: string
}