import "tailwindcss/tailwind.css";
import './App.scss';
// Components
import Header from './components/layout/header/Header';
import Search from './components/search/Search';

function App() {
  return (
    <div className="App container">
      <Header />
      <Search />
    </div>
  );
}

export default App;