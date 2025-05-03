import Results from "./components/results";
import SearchBar from "./components/search";
import { ApiContextProvider } from "./context/ApiContext";

function App() {
  return (
    <ApiContextProvider>
      <div className="min-h-screen p-10 text-white bg-gradient-to-br from-gray-900 via-zinc-800 to-black transition-colors">
        <SearchBar />
        <Results />
      </div>
    </ApiContextProvider>
  );
}

export default App;
