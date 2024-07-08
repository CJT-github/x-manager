import { METHOD, request } from "@/utils/request.ts";

//获取笔记列表
export const getNoteList = (params?: Object) => {
  return request("/note/noteList", METHOD.GET, params);
};

//保存笔记
export const saveNote = (params?: Object) => {
  return request("/note/saveNote", METHOD.POST, params);
};

//查看笔记详情
export const noteDetail = (params?: Object) => {
  return request("/note/noteDetail", METHOD.GET, params);
};

//修改笔记内容
export const updateNote = (params?: Object) => {
  return request("/note/updateNote", METHOD.POST, params);
};

//修改状态
export const updateStatus = (params?: Object) => {
  return request("/note/updateStatus", METHOD.POST, params);
};

//删除笔记
export const deleteNote = (params?: Object) => {
  return request("/note/deleteNote", METHOD.POST, params);
};
