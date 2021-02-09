import { ReactComponent as GithubIcon } from '../../../assets/icons/github-icon.svg';
import { ReactComponent as DarkModeIcon } from '../../../assets/icons/dark-mode-icon.svg';

const Header = () => {
  return (
    <div id="header" className="w-screen shadow-md">
      <div className="header-content mx-auto h-full flex justify-between items-center">
        <div className="logo-container flex items-center">
          <GithubIcon className="mr-3"/>
          <h1>Github Finder</h1>
        </div>
        <div className="dark-mode-toggle-container">
          <DarkModeIcon className=""/>
        </div>
      </div>
    </div>
  )
}

export default Header;