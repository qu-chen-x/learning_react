import { JSONResponse } from "./types";
import * as yup from "yup";

export interface User {
  id: string;
  name: string;
  sex: string;
  nowRoleId: string;
  nowRoleCode: string;
  rolesList: {
    id: string;
    roleName: string;
    roleCode: string;
  }[];
}

interface Resource {
  resourceCode?: string;
  childResources: Resource[] | null;
}

interface AuthInformation {
  token: string; //token
  expireTime: number; //token过期时间
  user: User | undefined; //用户信息
  modules: Resource[] | undefined; //资源模块
}

export interface PersistentAuthInformation
  extends Omit<AuthInformation, "expireTime"> {
  expiredAt: number;
}

export interface SignUpFormType {
  username: string;
  password: string;
}

export interface LoginFormType {
  userNo: string;
  password: string;
}

export interface BindMobileProps {
  openId: string;
  mobile: string;
  messageAuthCode: string;
}
export interface CheckNeedBindMobileResponse {
  result: "0" | "1";
  openid: string;
  message: string;
}

const urlSchema = yup.string().required().url();
const removeAnyLeadingSlash = (partialUrl: string) =>
  partialUrl.replace(/^\/*/, ""); //去除url里多余的斜杠

const authUrl = process.env.REACT_APP_AUTH_URL;
const persistentKey = process.env.REACT_APP_LOGIN_PERSISTENT_TOKEN as string;
const appCode = process.env.REACT_APP_APP_CODE;
const source = process.env.REACT_APP_SOURCE;

//封装接口调用方法
async function client<T>(
  endpoint: string,
  data?: any,
  headers?: Record<string, string>
) {
  const config = {
    method: data ? "POST" : "GET",
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      "Content-type": "application/json",
      ...(headers ?? {}),
    },
  };
  try {
    const isValidUrl = await urlSchema.isValid(endpoint);
    const response = await fetch(
      isValidUrl ? endpoint : `${authUrl}/${removeAnyLeadingSlash(endpoint)}`,
      config
    );
    const data: JSONResponse<T> = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  } catch (error) {
    return Promise.reject(String(error));
  }
}

//从本地取出用户信息并将其从JSON字符串转换为JS对象
async function getAuthInformation(): Promise<PersistentAuthInformation | null> {
  const stringifiedAuthInfo = window.localStorage.getItem(persistentKey);
  if (stringifiedAuthInfo === null) return null;
  try {
    const parsedTokenInfo = JSON.parse(stringifiedAuthInfo);
    return parsedTokenInfo;
  } catch (error) {
    window.localStorage.removeItem(persistentKey);
    return null;
  }
}

//转换用户信息的数据结构，便于在本地存储和使用
function formatAuthResponse(data: AuthInformation): PersistentAuthInformation {
  return {
    token: data.token,
    modules: data.modules,
    user: data.user,
    expiredAt: data.expireTime,
  };
}

//将用户信息转成JSON数据与特定标识字段绑定并存储在本地
async function handleAuthResponse(response: JSONResponse<AuthInformation>) {
  if (response.code === 0) {
    const formattedAuth = formatAuthResponse(response.data);
    let stringifiedAuthInfo;
    try {
      stringifiedAuthInfo = JSON.stringify(formattedAuth);
      window.localStorage.setItem(persistentKey, stringifiedAuthInfo);
      return formattedAuth;
    } catch (error) {
      return Promise.reject("StringifyAuthError");
    }
  } else {
    return Promise.reject(response.message);
  }
}

//获取验证码
async function getAuthCode() {
  const res = await client<string>("");
  if (res.code === 0) {
    return res.data;
  } else {
    return Promise.reject(res.message);
  }
}
//验证验证码
async function verifyAuthCode(id: string, code: string) {
  const res = await client("");
  if (res.code === 0) {
    return res.data;
  } else {
    return Promise.reject(res.message);
  }
}

//获取短信验证码
async function getMessageAuthCode(mobile: string) {
  const res: JSONResponse<null> = await client("", {
    mobile,
  });
  if (res.code === 0) {
    return res.data;
  } else {
    throw Error(res.message);
  }
}

//注册
async function register({ username, password }: SignUpFormType) {
  const res: JSONResponse<AuthInformation> = await client("", {
    username,
    password,
  });
  return handleAuthResponse(res);
}

//SSO登录(使用新token替换旧token)
async function SSOLogin(token: string) {
  const res: JSONResponse<AuthInformation> = await client("", {
    token,
    appCode: appCode,
  });
  return handleAuthResponse(res);
}

//登录
async function login(loginForm: LoginFormType) {
  const res: JSONResponse<AuthInformation> = await client("", {
    userNo: loginForm.userNo,
    password: loginForm.password,
    type: "1",
    appCode: appCode,
    source,
  });
  return handleAuthResponse(res);
}

//退出
async function logout() {
  window.localStorage.removeItem(persistentKey);
}

//切换角色
async function switchRole(roleId: string) {
  const authInformation = await getAuthInformation();
  const header: Record<string, string> = authInformation
    ? { token: authInformation.token }
    : {};
  const res: JSONResponse<AuthInformation> = await client(
    "",
    {
      appCode: appCode,
      roleId,
    },
    header
  );
  return handleAuthResponse(res);
}

//刷新token
async function refreshToken() {
  const res: JSONResponse<AuthInformation> = await client("");
  return handleAuthResponse(res);
}

//获取微信登录信息
async function getWeChatOauth2Url() {
  const res: JSONResponse<string> = await client("", {});
  if (res.code === 0) {
    return res.data;
  } else {
    throw Error(res.message);
  }
}

//获取QQ登录信息
async function getQQOauth2Url() {
  const res: JSONResponse<string> = await client("", {});
  if (res.code === 0) {
    return res.data;
  } else {
    throw Error(res.message);
  }
}

//绑定微信
async function bindWeChatWithMobile({
  openId,
  mobile,
  messageAuthCode,
}: BindMobileProps) {
  const res: JSONResponse<AuthInformation> = await client("", {
    wechatOpenid: openId,
    mobileNum: mobile,
    verificationCode: messageAuthCode,
    appCode: appCode,
    source,
  });
  return handleAuthResponse(res);
}

//绑定QQ
async function bindQQWithMobile({
  openId,
  mobile,
  messageAuthCode,
}: BindMobileProps) {
  const res: JSONResponse<AuthInformation> = await client("", {
    qqOpenid: openId,
    mobileNum: mobile,
    verificationCode: messageAuthCode,
    appCode: appCode,
    source,
  });
  return handleAuthResponse(res);
}

//验证绑定微信信息
async function checkWeChatNeedBindMobile(code: string) {
  const res: JSONResponse<CheckNeedBindMobileResponse> = await client("", {
    wechatCode: code,
  });
  if (res.code === 0) {
    return res.data;
  } else {
    throw Error(res.message);
  }
}

//验证绑定QQ信息
async function checkQQNeedBindMobile(code: string) {
  const res: JSONResponse<CheckNeedBindMobileResponse> = await client("", {
    qqCode: code,
  });
  if (res.code === 0) {
    return res.data;
  } else {
    throw Error(res.message);
  }
}

export {
  getAuthInformation,
  formatAuthResponse,
  handleAuthResponse,
  getAuthCode,
  verifyAuthCode,
  getMessageAuthCode,
  SSOLogin,
  register,
  login,
  logout,
  switchRole,
  refreshToken,
  getWeChatOauth2Url,
  getQQOauth2Url,
  bindWeChatWithMobile,
  bindQQWithMobile,
  checkWeChatNeedBindMobile,
  checkQQNeedBindMobile,
};
