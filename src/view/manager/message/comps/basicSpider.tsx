import { Button, Form, Input, Popover, Select, message } from "antd";
import { memo, useRef, useState } from "react";
import { starSpider } from "@/api/message";
import { useForm } from "antd/es/form/Form";

const BasicSpider = memo(
  (props: { callBack: Function; recallReceive: Function }) => {
    const [open, setOpen] = useState(false);

    const [form] = useForm();

    //表格数据
    const starSpiderFn = async () => {
      props.callBack(true);
      message.info("正在爬取数据，请您耐心等待");
      const res = await starSpider(form.getFieldsValue());
      if (res.data && Object.keys(res.data).length) {
        message.success("数据获取结束");
        props.recallReceive();
      }
      props.callBack(false);
    };

    const spiderFn = () => {
      handleOpenChange(false);
      starSpiderFn();
    };

    const handleOpenChange = (newOpen: boolean) => {
      setOpen(newOpen);
    };

    const content = (
      <div className="w-[500px]">
        <Form
          labelAlign="right"
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 22 }}
          form={form}
        >
          <Form.Item label="条件" name="query">
            <Input
              style={{ width: "100%" }}
              placeholder="请输入查询条件"
              maxLength={200}
            ></Input>
          </Form.Item>
        </Form>
        <div className="text-right">
          <Button className="mr-[10px]" onClick={() => setOpen(false)}>
            取消
          </Button>
          <Button type="primary" onClick={spiderFn}>
            启动
          </Button>
        </div>
      </div>
    );

    return (
      <Popover
        content={content}
        title="爬虫配置"
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
        placement="bottomRight"
      >
        <Button type="primary">开启爬虫</Button>
      </Popover>
    );
  }
);

export default BasicSpider;
