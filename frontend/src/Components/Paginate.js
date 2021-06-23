import React from "react";
import { Pagination } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Paginate = ({ totalPages, category, page, pageName }) => {
  const history = useHistory();

  const handlePageChange = (e, data) => {
    if (pageName === "AdminProducts") {
      history.push(`/dashboard/products/${data.activePage}`);
    } else {
      history.push(`/category/${category}/page/${data.activePage}`);
    }
  };

  return (
    <PaginateContainer>
      <Pagination
        style={{ marginBottom: "15px" }}
        activePage={page}
        boundaryRange={0}
        totalPages={totalPages}
        firstItem={null}
        lastItem={null}
        defaultActivePage={1}
        ellipsisItem={null}
        onPageChange={handlePageChange}
      />
    </PaginateContainer>
  );
};

const PaginateContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default Paginate;
