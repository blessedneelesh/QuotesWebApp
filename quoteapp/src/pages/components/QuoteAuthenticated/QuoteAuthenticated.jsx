import "./QuoteAuthenticated.css";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useData } from "../../../provider/DataProvider";
import { useNavigate } from "react-router-dom";
import { SpinnerLoader } from "../Spinner";
import trash from "../../../trash.png";
import { useAuth } from "../../../provider/AuthProvider";
import Toast from "react-bootstrap/Toast";
const QuoteAuthenticated = ({
  quote,
  deleteFromFavourite,
  showToast,
  setShowToast,
}) => {
  return (
    <>
      <div className="quoteContainer">
        {quote.length == 0 ? (
          "You do not have favourite quotes."
        ) : (
          <>
            <Toast
              className="message"
              onClose={() => setShowToast(false)}
              show={showToast}
              delay={2000}
              autohide
              bg="danger"
            >
              <Toast.Body>Successfully Deleted!</Toast.Body>
            </Toast>
            {quote.map((e) => {
              return (
                <>
                  <div
                    id={e.quoteId}
                    key={e.quoteId}
                    className="col-lg-4 col-md-6 col-xs-12 cardContent"
                  >
                    <Card className="m-1 card">
                      <Card.Body>
                        <div className="row">
                          <div className="col-11">
                            <blockquote className="blockquote mb-0">
                              <p> {e.quoteContent} </p>
                              <footer className="blockquote-footer">
                                {e.author}
                                {/* <cite title="Source Title">Source Title</cite> */}
                              </footer>
                            </blockquote>
                          </div>
                          <div
                            className="col-1"
                            //style={{ backgroundColor: "red" }}
                            onClick={(f) => deleteFromFavourite(f, e.quoteId)}
                          >
                            <img
                              alt="ha"
                              src={trash}
                              style={{
                                height: "1rem",
                                width: "1rem",
                                justifyContent: "center",
                                alignContent: "center",
                              }}
                            />
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                </>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

export default QuoteAuthenticated;
