import { memo } from "react";
import styled from "styled-components";
import { HtmlEditor, Toolbar, Editor } from "@aeaton/react-prosemirror";
import {
  plugins,
  schema,
  toolbar,
} from "@aeaton/react-prosemirror-config-default";

const Container = styled.div`
  .prosemirror-toolbar-group:not(:first-child),
  .prosemirror-toolbar-item:nth-child(3),
  .prosemirror-toolbar-item:nth-child(4),
  .prosemirror-toolbar-item:nth-child(5),
  .prosemirror-toolbar-item:nth-child(7) {
    display: none;
  }

  .prosemirror-toolbar-item {
    padding: 6px 10px;
    height: 28px;
  }

  .prosemirror-toolbar-group {
    margin: 0;
    border: none;
  }

  .prosemirror-toolbar {
    height: 30px;
    border: 1px solid #d9d9d9;
    border-radius: 5px 5px 0px 0px;
  }

  .prosemirror-editor {
    height: 400px;
    padding: 8px 5px;
    border: 1px solid #d9d9d9;
    border-top: none;
    border-radius: 0 0 5px 5px;
    overflow-y: scroll;
    overflow-x: hidden;

    ::-webkit-scrollbar {
      display: block !important;
      width: 10px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: #8aa399;
      border-radius: 5px;
    }
  }

  .prosemirror-toolbar-item:not([disabled]):active,
  .prosemirror-toolbar-item[data-active="true"] {
    background-color: #00000022;
    color: #000;
  }

  .ProseMirror p.empty-node:first-child::before {
    content: "รายละเอียดสินค้า";
  }

  .ProseMirror .empty-node::before {
    font-style: initial;
  }

  .prosemirror-editor > .ProseMirror > p {
    margin-bottom: 0;
  }
`;

const InputEditor = ({ value, onChange }) => {
  return (
    <Container>
      <HtmlEditor
        schema={schema}
        plugins={plugins}
        value={value}
        handleChange={onChange}
        debounce={250}
      >
        <Toolbar toolbar={toolbar} />
        <Editor autoFocus />
      </HtmlEditor>
    </Container>
  );
};

export default memo(InputEditor);
