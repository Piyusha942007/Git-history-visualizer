import "../../styles/buttons.css";

export default function Button({ label, onClick }) {
  return (
    <button className="primary" onClick={onClick}>
      {label}
    </button>
  );
}