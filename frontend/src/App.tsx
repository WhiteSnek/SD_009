import SearchBar from './components/search'

function App() {
  return (
    <div className="min-h-screen p-10 text-white dark:text-white bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-zinc-800 dark:to-black transition-colors">
      <h1 className="text-3xl font-bold text-center mb-10 drop-shadow-md">Search for a Model</h1>
      <SearchBar />
    </div>
  )
}

export default App
