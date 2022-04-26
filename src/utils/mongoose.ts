import { connect } from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://Ricardo:ricardo123@rest-api.5kr0y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

export async function connectDB () {
  try {
    await connect(MONGODB_URI)
    console.log('mongodb connected')
  } catch (error) {
    console.error(error)
  }
}
