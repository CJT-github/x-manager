import { Modal } from "antd";
import { memo } from "react";
import Markdown from "react-markdown";

const Preview = memo(
  (props: {
    visible: boolean;
    records: any;
    handleVisible: Function;
    callback?: Function;
  }) => {
    const handleOk = () => {
      props.handleVisible(false);
    };
    const handleCancel = () => {
      props.handleVisible(false);
    };

    return (
      <>
        <Modal
          title={props.records.title}
          open={props.visible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={false}
          width={850}
        >
          <Markdown>{props.records.content}</Markdown>
        </Modal>
      </>
    );
  }
);

export default Preview;
