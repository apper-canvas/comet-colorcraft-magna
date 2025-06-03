import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import { coloringPageService } from '../services'

export default function Home() {
  const [recentPages, setRecentPages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadRecentPages = async () => {
      setLoading(true)
      try {
        const result = await coloringPageService.getAll()
        setRecentPages(result?.slice(0, 6) || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadRecentPages()
  }, [])

  const features = [
    {
      icon: "Palette",
      title: "AI-Powered Generation",
      description: "Transform any topic into beautiful coloring pages using advanced AI technology"
    },
    {
      icon: "Settings",
      title: "Custom Complexity",
      description: "Adjust line thickness, detail level, and layout to match any skill level"
    },
    {
      icon: "Download",
      title: "Print-Ready PDFs",
      description: "Download high-resolution files optimized for home and professional printing"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-glow">
              <ApperIcon name="Palette" className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-gradient">ColorCraft</span>
          </motion.div>
          
          <motion.div 
            className="hidden sm:flex items-center space-x-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a href="#features" className="text-surface-600 hover:text-primary transition-colors">Features</a>
            <a href="#gallery" className="text-surface-600 hover:text-primary transition-colors">Gallery</a>
            <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
              Get Started
            </button>
          </motion.div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gradient mb-6 lg:mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Create Magical
            <br />Coloring Pages
          </motion.h1>
          
          <motion.p 
            className="text-lg sm:text-xl text-surface-600 mb-8 lg:mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transform any topic into beautiful, printable coloring pages. Perfect for kids, adults, educators, and creative minds everywhere.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12 lg:mb-20"
          >
            <MainFeature />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <motion.div 
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-surface-800 mb-4 lg:mb-6">
            Why Choose ColorCraft?
          </h2>
          <p className="text-lg sm:text-xl text-surface-600 max-w-2xl mx-auto">
            Powerful tools and AI technology make creating custom coloring pages effortless
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-soft hover:shadow-glow transition-all duration-300 group-hover:-translate-y-2 border border-surface-100">
                <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <ApperIcon name={feature.icon} className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
                </div>
                <h3 className="text-xl lg:text-2xl font-semibold text-surface-800 mb-3 lg:mb-4">
                  {feature.title}
                </h3>
                <p className="text-surface-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recent Gallery Section */}
      <section id="gallery" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl mx-4 sm:mx-6 lg:mx-8 mb-16">
        <motion.div 
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-surface-800 mb-4 lg:mb-6">
            Recent Creations
          </h2>
          <p className="text-lg sm:text-xl text-surface-600 max-w-2xl mx-auto">
            See what others have created with ColorCraft
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">Error loading recent pages: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            {recentPages?.length > 0 ? (
              recentPages.map((page, index) => (
                <motion.div
                  key={page?.id || index}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="bg-white rounded-xl p-4 shadow-card hover:shadow-glow transition-all duration-300 border border-surface-100">
                    <div className="aspect-square bg-gradient-to-br from-surface-100 to-surface-200 rounded-lg mb-3 flex items-center justify-center">
                      <ApperIcon name="Image" className="w-8 h-8 text-surface-400" />
                    </div>
                    <h4 className="font-medium text-surface-800 text-sm truncate mb-1">
                      {page?.topic || "Untitled"}
                    </h4>
                    <p className="text-xs text-surface-500">
                      Complexity: {page?.complexity || 1}/5
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <ApperIcon name="Palette" className="w-16 h-16 text-surface-300 mx-auto mb-4" />
                <p className="text-surface-500">No coloring pages yet. Create your first one above!</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-surface-200">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <ApperIcon name="Palette" className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gradient">ColorCraft</span>
          </div>
          <p className="text-surface-600 mb-6">
            Create amazing coloring pages for any topic, any time.
          </p>
          <div className="flex justify-center space-x-6 text-sm text-surface-500">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  )
}