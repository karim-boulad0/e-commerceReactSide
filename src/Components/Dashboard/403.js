import { Link } from "react-router-dom";

export default function ForBiden(props) {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div>
        <h1 className="text-danger container" style={{ fontSize: "66px" }}>
          Status Code: 403
        </h1>
      </div>
      <div>
        <h2 className="text-danger container">
          You don't have permission to access
        </h2>
      </div>
      <div className="mt-3">
        <h1 className="btn btn-success">
          <Link className=" text-white" to={props.role}>
            Go to {props.page} Page
          </Link>
        </h1>
      </div>
    </div>
  );
}
