import React, { useEffect, useState } from "react";
import { Button, Divider, Input, Modal, Space, Table } from "antd";
import axios from "../../../config/axios";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

function PersonList() {
  const [personList, setPersonList] = useState([]);
  const [pageInfo, setPageInfo] = useState({ curPage: 0, pageSize: 10 });
  const [totalItem, setTotalItem] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
    setPageInfo({ curPage: pagination.current, pageSize: pagination.pageSize });
  };

  useEffect(() => {
    const { curPage, pageSize } = pageInfo;
    axios.get(`/persons?page=${curPage - 1}&size=${pageSize}`).then((res) => {
      setPersonList(res.data._embedded.persons);
      setTotalItem(res.data.page.totalElements);
    });
  }, [pageInfo]);

  const columns = [
    {
      title: "Sample ID",
      dataIndex: "id.sampleId",
      key: "id.sampleId",
      align: "center",
      ...getColumnSearchProps("id", "sampleId"),
      sorter: (a, b) => a.id.sampleId > b.id.sampleId,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Sample Year",
      dataIndex: "id.sampleYear",
      key: "id.sampleYear",
      align: "center",
      sorter: (a, b) => a.id.sampleYear > b.id.sampleYear,
      ...getColumnSearchProps("id", "sampleYear"),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      align: "center",
      sorter: (a, b) => a.age - b.age,
      ...getColumnSearchProps("age"),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      align: "center",
      sorter: (a, b) => a.gender > b.gender,
      ...getColumnSearchProps("gender"),
    },
    {
      title: "Province",
      dataIndex: "province",
      key: "province",
      align: "center",
      sorter: (a, b) => a.province > b.province,
      ...getColumnSearchProps("province"),
    },
    {
      title: "Name",
      dataIndex: "name",
      align: "center",
      sorter: (a, b) => a.name > b.name,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Surname",
      dataIndex: "surname",
      align: "center",
      sorter: (a, b) => a.surname > b.surname,
      ...getColumnSearchProps("surname"),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <span>
          <a href={"/user/view/" + record.id.sampleYear + "/" + record.id.sampleId}>View</a>
          <Divider type="vertical" />
          <a onClick={() => this.ModalEdit(record)}>Edit</a>
          <Divider type="vertical" />
          <a onClick={() => this.showModal(record.id.sampleId)}>Delete</a>
          <Modal
            title="Modal"
            visible={this.state.visible[record.id.sampleId]}
            onOk={() => this.handleOk(record.id.sampleId, record.id.sampleYear)}
            onCancel={() => this.handleCancel(record.id.sampleId)}
            okText="Delete"
            cancelText="Cancel"
          >
            <p>
              Are you sure to delete the whole data of Sample ID : {record.id.sampleId} / Sample Year :{" "}
              {record.id.sampleYear}
            </p>
          </Modal>
        </span>
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
