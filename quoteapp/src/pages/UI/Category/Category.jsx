import { useLocation } from "react-router-dom";
import { useData } from "../../../provider/DataProvider";
import { Quote, SubNavbar } from "../../components";
import { PaginationC } from "../../components/Pagination";
import { CategoryContent } from "../CategoryContent";
import { Footer } from "../Footer";
import { NavigationBar } from "../Navbar";
import { useState } from "react";

const Category = () => {
  // const { state } = useLocation();
  // console.log(state, "from categoryjsx");
  return (
    <>
      <NavigationBar />
      <CategoryContent />
      <Footer />
    </>
  );
};

export default Category;
