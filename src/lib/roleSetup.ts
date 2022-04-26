import Role from '../models/Role'

export const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount()

    if (count > 0) return

    const values = await Role.insertMany([
      {name: 'admin'},
      {name: 'moderator'},
      {name: 'user'}
    ])

    console.log(values)
  } catch (error) {
    console.error(error)
  }
}