import { useEffect, useState } from "react";
import { useData } from "../../../provider/DataProvider";
import { Quote, ScrollToTop, SpinnerLoader, SubNavbar } from "../../components";
import { PaginationC } from "../../components/Pagination";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../provider/AuthProvider";

const CategoryContent = () => {
  const { state } = useLocation();

  const { GetQuotePagination } = useData();

  const [quote, setQuote] = useState([]);
  const [pageSize, setPageSize] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [categoryIdParam, setCategoryIdParam] = useState(state ? state.id : 0);

  console.log(categoryIdParam, "categoryIdParam");

  const getQuote = async (CategoryId, PageNumber, PageSize) => {
    //setIsLoading(true);
    if (categoryIdParam == 0) {
      setIsLoading(true);
      let response = await GetQuotePagination("", PageNumber, PageSize);
      setQuote(response.data);
      var myObj = JSON.parse(response.headers["x-pagination"]);
      console.log(myObj, "myObj");
      setPageNum(myObj.CurrentPage);
      setTotalPages(myObj.TotalPages);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      let response = await GetQuotePagination(CategoryId, PageNumber, PageSize);
      setQuote(response.data);
      var myObj = JSON.parse(response.headers["x-pagination"]);
      console.log(myObj, "myObj");
      setPageNum(myObj.CurrentPage);
      setTotalPages(myObj.TotalPages);
      setIsLoading(false);
    }
    // setPageNum(myObj.CurrentPage); // for fresh category page current page Num is always 1
    console.log(quote, "neelesh dfsaf");
  };

  const changePaginationHandler = (newPage) => {
    console.log("CHANGED");
    getQuote(categoryIdParam, newPage, pageSize);
  };

  // const GetCurrentUser = async () => {
  //   var res = await getUserProfile();
  //   setCurrUser(res.id);
  // };

  useEffect(() => {
    getQuote(categoryIdParam, 1, pageSize);
  }, [categoryIdParam]);
  return (
    <>
      {/* <ScrollToTop /> */}
      <SubNavbar onParamChange={setCategoryIdParam} paramId={categoryIdParam} />
      {/* <Quote quote={quote} /> */}
      {isLoading ? <SpinnerLoader /> : <Quote quote={quote} />}

      <PaginationC
        totalPages={totalPages}
        changePage={changePaginationHandler}
        pageNum={pageNum}
      />
    </>
  );
};

export default CategoryContent;
