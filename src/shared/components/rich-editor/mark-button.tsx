import { Button, Tooltip } from 'antd';
import React from 'react';
import { useSlate } from 'slate-react';

import { isMarkActive, toggleMark } from './utils';
import { Format } from './types';

type Props = {
  children: React.ReactNode;
  format: Format;
  title: string;
};

export default function MarkButton({ children, format, title }: Props) {
  const editor = useSlate();
  return (
    <Tooltip title={title} mouseEnterDelay={0.5}>
      <Button
        shape="circle"
        type={isMarkActive(editor, format) ? 'link' : 'text'}
        onMouseDown={(event) => {
          event.preventDefault();
          toggleMark(editor, format);
        }}
        icon={children}
      />
    </Tooltip>
  );
}
