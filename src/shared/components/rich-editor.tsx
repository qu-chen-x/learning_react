/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { Descendant, createEditor } from "slate";
import { withHistory } from "slate-history";
import {
  withReact,
  Slate,
  Editable,
  RenderElementProps,
  RenderLeafProps,
} from "slate-react";
import isHotkey from "is-hotkey";
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

import Element from "./rich-editor/element";
import Leaf from "./rich-editor/leaf";
import Toolbar from "./rich-editor/toolbar";
import MarkButton from "./rich-editor/mark-button";
import BlockButton from "./rich-editor/block-button";
import CustomIcon from "./rich-editor/custom-icon";
import { toggleMark, serialize } from "./rich-editor/utils";
import { EmotionJSX } from "@emotion/react/types/jsx-namespace";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const editorInitialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

function renderElement(props: RenderElementProps) {
  return <Element {...props} />;
}

function renderLeaf(props: RenderLeafProps) {
  return <Leaf {...props} />;
}

interface Props {
  placeholder?: string;
  minHeight?: 500;
  value: Descendant[];
  onChange: (value: Descendant[]) => void;
}

interface RichEditorType {
  (props: Props): EmotionJSX.Element;
  initialValue: Descendant[];
  serialize: typeof serialize;
}

const RichEditor: RichEditorType = ({
  placeholder = "输入内容",
  minHeight = 500,
  value,
  onChange,
}) => {
  const [editor] = useState(() => withHistory(withReact(createEditor())));

  return (
    <div
      css={{
        border: "solid 1px #aaa",
      }}
    >
      <Slate editor={editor} value={value} onChange={onChange}>
        <Toolbar>
          <MarkButton format="bold" title="粗体">
            <BoldOutlined />
          </MarkButton>
          <MarkButton format="italic" title="斜体">
            <ItalicOutlined />
          </MarkButton>
          <MarkButton format="underline" title="下划线">
            <UnderlineOutlined />
          </MarkButton>
          <MarkButton format="code" title="代码">
            <CustomIcon>&lt;&gt;</CustomIcon>
          </MarkButton>
          <BlockButton blockType="heading-one" title="标题一">
            <CustomIcon>h1</CustomIcon>
          </BlockButton>
          <BlockButton blockType="heading-two" title="标题二">
            <CustomIcon>h2</CustomIcon>
          </BlockButton>
          <BlockButton blockType="block-quote" title="引用">
            <CustomIcon>“”</CustomIcon>
          </BlockButton>
          <BlockButton blockType="numbered-list" title="有序列表">
            <OrderedListOutlined />
          </BlockButton>
          <BlockButton blockType="bulleted-list" title="无序列表">
            <UnorderedListOutlined />
          </BlockButton>
        </Toolbar>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder={placeholder}
          spellCheck
          autoFocus
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault();
                // @ts-ignore
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
            }
          }}
          css={{
            padding: "4px 0",
            margin: "0 4px",
            minHeight: `${minHeight}px !important`,
          }}
        />
      </Slate>
    </div>
  );
};

RichEditor.initialValue = editorInitialValue;
RichEditor.serialize = serialize;

export default RichEditor;
export * from "./rich-editor/types";
