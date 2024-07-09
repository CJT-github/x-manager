import { template } from "@/api/template";
import { Button } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Template() {
  const [loading, setLoading] = useState(false);
  const html = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />·
      <title>Document</title>
      <style>
        html {
          line-height: 1.15;
          -webkit-print-color-adjust: exact;
        }
        body {
          margin: 0;
          font-family: "Times New Roman",'宋体';
          font-weight: 400;
        }
      </style>
    </head>
    <body>
      <div>页面Dom</div>
    </body>
  </html>`;

  const navigate = useNavigate();

  const handleFn = (id: string) => {
    navigate(`/editor/template/editTemplate/${id}`);
  };

  const btnFn = async () => {
    setLoading(true);
    const res = await template({ html });
    console.log(res);
    //将buffer数据转换为Uint8Array
    const uint8Array = new Uint8Array(res.data);
    //创建一个Blob对象
    const blob = new Blob([uint8Array], { type: "application/pdf" });
    //创建下载链接
    const url = URL.createObjectURL(blob);
    setLoading(false);
  };
  return (
    <div className="">
      <div className="font-bold text-[16px] flex items-center justify-between">
        <span>模版列表</span>
        <div>
          <Button onClick={btnFn} loading={loading} className="mr-[10px]">
            基本信息
          </Button>
          <Button onClick={() => handleFn("_new")}>
            自定义模板
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Template;
