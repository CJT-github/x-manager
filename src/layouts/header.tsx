import { Layout, Avatar, Dropdown, MenuProps, message } from "antd";
import { logout } from "@/api/login";
import cache from "@/utils/cache";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

function HeaderLayout() {
  message.config({
    maxCount: 1,
  });
  const navigator = useNavigate();
  const items: MenuProps["items"] = [
    {
      label: "基本信息",
      key: "0",
    },
    {
      label: "账户设置",
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: "退出登录",
      key: "3",
      onClick: async () => {
        //退出登录成功需要重置所有状态
        message.loading("正在退出系统...");
        const refreshToken = cache.getCache("refreshToken");
        const res = await logout({ refresh_token: refreshToken });
        if (res && Object.keys(res).length) {
          cache.clear();
          navigator("/login");
          message.success("退出成功");
        }
      },
    },
  ];
  return (
    <Header className="bg-white border-b border-slate-200 flex justify-between items-center">
      <Avatar size="large" src={"/public/logo.png"} />
      <div className="flex gap-x-8">
        <div
          className="iconfont cursor-pointer w-[28px] h-[28px] leading-[28px] text-center hover:bg-[rgba(0,0,0,0.1)] rounded"
          style={{ fontSize: "22px" }}
        >
          &#xe66f;
        </div>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <div
            className="iconfont cursor-pointer w-[28px] h-[28px] leading-[28px] text-center hover:bg-[rgba(0,0,0,0.1)] rounded"
            style={{ fontSize: "22px" }}
          >
            &#xe828;
          </div>
        </Dropdown>
      </div>
    </Header>
  );
}

export default HeaderLayout;
