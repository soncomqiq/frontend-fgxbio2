import React, { useEffect, useState } from "react";
import { Divider, Modal, Table } from "antd";
import axios from "../../../config/axios";
import PersonItem from "./PersonItem";

function PersonList() {
  const [personList, setPersonList] = useState([]);
  const [pageInfo, setPageInfo] = useState({ curPage: 1, pageSize: 10 });
  const [totalItem, setTotalItem] = useState(0);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
    setPageInfo({ curPage: pagination.current, pageSize: pagination.pageSize });
  };

  const fetchPerson = () => {
    const { curPage, pageSize } = pageInfo;
    axios.get(`/persons?page=${curPage - 1}&size=${pageSize}`).then((res) => {
      const personWithId = res.data._embedded.persons.map(e => ({ ...e, id: e._links.self.href.split("/").slice(-1)[0] }));
      setPersonList(personWithId);
      setTotalItem(res.data.page.totalElements);
    });
  };

  useEffect(() => {
    fetchPerson();
  }, [pageInfo]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      align: "center",
      sorter: (a, b) => a.id > b.id,
    },
    {
      title: "Firstname",
      dataIndex: "firstname",
      align: "center",
      sorter: (a, b) => a.name > b.name,
    },
    {
      title: "Surname",
      dataIndex: "surname",
      align: "center",
      sorter: (a, b) => a.surname > b.surname,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      align: "center",
      sorter: (a, b) => a.gender > b.gender,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      align: "center",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Race",
      dataIndex: "race",
      key: "race",
      align: "center",
      sorter: (a, b) => a.race > b.race,
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      align: "center",
      sorter: (a, b) => a.race > b.race,
    },
    {
      title: "Province",
      dataIndex: "province",
      key: "province",
      align: "center",
      sorter: (a, b) => a.province > b.province,
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text, person) => (
        <PersonItem fetchPerson={fetchPerson} person={person} />
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={personList}
        onChange={onChange}
        pagination={{
          current: pageInfo.curPage,
          pageSize: pageInfo.pageSize,
          total: totalItem,
        }}
      />
    </div>
  );
}

export default PersonList;
