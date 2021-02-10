import { useContext } from 'react';
// Theme Context
import { ThemeContext } from '../../../context/themeContext';
// Icon
import { ReactComponent as DarkModeIcon } from '../../../assets/icons/dark-mode-icon.svg';

const Toggle = ({ setIsDarkMode }) => {
  const { theme, setTheme } = useContext(ThemeContext);

  const isDark = _ =>  {
    return theme === 'dark';
  }

  return (
    <>
      <label id="toggle">
        <input type="checkbox"
          type="checkbox"
          checked={isDark()}
          onChange={e => {
            setTheme(e.target.checked ? 'dark' : 'light');
            setIsDarkMode(true);
          }}
        />
        <span className="slider">
          <DarkModeIcon className={theme === 'dark' ? "dark-mode-icon isChecked" : "dark-mode-icon"}/>
        </span>
      </label>
    </>
  )
}

export default Toggle