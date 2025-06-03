import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import { coloringPageService } from '../services'

export default function MainFeature() {
  const [topic, setTopic] = useState('')
  const [complexity, setComplexity] = useState(3)
  const [lineThickness, setLineThickness] = useState(2)
  const [pageSize, setPageSize] = useState('A4')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPage, setGeneratedPage] = useState(null)
  const [showPreview, setShowPreview] = useState(false)

  const complexityLabels = {
    1: 'Simple',
    2: 'Easy', 
    3: 'Medium',
    4: 'Detailed',
    5: 'Complex'
  }

  const thicknessLabels = {
    1: 'Thin',
    2: 'Medium',
    3: 'Thick'
  }

  const topicSuggestions = [
    'Magical unicorns', 'Ocean adventures', 'Space exploration', 'Forest animals',
    'Dinosaur world', 'Fairy garden', 'Robot friends', 'Underwater castle',
    'Mountain landscape', 'Butterfly meadow', 'Dragon kingdom', 'City skyline'
  ]

  const handleTopicSuggestion = (suggestion) => {
    setTopic(suggestion)
  }

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error('Please enter a topic for your coloring page')
      return
    }

    setIsGenerating(true)
    setShowPreview(false)

    try {
      const pageData = {
        topic: topic.trim(),
        complexity,
        lineThickness,
        pageSize,
        imageData: `generated-${Date.now()}.svg`
      }

      const result = await coloringPageService.create(pageData)
      setGeneratedPage(result)
      setShowPreview(true)
      toast.success('Coloring page generated successfully!')
    } catch (error) {
      toast.error('Failed to generate coloring page. Please try again.')
      console.error('Generation error:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = async () => {
    if (!generatedPage) return

    try {
      // Simulate PDF generation and download
      toast.success('Your coloring page is being prepared for download!')
      
      // In a real app, this would trigger an actual PDF download
      const link = document.createElement('a')
      link.href = '#'
      link.download = `coloring-page-${generatedPage.topic.replace(/\s+/g, '-').toLowerCase()}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      toast.error('Download failed. Please try again.')
    }
  }

  const handleNewPage = () => {
    setGeneratedPage(null)
    setShowPreview(false)
    setTopic('')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {!showPreview ? (
          <motion.div
            key="generator"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-soft border border-surface-100 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary via-accent to-secondary p-6 sm:p-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Create Your Coloring Page
              </h3>
              <p className="text-purple-100">
                Describe any topic and we'll create a beautiful coloring page for you
              </p>
            </div>

            <div className="p-6 sm:p-8 space-y-6 sm:space-y-8">
              {/* Topic Input */}
              <div className="space-y-4">
                <label className="block text-lg font-semibold text-surface-800">
                  What would you like to color?
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter any topic... (e.g., magical unicorns, space adventure)"
                    className="w-full px-4 py-4 text-lg border-2 border-surface-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 bg-surface-50 placeholder:text-surface-400"
                    disabled={isGenerating}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <ApperIcon name="Sparkles" className="w-6 h-6 text-secondary" />
                  </div>
                </div>

                {/* Topic Suggestions */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-surface-600">Popular suggestions:</p>
                  <div className="flex flex-wrap gap-2">
                    {topicSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleTopicSuggestion(suggestion)}
                        className="px-3 py-1.5 text-sm bg-surface-100 hover:bg-primary hover:text-white rounded-lg transition-all duration-200 border border-surface-200 hover:border-primary"
                        disabled={isGenerating}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Customization Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Complexity */}
                <div className="space-y-3">
                  <label className="block font-semibold text-surface-800">
                    Complexity Level
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={complexity}
                      onChange={(e) => setComplexity(parseInt(e.target.value))}
                      className="w-full h-2 bg-surface-200 rounded-lg appearance-none cursor-pointer slider"
                      disabled={isGenerating}
                    />
                    <div className="flex justify-between text-xs text-surface-500">
                      <span>Simple</span>
                      <span className="font-medium text-primary">
                        {complexityLabels[complexity]}
                      </span>
                      <span>Complex</span>
                    </div>
                  </div>
                </div>

                {/* Line Thickness */}
                <div className="space-y-3">
                  <label className="block font-semibold text-surface-800">
                    Line Thickness
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="1"
                      max="3"
                      value={lineThickness}
                      onChange={(e) => setLineThickness(parseInt(e.target.value))}
                      className="w-full h-2 bg-surface-200 rounded-lg appearance-none cursor-pointer slider"
                      disabled={isGenerating}
                    />
                    <div className="flex justify-between text-xs text-surface-500">
                      <span>Thin</span>
                      <span className="font-medium text-primary">
                        {thicknessLabels[lineThickness]}
                      </span>
                      <span>Thick</span>
                    </div>
                  </div>
                </div>

                {/* Page Size */}
                <div className="space-y-3">
                  <label className="block font-semibold text-surface-800">
                    Page Size
                  </label>
                  <select
                    value={pageSize}
                    onChange={(e) => setPageSize(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-surface-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 bg-white"
                    disabled={isGenerating}
                  >
                    <option value="A4">A4 (210×297mm)</option>
                    <option value="Letter">Letter (8.5×11in)</option>
                    <option value="A3">A3 (297×420mm)</option>
                    <option value="Legal">Legal (8.5×14in)</option>
                  </select>
                </div>
              </div>

              {/* Generate Button */}
              <div className="text-center pt-4">
                <motion.button
                  onClick={handleGenerate}
                  disabled={isGenerating || !topic.trim()}
                  className="relative inline-flex items-center space-x-3 bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-card hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
                  whileTap={{ scale: 0.95 }}
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      <span>Generating Magic...</span>
                    </>
                  ) : (
                    <>
                      <ApperIcon name="Wand2" className="w-6 h-6" />
                      <span>Generate Coloring Page</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-soft border border-surface-100 overflow-hidden"
          >
            {/* Preview Header */}
            <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    Your Coloring Page is Ready!
                  </h3>
                  <p className="text-green-100">
                    {generatedPage?.topic} • {complexityLabels[generatedPage?.complexity || 3]} complexity
                  </p>
                </div>
                <div className="bg-white/20 rounded-full p-3">
                  <ApperIcon name="CheckCircle" className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>

<div className="p-6 sm:p-8">
              {/* Preview Area */}
              <div className="bg-gradient-to-br from-surface-50 to-surface-100 rounded-2xl p-8 mb-6 text-center border-2 border-dashed border-surface-300">
                <div className="aspect-[3/4] max-w-md mx-auto bg-white rounded-xl shadow-card border border-surface-200 overflow-hidden">
                  {generatedPage?.imageData ? (
                    <div className="h-full flex flex-col">
                      <div className="flex-1 p-4 flex items-center justify-center">
                        <img 
                          src={generatedPage.imageData} 
                          alt={`Coloring page: ${generatedPage?.topic}`}
                          className="max-w-full max-h-full object-contain"
                          style={{ filter: 'contrast(1.2)' }}
                        />
                      </div>
                      <div className="p-4 bg-surface-50 border-t border-surface-200">
                        <h4 className="font-semibold text-surface-800 mb-1">
                          {generatedPage?.topic}
                        </h4>
                        <p className="text-sm text-surface-600">
                          {pageSize} • {thicknessLabels[lineThickness]} lines
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center p-8">
                      <div className="text-center space-y-4">
                        <ApperIcon name="FileImage" className="w-16 h-16 text-surface-400 mx-auto" />
                        <div>
                          <h4 className="font-semibold text-surface-800 mb-2">
                            {generatedPage?.topic}
                          </h4>
                          <p className="text-sm text-surface-600">
                            {pageSize} • {thicknessLabels[lineThickness]} lines
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={handleDownload}
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-xl font-semibold shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105"
                  whileTap={{ scale: 0.95 }}
                >
                  <ApperIcon name="Download" className="w-5 h-5" />
                  <span>Download PDF</span>
                </motion.button>

                <motion.button
                  onClick={handleNewPage}
                  className="flex items-center justify-center space-x-2 bg-surface-100 text-surface-700 px-6 py-3 rounded-xl font-semibold border border-surface-200 hover:bg-surface-200 transition-all duration-300"
                  whileTap={{ scale: 0.95 }}
                >
                  <ApperIcon name="Plus" className="w-5 h-5" />
                  <span>Create Another</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}