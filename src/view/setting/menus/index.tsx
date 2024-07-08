import { Button, Space, Table, TableProps, Tag } from "antd";
import { getMenusList } from "@/api/menus";
import { useEffect, useState } from "react";
import ModalList from "./comps/modalList";
import { DataType } from "./config/index.config";
import { ArrowLeftOutlined } from "@ant-design/icons";

function Menus() {
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState(1);
  const [type, setType] = useState<string | null>(null);
  const [pid, setPid] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [records, setRecords] = useState({});

  //编辑
  const handleEdit = (record: Object) => {
    setRecords(record);
    setVisible(true);
  };

  //返回上级
  const preFn = () => {
    setType("pre");
    setLevel(() => level - 1);
  };
  //查看子模块
  const searchChild = (record: any) => {
    setPid(record.id);
    setType(null);
    setLevel(() => level + 1);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "菜单名称",
      dataIndex: "name",
      key: "name",
      width: "100px",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "菜单路径",
      dataIndex: "routerPath",
      key: "routerPath",
      width: "150px",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "密钥",
      dataIndex: "menuKey",
      key: "menuKey",
      width: "100px",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "图标",
      dataIndex: "icon",
      key: "icon",
      width: "50px",
      render: (text) => (
        <span
          className="iconfont"
          dangerouslySetInnerHTML={{ __html: text }}
        ></span>
      ),
    },
    {
      title: "排序",
      dataIndex: "sort",
      key: "sort",
      width: "100px",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      width: "50px",
      render: (text) => (
        <span>
          {text === 1 ? (
            <Tag color="#2db7f5">启用</Tag>
          ) : (
            <Tag color="#cd201f">关闭</Tag>
          )}
        </span>
      ),
    },
    {
      title: "描述",
      dataIndex: "description",
      key: "description",
      width: "150px",
      render: (text) => <span>{text || "--"}</span>,
    },
    {
      title: "操作",
      key: "action",
      width: "120px",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => searchChild(record)}>查看子模块</a>
          <a onClick={() => handleEdit(record)}>编辑</a>
          <a>删除</a>
        </Space>
      ),
    },
  ];

  async function getMenusListFn() {
    setLoading(true);
    const res = await getMenusList({ role: 3, level, pid, handle: type });
    if (res && Object.keys(res).length) {
      setDataSource(res.data.data);
      setPid(res.data.pid);
      setType(null);
    }
    setLoading(false);
  }

  useEffect(() => {
    getMenusListFn();
  }, [level]);
  return (
    <>
      <div className="flex items-center justify-between mb-[20px]">
        <span className="font-bold text-[16px]">
          {level > 1 && (
            <Button
              icon={<ArrowLeftOutlined />}
              className="mr-[10px]"
              onClick={preFn}
            >
              上级路由
            </Button>
          )}
          <span>Level{level} 菜单路由</span>
        </span>
        <div>
          <Button onClick={() => handleEdit({ level, pid })}>
            新增菜单路由
          </Button>
        </div>
      </div>
      <div className="">
        <Table
          columns={columns}
          pagination={false}
          dataSource={dataSource}
          loading={loading}
          rowKey="id"
        ></Table>
      </div>
      <ModalList
        records={records}
        visible={visible}
        handleVisible={setVisible}
        callback={getMenusListFn}
      />
    </>
  );
}

export default Menus;
