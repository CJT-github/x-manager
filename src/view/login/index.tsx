import { getCache, login } from "@/api/login";
import { memo, useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import cache from "@/utils/cache";
import { checkAuthorization, setAuthorization } from "@/utils/request";

const Login = memo(() => {
  const [captcha, setCaptcha] = useState("");
  const [succussText, setSuccussText] = useState("");
  const [loading, setLoading] = useState(false);
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const onFinish = (values: object) => {
    loginFn();
  };

  const getCacheFn = async () => {
    setCaptchaLoading(true);
    const res = await getCache(form.getFieldsValue(["email"]));
    if (res && Object.keys(res).length) {
      let code = res.data.captcha;
      setCaptcha(code);
    }
    setCaptchaLoading(false);
  };

  const loginFn = async () => {
    setLoading(true);
    const res = await login({
      ...form.getFieldsValue(),
      captcha: form.getFieldsValue(["captcha"]).captcha.toLowerCase(),
    });
    if (res && Object.keys(res).length) {
      cache.setCache("userInfo", JSON.stringify(res.data.userInfo));
      let token = res.data.accessToken;
      let refreshToken = res.data.refreshToken;
      setAuthorization({ token, refreshToken });
      setSuccussText("登录成功,即将跳转");
      message.success("登录成功");
      navigate("/");
    }
    setLoading(false);
  };

  useEffect(() => {
    // getCacheFn();
    if (checkAuthorization()) {
      navigate("/");
    }
  }, []);

  return (
    <div className="p-4 w-screen h-screen relative">
      <div className="relative w-full h-96 rounded bg-[url('/src/assets/body_background.jpg')] bg-no-repeat bg-center">
        <div className="absolute w-full top-32 text-center text-white">
          <div className="text-2xl font-semibold mb-4">X-MANAGER</div>
          <div className="mb-12">长风破浪会有时，直挂云帆济沧海</div>
          <div className="rounded-lg bg-white w-[460px] h-96 mx-auto shadow-2xl px-6 py-8 flex flex-col">
            <div className="text-black font-semibold text-2xl mb-3">登录</div>
            <div className="text-slate-400 mb-6 text-sm">
              {succussText ? (
                <a>{succussText}</a>
              ) : (
                "请输入您的邮箱和密码进行登录"
              )}
            </div>
            <div>
              <Form form={form} name="login" onFinish={onFinish}>
                <Form.Item
                  rules={[
                    { type: "email", message: "邮箱格式不正确" },
                    { required: true, message: "请输入用户邮箱" },
                  ]}
                  name="email"
                >
                  <Input placeholder="请输入用户邮箱" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "请输入用户密码" },
                    { min: 6, message: "请输入6位数密码" },
                  ]}
                >
                  <Input.Password
                    placeholder="请输入用户密码"
                    max={6}
                    autoComplete="off"
                  />
                </Form.Item>
                <Form.Item name="captcha">
                  <div className="flex gap-x-2 items-center">
                    <Input placeholder="请输入验证码" />
                    <div
                      className="w-[400px] border border-slate-200 h-[32px] leading-[32px] rounded select-none text-slate-400 object-contain overflow-hidden"
                      dangerouslySetInnerHTML={{
                        __html: captcha || "-  -  -  -",
                      }}
                    ></div>
                    <Button
                      type="link"
                      className="p-0"
                      loading={captchaLoading}
                      onClick={getCacheFn}
                    >
                      点击获取验证码
                    </Button>
                  </div>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    className="w-full"
                    loading={loading}
                    htmlType="submit"
                  >
                    登录
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <div className="mb-0 text-sm mt-auto">
              <span className="text-slate-400">没有账户？</span>
              <span className="text-black cursor-pointer">免费注册</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Login;
