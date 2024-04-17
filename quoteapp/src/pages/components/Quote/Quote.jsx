import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useData } from "../../../provider/DataProvider";
import { useNavigate } from "react-router-dom";
import { SpinnerLoader } from "../Spinner";
import { useAuth } from "../../../provider/AuthProvider";
import Toast from "react-bootstrap/Toast";
import "./Quote.css";
const Quote = ({ quote, searchTermhl }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { getUserProfile, token } = useAuth();
  const { saveToUserQuote } = useData();
  const [userProfile, setUserProfile] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastBg, setToastBg] = useState("");
  const navigate = useNavigate();

  function highlight(text, quote) {
    console.log(quote, "from hl");
    quote.map((e) => {
      //var inputText = document.getElementById(e.quote_id + "div");cardContent
      var inputText = document.getElementById(`div` + e.quote_id);
      console.log(inputText, "inputText");
      var innerHTML = inputText.innerHTML;
      var index = innerHTML.indexOf(text);
      if (index >= 0) {
        innerHTML =
          innerHTML.substring(0, index) +
          "<span class='highlight'>" +
          innerHTML.substring(index, index + text.length) +
          "</span>" +
          innerHTML.substring(index + text.length);
        inputText.innerHTML = innerHTML;
      }
    });
  }

  const getCurrentUser = async () => {
    var data = await getUserProfile();
    setUserProfile(data);
    console.log(data, "currentUser");
  };

  const addToFavourite = async (quoteId) => {
    if (!token) {
      navigate("/login");
    } else {
      //setIsLoading(true);

      var response = await saveToUserQuote(userProfile.id, quoteId);

      console.log(response);
      if (response == undefined) {
        setToastMsg("Already Added!");
        setToastBg("danger");
        setShowToast(true);
      } else {
        setToastMsg("Successfully Added!");
        setToastBg("success");
        setShowToast(true);

        // var element = document.getElementById("love" + quoteId);
        // console.log(element, "element");
        // element.style.color = "red";
      }

      //setIsLoading(false);
      // return false;
    }
  };

  useEffect(() => {
    getCurrentUser();
    highlight(searchTermhl, quote);
  }, []);

  return (
    <>
      {console.log(quote, "SErard")}
      {isLoading ? (
        <SpinnerLoader />
      ) : (
        <div className="quoteContainer ">
          <Toast
            className="message"
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={2000}
            autohide
            bg={toastBg}
          >
            <Toast.Body>{toastMsg}</Toast.Body>
          </Toast>

          {quote.map((e) => {
            return (
              <>
                <div
                  key={e.quote_id}
                  className="col-lg-4 col-md-6 col-xs-12 cardContent"
                >
                  <Card className="m-1 card">
                    <Card.Body>
                      <div className="row">
                        <div className="col-11">
                          <blockquote className="blockquote mb-0">
                            <p id={"div" + e.quote_id}> {e.quote_content} </p>
                            <footer
                              id={e.quote_id + "footer"}
                              className="blockquote-footer"
                            >
                              {e.author}
                              {/* <cite title="Source Title">Source Title</cite> */}
                            </footer>
                          </blockquote>
                        </div>
                        <div
                          className="col-1"
                          onClick={() => addToFavourite(e.quote_id)}
                        >
                          <p
                            id={"love" + e.quote_id}
                            style={{ fontSize: "30px" }}
                          >
                            &#9829;
                          </p>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Quote;
