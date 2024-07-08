import { spiderList, starSpider } from "@/api/message";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Spin,
  Switch,
  Table,
  TableProps,
  message,
} from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicSpider from "../comps/basicSpider";

interface DataType {
  id: number;
  name: string;
  area: string;
  salary: string;
  link: string;
  company: string;
  desc: string;
}

function Message() {
  const navigate = useNavigate();

  const [source, setSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fullLoading, setFullLoading] = useState(false);

  const [form] = useForm();

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "职位",
      dataIndex: "name",
      key: "name",
      width: "100px",
      ellipsis: true,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "区域",
      dataIndex: "area",
      ellipsis: true,
      key: "area",
      width: "100px",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "薪资范围",
      dataIndex: "salary",
      key: "salary",
      ellipsis: true,
      width: "50px",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "详情链接",
      dataIndex: "link",
      key: "link",
      width: "40px",
      render: (text) => (
        <a href={text} target="_blank" className="iconfont">
          &#xe6cc;
        </a>
      ),
    },
    {
      title: "公司名称",
      dataIndex: "company",
      key: "company",
      width: "100px",
      render: (text, record) => <span>{text}</span>,
    },
    {
      title: "描述",
      dataIndex: "desc",
      key: "desc",
      width: "100px",
      ellipsis: true,
      render: (text) => <span>{text || "--"}</span>,
    },
    {
      title: "操作",
      key: "action",
      width: "60px",
      render: (_, record) => (
        <Space size="middle">
          <a>详情</a>
          <a>收藏</a>
          <a>记录</a>
        </Space>
      ),
    },
  ];

  const tips = (
    <div>
      <h3 className="my-[20px]">正在爬取数据，请您耐心等待......</h3>
      <h4>
        请勿离开当前页面，或者刷新页面；程序会打开网页爬取数据，若遇到验证，请完成验证程序
      </h4>
    </div>
  );

  //表格数据
  const spiderListFn = async () => {
    setLoading(true);
    const res = await spiderList();
    if (res.data && Object.keys(res.data).length) {
      setSource(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    spiderListFn();
  }, []);

  return (
    <div>
      <Spin spinning={fullLoading} delay={500} tip={tips}>
        <div className="flex justify-between items-center mb-[20px]">
          <span className="font-bold text-[16px]">Boss直聘</span>
          <div className="">
            <Button className="mr-[10px]">数据分析</Button>
            <BasicSpider
              callBack={(bl: boolean) => setFullLoading(bl)}
              recallReceive={spiderListFn}
            />
          </div>
        </div>
        <div>
          <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 8 }}>
            <Row gutter={[12, 12]}>
              <Col span={3}>
                <Form.Item label="职位">
                  <Input
                    style={{ width: "130px" }}
                    placeholder="请输入职位名称"
                    maxLength={20}
                  ></Input>
                </Form.Item>
              </Col>
              <Col span={3}>
                <Form.Item label="城市">
                  <Input
                    style={{ width: "130px" }}
                    placeholder="请输入城市名称"
                    maxLength={20}
                  ></Input>
                </Form.Item>
              </Col>
              <Col span={3}>
                <Form.Item label="公司">
                  <Input
                    style={{ width: "130px" }}
                    placeholder="公司名称"
                    maxLength={20}
                  ></Input>
                </Form.Item>
              </Col>
              <Col span={3}>
                <Form.Item label="">
                  <Button>查询</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        <div>
          <Table
            columns={columns}
            dataSource={source}
            loading={loading}
            rowKey="id"
            scroll={{ y: 520 }}
          ></Table>
        </div>
      </Spin>
    </div>
  );
}

export default Message;
