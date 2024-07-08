import { Layout, Avatar } from "antd";
import SliderLayout from "./sider";
import HeaderLayout from "./header";
import { memo } from "react";

const Layouts = memo(() => {
  return (
    <Layout>
      <HeaderLayout />
      <SliderLayout />
    </Layout>
  );
});

export default Layouts;
