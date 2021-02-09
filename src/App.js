import "tailwindcss/tailwind.css";
import './App.scss';
// Components
import Header from './components/layout/header/Header';
import Search from './components/search/Search';
import Repos from './components/repos/Repos';

function App() {
  const user = "jmjaro-dev";
  const repos = [
    {
      id: 1,
      name: "chatcord",
      desc: "A pretium feugiat lacus libero egestas leo ut volutpat eget. Luctus duis diam proin sed ac. Turpis posuere integer facilisi lorem amet placerat.",
      url: "https://github.com/jmjaro-dev/chatcord-traversy",
      updatedAt: "Updated 22 hours ago",
      coreLanguage: {
        name: "javascript",
        color: "#F1E05A"
      }
    },
    {
      id: 2,
      name: "space-x-app-angular-graphql",
      desc: "A pretium feugiat lacus libero egestas leo ut volutpat eget. Luctus duis diam proin sed ac. Turpis posuere integer facilisi lorem amet placerat.",
      updatedAt: "Updated 12 days ago",
      url: "https://github.com/jmjaro-dev/space-x-app-angular-graphql",
      coreLanguage: {
        name: "javascript",
        color: "#F1E05A"
      }
    },
    {
      id: 3,
      name: "mern-it-ticketing-system",
      desc: "A pretium feugiat lacus libero egestas leo ut volutpat eget. Luctus duis diam proin sed ac. Turpis posuere integer facilisi lorem amet placerat.",
      url: "https://github.com/jmjaro-dev/mern-it-ticketing-system",
      updatedAt: "Updated 23 days ago",
      coreLanguage: {
        name: "javascript",
        color: "#F1E05A"
      }
    },
  ];

  return (
    <div className="App container">
      <Header />
      <Search />
      <Repos repos={repos} user={user} />
    </div>
  );
}

export default App;