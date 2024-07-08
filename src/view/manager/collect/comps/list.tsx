import {
  Button,
  Pagination,
  Space,
  Switch,
  Table,
  TableProps,
  Tag,
  message,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { deleteNote, getNoteList, updateStatus } from "@/api/note";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import HandleCard from "./handle";

function List() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const pageInfo = useRef({ page: 1, rows: 20 });
  const total = useRef(0);
  const navigator = useNavigate();

  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState({});

  //编辑
  const handleEdit = (record: any) => {
    navigator(`/editor/note/editorNote/${record.id}`);
  };

  //查看子模块
  const searchChild = (record: any) => {
    setRecord(record);
    setVisible(true);
  };

  interface DataType {
    id: number;
    title: string;
    viewPage: number;
    collectPage: number;
    likePage: number;
    status: number;
    createDate: string;
  }

  const statusChange = async (bl: boolean, text: any) => {
    setLoading(true);
    const res: any = await updateStatus({ id: text.id, status: Number(bl) });
    if (res && Object.keys(res).length) {
      message.success("修改成功");
      getNoteListFn(pageInfo.current);
    }
    setLoading(false);
  };

  const deleteFn = async (record: { id: number }) => {
    setLoading(true);
    const res: any = await deleteNote({ id: record.id });
    if (res && Object.keys(res).length) {
      message.success("删除成功");
      getNoteListFn();
    }
    setLoading(false);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
      width: "200px",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "浏览量",
      dataIndex: "viewPage",
      key: "viewPage",
      width: "100px",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "点赞量",
      dataIndex: "likePage",
      key: "likePage",
      width: "100px",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "收藏量",
      dataIndex: "collectPage",
      key: "collectPage",
      width: "100px",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      width: "50px",
      render: (text, record) => (
        <span>
          <Switch
            checkedChildren="公开"
            unCheckedChildren="私密"
            defaultChecked={text}
            onChange={(bl) => statusChange(bl, record)}
            size="small"
          />
        </span>
      ),
    },
    {
      title: "创建日期",
      dataIndex: "createTime",
      key: "createTime",
      width: "100px",
      render: (text) => (
        <span>{dayjs(text).format("YYYY-MM-DD hh:mm:ss") || "--"}</span>
      ),
    },
    {
      title: "操作",
      key: "action",
      width: "100px",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => searchChild(record)}>预览</a>
          <a onClick={() => handleEdit(record)}>编辑</a>
          <a onClick={() => deleteFn(record)}>删除</a>
        </Space>
      ),
    },
  ];

  async function getNoteListFn(params?: { page: number; rows: number }) {
    setLoading(true);
    const res: any = await getNoteList(params);
    if (res && Object.keys(res).length) {
      setDataSource(res.data.records);
      total.current = res.data.total;
    }
    setLoading(false);
  }

  const changeFn = (page: number, pageSize: number) => {
    pageInfo.current = { page, rows: pageSize };
    getNoteListFn(pageInfo.current);
  };

  useEffect(() => {
    getNoteListFn();
  }, []);
  return (
    <>
      <div className="flex items-center justify-between mb-[20px]">
        <span className="font-bold text-[16px]">
          <span>收藏列表</span>
        </span>
        <div>
          <Button onClick={() => handleEdit({ id: "_new" })}>新增专栏</Button>
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
      <div className="text-center my-[20px]">
        <Pagination
          defaultCurrent={1}
          total={total.current}
          onChange={changeFn}
        />
      </div>
      {/* <HandleCard
        visible={visible}
        records={currentRecord.current}
        handleVisible={setVisible}
        callback={getNoteListFn}
        save={createCategory}
        update={updateCategory}
      /> */}
    </>
  );
}

export default List;
