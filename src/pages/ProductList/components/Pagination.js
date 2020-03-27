import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { Link } from 'react-router-dom';

const styles = {
  pagination: {
    justifyContent: 'flex-end',
    margin: '10px'
  }
};

const PaginationItem = ({ active, index }) => {
  return (
    <Link to={`?page=${index}`}>
      <Pagination.Item as="span" active={active}>
        {index}
      </Pagination.Item>
    </Link>
  );
};

const PaginationItems = ({ MAX_PAGE, currentPage }) => {
  const paginationItem = [];

  if (MAX_PAGE <= 5) {
    for (let i = 1; i <= MAX_PAGE; i++) {
      paginationItem.push(
        <PaginationItem
          key={`page=${i}`}
          index={i}
          active={i === currentPage}
        />
      );
    }
  } else {
    const threePagesToEnd = MAX_PAGE - 3;
    if (currentPage < 4) {
      for (let i = 1; i < 4; i++) {
        paginationItem.push(
          <PaginationItem
            key={`page=${i}`}
            index={i}
            active={i === currentPage}
          />
        );
      }
      paginationItem.push(<Pagination.Ellipsis key="ellipsis-1" disabled />);
      paginationItem.push(
        <PaginationItem key={`page=${MAX_PAGE}`} index={MAX_PAGE} />
      );
    } else if (currentPage > threePagesToEnd) {
      paginationItem.push(<PaginationItem key={`page=${1}`} index={1} />);
      paginationItem.push(<Pagination.Ellipsis key="ellipsis-1" disabled />);
      for (let i = threePagesToEnd + 1; i <= MAX_PAGE; i++) {
        paginationItem.push(
          <PaginationItem
            key={`page=${i}`}
            active={i === currentPage}
            index={i}
          />
        );
      }
    } else {
      paginationItem.push(<PaginationItem key={`page=${1}`} index={1} />);
      paginationItem.push(<Pagination.Ellipsis key="ellipsis-1" disabled />);
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        paginationItem.push(
          <PaginationItem
            key={`page=${i}`}
            active={i === currentPage}
            index={i}
          />
        );
      }
      paginationItem.push(<Pagination.Ellipsis key="ellipsis-2" disabled />);
      paginationItem.push(
        <PaginationItem key={`page=${MAX_PAGE}`} index={MAX_PAGE} />
      );
    }
  }

  return paginationItem;
};

export default ({ productLength = 0, currentPage = 1 }) => {
  const MAX_ITEM_PER_PAGE = 20;

  const nextPageNumber = currentPage + 1;
  const previousPageNumber = currentPage - 1;
  const MAX_PAGE = Math.ceil(productLength / MAX_ITEM_PER_PAGE);

  // Todo: Fix pagination Link not working
  return (
    <Pagination style={styles.pagination}>
      <Link
        to={{
          pathname: '/',
          search: `?page=${previousPageNumber}`
        }}
      >
        <Pagination.Prev disabled={currentPage === 1} as="span" />
      </Link>
      <PaginationItems MAX_PAGE={MAX_PAGE} currentPage={currentPage} />
      <Link
        to={{
          pathname: '/',
          search: `?page=${nextPageNumber}`
        }}
      >
        <Pagination.Next disabled={currentPage === MAX_PAGE} as="span" />
      </Link>
    </Pagination>
  );
};
