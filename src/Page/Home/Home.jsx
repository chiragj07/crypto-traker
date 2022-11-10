import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Banner from "../../Components/Banner/Banner";
import CointTable from "../../Components/CoinTable/CointTable";
import axios from "axios";
const Home = () => {
  const [loading, setLoading] = useState(true);
  const currency = useSelector((state) => state.currency);
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCoins, setFilteredCoins] = useState([]);
  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      var options = {
        method: "GET",
        url: "https://coinranking1.p.rapidapi.com/coins",
        params: {
          referenceCurrencyUuid: currency ? `${currency.uuid}` : "yhjMzLPhuIDl",
          timePeriod: "24h",
          tiers: "1",
          orderBy: "marketCap",
          orderDirection: "desc",
          limit: "50",
          offset: "0",
        },
        headers: {
          "x-rapidapi-host": "coinranking1.p.rapidapi.com",
          "x-rapidapi-key":
            "8f3db16d2amsh09a51c7d890956fp1abbb2jsndea6444c567e",
        },
      };
      const {
        data: {
          data: { coins },
        },
      } = await axios.request(options);
      setCoins(coins);
      setLoading(false);
    };

    fetchCoins();
  }, [currency]);

  useEffect(() => {
    setFilteredCoins(
      coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(search.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, coins]);
  return (
    <>
      {!loading && (
        <div>
          <Banner search={search} setSearch={setSearch} />
          <CointTable coins={filteredCoins} />
        </div>
      )}
    </>
  );
};

export default Home;
