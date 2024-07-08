import { getCategoryList } from "@/api/category";
import { presignedUrl } from "@/api/filecenter";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Drawer,
  Form,
  GetProp,
  Popover,
  Radio,
  Select,
  Upload,
  UploadFile,
  UploadProps,
  message,
} from "antd";
import { FormProps, useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { UploadRequestOption } from "rc-upload/lib/interface";
import { memo, useEffect, useRef, useState } from "react";
import { cloneDeep } from "lodash";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

type FieldType = {
  collect: Array<string>;
  tabs: Array<string>;
  headerImage: string;
  category: string;
  desc: string;
};

const BasicSetting = memo((props: { detail: any; callback: Function }) => {
  const [open, setOpen] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const imglocation = useRef("");
  const [isLoading, setIsLoading] = useState(false);

  const [form] = useForm();

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  //获取分类选项
  const [categoryList, setCategoryList] = useState([]);
  const getCategoryListFn = async () => {
    setIsLoading(true);
    const res = await getCategoryList({ type: 1 });
    if (res.data && Object.keys(res.data).length) {
      setCategoryList(res.data);
    }
    setIsLoading(false);
  };

  const [tagOption, setTagOption] = useState([]);
  const getTagListFn = async () => {
    setIsLoading(true);
    const res = await getCategoryList({ type: 3 });
    if (res.data && Object.keys(res.data).length) {
      setTagOption(res.data);
    }
    setIsLoading(false);
  };

  //====================头像处理
  const beforeUpload = (file: FileType) => {
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      message.error("图片大小不能超过 5MB!");
    }
    return isLt2M;
  };

  //获取预签名
  const actionsFn = async (file: any) => {
    setImageLoading(true);
    const res = await presignedUrl({ name: file.name });
    imglocation.current = res.data.urlLocation;
    setImageLoading(false);
    return res.data.url;
  };

  //自定义请求内容
  const customRequest = async (options: UploadRequestOption<any>) => {
    try {
      const { onSuccess, file, action } = options;
      const res = await axios.put(action, file, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: undefined,
        },
        xsrfHeaderName: "",
      });
      onSuccess!(res);
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (info: any) => {
    const { status } = info?.file;
    if (status === "done") {
      setImageUrl("http://" + imglocation.current + info.file.name);
      message.success(`${info.file.name} 文件上传成功`);
    } else if (status === "error") {
      message.error(`${info.file.name} 文件上传失败`);
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {imageLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传封面</div>
    </button>
  );

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    let result = {
      collect: "",
      tabs: "",
      category: "",
      desc: "",
      headerImage: "",
    };
    const data = cloneDeep(values);
    result.collect = data.collect.length ? data.collect.join(",") : "";
    result.tabs = data.tabs.length ? data.tabs.join(",") : "";
    result.category = data.category;
    result.desc = data.desc;
    result.headerImage = imageUrl;
    props.callback(result);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    getCategoryListFn();
    getTagListFn();
  }, []);

  useEffect(() => {
    const tabsList = props.detail.tabs ? props.detail.tabs.split(",") : [];
    const collectList = props.detail.collect
      ? props.detail.collect.split(",")
      : [];
    form.setFieldValue("category", props.detail.category);
    form.setFieldValue("collect", collectList);
    form.setFieldValue("tabs", tabsList);
    form.setFieldValue("desc", props.detail.desc);
    setImageUrl(props.detail.headerImage);
  }, [props.detail]);

  const content = (
    <div className="w-[500px]">
      <Form
        name="basic"
        labelAlign="right"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        form={form}
        onFinish={onFinish}
        autoComplete="off"
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="分类" name="category">
          <Radio.Group>
            {categoryList.map((item: any) => {
              return (
                <Radio.Button value={item.value} key={item.value}>
                  {item.name}
                </Radio.Button>
              );
            })}
          </Radio.Group>
        </Form.Item>
        <Form.Item label="添加标签" name="tabs">
          <Select
            mode="multiple"
            maxCount={3}
            allowClear
            style={{ width: "100%" }}
            placeholder="请搜索添加标签"
            fieldNames={{ label: "name", value: "value" }}
            options={tagOption}
          />
        </Form.Item>
        <Form.Item label="文章封面">
          <Upload
            accept="image/png,image/jpg,image/gif"
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action={actionsFn}
            customRequest={customRequest}
            beforeUpload={beforeUpload}
            onChange={onChange}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
        <Form.Item label="收录至专栏" name="collect">
          <Select
            mode="multiple"
            maxCount={3}
            allowClear
            style={{ width: "100%" }}
            placeholder="请搜索添加专栏，同一篇文章最多添加三个专栏"
            options={[]}
          />
        </Form.Item>
        <Form.Item label="编辑摘要" name="desc">
          <TextArea
            placeholder="请输入文章摘要"
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </Form.Item>
        <div className="text-right">
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button className="mr-[10px]" onClick={hide}>
              取消
            </Button>
            <Button type="primary" htmlType="submit">
              确定并发布
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );

  return (
    <Popover
      content={content}
      title="发布文章"
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
      placement="bottomRight"
    >
      <Button type="primary" disabled={isLoading}>
        发布
      </Button>
    </Popover>
  );
});

export default BasicSetting;
