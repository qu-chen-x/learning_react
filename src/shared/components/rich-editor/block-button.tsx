import { Button, Tooltip } from 'antd';
import React from 'react';
import { useSlate } from 'slate-react';

import { BlockType } from './types';
import { isBlockActive, toggleBlock } from './utils';

type Props = {
  children: React.ReactNode;
  blockType: BlockType;
  title: string;
};

export default function BlockButton({ children, blockType, title }: Props) {
  const editor = useSlate();
  return (
    <Tooltip title={title} mouseEnterDelay={0.5}>
      <Button
        type={isBlockActive(editor, blockType) ? 'link' : 'text'}
        onMouseDown={(event) => {
          event.preventDefault();
          toggleBlock(editor, blockType);
        }}
        icon={children}
      />
    </Tooltip>
  );
}
