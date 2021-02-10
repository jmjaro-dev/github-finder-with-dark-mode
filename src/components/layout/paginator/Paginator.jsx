// Light Mode Icons
import { ReactComponent as PrevEnabledIcon } from '../../../assets/icons/prev-enabled-icon.svg';
import { ReactComponent as PrevDisabledIcon } from '../../../assets/icons/prev-disabled-icon.svg';
import { ReactComponent as NextEnabledIcon } from '../../../assets/icons/next-enabled-icon.svg';
import { ReactComponent as NextDisabledIcon } from '../../../assets/icons/next-disabled-icon.svg';
// Light Mode Icons
// import { ReactComponent as DarkPrevEnabledIcon } from '../../../assets/icons/dark-prev-enabled-icon.svg';
// import { ReactComponent as DarkPrevDisabledIcon } from '../../../assets/icons/dark-prev-disabled-icon.svg';
// import { ReactComponent as DarkNextEnabledIcon } from '../../../assets/icons/dark-next-enabled-icon.svg';
// import { ReactComponent as DarkNextDisabledIcon } from '../../../assets/icons/dark-next-disabled-icon.svg';

const Paginator = ({ 
  paginator, 
  setSkipNextPageQuery,
  setSkipPrevPageQuery
}) => {

  const onPrev = _ => {
    setSkipPrevPageQuery(false);
  }

  const onNext = _ => {
    setSkipNextPageQuery(false);
  }

  return (
    <div id="paginator" className="flex w-full mx-auto items-center justify-between">
      <div className={paginator.hasPreviousPage ? "link-container cursor-pointer flex flex-row items-center select-none" : "link-container disabled flex flex-row items-center select-none"}>
        {paginator.hasPreviousPage ? (
          <>
            <PrevEnabledIcon />
            <span className="link-text ml-1" onClick={onPrev}>Previous</span>
          </>
        ) : ( 
          <>
            <PrevDisabledIcon />
            <span className="link-text ml-1">Previous</span>
          </>
        )}
      </div>
      <div className={paginator.hasNextPage ? "link-container cursor-pointer flex flex-row items-center select-none" : "link-container disabled flex flex-row items-center select-none"}>
        {paginator.hasNextPage ? (
          <>
            <span className="link-text mr-1" onClick={onNext}>Next</span>
            <NextEnabledIcon />
          </>
        ) : ( 
          <>
            <span className="link-text mr-1">Next</span>
            <NextDisabledIcon />
          </>
        )}
      </div>
    </div>
  )
}

export default Paginator;