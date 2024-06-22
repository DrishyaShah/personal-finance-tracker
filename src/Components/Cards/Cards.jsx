import React from 'react'
import "./Cards.css"
import {Card, Row} from "antd"
import Button from "../Button/Button";
const Cards = ({showExpenseModal, showIncomeModal, income, expenses, currentBalance, reset}) => {
  return (
    <div>
      <Row className='my-row'>
        <Card className="my-card"title="Current Balance">
            <p>{currentBalance}</p>
            <Button blue text="Reset Balance" onClick={reset} />
        </Card>
        <Card className="my-card"title="Total Income">
            <p>{income}</p>
            <Button blue text="Add Income" onClick={showIncomeModal}/>
        </Card>
        <Card className="my-card"title="Total Expense">
            <p>{expenses}</p>
            <Button blue text="Add Expense" onClick={showExpenseModal} />
        </Card>
      </Row>
    </div>
  )
}

export default Cards
