import React, { useState } from "react";
import { Menu } from "antd";
import {
  BarChartOutlined,
  BarcodeOutlined,
  BoxPlotOutlined,
  FileAddOutlined,
  FileSearchOutlined,
  FileTextOutlined,
  GoogleOutlined,
  HomeOutlined,
  LineChartOutlined,
  LogoutOutlined,
  RadarChartOutlined,
  SettingOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import LocalStorageService from "../../services/LocalStorageService";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default function UserNavbar() {
  const [currentMenu, setCurrentMenu] = useState("");

  const handleMenuClick = ({ key }) => {
    console.log(key);
    if (key === "logout") {
      LocalStorageService.removeToken();
    } else {
      setCurrentMenu(key);
    }
  };

  return (
    <Menu
      onClick={handleMenuClick}
      selectedKeys={[currentMenu]}
      mode="horizontal"
      theme="light"
      style={{ lineHeight: "64px" }}
    >
      <Menu.Item key="home">
        <Link to="/">
          <HomeOutlined />
          Home
        </Link>
      </Menu.Item>
      <Menu.Item key="search">
        <Link to="/search">
          <FileSearchOutlined />
          Search
        </Link>
      </Menu.Item>
      <SubMenu
        key="stats"
        title={
          <span>
            <RadarChartOutlined />
            Statistics
          </span>
        }
      >
        <MenuItemGroup title="Group By Locus">
          <Menu.Item key="graph">
            <Link to="/stats/graph">
              <BarChartOutlined />
              Graph
            </Link>
          </Menu.Item>
          <Menu.Item key="map">
            <Link to="/stats/map">
              <GoogleOutlined />
              Map
            </Link>
          </Menu.Item>
        </MenuItemGroup>
      </SubMenu>
      <SubMenu
        title={
          <span>
            <LineChartOutlined />
            Analysis
          </span>
        }
      >
        <MenuItemGroup title="Analysis">
          <Menu.Item key="kinship">
            <Link to="/analysis/kinship">
              <TeamOutlined />
              Kinchip Analysis
            </Link>
          </Menu.Item>
        </MenuItemGroup>
      </SubMenu>
      <SubMenu
        key="menu"
        style={{ float: "right" }}
        title={
          <span>
            <SettingOutlined />
            Lab User Menu
          </span>
        }
      >
        <MenuItemGroup title="Manange sample">
          <Menu.Item key="addperson">
            <Link to="/upload/person">
              <UsergroupAddOutlined />
              Add persons
            </Link>
          </Menu.Item>
          <Menu.Item key="listperson">
            <Link to="/manage/person">
              <TeamOutlined />
              Manage person
            </Link>
          </Menu.Item>
        </MenuItemGroup>
        <MenuItemGroup title="Manage STR data">
          <Menu.Item key="forenseq">
            <Link to="/upload/forenseq">
              <FileAddOutlined />
              Add ForenSeq
            </Link>
          </Menu.Item>
          <Menu.Item key="cedata">
            <Link to="/upload/cedata">
              <FileTextOutlined />
              Add CE data
            </Link>
          </Menu.Item>
        </MenuItemGroup>
        <MenuItemGroup title="Analysis">
          <Menu.Item key="isnp">
            <Link to="/isnpstat">
              <BoxPlotOutlined />
              iSNPs
            </Link>
          </Menu.Item>
          <Menu.Item key="alignment">
            <Link to="/seqalign">
              <BarcodeOutlined />
              Seq Alignment
            </Link>
          </Menu.Item>
        </MenuItemGroup>
        <Menu.Item key="logout">
          <LogoutOutlined />
          Logout
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
}
