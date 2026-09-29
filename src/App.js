import { useEffect } from "react";
import { getTrendingMovies } from "./services/tmdbApi";

function App() {
  useEffect(() => {
    const testApi = async () => {
      try {
        const data = await getTrendingMovies();

        console.log("TMDb Response:", data);
      } catch (error) {
        console.error("TMDb API Error:", error);
      }
    };

    testApi();
  }, []);

  return (
    <div>
      <h1>Movie Explorer</h1>
    </div>
  );
}

export default App;