import { Space, Spin, Switch } from "antd";
import { useEffect, useState } from "react";

interface LoadingStyleDto {
  LoadingStyle?: Object;
}

function Loading(props: LoadingStyleDto) {
  const [percent, setPercent] = useState(-50);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPercent((v) => {
        const nextPercent = v + 5;
        return nextPercent > 150 ? -50 : nextPercent;
      });
    }, 100);
    return () => {
      clearTimeout(timeout);
    };
  }, [percent]);

  return (
    <div
      className="h-screen w-screen flex items-center justify-center"
      style={props.LoadingStyle}
    >
      <Spin percent={percent} size="large" />
    </div>
  );
}

export default Loading;
