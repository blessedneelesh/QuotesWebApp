import Pagination from "react-bootstrap/Pagination";
import "./PaginationC.css";
import { useEffect, useState } from "react";

const PaginationC = ({ totalPages, pageNum, changePage }) => {
  const maxLimit = totalPages;
  console.log(pageNum, "PAGE NUM FROM Pagination");
  const [curr, set_Curr] = useState(1);

  const pageChangeFunction = (p) => {
    console.log(p, "Current click page");
    if (p >= 1 && p <= maxLimit) {
      set_Curr(p);
      changePage(p);
    }
  };

  const showPageItemsFunction = () => {
    const data = [];
    const numPage = 5;
    if (maxLimit <= numPage) {
      for (let i = 1; i <= maxLimit; i++) {
        data.push(
          <Pagination.Item
            className="bg-dark "
            key={i}
            active={i === curr}
            onClick={() => pageChangeFunction(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
    } else {
      const leftside = curr - numPage / 2 > 1;
      const rightside = curr + numPage / 2 < maxLimit;
      data.push(
        <Pagination.First key="first" onClick={() => pageChangeFunction(1)} />
      );
      data.push(
        <Pagination.Prev
          key="prev"
          onClick={() => pageChangeFunction(curr - 1)}
        />
      );
      if (leftside) {
        data.push(<Pagination.Ellipsis key="leftEllipsis" />);
      }
      const str = Math.max(1, Math.round(curr - numPage / 2));
      const end = Math.min(maxLimit, Math.round(curr + numPage / 2));
      for (let i = str; i <= end; i++) {
        data.push(
          <Pagination.Item
            key={i}
            active={i === curr}
            onClick={() => pageChangeFunction(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
      if (rightside) {
        data.push(<Pagination.Ellipsis key="rightEllipsis" />);
      }
      data.push(
        <Pagination.Next
          key="next"
          onClick={() => pageChangeFunction(curr + 1)}
        />
      );
      data.push(
        <Pagination.Last
          key="last"
          onClick={() => pageChangeFunction(maxLimit)}
        />
      );
    }
    return data;
  };

  useEffect(() => {
    //pagination not rendered when props value is changed but re renders when state is changed
    set_Curr(pageNum);
  }, [pageNum]);
  return (
    <>
      <div className="paginationContainer">
        <Pagination size="sm" className="pagination ">
          {showPageItemsFunction()}
        </Pagination>
      </div>
    </>
  );
};

export default PaginationC;
