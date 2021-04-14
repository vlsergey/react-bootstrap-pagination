import React, { PureComponent, ReactNode } from 'react';
import calcLinksToDisplay from './calcLinksToDisplay';
import Pagination from 'react-bootstrap/Pagination';

const ELLIPSIS_MARK = -1;

interface OnChangeEventType {
  target : {
    name : string;
    value : number;
  };
}

interface PropsType {
  aroundCurrent : number;
  atBeginEnd : number;
  disabled? : boolean;
  name : string;
  onChange? : ( e: OnChangeEventType ) => unknown;
  readOnly? : boolean;
  showFirstLast : boolean;
  showPrevNext : boolean;
  totalPages : number;
  value : number;
}

export default class PaginationWrapper extends PureComponent<PropsType> {

  static defaultProps = {
    atBeginEnd: 2,
    aroundCurrent: 1,
    name: 'page',
    showFirstLast: true,
    showPrevNext: true,
  }

  handleClickF( page : number ) {
    return () : unknown => {
      const { onChange, name } = this.props;
      if ( !onChange ) {
        console.warn( 'onChange() method is not set for PaginationWrapper ("'
          + name + '"), but page change occurs' );
        return;
      }
      return onChange( { target: { name, value: page } } );
    };
  }

  render() : ReactNode {
    /* eslint @typescript-eslint/no-unused-vars: [2, {"varsIgnorePattern": "(onChange|name)"}] */
    const { atBeginEnd, aroundCurrent, onChange, disabled, name, readOnly,
      showFirstLast, showPrevNext, totalPages, value, ...etc } = this.props;
    const linksToDisplay : number[] = calcLinksToDisplay(
      totalPages, value, atBeginEnd, aroundCurrent, ELLIPSIS_MARK );

    const allDisabled = disabled || readOnly;

    return <Pagination {...etc}>
      { showFirstLast && ( value <= 0 || allDisabled
        ? <Pagination.First disabled key="-2" />
        : <Pagination.First key="-2" onClick={this.handleClickF( 0 )} />
      )}
      { showPrevNext && ( value <= 0 || allDisabled
        ? <Pagination.Prev disabled key="-1" />
        : <Pagination.Prev key="-1" onClick={this.handleClickF( value - 1 )} />
      ) }
      { linksToDisplay.map( ( p : number, index : number ) =>
        p === value
          ? <Pagination.Item active key={p}>{p + 1}</Pagination.Item>
          : p === ELLIPSIS_MARK
            ? <Pagination.Ellipsis disabled key={`_${index}`} />
            : allDisabled
              ? <Pagination.Item disabled key={p}>{p + 1}</Pagination.Item>
              : <Pagination.Item href="#" key={p} onClick={this.handleClickF( p )}>
                {p + 1}
              </Pagination.Item>
      ) }
      { showPrevNext && ( value >= totalPages - 1 || allDisabled
        ? <Pagination.Next disabled key="+1" />
        : <Pagination.Next key="+1" onClick={this.handleClickF( value + 1 )} />
      ) }
      { showFirstLast && ( value >= totalPages - 1 || allDisabled
        ? <Pagination.Last disabled key="+2" />
        : <Pagination.Last key="+2" onClick={this.handleClickF( totalPages - 1 )} />
      )}
    </Pagination>;
  }

}
