/**
 *
 * @param value 传进来的值
 * @param tip 在无值的时候返回的占位符
 * @returns value 值
 */
export default function returnPlaceholder(value: any, tip: string = "-") {
  if (typeof value === "object" && JSON.stringify(value) === "{}") return tip;
  if (value instanceof Array && value.length === 0) return tip;
  if (typeof value === "boolean") return value;
  if (value === 0 || value === "0") return 0;
  return value || tip;
}
