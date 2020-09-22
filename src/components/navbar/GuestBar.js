import React, { useState } from "react";
import { Menu, Button } from "antd";
import {
  BarChartOutlined,
  FileSearchOutlined,
  GoogleOutlined,
  HomeOutlined,
  LineChartOutlined,
  LoginOutlined,
  RadarChartOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function GuestNavbar(props) {
  const pathName = props.location.pathname.split("/").slice(-1)[0];
  const defaultMenu = pathName ? pathName : "home";
  console.log(defaultMenu);
  const [currentMenu, setCurrentMenu] = useState(defaultMenu);

  return (
    <Menu
      onClick={({ key }) => setCurrentMenu(key)}
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
      <Menu.Item key="login" style={{ float: "right" }}>
        <Button type="dashed">
          <Link to="/login">
            <LoginOutlined />
            Login
          </Link>
        </Button>
      </Menu.Item>
    </Menu>
  );
}

export default withRouter(GuestNavbar);
