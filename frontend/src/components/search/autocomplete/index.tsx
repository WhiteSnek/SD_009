import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search } from 'lucide-react'
import debounce from 'lodash.debounce'

type Suggestion = {
  id: string
  label: string
}

type Props = {
  placeholder?: string
  fetchSuggestions: (query: string) => Promise<Suggestion[]>
  onSelect: (value: Suggestion) => void
}

const AutocompleteSelect: React.FC<Props> = ({ placeholder, fetchSuggestions, onSelect }) => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [loading, setLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  const debouncedFetch = debounce(async (q: string) => {
    if (!q.trim()) return setSuggestions([])
    setLoading(true)
    const results = await fetchSuggestions(q)
    setSuggestions(results)
    setLoading(false)
  }, 300)

  useEffect(() => {
    debouncedFetch(query)
    return () => debouncedFetch.cancel()
  }, [query])

  const handleSelect = (item: Suggestion) => {
    setQuery(item.label)
    setSuggestions([])
    setShowDropdown(false)
    onSelect(item)
  }

  return (
    <div className="relative w-full">
      <div className="flex items-center bg-zinc-800 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition">
        <Search className="w-4 h-4 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder={placeholder || 'Search...'}
          value={query}
          onChange={e => {
            setQuery(e.target.value)
            setShowDropdown(true)
          }}
          className="bg-transparent w-full text-sm focus:outline-none text-white"
        />
      </div>

      <AnimatePresence>
        {showDropdown && suggestions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute z-10 mt-1 w-full bg-zinc-800 border border-gray-700 rounded-xl shadow-lg max-h-60 overflow-y-auto"
          >
            {suggestions.map(item => (
              <li
                key={item.id}
                onClick={() => handleSelect(item)}
                className="px-4 py-2 hover:bg-zinc-700 cursor-pointer text-sm text-white"
              >
                {item.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {loading && (
        <div className="absolute right-4 top-2 text-xs text-gray-400">Loading...</div>
      )}
    </div>
  )
}

export default AutocompleteSelect
