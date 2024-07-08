import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import Main from "@/view/main";
import Login from "@/view/login";
import Error from "@/view/error";
import { lazy } from "react";

const Statistic = lazy(() => import("@/view/statistics"));

const Editor = lazy(() => import("@/view/editor"));
const Note = lazy(() => import("@/view/editor/note"));
const EditorNote = lazy(() => import("@/view/editor/note/editorNote"));
const Template = lazy(() => import("@/view/editor/template"));

const Manager = lazy(() => import("@/view/manager"));
const Message = lazy(() => import("@/view/manager/message"));
const Spider = lazy(() => import("@/view/manager/message/spider"));

const Material = lazy(() => import("@/view/manager/material"));
const Collect = lazy(() => import("@/view/manager/collect"));

const Setting = lazy(() => import("@/view/setting"));
const Menus = lazy(() => import("@/view/setting/menus"));
const UserInfo = lazy(() => import("@/view/setting/userInfo"));
const Dictionary = lazy(() => import("@/view/setting/dictionary"));

//前端组件路由表
const routerComponents: { [key: string]: JSX.Element } = {
  //概览
  statistics: <Statistic />,
  //编辑
  editor: <Editor />,
  template: <Template />,
  note: <Note />,
  editorNote: <EditorNote />,
  //管理
  manager: <Manager />,
  spider: <Spider />,
  message: <Message />,
  material: <Material />,
  collect: <Collect />,

  //设置
  setting: <Setting />,
  menus: <Menus />,
  userInfo: <UserInfo />,
  dictionary: <Dictionary />,
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const routers: RouteObject[] = [
  {
    path: "/",
    id: "root",
    element: <Main />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    id: "login",
    element: <Login />,
  },
];

export { router, routerComponents, routers };
