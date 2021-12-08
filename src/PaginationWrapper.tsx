import React, {useCallback} from 'react';
import Pagination from 'react-bootstrap/Pagination';

import calcLinksToDisplay from './calcLinksToDisplay';
import PaginationItemWrapper from './PaginationItemWrapper';

const ELLIPSIS_MARK = -1;

export interface OnChangeEventType {
  target: {
    name: string;
    value: number;
  };
}

export interface PropsType extends React.ComponentPropsWithRef<Pagination> {
  aroundCurrent?: number;
  atBeginEnd?: number;
  disabled?: boolean;
  firstPageValue?: number;
  name?: string;
  onChange?: (e: OnChangeEventType) => unknown;
  readOnly?: boolean;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  totalPages?: number;
  value: number;
}

export const defaultProps = {
  atBeginEnd: 2,
  aroundCurrent: 1,
  firstPageValue: 0,
  name: 'page',
  showFirstLast: true,
  showPrevNext: true,
};

const PaginationWrapper = ({
  atBeginEnd = defaultProps.atBeginEnd,
  aroundCurrent = defaultProps.aroundCurrent,
  disabled,
  firstPageValue = defaultProps.firstPageValue,
  name = defaultProps.name,
  onChange,
  readOnly,
  showFirstLast = defaultProps.showFirstLast,
  showPrevNext = defaultProps.showPrevNext,
  totalPages,
  value,
  ...etc
}: PropsType) => {

  const zeroBasedValue = value - firstPageValue;
  const handleClickF = useCallback((page: number) => {
    if (!onChange) {
      console.warn(`onChange() method is not set for PaginationWrapper ("${name}"), but page change occurs`);
      return;
    }
    const toReport: number = page + firstPageValue;
    return onChange({target: {name, value: toReport}});
  }, [firstPageValue, name, onChange]);

  const handleFirst = useCallback(() => handleClickF(0), [handleClickF]);
  const handlePrev = useCallback(() => handleClickF(zeroBasedValue - 1), [handleClickF, zeroBasedValue]);
  const handlePage = useCallback((page: number) => handleClickF(page), [handleClickF]);
  const handleNext = useCallback(() => handleClickF(zeroBasedValue + 1), [handleClickF, zeroBasedValue]);
  const handleLast = useCallback(() => totalPages !== undefined ? handleClickF(totalPages - 1) : undefined, [handleClickF, totalPages]);

  const linksToDisplay: number[] = calcLinksToDisplay(
    totalPages, zeroBasedValue, atBeginEnd, aroundCurrent, ELLIPSIS_MARK);

  const allDisabled = disabled || readOnly;

  return <Pagination {...etc}>
    { showFirstLast && (zeroBasedValue <= 0 || allDisabled
      ? <Pagination.First disabled key="-2" />
      : <Pagination.First key="-2" onClick={handleFirst} />
    )}
    { showPrevNext && (zeroBasedValue <= 0 || allDisabled
      ? <Pagination.Prev disabled key="-1" />
      : <Pagination.Prev key="-1" onClick={handlePrev} />
    ) }
    { linksToDisplay.map((p: number, index: number) =>
      p === zeroBasedValue
        ? <Pagination.Item active key={p}>{p + 1}</Pagination.Item>
        : p === ELLIPSIS_MARK
          ? <Pagination.Ellipsis disabled key={`_${index}`} />
          : allDisabled
            ? <Pagination.Item disabled key={p}>{p + 1}</Pagination.Item>
            : <PaginationItemWrapper key={p} onClick={handlePage} page={p} />
    ) }
    { showPrevNext && (totalPages !== undefined && zeroBasedValue >= totalPages - 1 || allDisabled
      ? <Pagination.Next disabled key="+1" />
      : <Pagination.Next key="+1" onClick={handleNext} />
    ) }
    { totalPages !== undefined && showFirstLast && (zeroBasedValue >= totalPages - 1 || allDisabled
      ? <Pagination.Last disabled key="+2" />
      : <Pagination.Last key="+2" onClick={handleLast} />
    )}
  </Pagination>;
};

export default React.memo(PaginationWrapper);
