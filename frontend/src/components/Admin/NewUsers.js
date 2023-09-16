import React from "react";
import { Table } from "antd";

function NewUsers() {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Active Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Date Joined",
      dataIndex: "date",
      key: "date",
    },
  ];

  const data = [
    {
      key: "1",
      name: "Tom",
      status: "Inactive",
      date: "12/06/23",
    },
    {
      key: "2",
      name: "Lisa",
      status: "Pending",
      date: "12/06/23",
    },
    {
      key: "3",
      name: "Jack",
      status: "Inactive",
      date: "12/06/23",
    },
  ];

  return (
    <div>
      <Table pagination={false} columns={columns} dataSource={data}></Table>
    </div>
  );
}

export default NewUsers;
