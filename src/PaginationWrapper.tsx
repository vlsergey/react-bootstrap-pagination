import React, {useCallback} from 'react';
import Pagination from 'react-bootstrap/Pagination';

import calcLinksToDisplay from './calcLinksToDisplay';
import PaginationItemWrapper from './PaginationItemWrapper';

const ELLIPSIS_MARK = -1;

interface OnChangeEventType {
  target: {
    name: string;
    value: number;
  };
}

interface PropsType extends React.ComponentPropsWithRef<Pagination> {
  aroundCurrent?: number;
  atBeginEnd?: number;
  disabled?: boolean;
  name?: string;
  onChange?: (e: OnChangeEventType) => unknown;
  readOnly?: boolean;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  totalPages?: number;
  value: number;
}

const PaginationWrapper = ({
  atBeginEnd = 2,
  aroundCurrent = 1,
  disabled,
  name = 'page',
  onChange,
  readOnly,
  showFirstLast = true,
  showPrevNext = true,
  totalPages,
  value,
  ...etc
}: PropsType) => {

  const handleClickF = useCallback((page: number) => {
    if (!onChange) {
      console.warn('onChange() method is not set for PaginationWrapper ("'
          + name + '"), but page change occurs');
      return;
    }
    return onChange({target: {name, value: page}});
  }, [name, onChange]);

  const handleFirst = useCallback(() => handleClickF(0), [handleClickF]);
  const handlePrev = useCallback(() => handleClickF(value - 1), [handleClickF, value]);
  const handlePage = useCallback((page: number) => handleClickF(page), [handleClickF]);
  const handleNext = useCallback(() => handleClickF(value + 1), [handleClickF, value]);
  const handleLast = useCallback(() => totalPages !== undefined ? handleClickF(totalPages - 1) : undefined, [handleClickF, totalPages]);

  const linksToDisplay: number[] = calcLinksToDisplay(
    totalPages, value, atBeginEnd, aroundCurrent, ELLIPSIS_MARK);

  const allDisabled = disabled || readOnly;

  return <Pagination {...etc}>
    { showFirstLast && (value <= 0 || allDisabled
      ? <Pagination.First disabled key="-2" />
      : <Pagination.First key="-2" onClick={handleFirst} />
    )}
    { showPrevNext && (value <= 0 || allDisabled
      ? <Pagination.Prev disabled key="-1" />
      : <Pagination.Prev key="-1" onClick={handlePrev} />
    ) }
    { linksToDisplay.map((p: number, index: number) =>
      p === value
        ? <Pagination.Item active key={p}>{p + 1}</Pagination.Item>
        : p === ELLIPSIS_MARK
          ? <Pagination.Ellipsis disabled key={`_${index}`} />
          : allDisabled
            ? <Pagination.Item disabled key={p}>{p + 1}</Pagination.Item>
            : <PaginationItemWrapper key={p} onClick={handlePage} page={p} />
    ) }
    { showPrevNext && (totalPages !== undefined && value >= totalPages - 1 || allDisabled
      ? <Pagination.Next disabled key="+1" />
      : <Pagination.Next key="+1" onClick={handleNext} />
    ) }
    { totalPages !== undefined && showFirstLast && (value >= totalPages - 1 || allDisabled
      ? <Pagination.Last disabled key="+2" />
      : <Pagination.Last key="+2" onClick={handleLast} />
    )}
  </Pagination>;
};

export default React.memo(PaginationWrapper);
