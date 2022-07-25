/** @jsxImportSource @emotion/react */
import { RenderElementProps } from 'slate-react';

export default function Element({
  attributes,
  children,
  element,
}: RenderElementProps) {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
      return (
        <ul
          {...attributes}
          css={{
            marginLeft: 20,
          }}
        >
          {children}
        </ul>
      );
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return (
        <ol {...attributes} css={{ marginLeft: 20 }}>
          {children}
        </ol>
      );
    default:
      return (
        <p {...attributes} css={{ marginBottom: 2 }}>
          {children}
        </p>
      );
  }
}
