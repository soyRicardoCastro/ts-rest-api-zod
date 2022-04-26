import app from './app'
import { connectDB } from './utils/mongoose'

async function main () {
  try {
    await connectDB()
    console.log('Database is connected')
    app.listen(3000, () => console.log('server on port 3000'))
  } catch (error) {
    console.error(error)
  }
}

main()