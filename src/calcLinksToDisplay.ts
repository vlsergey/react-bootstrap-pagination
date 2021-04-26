export default function calcLinksToDisplay(
    totalPages : number,
    currentPage : number,
    atBeginEnd : number,
    aroundCurrent : number,
    ellipsisMark : number
) : number[] {

  const result : number[] = [];

  for ( let page = 0;
    page < Math.min( atBeginEnd, totalPages );
    page++ ) {
    if ( !result.includes( page ) )
      result.push( page );
  }

  if ( result.length !== 0 ) {
    const lastInLinks : number = result[ result.length - 1 ];
    if ( lastInLinks < Math.max( currentPage - aroundCurrent, 0 ) - 1 )
      result.push( ellipsisMark );
  } else if ( Math.max( currentPage - aroundCurrent, 0 ) > 0 )
    result.push( ellipsisMark );

  for ( let page = Math.max( currentPage - aroundCurrent, 0 );
    page <= Math.min( currentPage + aroundCurrent, totalPages - 1 );
    page++ ) {
    if ( !result.includes( page ) )
      result.push( page );
  }

  if ( result.length !== 0 ) {
    const lastInLinks = result[ result.length - 1 ];
    if ( lastInLinks < Math.max( totalPages - atBeginEnd, 0 ) - 1
      && lastInLinks !== ellipsisMark ) {
      result.push( ellipsisMark );
    }
  }

  if ( totalPages !== Number.POSITIVE_INFINITY ) {
    for ( let page = Math.max( totalPages - atBeginEnd, 0 );
      page <= totalPages - 1;
      page++ ) {
      if ( !result.includes( page ) )
        result.push( page );
    }
  }

  return result;
}
