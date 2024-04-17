import { PaginationC } from "../Pagination";
import Quote from "../Quote/Quote";
import { SubNavbar } from "../SubNavbar";

const Motivational = () => {
  return (
    <>
      <div style={{ marginTop: "55px" }}>
        <SubNavbar />
        <Quote />
        <PaginationC />
      </div>
    </>
  );
};

export default Motivational;
