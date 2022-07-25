/** @jsxImportSource @emotion/react */

type Props = {
  children: React.ReactNode;
};

export default function Toolbar({ children }: Props) {
  return (
    <div
      css={{
        padding: '4px ',
        borderBottom: 'solid 1px #aaa',
      }}
    >
      {children}
    </div>
  );
}
