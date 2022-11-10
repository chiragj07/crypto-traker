import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./cointable.css";
const CointTable = ({ coins }) => {
  const [reqCoin, setReqCoin] = useState([]);
  const currency = useSelector((state) => state.currency);
  const totalPages = Math.ceil(coins.length / 5);
  const [sortBy, setSortBy] = useState("");
  let pageArray = [];
  for (var i = 0; i < totalPages; i++) {
    pageArray[i] = i + 1;
  }
  const [page, setPage] = useState(1);
  useEffect(() => {
    const lim = 5;
    setReqCoin(coins.slice((page - 1) * lim, (page - 1) * lim + lim));
  }, [page, coins, sortBy]);

  const handleClickInc = (attr) => {
    const compare = (a, b) => {
      if (parseFloat(a[attr]) < parseFloat(b[attr])) return -1;
      if (parseFloat(a[attr]) > parseFloat(b[attr])) return 1;
      return 0;
    };
    coins.sort(compare);
    setSortBy(attr);
  };
  const handleClickDec = (attr) => {
    const compare = (a, b) => {
      if (parseFloat(a[attr]) > parseFloat(b[attr])) return -1;
      if (parseFloat(a[attr]) < parseFloat(b[attr])) return 1;
      return 0;
    };
    coins.sort(compare);
    setSortBy("dec" + attr);
  };
  return (
    <div className="coin-table">
      <div className="sort-container">
        <span className="plain-item">Sort : </span>
        <ul>
          <li onClick={() => handleClickDec("price")}>Highest Price</li>
          <li onClick={() => handleClickInc("price")}>Lowest Price</li>
          <li onClick={() => handleClickDec("change")}>Profit</li>
          <li onClick={() => handleClickInc("change")}>Loss</li>
        </ul>
      </div>
      <table>
        <thead>
          <tr>
            <th>Coin</th>
            <th>Price</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {reqCoin.map((coin) => (
            <Link
              key={coin.uuid}
              style={{ textDecoration: "none" }}
              to={`/coindetails/${coin.uuid}`}
            >
              <tr className="body-row">
                <td>
                  <div className="coin-name-image">
                    <img src={coin.iconUrl} alt={coin.name} />
                    <span>{coin.name}</span>
                  </div>
                </td>
                <td>
                  {currency ? currency.sign : "$"}{" "}
                  {parseFloat(coin.price).toFixed(4)}
                </td>
                <td
                  className={`change-${
                    coin.change.startsWith("-") ? "neg" : "pos"
                  }`}
                >
                  {coin.change} %
                </td>
              </tr>
            </Link>
          ))}
        </tbody>
      </table>
      <div className="table-buttons">
        {page > 1 ? (
          <button onClick={() => setPage((page) => page - 1)}> Previos</button>
        ) : (
          <button className="deactivated-button">Previous</button>
        )}
        <span>
          <select
            name="page"
            id="page"
            value={page}
            onChange={(e) => {
              setPage((page) => parseInt(e.target.value));
            }}
          >
            {pageArray.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </span>
        {page < totalPages ? (
          <button onClick={() => setPage((page) => page + 1)}>Next</button>
        ) : (
          <button className="deactivated-button">Next</button>
        )}
      </div>
    </div>
  );
};

export default CointTable;
