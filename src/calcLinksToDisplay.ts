export default function calcLinksToDisplay (
    totalPages: number | undefined,
    currentPage: number,
    atBeginEnd: number,
    aroundCurrent: number,
    ellipsisMark: number
): number[] {

  const result: number[] = [];

  for (let page = 0;
    page < (totalPages === undefined ? atBeginEnd : Math.min(atBeginEnd, totalPages));
    page++) {
    if (!result.includes(page))
      result.push(page);
  }

  if (result.length !== 0) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const lastInLinks: number = result[result.length - 1]!;
    if (lastInLinks < Math.max(currentPage - aroundCurrent, 0) - 1)
      result.push(ellipsisMark);
  } else if (Math.max(currentPage - aroundCurrent, 0) > 0)
    result.push(ellipsisMark);

  for (let page = Math.max(currentPage - aroundCurrent, 0);
    page <= (totalPages === undefined ? currentPage + aroundCurrent : Math.min(currentPage + aroundCurrent, totalPages - 1));
    page++) {
    if (!result.includes(page))
      result.push(page);
  }

  if (totalPages !== undefined) {
    if (result.length !== 0) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const lastInLinks = result[result.length - 1]!;
      if (lastInLinks < Math.max(totalPages - atBeginEnd, 0) - 1
        && lastInLinks !== ellipsisMark) {
        result.push(ellipsisMark);
      }
    }

    if (totalPages !== undefined && totalPages !== Number.POSITIVE_INFINITY) {
      for (let page = Math.max(totalPages - atBeginEnd, 0);
        page <= totalPages - 1;
        page++) {
        if (!result.includes(page))
          result.push(page);
      }
    }
  }

  return result;
}
