/** @jsxImportSource @emotion/react */

type Props = {
  title: string;
  value: React.ReactNode;
  isRequired?: boolean;
  className?: string;
};

export default function InfoItem({
  title,
  value,
  isRequired,
  className,
  ...others
}: Props) {
  return (
    <div
      css={{ display: "flex", marginBottom: 16 }}
      className={className}
      {...others}
    >
      {isRequired ? <span css={{ color: "red" }}>*</span> : null}
      <span css={{ marginRight: 8, whiteSpace: "nowrap" }}>{title}:</span>
      <div
        css={{
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
        }}
      >
        {value ? value : "暂无"}
      </div>
    </div>
  );
}
