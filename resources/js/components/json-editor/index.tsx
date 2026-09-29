import {
   autocompletion,
   closeBrackets,
   closeBracketsKeymap,
   completionKeymap,
} from '@codemirror/autocomplete';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { json, jsonParseLinter } from '@codemirror/lang-json';
import {
   bracketMatching,
   foldGutter,
   indentOnInput,
} from '@codemirror/language';
import { linter, lintGutter } from '@codemirror/lint';
import { highlightSelectionMatches } from '@codemirror/search';
import { EditorState } from '@codemirror/state';
import {
   EditorView,
   highlightActiveLine,
   highlightActiveLineGutter,
   keymap,
   lineNumbers,
} from '@codemirror/view';
import { useEffect, useRef } from 'react';
import { theme } from './theme';

interface JsonEditorProps {
   value: string;
   setValue: (value: string) => void;
   readOnly?: boolean;
   height?: string;
}

const JsonEditor = ({
   value,
   setValue,
   readOnly = false,
   height = '420px',
}: JsonEditorProps) => {
   const editorRef = useRef<HTMLDivElement>(null);
   const viewRef = useRef<EditorView | null>(null);

   // Mount-only: `value`/`setValue` are applied via the separate sync effect below.

   useEffect(() => {
      if (!editorRef.current) {
         return;
      }

      const startDoc = (value as string) || '';

      const state = EditorState.create({
         doc: startDoc,
         extensions: [
            lineNumbers(),
            highlightActiveLine(),
            highlightActiveLineGutter(),
            json(),
            linter(jsonParseLinter()),
            lintGutter(),
            foldGutter(),
            theme,
            history(),
            bracketMatching(),
            closeBrackets(),
            autocompletion(),
            indentOnInput(),
            highlightSelectionMatches(),
            keymap.of([
               ...defaultKeymap,
               ...historyKeymap,
               ...completionKeymap,
               ...closeBracketsKeymap,
            ]),
            EditorView.updateListener.of((v) => {
               if (v.docChanged && !readOnly) {
                  const value = v.state.doc.toString();
                  setValue(value);
               }
            }),
            EditorView.lineWrapping,
            EditorView.editable.of(!readOnly),
         ],
      });

      const view = new EditorView({ state, parent: editorRef.current });
      viewRef.current = view;

      return () => view.destroy();
   }, [editorRef, readOnly]); // eslint-disable-line react-hooks/exhaustive-deps

   useEffect(() => {
      if (viewRef.current && value !== viewRef.current.state.doc.toString()) {
         const transaction = viewRef.current.state.update({
            changes: {
               from: 0,
               to: viewRef.current.state.doc.length,
               insert: value,
            },
         });
         viewRef.current.dispatch(transaction);
      }
   }, [value]);

   return (
      <div
         ref={editorRef}
         className="w-full rounded-md border"
         style={{ height }}
         onMouseDown={(e) => {
            const target = e.target as HTMLElement;

            if (!target.closest('.cm-editor')) {
               e.preventDefault();
               viewRef.current?.focus();
            }
         }}
      />
   );
};

export default JsonEditor;
