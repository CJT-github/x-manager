import { memo, useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Modal, Radio, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { cloneDeep } from "lodash";
import { updateMenus, saveMenus } from "@/api/menus";

const ModalList = memo(
  (props: {
    visible: boolean;
    records: any;
    handleVisible: Function;
    callback: Function;
  }) => {
    const [form] = useForm();
    const [loading, setLoading] = useState(false);

    let originData = {
      id: null,
      name: "",
      routerPath: "",
      menuKey: "",
      icon: "",
      sort: 0,
      status: 1,
      blank: 1,
      description: "",
    };

    const handleOk = async () => {
      setLoading(true);
      let res, text;
      if (props.records?.id) {
        res = await updateMenus({
          id: props.records?.id,
          ...form.getFieldsValue(),
        });
        text = "更新成功";
      } else {
        res = await saveMenus({
          pid: props.records.pid,
          level: props.records.level,
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
          title={props.records?.id ? "编辑路由" : "新增路由"}
          open={props.visible}
          onOk={handleOk}
          onCancel={handleCancel}
          afterClose={async () => await props.callback()}
          confirmLoading={loading}
        >
          <Form className="my-[20px]" form={form}>
            <Form.Item label="名称" name="name">
              <Input placeholder="请输入名称" maxLength={50} showCount />
            </Form.Item>
            <Form.Item label="路径" name="routerPath">
              <Input placeholder="请输入路径" maxLength={100} showCount />
            </Form.Item>
            <Form.Item label="密钥" name="menuKey">
              <Input placeholder="请输入密钥" maxLength={50} showCount />
            </Form.Item>
            <Form.Item label="图标" name="icon">
              <Input placeholder="请输入图标" maxLength={50} showCount />
            </Form.Item>
            <Form.Item label="排序" name="sort">
              <InputNumber
                placeholder="请输入路径"
                min={0}
                max={999}
                controls={false}
                precision={0}
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item label="状态" name="status">
              <Radio.Group>
                <Radio value={1}>启用</Radio>
                <Radio value={0}>禁用</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="是否展示菜单" name="blank">
              <Radio.Group>
                <Radio value={1}>展示</Radio>
                <Radio value={0}>隐藏</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="描述" name="description">
              <Input placeholder="请输入描述" maxLength={200} showCount />
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
);

export default ModalList;
