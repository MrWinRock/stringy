declare module "draft-js" {
  import { ComponentType } from "react";

  export interface EditorProps {
    editorState: EditorState;
    onChange: (editorState: EditorState) => void;
    placeholder?: string;
    readOnly?: boolean;
    spellCheck?: boolean;
    handleKeyCommand?: (
      command: string,
      editorState: EditorState
    ) => "handled" | "not-handled";
  }

  export class Editor extends React.Component<EditorProps> {
    focus(): void;
  }

  export class EditorState {
    static createEmpty(): EditorState;
    getCurrentContent(): ContentState;
  }

  export class ContentState {}

  export function convertToRaw(
    contentState: ContentState
  ): RawDraftContentState;

  export function convertFromRaw(rawState: RawDraftContentState): ContentState;

  export namespace RichUtils {
    function toggleInlineStyle(
      editorState: EditorState,
      inlineStyle: string
    ): EditorState;
    function toggleBlockType(
      editorState: EditorState,
      blockType: string
    ): EditorState;
    function handleKeyCommand(
      editorState: EditorState,
      command: string
    ): EditorState | null;
    function getCurrentBlockType(editorState: EditorState): string;
  }

  export interface RawDraftContentState {}
}
