import wallpaper from "../../../wallpaper.jpg";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Home.css";
import { Footer, NavigationBar } from "../../UI";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { useData } from "../../../provider/DataProvider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SpinnerLoader } from "../Spinner";
import InputGroup from "react-bootstrap/InputGroup";
import search from "../../../searchIcon.png";
const Home = () => {
  const { GetCategories } = useData();
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [sTerm, setSTerm] = useState("");
  const navigate = useNavigate();

  const getCategories = async () => {
    setIsLoading(true);
    let lst = await GetCategories();
    console.log(lst, "NEEEEEEEELE");

    setCategory(lst);
    setIsLoading(false);
    console.log(lst, "neelesh");
  };

  const handleChange = (e) => {
    console.log(e.target.value, "ENTERED");
    setSTerm(e.target.value);
  };

  const handleClick = () => {
    navigate("/searchResult", { state: sTerm });
    //stateChanger(sTerm);
  };

  useEffect(() => {
    getCategories();
  }, []);
  const yo = [
    {
      quote_id: 33,
      quote_content:
        "It's much easier on the emotions when one sees life as an experiment rather than a struggle for popularity.",
      author: "D Luffy - One Piece",
      category_id: 33,
    },
    {
      quote_id: 36,
      quote_content:
        "It takes sunshine and rain to make a rainbow. There would be no rainbows without sunshine and rain.",
      author: "Roy T. Bennett, The Light in the Heart",
      category_id: 36,
    },
    {
      quote_id: 37,
      quote_content:
        "When many voices are speaking at once, listen to the one most quiet and gentle. That's the one worth listening to.",
      author: "Miranda Linda Weisz",
      category_id: 37,
    },
    {
      quote_id: 38,
      quote_content:
        "Being with you and not being with you is the only way I have to measure time.",
      author: "Jorge Luis Borges",
      category_id: 38,
    },
  ];
  return (
    <>
      <NavigationBar />
      <div
        style={{
          backgroundImage: `url(${wallpaper})`,
          height: "250px",
        }}
      >
        <div className="centerForm">
          <Form className="d-flex" style={{ marginTop: "100px" }}>
            <InputGroup>
              <Form.Control
                type="search"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon2"
                size="sm"
                className="shadow-none"
                value={sTerm}
                onChange={(e) => handleChange(e)}
              />
              <InputGroup.Text size="sm" id="basic-addon2">
                <img
                  src={search}
                  alt="searchIcon"
                  id="search"
                  onClick={() => handleClick()}
                />
              </InputGroup.Text>
            </InputGroup>
          </Form>
        </div>
      </div>
      <div className="homeContainer">
        <div className="first">
          <h5>Popular Categories</h5>
          <div>
            {isLoading ? (
              <SpinnerLoader />
            ) : (
              category.map((e) => {
                return (
                  <>
                    <Link to="/category" state={{ id: e.category_id }}>
                      {e.category_name}
                    </Link>
                    <br></br>
                  </>
                );
              })
            )}
          </div>
        </div>
        <div className="second">
          {yo.map((e) => {
            return (
              <div className="col-lg-9 col-md-9 col-xs-12 cardContent">
                <Card className="m-2 card">
                  {/* <Card.Header>Quote</Card.Header> */}
                  <Card.Body>
                    <div className="row">
                      <div className="col-11">
                        <blockquote className="blockquote mb-0">
                          <p> {e.quote_content} </p>
                          <footer className="blockquote-footer">
                            {e.author}
                            {/* <cite title="Source Title">Source Title</cite> */}
                          </footer>
                        </blockquote>
                      </div>
                      <div className="col-1"></div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
          <Button
            as={Link}
            to="/category"
            state={{ id: 0 }}
            style={{ color: "white", marginLeft: "10px" }}
            size="sm"
            //style={{ float: "center" }}
          >
            See More
            {/* <Link to="/category" state={{ id: 0 }} style={{ color: "white" }}>
              See More
            </Link> */}
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
