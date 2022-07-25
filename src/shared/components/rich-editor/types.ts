import { CustomTypes } from 'slate';

type Paragraph = { type: 'paragraph'; children: CustomText[] };
type BlockQuote = { type: 'block-quote'; children: CustomText[] };
type BulletedList = { type: 'bulleted-list'; children: ListItem[] };
type HeadingOne = { type: 'heading-one'; children: CustomText[] };
type HeadingTwo = { type: 'heading-two'; children: CustomText[] };
type ListItem = { type: 'list-item'; children: CustomText[] };
type NumberedList = { type: 'numbered-list'; children: ListItem[] };

type CustomElement =
  | Paragraph
  | BlockQuote
  | HeadingOne
  | HeadingTwo
  | BulletedList
  | NumberedList
  | ListItem;

type CustomText = {
  text: string;
  bold?: true;
  code?: true;
  italic?: true;
  underline?: true;
};

type Format = Exclude<keyof CustomText, 'text'>;
type BlockType = CustomElement['type'];

type EditorType = CustomTypes['Editor'];

export type { CustomElement, CustomText, EditorType, Format, BlockType };
