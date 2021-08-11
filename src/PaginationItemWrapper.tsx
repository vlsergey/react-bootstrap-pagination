import React, {useCallback} from 'react';
import Pagination from 'react-bootstrap/Pagination';

interface PropsType {
  onClick: (page: number) => unknown;
  page: number;
}

const PaginationItemWrapper = ({
  page,
  onClick,
}: PropsType) => {
  const handleClick = useCallback(() => onClick(page), [onClick, page]);

  return <Pagination.Item href="#" onClick={handleClick}>
    {page + 1}
  </Pagination.Item>;
};

export default React.memo(PaginationItemWrapper);
