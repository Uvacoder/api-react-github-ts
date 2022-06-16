import { SearchContributors, SearchRepos } from "./components";

import "./styles/App.css";

function App() {
  return (
    <section className="app">
      <h1>Search Github</h1>
      <main className="app-container">
        <div className="app-container_column">
          <SearchRepos />
        </div>
        <div className="app-container_column">
          <SearchContributors />
        </div>
      </main>
    </section>
  );
}

export default App;
