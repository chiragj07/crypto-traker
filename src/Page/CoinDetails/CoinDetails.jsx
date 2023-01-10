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
   const [error, setError] = useState(false)
   const [coinHistory, setCoinHistory] = useState([]);
   useEffect(()=>{
       const fetchDetails= async() =>{
           setLoading(true)
           try{
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
      console.log(history)
      setCoinHistory(history);
      setLoading(false)
      
    }
    catch(err){
      console.log(err)
      setError(true)
      setLoading(false)
    }

    }
    fetchDetails()
   },[coinId,timePeriod,currency])
   const handleClick = (e)=>{
     e.preventDefault();
     setTimePeriod(e.target.value)
   }
  

  return (
      <>
        {
          loading ? (<div className='error-container'> <div className="spinner"></div></div>) :
        
         !error && coinHistory.length > 0 ? (
          <>
                <div className='coin-details-container'>
             <h2>
                 {details.name}
             </h2>
              
                <img src={details.iconUrl} alt={details.name} width="200px" height="200px" />
                <div className="sub-detail">
                <h4> Current Price : </h4> <span>{currency?currency.sign:"$"} {details.price}</span>
                </div >
                <div className={`change-${details?.change?.startsWith('-')?'neg':'pos'}`} >
                        {details.change && `${details.change} %`}
                </div> 
                <div>

                </div>
                        <div className='chart-coin'>                         
                         <ChartComponent coinHistory={coinHistory} />  
                         </div>
                         <div style={{color:"goldenrod"}}>
                          Last {timePeriod} 
                         </div>
 
                         </div>
                         <div className='select-time' onClick={handleClick}>
                         <button value="3h" >3 Hours</button>
                         <button value="24h"   >24 Hours</button>
                         <button value="7d" >7 days</button>
                         <button value="30d" >30 days</button>
                         <button value="3m" >3 months</button>
                         <button value="1y" >1 year</button>
                         <button value="3y" >3 years</button>
                         <button value="5y" >5 years</button>
                     
                     </div> 
                     </> 
                     
                         ) : (<div className='error-container'>Sorry, No data Found</div>)
   }   
           
      </>
  ) 
};

export default CoinDetails;
