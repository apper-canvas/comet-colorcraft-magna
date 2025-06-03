import coloringPageData from '../mockData/coloringPage.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let data = [...coloringPageData]

const generateColoringPageSVG = (topic, complexity, lineThickness) => {
  const strokeWidth = lineThickness * 0.8 + 0.5
  const detailLevel = complexity
  const width = 400
  const height = 500
  
  // Generate different patterns based on topic keywords
  let elements = []
  const topicLower = topic.toLowerCase()
  
  if (topicLower.includes('unicorn') || topicLower.includes('horse')) {
    // Unicorn/Horse pattern
    elements = [
      `<path d="M200 150 Q180 120 160 140 Q140 160 160 180 Q180 190 200 180 Q220 190 240 180 Q260 160 240 140 Q220 120 200 150" stroke="black" stroke-width="${strokeWidth}" fill="none"/>`,
      `<path d="M200 120 L205 100 L210 120" stroke="black" stroke-width="${strokeWidth}" fill="none"/>`,
      `<circle cx="185" cy="145" r="3" stroke="black" stroke-width="${strokeWidth}" fill="none"/>`,
      `<circle cx="215" cy="145" r="3" stroke="black" stroke-width="${strokeWidth}" fill="none"/>`,
      `<path d="M150 200 Q200 250 250 200 Q200 300 150 200" stroke="black" stroke-width="${strokeWidth}" fill="none"/>`,
    ]
  } else {
    // Generic pattern
    elements = [
      `<circle cx="200" cy="200" r="50" stroke="black" stroke-width="${strokeWidth}" fill="none"/>`,
      `<rect x="150" y="150" width="100" height="100" stroke="black" stroke-width="${strokeWidth}" fill="none"/>`,
      `<path d="M150 250 Q200 300 250 250" stroke="black" stroke-width="${strokeWidth}" fill="none"/>`,
    ]
  }
  
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
      <rect width="100%" height="100%" fill="white"/>
      ${elements.join('\n      ')}
    </svg>
  `
}

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