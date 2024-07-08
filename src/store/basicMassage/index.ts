import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import cache from "@/utils/cache";

interface basicType {
  menus: any[];
  loading: boolean;
}

const initialState: basicType = {
  menus: [],
  loading: false,
};

export const basicMassage = createSlice({
  name: "basicMsg",
  initialState,
  reducers: {
    changeMenu: (state, { payload }) => {
      state.menus = payload;
      cache.setCache("menus", JSON.stringify(payload));
    },
    changeLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});
export const { changeMenu, changeLoading } = basicMassage.actions;

export const loading = (state: RootState) => state.basicMsg.loading;
export const menus = (state: RootState) => state.basicMsg.menus;

export default basicMassage.reducer;

// 这里统一加载缓存的一些数据
export const loadLocalLogin = createAsyncThunk(
  "login/loadLocalLogin",
  (_, { dispatch }) => {
    const menus = cache.getCache("menus");
    if (menus) {
      dispatch(changeMenu(JSON.parse(menus)));
    }
  }
);
