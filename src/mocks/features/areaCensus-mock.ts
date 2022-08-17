import { rest } from "msw";

const apiUrl = process.env.REACT_APP_API_URL;

const areaCensusMock = [
  rest.get(`${apiUrl}/getTreeData`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 0,
        msg: "ok",
        data: {
          treeNodeList: [
            {
              title: "Node1",
              value: "0-0",
              children: [
                {
                  title: "ChildNode1",
                  value: "0-0-1",
                },
                {
                  title: "ChildNode2",
                  value: "0-0-2",
                },
              ],
            },
            {
              title: "Node2",
              value: "0-1",
              children: [
                {
                  title: "ChildNode3",
                  value: "0-1-1",
                },
                {
                  title: "ChildNode4",
                  value: "0-1-2",
                },
              ],
            },
          ],
        },
      }),
      ctx.delay(1000)
    );
  }),
];
export default areaCensusMock;
