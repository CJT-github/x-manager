import { Button } from "antd";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

const Message = memo(() => {
  const navigate = useNavigate();

  const spiderFn = () => {
    navigate("spider");
  };
  return (
    <>
      <div className="">
        <div className="flex justify-between items-center">
          <span className="font-bold text-[16px]">复盘信息</span>
          <Button onClick={spiderFn}>爬虫中心</Button>
        </div>
      </div>
    </>
  );
});

export default Message;
