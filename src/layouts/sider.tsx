import { memo, useEffect, useRef, useState } from "react";
import type { MenuProps } from "antd";
import { Layout, Menu, Skeleton, theme } from "antd";
import ContentLayout from "./content";
import { useDispatch } from "react-redux";
import { changeMenu, changeLoading } from "@/store/basicMassage";
import { getMenus } from "@/api/login";
import { handleMenus } from "@/utils";
import {
  useLocation,
  useMatch,
  useMatches,
  useNavigate,
} from "react-router-dom";
import { RootState } from "@/store/store";
import { useAppSelector } from "@/store/hook";

const { Sider } = Layout;

const customMenus = (menus: Array<any>) => {
  let result = menus.map((item) => {
    let { icon, label, key, children, blank } = item;
    if (blank === 0) return null;
    if (icon) {
      icon = (
        <i className="iconfont" dangerouslySetInnerHTML={{ __html: icon }}></i>
      );
    }
    if (children.length) {
      children = customMenus(children);
      if (children.length === 1 && !children[0]) {
        return { icon, label, key };
      }
      return { icon, label, key, children };
    }
    return { icon, label, key };
  });

  return result;
};
//获取当前路径，用作key
const getCurrentPath = (path: string) => {
  let pathArr = path.split("/");

  if (pathArr.length == 2) {
    return `/${pathArr[1]}`;
  }
  return `/${pathArr[1]}/${pathArr[2]}`;
};

const SliderLayout = memo(() => {
  const loading = useAppSelector((state: RootState) => state.basicMsg.loading);
  const [option, setOption] = useState<MenuProps["items"]>([]);
  const path = useLocation();
  const [current, setCurrent] = useState(getCurrentPath(path.pathname));
  const source = useRef([]);
  const [close, setClose] = useState(false);

  const navigator = useNavigate();
  const dispatch = useDispatch();

  const getMenuFn = async () => {
    dispatch(changeLoading(true));
    const res = await getMenus();
    if (res && Object.keys(res).length) {
      source.current = res.data;
      let result = handleMenus(res.data);
      let mapMenu = customMenus(result);
      setOption(mapMenu);
      dispatch(changeMenu(result));
      if (current === "/") {
        navigator("/statistics");
        setCurrent("/statistics");
      } else {
        navigator(current);
      }
    }
    dispatch(changeLoading(false));
  };

  const onClick: MenuProps["onClick"] = (e) => {
    navigator(e.key);
    setCurrent(e.key);
  };

  useEffect(() => {
    getMenuFn();
  }, []);
  // item.routerPath == path.pathname;
  useEffect(() => {
    if (source.current.length) {
      let data: any = source.current.filter(
        (item: any) => item.routerPath == path.pathname
      );
      setClose(data.closeMenu == 0);
      console.log(data, path);
    }
  }, [path]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      {close || (
        <Sider
          width={200}
          style={{ background: colorBgContainer }}
          className="p-[10px]"
        >
          {loading ? (
            <Skeleton />
          ) : (
            <Menu
              mode="inline"
              selectedKeys={[current]}
              style={{ height: "100%", borderRight: 0 }}
              items={option}
              onClick={onClick}
            />
          )}
        </Sider>
      )}

      <ContentLayout />
    </Layout>
  );
});

export default SliderLayout;
