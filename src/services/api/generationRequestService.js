import generationRequestData from '../mockData/generationRequest.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let data = [...generationRequestData]

const generationRequestService = {
  async getAll() {
    await delay(300)
    return [...data]
  },

  async getById(id) {
    await delay(200)
    const item = data.find(request => request.id === id)
    if (!item) {
      throw new Error('Generation request not found')
    }
    return { ...item }
  },

  async create(requestData) {
    await delay(500)
    const newRequest = {
      id: Date.now().toString(),
      ...requestData,
      status: 'processing',
      resultUrl: '',
      userId: 'user123'
    }
    data.unshift(newRequest)
    return { ...newRequest }
  },

  async update(id, updateData) {
    await delay(350)
    const index = data.findIndex(request => request.id === id)
    if (index === -1) {
      throw new Error('Generation request not found')
    }
    
    data[index] = { ...data[index], ...updateData }
    return { ...data[index] }
  },

  async delete(id) {
    await delay(250)
    const index = data.findIndex(request => request.id === id)
    if (index === -1) {
      throw new Error('Generation request not found')
    }
    
    const deletedRequest = data.splice(index, 1)[0]
    return { ...deletedRequest }
  }
}

export default generationRequestService