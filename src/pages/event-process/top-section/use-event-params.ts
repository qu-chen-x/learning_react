import { useImmerReducer } from "use-immer";

type GetDraftState<T> = {
  [Property in keyof T as `draft${Capitalize<string & Property>}`]: T[Property];
};

type BaseState = {
  eventName: string;
  eventContent: string;
  createTime: [Date | null, Date | null] | null;
};
type DraftState = GetDraftState<BaseState>;
type State = BaseState & DraftState;
type Actions =
  | {
      type: "updateDraftEventName";
      payload: {
        value: string;
      };
    }
  | {
      type: "updateDraftEventContent";
      payload: {
        value: string;
      };
    }
  | {
      type: "updateDraftCreateTime";
      payload: {
        value: [Date | null, Date | null] | null;
      };
    }
  | {
      type: "apply";
    }
  | {
      type: "reset";
    };

const initialSate: State = {
  eventName: "",
  draftEventName: "",
  eventContent: "",
  draftEventContent: "",
  createTime: null,
  draftCreateTime: null,
};
export default function useEventParams() {
  return useImmerReducer((state: State, action: Actions) => {
    switch (action.type) {
      case "updateDraftEventName":
        state.draftEventName = action.payload.value;
        break;
      case "updateDraftEventContent":
        state.draftEventContent = action.payload.value;
        break;
      case "updateDraftCreateTime":
        state.draftCreateTime = action.payload.value;
        break;
      case "apply":
        state.eventName = state.draftEventName;
        state.eventContent = state.draftEventContent;
        state.createTime = state.draftCreateTime;
        break;
      case "reset":
        return initialSate;
      default:
        const _neverAction: never = action;
        throw Error(`unhandled action ${_neverAction}`);
    }
  }, initialSate);
}
export { initialSate };
