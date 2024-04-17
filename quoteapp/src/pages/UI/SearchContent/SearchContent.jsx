import { useEffect, useState } from "react";
import { Footer } from "../Footer";
import { NavigationBar } from "../Navbar";
import { useData } from "../../../provider/DataProvider";
import { Quote, ScrollToTop, SpinnerLoader } from "../../components";
import Container from "react-bootstrap/Container"; //here paramId for categories ID works fine
import Navbar from "react-bootstrap/Navbar";
import { useLocation } from "react-router-dom";
import { PaginationC } from "../../components/Pagination";
const SearchContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [quote, setQuote] = useState([]);
  const [pageSize, setPageSize] = useState(60);

  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const { GetSearchPagination } = useData();
  const [isLoading, setIsLoading] = useState(false);
  //   var query = window.location.search.substring(1);
  //   console.log(query, "query");
  //   setSearchTerm(query);

  const { state } = useLocation();
  console.log(state, "Location");

  const getSearchPagination = async (SearchTerm, PageNumber, PageSize) => {
    setIsLoading(true);
    let response = await GetSearchPagination(SearchTerm, PageNumber, PageSize);
    var myObj = JSON.parse(response.headers["x-pagination"]);
    console.log(myObj, "myObj");
    setQuote(response.data);
    setPageNum(myObj.CurrentPage);
    setTotalPages(myObj.TotalPages);
    setIsLoading(false);
  };

  const changePaginationHandler = (newPage) => {
    getSearchPagination(state, newPage, pageSize);
  };

  useEffect(() => {
    getSearchPagination(state, 1, pageSize);
  }, [state]);

  console.log(searchTerm, "SEARCH TERM");
  return (
    <>
      <ScrollToTop pageNum={pageNum} />
      <NavigationBar searchTerm={searchTerm} stateChanger={setSearchTerm} />
      <div className="subNavbar">
        <Navbar
          className="bg-body-secondary subNavbar"
          style={{
            top: "55px",
            width: "100%",
            position: "fixed",
            zIndex: "10",
          }}
        >
          <Container>
            <Navbar.Text>
              <b>Search Result</b>
            </Navbar.Text>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text></Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      {isLoading ? (
        <SpinnerLoader />
      ) : quote.length > 0 ? (
        <Quote quote={quote} searchTermhl={state} />
      ) : (
        <p style={{ marginTop: "55px", textAlign: "center" }}>
          No matches found!
        </p>
      )}

      <PaginationC
        totalPages={totalPages}
        changePage={changePaginationHandler}
        pageNum={pageNum}
      />
      <Footer />
    </>
  );
};

export default SearchContent;
