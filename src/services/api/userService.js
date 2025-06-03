import userData from '../mockData/user.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let data = [...userData]

const userService = {
  async getAll() {
    await delay(300)
    return [...data]
  },

  async getById(id) {
    await delay(200)
    const item = data.find(user => user.id === id)
    if (!item) {
      throw new Error('User not found')
    }
    return { ...item }
  },

  async create(userData) {
    await delay(400)
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdPages: [],
      favorites: [],
      preferences: {}
    }
    data.push(newUser)
    return { ...newUser }
  },

  async update(id, updateData) {
    await delay(350)
    const index = data.findIndex(user => user.id === id)
    if (index === -1) {
      throw new Error('User not found')
    }
    
    data[index] = { ...data[index], ...updateData }
    return { ...data[index] }
  },

  async delete(id) {
    await delay(250)
    const index = data.findIndex(user => user.id === id)
    if (index === -1) {
      throw new Error('User not found')
    }
    
    const deletedUser = data.splice(index, 1)[0]
    return { ...deletedUser }
  }
}

export default userService