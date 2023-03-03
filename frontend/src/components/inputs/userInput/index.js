import "./style.css";

const UserInput = ({ type, label, value, onChange }) => {
  return (
    <div className="user-input">
      <div className="wrapper">
        <label className="label">{label}</label>
        <input type={type} value={value} onChange={onChange} />
      </div>
    </div>
  );
};

export default UserInput;
