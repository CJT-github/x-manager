import ReactDOM from "react-dom/client";
import "./index.css";
import zhCN from "antd/locale/zh_CN";
import "dayjs/locale/zh-cn";
import { ConfigProvider, theme } from "antd";
import "@/assets/font/iconfont.css";
import { loadInterceptors } from "@/utils/request";
import { interceptors } from "@/utils/axios.interceptor";
import App from "./App";
import { Provider } from "react-redux";
import { setupStore, store } from "./store/store";
import { Suspense } from "react";
import Loading from "./components/Loading";
import { BrowserRouter } from "react-router-dom";

loadInterceptors(interceptors);

setupStore();
ReactDOM.createRoot(document.getElementById("root")!).render(
  //theme={{ algorithm: theme.darkAlgorithm }}
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Suspense>
    </Provider>
  </ConfigProvider>
);
