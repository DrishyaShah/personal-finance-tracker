import React from "react";
import "../App.css"
import Header from "../Components/Header/Header";
import Cards from "../Components/Cards/Cards";
import { useState, useEffect } from "react";
import { Modal } from "antd";
import AddExpense from "../Components/Modals/AddExpense";
import AddIncome from "../Components/Modals/AddIncome";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../Firebase";
import { useNavigate } from "react-router-dom";
import moment from "moment"
import { toast } from "react-toastify";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import Charts from "../Components/Charts/Charts";
import TransactionsTable from "../Components/TransactionsTable/Table";
import NoTransactions from "../Components/Modals/NoTransactions";


const Dashboard = () => {
  const [user] = useAuthState(auth)

  // const sampleTransactions = [
  //   {
  //     name: "Pay day",
  //     type: "income",
  //     date: "2023-01-15",
  //     amount: 2000,
  //     tag: "salary",
  //   },
  //   {
  //     name: "Dinner",
  //     type: "expense",
  //     date: "2023-01-20",
  //     amount: 500,
  //     tag: "food",
  //   },
  //   {
  //     name: "Books",
  //     type: "expense",
  //     date: "2023-01-25",
  //     amount: 300,
  //     tag: "education",
  //   },
  //   ];



  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0)
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");

  const navigate = useNavigate();
  let filteredTransactions = transactions?.filter((item) => item?.name?.toLowerCase().includes(search?.toLowerCase()) && item?.type?.includes(typeFilter));
    let sortedTransactions =   [...filteredTransactions].sort((a,b)=> {
        if (sortKey==="date")
            {
                return new Date(a.date) - new Date(b.date)

            }
        else if(sortKey==="amount")
            {
                return a.amount - b.amount;

            }
        else 
        {
            return 0;
        }
    } );



  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };
  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name
    };
  
    setTransactions([...transactions, newTransaction]); // Update local state with the new transaction
    addTransaction(newTransaction); // Call addTransaction to add the transaction to the database
    setIsExpenseModalVisible(false);
    setIsIncomeModalVisible(false);
    calculateBalance(); // Recalculate balances
  };
  
    async function addTransaction(transaction, many) 
    {
      try 
      {
        const docRef = await addDoc(
          collection(db, `users/${user.uid}/transactions`),
          transaction
        );
        console.log("Document written with ID: ", docRef.id);
        if (!many) {
          toast.success("Transaction Added!");
        }
        let newArr = [...transactions];
        newArr.push(transaction);
        setTransactions(newArr)
      }
      catch (e) {
        console.error("Error adding document: ", e);
        if (!many) {
          toast.error("Couldn't add transaction");
        }
    }
  }
    async function fetchTransactions() {
      setLoading(true);
      if (user) {
        const q = query(collection(db, `users/${user.uid}/transactions`));
        const querySnapshot = await getDocs(q);
        let transactionsArray = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          transactionsArray.push(doc.data());
        });
        setTransactions(transactionsArray); 
        toast.success("Transactions Fetched!");
      }
      setLoading(false);
    }


    useEffect(() => 
      {
        //Get transactions
        fetchTransactions()
      }, [user])

      const calculateBalance = () => {
        let incomeTotal = 0;
        let expenseTotal = 0;
      
        transactions.forEach((transaction) => {
          if (transaction.type === "income") {
            incomeTotal += transaction.amount;
          } else {
            expenseTotal += transaction.amount;
          }
        });
      
        setIncome(incomeTotal);
        setExpenses(expenseTotal);
        setCurrentBalance(incomeTotal - expenseTotal);
      };
  useEffect(() => 
  {

    calculateBalance()
  }, [transactions])
  function reset() {
    setIncome(0)
    setCurrentBalance(0)
    setExpenses(0)
    setTransactions([])
    // fetchTransactions()
    console.log("resetting");
  }
  
  return (
    <div>
      <Header />
      { user ?
      <h1>Welcome, {user?.displayName}!</h1> :
      <></>
} 
      {loading ? <p>Loading...</p> : <>
      <Cards
      income={income}
      expenses={expenses}
      currentBalance={currentBalance}
      showExpenseModal={showExpenseModal}
      showIncomeModal={showIncomeModal}
      reset={reset}
       />
       <AddExpense
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
          />
          <AddIncome
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
          />
          {transactions.length === 0 ? <NoTransactions /> :
          (
            <Charts sortedTransactions={sortedTransactions}/>
          )
          }
        <TransactionsTable transactions={transactions} addTransaction={addTransaction} fetchTransactions={fetchTransactions} sortedTransactions={sortedTransactions} filteredTransactions={filteredTransactions} search={search} setSearch={setSearch} typeFilter={typeFilter} setTypeFilter={setTypeFilter} sortKey={sortKey} setSortKey={setSortKey} />
       </>}
    </div>
      

  )
}


export default Dashboard
