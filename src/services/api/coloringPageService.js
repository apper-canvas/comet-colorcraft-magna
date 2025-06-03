import coloringPageData from '../mockData/coloringPage.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let data = [...coloringPageData]

const coloringPageService = {
  async getAll() {
    await delay(300)
    return [...data]
  },

  async getById(id) {
    await delay(200)
    const item = data.find(page => page.id === id)
    if (!item) {
      throw new Error('Coloring page not found')
    }
    return { ...item }
  },

  async create(pageData) {
    await delay(400)
    const newPage = {
      id: Date.now().toString(),
      ...pageData,
      createdAt: new Date().toISOString(),
      userId: 'user123'
    }
    data.unshift(newPage)
    return { ...newPage }
  },

  async update(id, updateData) {
    await delay(350)
    const index = data.findIndex(page => page.id === id)
    if (index === -1) {
      throw new Error('Coloring page not found')
    }
    
    data[index] = { ...data[index], ...updateData }
    return { ...data[index] }
  },

  async delete(id) {
    await delay(250)
    const index = data.findIndex(page => page.id === id)
    if (index === -1) {
      throw new Error('Coloring page not found')
    }
    
    const deletedPage = data.splice(index, 1)[0]
    return { ...deletedPage }
  }
}

export default coloringPageService