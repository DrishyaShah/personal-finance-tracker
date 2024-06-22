import React from 'react'
import { Line, Pie } from "@ant-design/charts";
import "../../App.css"

const Charts = ({sortedTransactions}) => {
    const data = sortedTransactions.map((item) => 
    {
        return {date: item.date, amount: item.amount }
    });
    const config = 
    {
        data, 
        width: 700,
        height: 400,
        autoFit: false,
        xField: "date",
        yField: "amount",
        lineStyle: {
            stroke: '#5B8FF9',
            lineWidth: 4,
            
          },
          xAxis: {
            title: {
              text: 'Date',
              style: { fontSize: 14 },
            },
            label: {
              autoRotate: true,
              formatter: (val) => `${val.substring(0, 10)}`, // format date
            },
          },
          yAxis: {
            title: {
              text: 'Amount',
              style: { fontSize: 14 },
            },
            label: {
              formatter: (val) => `$${val}`, // add currency symbol
            },
          },
        
    };
    const spendingData = sortedTransactions.filter((transaction) => 
        { if(transaction.type == "expense")
    
        {
            return {tag: transaction.tag, amount: transaction.amount}

        }}
    );

    const spendingConfig = 
    {
        data: spendingData,
        angleField: "amount",
        colorField: "tag" ,
        width: 500,
        height: 400,
       
        
    };
   
    let pieChart;
    let chart;
  return (
    <div className='charts-wrapper'>
        <div className='line-chart'>
            <h2 style={{padding:"0px 24px"}}>Your Analytics</h2>
     <Line  {...config} onReady={(chartInstance) => (chart = chartInstance)}/> 
    </div>
    <div className='pie-chart'>
        <h2 style={{padding:"0px 24px"}}>Your Spendings</h2>
        {spendingData.length == 0 ? (
                    <p>Seems like you haven't spent anything till now...</p>
                  ) : (
                    <Pie {...spendingConfig}
                    onReady={(chartInstance) => (pieChart = chartInstance)}
                    > </Pie>
                  )}
       
    </div>
    </div>
  )
}

export default Charts
