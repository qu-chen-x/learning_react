import escapeHtml from "escape-html";
import { Editor, Element, Transforms, Text, Descendant } from "slate";
import { EditorType, Format, BlockType } from "./types";

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const isMarkActive = (editor: EditorType, format: Format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleMark = (editor: EditorType, format: Format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor: EditorType, blockType: BlockType) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) && Element.isElement(n) && n.type === blockType,
    })
  );

  return !!match;
};

const toggleBlock = (editor: EditorType, blockType: BlockType) => {
  const isActive = isBlockActive(editor, blockType);
  const isList = LIST_TYPES.includes(blockType);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      Element.isElement(n) &&
      LIST_TYPES.includes(n.type),
    split: true,
  });
  const newProperties: Partial<Element> = {
    type: isActive ? "paragraph" : isList ? "list-item" : blockType,
  };
  Transforms.setNodes<Element>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: blockType, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

function serialize(node: Descendant): string {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text);
    if (node.bold) {
      string = `<strong>${string}</strong>`;
    }
    if (node.code) {
      string = `<code>${string}</code>`;
    }
    if (node.italic) {
      string = `<em>${string}</em>`;
    }
    if (node.underline) {
      string = `<u>${string}</u>`;
    }
    return string;
  }

  const children: any = node.children.map((n) => serialize(n)).join("");

  switch (node.type) {
    case "block-quote":
      return `<blockquote><p>${children}</p></blockquote>`;
    case "bulleted-list":
      return `<ul>${children}</ul>`;
    case "numbered-list":
      return `<ol>${children}</ol>`;
    case "list-item":
      return `<li>${children}</li>`;
    case "heading-one":
      return `<h1>${children}</h1>`;
    case "heading-two":
      return `<h2>${children}</h2>`;
    case "paragraph":
      return `<p>${children}</p>`;
    default:
      return children;
  }
}

export { isMarkActive, toggleMark, toggleBlock, isBlockActive, serialize };
