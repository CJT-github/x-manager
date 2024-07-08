import { Layout, theme } from "antd";
import { memo } from "react";
import { Outlet } from "react-router-dom";
const { Content } = Layout;

const ContentLayout = memo(() => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ padding: "24px", overflowY: "auto", maxHeight: "880px" }}>
      <Content
        style={{
          overflowY: "auto",
          padding: 24,
          margin: 0,
          minHeight: 820,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  );
});

export default ContentLayout;
