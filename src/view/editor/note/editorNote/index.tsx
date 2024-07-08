import { Button, GetProp, Input, Upload, UploadProps, message } from "antd";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Editor from "for-editor";
import { noteDetail, saveNote, updateNote } from "@/api/note";
import { Params, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "@/components/Loading";
import BasicSetting from "../comps/basicSetting";

interface formStateDto {
  id?: number;
  title: string;
  content: string;
  collect: string;
  category: string;
  tabs: string;
  headerImage: string;
  desc: string;
}

function EditorNote() {
  const [formState, setFormState] = useState({
    title: "",
    content: "",
    collect: "",
    category: "",
    tabs: "",
    headerImage: "",
    desc: "",
  });
  const [loading, setLoading] = useState({ saving: false, fulled: false });
  const roundNum = useRef(0);
  const navigator = useNavigate();

  //获取路由params
  const params: Readonly<Params<string>> = useParams();

  //获取富文本返回值
  const handleChange = (_value: string) => {
    setFormState({ ...formState, content: _value });
  };

  //获取笔记详情
  const noteDetailFn = async () => {
    setLoading({ ...loading, fulled: true });
    const res = await noteDetail({ id: params.id });
    if (res && Object.keys(res).length) {
      setFormState(res.data);
      roundNum.current = Math.random();
    }
    setLoading({ ...loading, fulled: false });
  };

  //提交请求
  const saveNoteFn = async (param: formStateDto) => {
    setLoading({ ...loading, saving: true });
    const res =
      params.id === "_new" ? await saveNote(param) : await updateNote(param);
    if (res && Object.keys(res).length) {
      message.success("发布成功");
      navigator("/editor/note");
    }
    setLoading({ ...loading, saving: false });
  };

  //提交方法
  const submit = (value: any) => {
    if (params.id !== "_new") {
      saveNoteFn({ ...formState, ...value, id: Number(params.id) });
      return;
    }
    saveNoteFn({ ...formState, ...value });
  };

  const useCallbackFn = useCallback(submit, []);
  const propsData = useMemo(() => {
    return {
      collect: formState.collect,
      category: formState.category,
      headerImage: formState.headerImage,
      tabs: formState.tabs,
      desc: formState.desc,
    };
  }, [roundNum.current]);

  useEffect(() => {
    if (params.id !== "_new") {
      noteDetailFn();
    }
  }, []);

  return (
    <>
      {loading.fulled ? (
        <Loading LoadingStyle={{ width: "100%", height: "820px" }} />
      ) : (
        <div>
          <div className="flex justify-between mb-[20px] items-center">
            <div className="font-bold">
              <Input
                className="text-[16px] p-[0]"
                bordered={false}
                placeholder="请输入标题......"
                defaultValue={formState.title}
                onChange={(e) =>
                  setFormState({ ...formState, title: e.target.value })
                }
                maxLength={50}
                style={{ width: "500px" }}
              />
            </div>
            <div>
              <BasicSetting detail={propsData} callback={submit} />
            </div>
          </div>
          <div>
            <Editor
              value={formState.content}
              onChange={(_value) => handleChange(_value)}
              subfield={true}
              height="720px"
              placeholder="请输入笔记内容"
              style={{ boxShadow: "0 0 0 0 rgba(0,0,0,0)" }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default EditorNote;
