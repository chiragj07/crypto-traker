import React from 'react';
import {Line} from 'react-chartjs-2'
import {Chart,LineElement,PointElement,CategoryScale,LinearScale} from 'chart.js'
import { useSelector } from 'react-redux';
Chart.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement
)
const ChartComponent = ({coinHistory}) => {
    const currency= useSelector(state=>state.currency);   
    
    const data = {
        labels: coinHistory.map((his) => {
            return new Date (his.timestamp).toLocaleDateString()
        }),
        datasets:[
            {
            data: coinHistory.map(coin=> coin.price),
            label:currency ? `price in ${currency.name}` : "price in USD",
            backgroundColor:'gold',
            borderColor:'gold',
            fill:false
            
        }
    ]
    }
    
  return (<>
  <Line data= {data} 
    options={ 
        
        {
            elements: {
                point :{
                    radius:1
                }
            }
        }
    }
  />
  </>);
};

export default ChartComponent;
