import Axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
// https://quotesbe20240410135555.azurewebsites.net/api/
// https://localhost:7196/api/
const API_URL = "https://localhost:7196/api/";
const DataContext = React.createContext();

export const useData = () => {
  return useContext(DataContext);
};

export default function DataProvider({ children }) {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem("token"));

  const GetQuotePagination = async (categoryId, PageNumber, PageSize) => {
    var url = API_URL + "Quote/GetQuotePagination?";
    if (PageNumber != null) {
      url = url + "PageNumber=" + PageNumber;
    }
    if (PageSize != null) {
      url = url + "&PageSize=" + PageSize;
    }
    if (categoryId != null) {
      url = url + "&categoryId=" + categoryId;
    }

    try {
      var response = await Axios.get(url);
      console.log(response, "customer from ");
      return response;
    } catch (e) {
      console.log(e);
    }
  };

  const GetCategories = async () => {
    try {
      var { data: response } = await Axios.get(API_URL + "Quote/Categories");
      console.log(response, "customer from ");
      return response;
    } catch (e) {
      console.log(e);
    }
  };

  const GetSearchPagination = async (searchTerm, PageNumber, PageSize) => {
    var url = API_URL + "Quote/SearchQuote?";
    if (PageNumber != null) {
      url = url + "PageNumber=" + PageNumber;
    }
    if (PageSize != null) {
      url = url + "&PageSize=" + PageSize;
    }
    if (searchTerm != null) {
      url = url + "&SearchTerm=" + searchTerm;
    }
    try {
      var response = await Axios.get(url);
      console.log(response, "customer from ");
      return response;
    } catch (e) {
      console.log(e);
    }
  };

  const saveToUserQuote = async (userId, quoteId) => {
    try {
      var response = await Axios.post(API_URL + "Quote/Favourite", {
        user_id: userId,
        quote_id: quoteId,
      });

      return response;
    } catch (e) {
      console.log(e);
    }
  };

  const GetFavouriteQuotePagination = async (
    userId,
    categoryId,
    PageNumber,
    PageSize
  ) => {
    var url = API_URL + "Quote/GetFavourite?";

    if (PageNumber != null) {
      url = url + "PageNumber=" + PageNumber;
    }
    if (PageSize != null) {
      url = url + "&PageSize=" + PageSize;
    }
    if (userId != null) {
      url = url + "&user_id=" + userId;
    }
    if (categoryId != null) {
      url = url + "&category_id=" + categoryId;
    }

    try {
      var response = await Axios.get(url);
      console.log(response, "customer from ");
      return response;
    } catch (e) {
      console.log(e);
    }
  };

  const deleteFromUserQuote = async (userId, quoteId) => {
    try {
      var response = await Axios.post(API_URL + "Quote/DeleteFavourite", {
        user_id: userId,
        quote_id: quoteId,
      });
      console.log(response, "response after delete ");
      return response;
    } catch (e) {
      console.log(e);
    }
  };

  const value = {
    GetQuotePagination,
    GetCategories,
    GetSearchPagination,
    saveToUserQuote,
    deleteFromUserQuote,
    GetFavouriteQuotePagination,
  };

  // Provide the authentication context to the children components
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
