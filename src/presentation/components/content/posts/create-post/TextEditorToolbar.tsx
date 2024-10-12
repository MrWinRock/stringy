import React, { useState } from 'react';
import { EditorState, RichUtils } from 'draft-js';
import "./TextEditorToolbar.css";

interface ToolbarProps {
    editorState: EditorState;
    onChange: (editorState: EditorState) => void;
}

const TextEditorToolbar: React.FC<ToolbarProps> = ({ editorState, onChange }) => {
    const [activeInlineStyles, setActiveInlineStyles] = useState<Set<string>>(new Set());
    const [activeBlockTypes, setActiveBlockTypes] = useState<Set<string>>(new Set());

    const applyInlineStyle = (style: string) => {
        const newEditorState = RichUtils.toggleInlineStyle(editorState, style);
        onChange(newEditorState);

        const updatedInlineStyles = new Set(activeInlineStyles);
        if (updatedInlineStyles.has(style)) {
            updatedInlineStyles.delete(style);
        } else {
            updatedInlineStyles.add(style);
        }
        setActiveInlineStyles(updatedInlineStyles);
    };

    const applyBlockType = (blockType: string) => {
        const newEditorState = RichUtils.toggleBlockType(editorState, blockType);
        onChange(newEditorState);

        const updatedBlockTypes = new Set(activeBlockTypes);
        if (updatedBlockTypes.has(blockType)) {
            updatedBlockTypes.delete(blockType);
        } else {
            updatedBlockTypes.add(blockType);
        }
        setActiveBlockTypes(updatedBlockTypes);
    };

    const isActive = (style: string, type: 'inline' | 'block') => {
        if (type === 'inline') {
            return activeInlineStyles.has(style);
        }
        return activeBlockTypes.has(style);
    };

    return (
        <div className="toolbar">
            <button
                className={isActive('header-one', 'block') ? 'active' : ''}
                onMouseDown={(e) => { e.preventDefault(); applyBlockType('header-one'); }}
            >
                H1
            </button>
            <button
                className={isActive('header-two', 'block') ? 'active' : ''}
                onMouseDown={(e) => { e.preventDefault(); applyBlockType('header-two'); }}
            >
                H2
            </button>
            <button
                className={isActive('header-three', 'block') ? 'active' : ''}
                onMouseDown={(e) => { e.preventDefault(); applyBlockType('header-three'); }}
            >
                H3
            </button>
            <button
                className={isActive('header-four', 'block') ? 'active' : ''}
                onMouseDown={(e) => { e.preventDefault(); applyBlockType('header-four'); }}
            >
                H4
            </button>
            <button
                className={isActive('header-five', 'block') ? 'active' : ''}
                onMouseDown={(e) => { e.preventDefault(); applyBlockType('header-five'); }}
            >
                H5
            </button>
            <button
                className={isActive('header-six', 'block') ? 'active' : ''}
                onMouseDown={(e) => { e.preventDefault(); applyBlockType('header-six'); }}
            >
                H6
            </button>
            <button
                className={isActive('blockquote', 'block') ? 'active' : ''}
                onMouseDown={(e) => { e.preventDefault(); applyBlockType('blockquote'); }}
            >
                Blockquote
            </button>
            <button
                className={isActive('unordered-list-item', 'block') ? 'active' : ''}
                onMouseDown={(e) => { e.preventDefault(); applyBlockType('unordered-list-item'); }}
            >
                UL
            </button>
            <button
                className={isActive('ordered-list-item', 'block') ? 'active' : ''}
                onMouseDown={(e) => { e.preventDefault(); applyBlockType('ordered-list-item'); }}
            >
                OL
            </button>
            <button
                className={isActive('code-block', 'block') ? 'active' : ''}
                onMouseDown={(e) => { e.preventDefault(); applyBlockType('code-block'); }}
            >
                Code Block
            </button>
            <button
                className={isActive('BOLD', 'inline') ? 'active' : ''}
                onMouseDown={(e) => { e.preventDefault(); applyInlineStyle('BOLD'); }}
            >
                Bold
            </button>
            <button
                className={isActive('ITALIC', 'inline') ? 'active' : ''}
                onMouseDown={(e) => { e.preventDefault(); applyInlineStyle('ITALIC'); }}
            >
                Italic
            </button>
            <button
                className={isActive('UNDERLINE', 'inline') ? 'active' : ''}
                onMouseDown={(e) => { e.preventDefault(); applyInlineStyle('UNDERLINE'); }}
            >
                Underline
            </button>
            <button
                className={isActive('CODE', 'inline') ? 'active' : ''}
                onMouseDown={(e) => { e.preventDefault(); applyInlineStyle('CODE'); }}
            >
                Monospace
            </button>
        </div>
    );
};

export default TextEditorToolbar;