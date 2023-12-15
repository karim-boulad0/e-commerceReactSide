import "./Spinner.css";
export default function Spinner() {
  return (
    <div className="s-parent">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>

  );
}
