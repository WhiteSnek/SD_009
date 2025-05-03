import { useRef, useState } from "react";
import Results from "./components/results";
import SearchBar from "./components/search";
import { ApiContextProvider } from "./context/ApiContext";
import { Toaster } from "sonner";

function App() {
  const [searched, setSearched] = useState<boolean>(false);
  const resultsRef = useRef<HTMLDivElement | null>(null); // Create a ref

  return (
    <ApiContextProvider>
      <div className="min-h-screen p-10 text-white bg-gradient-to-br from-gray-900 via-zinc-800 to-black transition-colors">
        <SearchBar setSearched={setSearched} resultsRef={resultsRef} />
        {searched && (
          <div ref={resultsRef}>
            <Results />
          </div>
        )}
      </div>
      <Toaster />
    </ApiContextProvider>
  );
}

export default App;
