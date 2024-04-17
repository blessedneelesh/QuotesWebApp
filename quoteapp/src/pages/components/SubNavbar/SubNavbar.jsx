import Container from "react-bootstrap/Container"; //here paramId for categories ID works fine
import Navbar from "react-bootstrap/Navbar"; // paramId for all is 0.
import Form from "react-bootstrap/Form"; //paramId for "search" displayed subNavbar accordingly.
import "./SubNavbar.css";

import { useEffect, useState } from "react";
import { useData } from "../../../provider/DataProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { SpinnerLoader } from "../Spinner";

const SubNavbar = ({ onParamChange, paramId }) => {
  const { GetCategories } = useData();
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [paramCatId, setParamCatId] = useState(paramId);

  console.log(category, "category");
  let navigate = useNavigate();

  // if (paramId < 0 && paramId > 12) {
  //   console.log("shit");
  // } else {
  //   navigate("/category/0");
  // }

  const getCategories = async () => {
    setIsLoading(true);
    let lst = await GetCategories();

    setCategory(lst);
    setIsLoading(false);
    console.log(lst, "neelesh");
    console.log(category, "category");
  };

  console.log(category, "category");

  const onchange = (e) => {
    console.log("hehe", e.target.value);
    //navigate("/category/" + e.target.value);
    navigate("/category", { state: { id: e.target.value } });
    onParamChange(e.target.value);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
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
              <b>
                <>
                  Home /{" "}
                  {category.length > 0 ? (
                    category[paramId].category_name
                  ) : (
                    <SpinnerLoader />
                  )}{" "}
                  Quotes
                </>
              </b>
            </Navbar.Text>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                {/* Signed in as: <a href="#login">Mark Otto</a> */}
                {isLoading ? (
                  <SpinnerLoader />
                ) : (
                  <>
                    <Form.Select
                      className="shadow-none bg-body-secondary subNavbarSelect"
                      size="sm"
                      onChange={(e) => onchange(e)}
                      value={paramId}
                    >
                      {category.length > 0
                        ? category.map((e) => {
                            return (
                              <option value={e.category_id}>
                                {e.category_name}
                              </option>
                            );
                          })
                        : "Loading"}
                    </Form.Select>
                  </>
                )}
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default SubNavbar;
