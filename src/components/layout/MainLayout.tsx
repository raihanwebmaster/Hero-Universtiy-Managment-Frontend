/** @format */
import { Button, Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";
const { Header, Content, Footer } = Layout;

const MainLayout = () => {
  const dispatch = useAppDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <Layout style={{ height: "100%" }}>
      <Sidebar/>
      <Layout>
        <Header style={{ padding: 0 , position: "sticky", top:"0", left: "0", zIndex: '1'}} >
          <Button onClick={handleLogout}>Logout</Button>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" , position: "sticky", bottom:"0",  zIndex: '1', background: "#c3c3c3" }}>
          HERO UNIVERSITY ©{new Date().getFullYear()} Created by HU
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
