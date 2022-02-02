import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import { useEffect, useState } from "react";
import Home from "./Page/Home/Home";
import axios from "axios";
import CoinDetails from "./Page/CoinDetails/CoinDetails";
function App() {
  const [loading, setLoading] = useState(true);
  const [allCurr, setAllCurr] = useState([]);

  useEffect(() => {
    const fetchAllcurr = () => {
      var options = {
        method: "GET",
        url: "https://coinranking1.p.rapidapi.com/reference-currencies",
        params: { limit: "50", offset: "0" },
        headers: {
          "x-rapidapi-host": "coinranking1.p.rapidapi.com",
          "x-rapidapi-key":
            "8f3db16d2amsh09a51c7d890956fp1abbb2jsndea6444c567e",
        },
      };
      axios
        .request(options)
        .then(({ data }) => {
          const arr = data.data.currencies.slice(0, 14);
          setAllCurr(arr);
          setLoading(false);
        })
        .catch((err) => console.log("somethng went wrong" + err.message));
    };
    fetchAllcurr();
  }, []);
  return (
    <div className="App">
      {!loading && <Navbar allCurr={allCurr} />}
      <Routes>
        <Route path={"/"} exact element={<Home />} />
        <Route path={"coindetails/:coinId"} exact element={<CoinDetails />} />
      </Routes>
    </div>
  );
}

export default App;
