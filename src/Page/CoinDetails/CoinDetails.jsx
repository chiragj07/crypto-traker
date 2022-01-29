import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './coindetails.css'
import ChartComponent from '../../Components/Chart/Chart';
const CoinDetails = () => {
   const {coinId} = useParams();
   const [details, setDetails]= useState([])
   const [timePeriod, setTimePeriod]= useState('24h')
   const [loading, setLoading] = useState(true);
   const currency = useSelector(state=>state.currency);
   const [coinHistory, setCoinHistory] = useState([]);
   useEffect(()=>{
       const fetchDetails= async() =>{
           setLoading(true)
           var options = {
            method: 'GET',
            url: `https://coinranking1.p.rapidapi.com/coin/${coinId}`,
            params: {referenceCurrencyUuid: !currency?"yhjMzLPhuIDl" :`${currency.uuid}`, timePeriod: `${timePeriod}`},
            headers: {
              'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
              'x-rapidapi-key': '8f3db16d2amsh09a51c7d890956fp1abbb2jsndea6444c567e'
            }
          };
      const {data:{data:{coin}}} = await axios.request(options);
      console.log(coin)
      setDetails(coin)
      var options1 = {
        method: 'GET',
        url: `https://coinranking1.p.rapidapi.com/coin/${coinId}/history`,
        params: {referenceCurrencyUuid: !currency?"yhjMzLPhuIDl" :`${currency.uuid}`, timePeriod: `${timePeriod}`},
        headers: {
          'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
          'x-rapidapi-key': '8f3db16d2amsh09a51c7d890956fp1abbb2jsndea6444c567e'
        }
      };
      const {data:{data:{history}}} = await axios.request(options1);
      setCoinHistory(history);
      setLoading(false)

    }
    fetchDetails()
   },[coinId,timePeriod,currency])
   const handleClick = (e)=>{
     e.preventDefault();
     setTimePeriod(e.target.value)
   }
  

  return (
      <>
      
        {!loading ? (
                <div className='coin-details-container'>
             <h2>
                 {details.name}
             </h2>
              
                <img src={details.iconUrl} alt={details.name} width="200px" height="200px" />
                <div className="sub-detail">
                <h4> Current Price : </h4> <span>{currency?currency.sign:"$"} {details.price}</span>
                </div >
                <div className={`change-${details.change.startsWith('-')?'neg':'pos'}`} >
                        {details.change} %
                </div> 
                        <div className='chart-coin'>                         
                         <ChartComponent coinHistory={coinHistory} />  
                         </div>
 
                         </div>
                         ) : (<div className='loading'>Loading.......</div>)
   }   
   <div className='select-time'>
    <button value="3h" onClick={handleClick}>3 Hours</button>
    <button value="24h" onClick={handleClick}  >24 Hours</button>
    <button value="7d" onClick={handleClick}>7 days</button>
    <button value="30d" onClick={handleClick}>30 days</button>
    <button value="3m" onClick={handleClick}>3 months</button>
    <button value="1y" onClick={handleClick}>1 year</button>
    <button value="3y" onClick={handleClick}>3 years</button>
    <button value="5y" onClick={handleClick}>5 years</button>

</div>  
        
      </>
  ) 
};

export default CoinDetails;
