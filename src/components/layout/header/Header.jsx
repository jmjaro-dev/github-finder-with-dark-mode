import { ReactComponent as GithubIcon } from '../../../assets/icons/github-icon.svg';
import Toggle from '../toggle/Toggle';

const Header = ({ setIsDarkMode }) => {
  return (
    <div id="header" className="w-screen shadow-md bg-lightHeader dark:bg-darkHeader">
      <div className="header-content mx-auto h-full flex justify-between items-center">
        <div className="logo-container flex items-center">
          <GithubIcon className="mr-3"/>
          <h1 className="select-none">Github Finder</h1>
        </div>
        <div className="dark-mode-toggle-container">
          <Toggle className="toggle-icon" setIsDarkMode={setIsDarkMode} />
        </div>
      </div>
    </div>
  )
}

export default Header;