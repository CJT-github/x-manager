import { memo, useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Modal, Radio, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { cloneDeep } from "lodash";

const HandleCard = memo(
  (props: {
    visible: boolean;
    records: any;
    handleVisible: Function;
    callback: Function;
    save: Function;
    update: Function;
  }) => {
    const [form] = useForm();
    const [loading, setLoading] = useState(false);

    let originData = {
      id: null,
      name: "",
      value: "",
      type: null,
    };

    const handleOk = async () => {
      setLoading(true);
      let res, text;
      if (props.records?.id) {
        res = await props.update({
          id: props.records?.id,
          ...form.getFieldsValue(),
        });
        text = "更新成功";
      } else {
        res = await props.save({
          type: props.records.type,
          ...form.getFieldsValue(),
        });
        text = "添加成功";
      }
      if (res && Object.keys(res).length) {
        message.success(text);
        props.handleVisible(false);
      }
      setLoading(false);
    };

    const handleCancel = () => {
      props.handleVisible(false);
    };

    useEffect(() => {
      if (props.visible) {
        if (props.records?.id) {
          form.setFieldsValue(cloneDeep(props.records));
        } else {
          form.setFieldsValue(cloneDeep(originData));
        }
      }
    }, [props.visible]);

    return (
      <>
        <Modal
          title={props.records?.id ? "编辑字典" : "新增字典"}
          open={props.visible}
          onOk={handleOk}
          onCancel={handleCancel}
          afterClose={async () => await props.callback()}
          confirmLoading={loading}
        >
          <Form className="my-[20px]" form={form} labelCol={{ span: 2 }}>
            <Form.Item label="名称" name="name">
              <Input placeholder="请输入名称" maxLength={20} showCount />
            </Form.Item>
            <Form.Item label="值" name="value">
              <Input placeholder="请输入值" maxLength={20} showCount />
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
);

export default HandleCard;
