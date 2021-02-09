import "tailwindcss/tailwind.css";
import './App.scss';
// Components
import Header from './components/layout/header/Header';

function App() {
  return (
    <div className="App container">
      <Header />
    </div>
  );
}

export default App;