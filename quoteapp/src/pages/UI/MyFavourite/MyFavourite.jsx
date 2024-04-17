import { useEffect, useState } from "react";
import { useData } from "../../../provider/DataProvider";
import {
  Quote,
  QuoteAuthenticated,
  SpinnerLoader,
  SubNavbar,
  SubNavbarAuthenticated,
} from "../../components";
import { Footer } from "../Footer";
import { NavigationBar } from "../Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../provider/AuthProvider";
import { PaginationC } from "../../components/Pagination";
const MyFavourite = () => {
  //const { state } = useLocation();
  //console.log(state, "this is value of CATEGORY");
  const { GetFavouriteQuotePagination, deleteFromUserQuote } = useData();
  const { getUserProfile, token } = useAuth();

  const [quote, setQuote] = useState([]);
  const [pageSize, setPageSize] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [categoryIdParam, setCategoryIdParam] = useState(0);

  const [userProfile, setUserProfile] = useState("");

  const [showToast, setShowToast] = useState(false);

  console.log(userProfile, "u", categoryIdParam);

  const navigate = useNavigate();

  const getFavouriteQuote = async (
    UserID,
    CategoryId,
    PageNumber,
    PageSize
  ) => {
    //setIsLoading(true);
    if (categoryIdParam == 0) {
      setIsLoading(true);
      let response = await GetFavouriteQuotePagination(
        UserID,
        " ",
        PageNumber,
        PageSize
      );
      setQuote(response.data);
      var myObj = JSON.parse(response.headers["x-pagination"]);
      console.log(myObj, "myObj");
      setPageNum(myObj.CurrentPage);
      setTotalPages(myObj.TotalPages);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      let response = await GetFavouriteQuotePagination(
        UserID,
        CategoryId,
        PageNumber,
        PageSize
      );
      setQuote(response.data);
      var myObj = JSON.parse(response.headers["x-pagination"]);
      console.log(myObj, "myObj");
      setPageNum(myObj.CurrentPage);
      setTotalPages(myObj.TotalPages);
      setIsLoading(false);
    }
    // setPageNum(myObj.CurrentPage); // for fresh category page current page Num is always 1
    console.log(quote, "neelesh dfsaf");
    // setIsLoading(false);
  };

  const changePaginationHandler = (newPage) => {
    console.log("CHANGED");
    getFavouriteQuote(userProfile, categoryIdParam, newPage, pageSize);
  };

  const getCurrentUser = async () => {
    setIsLoading(true);

    var data = await getUserProfile();
    setUserProfile(data.id);
    //console.log(data.id, "currentUser");
    data.id && getFavouriteQuote(data.id, categoryIdParam, 1, pageSize);
    setIsLoading(false);
  };

  const deleteFromFavourite = async (f, quoteId) => {
    if (!token) {
      navigate("/login");
    } else {
      //setIsLoading(true);

      var response = await deleteFromUserQuote(userProfile, quoteId);
      //getFavouriteQuote(userProfile, categoryIdParam, pageNum, pageSize);
      console.log(response);
      if (response.status == 204) {
        setShowToast(true);
        var element = document.getElementById(quoteId);
        element.style.display = "none";
        console.log(element, "hads");
      }
    }
  };

  useEffect(() => {
    getCurrentUser();
    //getFavouriteQuote(userProfile, categoryIdParam, 1, pageSize);
  }, [categoryIdParam]);
  return (
    <>
      <NavigationBar />
      <SubNavbarAuthenticated
        onParamChange={setCategoryIdParam}
        paramId={categoryIdParam}
      />
      {isLoading ? (
        <SpinnerLoader />
      ) : (
        <QuoteAuthenticated
          quote={quote}
          deleteFromFavourite={deleteFromFavourite}
          showToast={showToast}
          setShowToast={setShowToast}
        />
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

export default MyFavourite;
