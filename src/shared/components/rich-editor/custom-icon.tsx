/** @jsxImportSource @emotion/react */
import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function CustomIcon({ children }: Props) {
  return (
    <span
      css={{
        verticalAlign: 'text-bottom',
      }}
    >
      {children}
    </span>
  );
}
