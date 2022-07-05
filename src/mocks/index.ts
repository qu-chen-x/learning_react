//enable mock in dev mode
function prepare() {
  if (process.env.NODE_ENV === "development") {
    const { worker } = require("./browser");
    worker.start({
      onUnhandledRequest: (req: any) => {
        if (req.url.host === "localhost:3000") {
          return "bypass";
        } else {
          return "warn";
        }
      },
    });
  }
  return Promise.resolve();
}
export { prepare };
