import React from 'react'
import {
    Card,
    Col,
    Row,
    Button,
    Modal,
    Form,
    Input,
    DatePicker,
    Select,
  } from "antd";
  import { useState } from 'react';

const AddIncome = ({
    isIncomeModalVisible,
    handleIncomeCancel,
    onFinish,
  }) => {
    const [form] = Form.useForm();
    const [customTag, setCustomTag] = useState('');
  const [showCustomTagInput, setShowCustomTagInput] = useState(false);

  // Function to handle submission of custom tag
  const handleCustomTagSubmit = () => {
    if (customTag.trim() !== '') {
      // Add the custom tag to the Select options
      form.setFieldsValue({ tag: customTag });
      setShowCustomTagInput(false);
      setCustomTag('');
    }
  };

  return (
    <Modal
    style={{ fontWeight: 600 }}
    title="Add Income"
    visible={isIncomeModalVisible}
    onCancel={handleIncomeCancel}
    footer={null}
  >
    <Form
      form={form}
      layout="vertical"
      onFinish={(values) => {
        onFinish(values, "income");
        form.resetFields();
      }}
    >
      <Form.Item
        style={{ fontWeight: 600 }}
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input the name of the transaction!",
          },
        ]}
      >
        <Input type="text" className="custom-input" />
      </Form.Item>
      <Form.Item
        style={{ fontWeight: 600 }}
        label="Amount"
        name="amount"
        rules={[
          { required: true, message: "Please input the income amount!" },
        ]}
      >
        <Input type="number" className="custom-input" />
      </Form.Item>
      <Form.Item
        style={{ fontWeight: 600 }}
        label="Date"
        name="date"
        rules={[
          { required: true, message: "Please select the income date!" },
        ]}
      >
        <DatePicker format="YYYY-MM-DD" className="custom-input" />
      </Form.Item>
      <Form.Item
        style={{ fontWeight: 600 }}
        label="Tag"
        name="tag"
        rules={[{ required: true, message: "Please select a tag!" }]}
      >
        <Select className="select-input-2" onChange={(value) => {
              if (value === 'custom') {
                setShowCustomTagInput(true);
              } else {
                setShowCustomTagInput(false);
              }
            }}>
          <Select.Option value="salary">Salary</Select.Option>
          <Select.Option value="freelance">Freelance</Select.Option>
          <Select.Option value="investment">Investment</Select.Option>
          <Option value="custom">Custom Tag</Option>
          {/* Add more tags here */}
        </Select>
        {showCustomTagInput && (
            <Input
              className="custom-input"
              placeholder="Enter custom tag"
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              onBlur={handleCustomTagSubmit}
              onPressEnter={handleCustomTagSubmit}
            />
          )}
      </Form.Item>
      <Form.Item>
        <Button className="btn btn-blue" type="primary" htmlType="submit">
          Add Income
        </Button>
      </Form.Item>
    </Form>
  </Modal>
  )
}

export default AddIncome
