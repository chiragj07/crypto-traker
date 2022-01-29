import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './cointable.css'
const CointTable = () => {
const [loading, setLoading] = useState(true);
const currency = useSelector(state=>state.currency); 
const [coins, setCoins] = useState([])


useEffect(()=>{
   const fetchCoins = async ()=>{
       setLoading(true)
    var options = {
        method: 'GET',
        url: 'https://coinranking1.p.rapidapi.com/coins',
        params: {
          referenceCurrencyUuid: currency?`${currency.uuid}`:"yhjMzLPhuIDl",
          timePeriod: '24h',
          tiers: '1',
          orderBy: 'marketCap',
          orderDirection: 'desc',
          limit: '50',
          offset: '0'
        },
        headers: {
          'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
          'x-rapidapi-key': '8f3db16d2amsh09a51c7d890956fp1abbb2jsndea6444c567e'
        }
      };
      const {data:{data:{coins}}} = await axios.request(options);
      console.log(coins);
      setCoins(coins);
      setLoading(false)
      
   }  

   fetchCoins()

},[currency])


  return (
      <div className='coin-table'>

       {!loading && (       <table>
           <thead>
               <tr>
               <th>Coin</th>
               <th>Price</th>
               <th>Change</th>
               <th>Market-Cap</th>
               </tr>
           </thead>
           <tbody>
               {
                   coins.map((coin)=> (
                       <Link key={coin.uuid} style={{textDecoration: "none"}} to = {`/coindetails/${coin.uuid}`}>
                       <tr  className='body-row'>
                           <td>
                                <div className='coin-name-image'>
                                    <img src={coin.iconUrl} alt={coin.name} height='50px' width='50px' />
                                    <span>{coin.name}</span>
                                </div>
                               </td> 
                               <td>
                                  {currency?currency.sign:"$"} {parseFloat(coin.price).toFixed(4)}
                               </td>
                               <td className={`change-${coin.change.startsWith('-')?'neg':'pos'}`}>
                                   {coin.change} %
                               </td>
                               <td>
                               {currency?currency.sign:"$"} {coin.marketCap}
                               </td>
                            
                       </tr>
                       </Link>
                   ))
               }
           </tbody>
       </table>
)}      </div>
  )
};

export default CointTable;
