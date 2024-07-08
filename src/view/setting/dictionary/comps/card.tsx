import { Button, Card, Empty, Modal } from "antd";
import { memo, useEffect, useRef, useState } from "react";
import HandleCard from "./handle";
import { createCategory, updateCategory } from "@/api/category";

interface propsType {
  title: string;
  requestFn: Function;
  params?: Object;
  type: number;
}

interface DataType {
  id: number;
  name: string;
  value: string;
  type: number;
}

const DictionaryCard = memo((props: propsType) => {
  const loading = useRef(false);
  const [source, setSource] = useState<Array<DataType>>([]);
  const [visible, setVisible] = useState(false);
  const currentRecord = useRef({});

  const getDataList = async () => {
    loading.current = true;
    const res = await props.requestFn(props.params);
    if (res.data && Object.keys(res.data).length) {
      setSource(res.data || []);
    }
    loading.current = false;
  };

  useEffect(() => {
    getDataList();
  }, []);

  //编辑与新增笔记分类

  const handleFn = (record: {
    id: number | null;
    name: string;
    value: string;
    type: number;
  }) => {
    currentRecord.current = record;
    setVisible(true);
  };

  return (
    <>
      <Card
        title={`${props.title}字典`}
        extra={
          <Button
            onClick={() =>
              handleFn({ id: null, name: "", value: "", type: props.type })
            }
          >
            新增{props.title}
          </Button>
        }
        style={{ width: "100%" }}
        loading={loading.current}
      >
        {source.length ? (
          <div>
            <div className="flex h-[45px] border-b border-slate-200 items-center bg-[#fafafa]">
              <div className="flex-1 px-[10px]">名称</div>
              <div className="flex-1 px-[10px]">值</div>
              <div className="w-[150px] px-[10px]">操作</div>
            </div>
            {source.map((item) => {
              return (
                <div
                  className="flex h-[45px] border-b border-slate-200 items-center"
                  key={item.id}
                >
                  <div className="flex-1 px-[10px]">{item.name}</div>
                  <div className="flex-1 px-[10px]">{item.value || "--"}</div>
                  <div className="w-[150px] px-[10px]">
                    <Button
                      className="iconfont mr-2"
                      size="small"
                      style={{ fontSize: "12px" }}
                      onClick={() => handleFn(item)}
                    >
                      &#xe672;
                    </Button>
                    <Button
                      className="iconfont"
                      size="small"
                      style={{ fontSize: "12px" }}
                    >
                      &#xe6e6;
                    </Button>
                  </div>
                </div>
              );
            })}
            <div></div>
          </div>
        ) : (
          <Empty />
        )}
      </Card>
      <HandleCard
        visible={visible}
        records={currentRecord.current}
        handleVisible={setVisible}
        callback={getDataList}
        save={createCategory}
        update={updateCategory}
      />
    </>
  );
});

export default DictionaryCard;
