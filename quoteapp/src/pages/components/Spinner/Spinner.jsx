import Spinner from "react-bootstrap/Spinner";
import "./Spinner.css";
function SpinnerLoader() {
  return (
    <div className="loader">
      <Spinner animation="grow" />
    </div>
  );
}

export default SpinnerLoader;
