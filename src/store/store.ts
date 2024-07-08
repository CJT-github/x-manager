import { configureStore } from "@reduxjs/toolkit";
import basicMassage, { loadLocalLogin } from "./basicMassage";

export const store = configureStore({
  reducer: {
    basicMsg: basicMassage,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 统一在这里初始化一些缓存的数据
export function setupStore() {
  // 这里是缓存的菜单，程序加载会先调用这个
  store.dispatch(loadLocalLogin());
}
