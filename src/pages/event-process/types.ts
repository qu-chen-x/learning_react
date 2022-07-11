type ModeType = "todo" | "working" | "done";

interface FormValues {
  eventName: string;
  eventContent: string;
  createTime: [Date | null, Date | null] | null;
  isChecked?: boolean;
  mode?: ModeType;
}

export type { FormValues, ModeType };
