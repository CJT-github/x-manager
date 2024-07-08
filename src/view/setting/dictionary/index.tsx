import { memo, useRef, useState } from "react";
import { Col, Row } from "antd";
import DictionaryCard from "./comps/card";
import { getCategoryList } from "@/api/category";

const Dictionary = memo(() => {
  const handleEdit = () => {};
  const deleteFn = () => {};

  return (
    <div>
      <Row gutter={[20, 20]}>
        <Col span={12}>
          <DictionaryCard
            title="笔记分类"
            requestFn={getCategoryList}
            params={{ type: 1 }}
            type={1}
          />
        </Col>
        <Col span={12}>
          <DictionaryCard
            title="模版分类"
            requestFn={getCategoryList}
            params={{ type: 2 }}
            type={2}
          />
        </Col>
        <Col span={12}>
          <DictionaryCard
            title="笔记标签"
            requestFn={getCategoryList}
            params={{ type: 3 }}
            type={3}
          />
        </Col>
      </Row>
    </div>
  );
});

export default Dictionary;
