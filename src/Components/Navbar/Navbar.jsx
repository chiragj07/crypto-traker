import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { changeCurrency } from "../../redux/action";
import { Link } from "react-router-dom";
import "./navbar.css";
const Navbar = ({ allCurr }) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const filtCurrency = allCurr.filter((curr) => curr.uuid === e.target.value);

    dispatch(changeCurrency(filtCurrency[0]));
  };
  return (
    <div className="nav-container">
      <Link to={"/"} style={{ textDecoration: "none", color: "goldenrod" }}>
        <h2>Crycpto Tracker</h2>
      </Link>
      <div className="select-currency">
        <select name="currency" id="currency" onChange={handleChange}>
          {allCurr.map((curr) => (
            <option key={curr.name} value={curr.uuid}>
              {curr.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Navbar;
