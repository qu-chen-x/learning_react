interface PageTabRecord {
  name: string; //name  用于在tab上显示
  path: string; //path  用于前端路由跳转（包含search）
}
type State = PageTabRecord[];
type Actions =
  | { type: "addTab"; payload: PageTabRecord }
  | { type: "removeTab"; payload: { path: string } };
type DispatchWrapper = (
  actions: Actions,
  options?: { onRemove?: (() => void) | undefined } | undefined
) => void;
export type { PageTabRecord, State, Actions, DispatchWrapper };
