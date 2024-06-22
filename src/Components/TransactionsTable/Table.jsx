import React from 'react'
import { Table } from 'antd';
import { useState } from 'react';
import { Select } from 'antd';
import {Radio} from "antd"
import { useRef } from 'react';
import searchImg from "../../assets/search.svg";
const {Option} = Select;
import "./Table.css"
import {parse, unparse} from "papaparse"
import { toast } from 'react-toastify';
// const fs = require('fs');
// const papa = require('papaparse');
// const file = fs.createReadStream('test.csv');


function TransactionsTable ({transactions, addTransaction, fetchTransactions, sortedTransactions, filteredTransactions, search, typeFilter, setTypeFilter, sortKey, setSortKey, setSearch})  {
    
    
   
    const fileInput = useRef();


    function exportCsv() 
    {
      var csv = unparse(transactions,{
        fields: ["name" , "type" , "tag" , "date" , "amount"],
        

      });
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    }

    function importFromCsv(event)
    {
      event.preventDefault();
      try 
      {
        parse(event.target.files[0], {
          header: true,
          complete: async function (results)
          {
            for (const transaction of results.data)
              {
                console.log("Transactions" , transaction);
                console.log(results)
                const newTransaction = 
                {
                  amount: parseFloat(transaction.amount),
                };
                await addTransaction(newTransaction, true)
              }
          },
        });
        toast.success("All transactions added");
         fetchTransactions();
        // event.target.files = null;

      }
      catch (e)
      {
        toast.error(e.message)
      }
    }
    
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name"

        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount"

        },
        {
            title: "Tag",
            dataIndex: "tag",
            key: "tag"

        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type"

        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date"

        },
    ];

    
  
    const dataSource = sortedTransactions.map((transaction, index) => ({
        key: index,
        ...transaction,
      }));

  return (
    <>
    <div
      style={{
        width: "90vw",
        padding: "0rem 2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "1rem",
          flexWrap: 'wrap',
        }}
      >
    <div className='input-flex' style={{ flex: '1' }}>
        <img src={searchImg} width="16" alt="" />
    <input value={search} onChange={(e)=>setSearch(e.target.value)}
    placeholder='Search by name'
    style={{
        width: '100%', // Full width on smaller screens
        padding: '8px 12px',
        borderRadius: '20px',
        border: 'none',
        outline: 'none',
        fontSize: '16px',
      }}
    />
    </div>
    
    <Select 
    className='select-input'
    onChange={(value) => setTypeFilter(value)}
    value={typeFilter}
    placeholder="Filter"
    allowClear
    >
    <Option value="">All</Option>
    <Option value="income">Income</Option>
    <Option value="expense">Expense</Option>
    </Select>
    </div>
    <div className="my-table">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: "1rem",
          }}
        >
          <h2>My Transactions</h2>
    <Radio.Group 
    className='input-radio'
    onChange={(e) => setSortKey(e.target.value)}
    value={sortKey}
    > <div>
        <Radio.Button value="">No Sort</Radio.Button>
        <Radio.Button value="date">Sort By Date</Radio.Button>
        <Radio.Button value="amount">Sort By Amount</Radio.Button>
        </div>

    </Radio.Group>
    <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              width: "400px",
            }}
          >
            <button className='btn' onClick={exportCsv}>Export to CSV</button>
            <label htmlFor="file-csv"  className='btn btn-blue'>Import from CSV</label>
            <input type="file"
           
           onChange={importFromCsv}
            id='file-csv'
            accept='.csv'
            required
            style={{display:"none"}}
            />
             </div>
             </div>

    


    <Table dataSource={dataSource} columns={columns} />
    </div>
    </div>
    </>
  )
}

export default TransactionsTable
