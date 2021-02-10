// Light Mode Icons
import { ReactComponent as PrevEnabledIcon } from '../../../assets/icons/prev-enabled-icon.svg';
import { ReactComponent as PrevDisabledIcon } from '../../../assets/icons/prev-disabled-icon.svg';
import { ReactComponent as NextEnabledIcon } from '../../../assets/icons/next-enabled-icon.svg';
import { ReactComponent as NextDisabledIcon } from '../../../assets/icons/next-disabled-icon.svg';
// Dark Mode Icons
import { ReactComponent as DarkPrevEnabledIcon } from '../../../assets/icons/dark-prev-enabled-icon.svg';
import { ReactComponent as DarkPrevDisabledIcon } from '../../../assets/icons/dark-prev-disabled-icon.svg';
import { ReactComponent as DarkNextEnabledIcon } from '../../../assets/icons/dark-next-enabled-icon.svg';
import { ReactComponent as DarkNextDisabledIcon } from '../../../assets/icons/dark-next-disabled-icon.svg';

const Paginator = ({ 
  paginator,
  isDarkMode,
  setLoading, 
  setSkipNextPageQuery,
  setSkipPrevPageQuery
}) => {
  
  const onPrev = _ => {
    setSkipPrevPageQuery(false);
    setLoading(true);
  }

  const onNext = _ => {
    setSkipNextPageQuery(false);
    setLoading(true);
  }

  return (
    <div id="paginator" className="w-screen mx-auto flex items-center justify-between">
      <div className="paginator-container flex md:w-4/5 mx-auto items-center justify-between">
        <div className={paginator.hasPreviousPage ? "link-container cursor-pointer flex flex-row items-center select-none" : "link-container disabled flex flex-row items-center select-none"}>
          {paginator.hasPreviousPage ? (
            <>
              {isDarkMode ? <DarkPrevEnabledIcon /> : <PrevEnabledIcon />}
              <span className="link-text ml-1 text-lightAccent dark:text-darkAccent" onClick={onPrev}>Previous</span>
            </>
          ) : ( 
            <>
              {isDarkMode ? <DarkPrevDisabledIcon /> : <PrevDisabledIcon />}
              <span className="link-text ml-1 text-lightGray dark:text-darkGray">Previous</span>
            </>
          )}
        </div>
        <div className={paginator.hasNextPage ? "link-container cursor-pointer flex flex-row items-center select-none" : "link-container disabled flex flex-row items-center select-none"}>
          {paginator.hasNextPage ? (
            <>
              <span className="link-text mr-1 text-lightAccent dark:text-darkAccent" onClick={onNext}>Next</span>
              {isDarkMode ? <DarkNextEnabledIcon /> : <NextEnabledIcon />}
            </>
          ) : ( 
            <>
              <span className="link-text mr-1 text-lightGray dark:text-darkGray">Next</span>
              {isDarkMode ? <DarkNextDisabledIcon /> : <NextDisabledIcon />}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Paginator;