import { rest } from "msw";

const authUrl = process.env.REACT_APP_AUTH_URL;

const authenticationMock = [
  rest.post(`${authUrl}/login`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get(`${authUrl}/loginOut`, (req, res, ctx) => {
    return res(ctx.status(403));
  }),
];
export default authenticationMock;
