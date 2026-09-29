import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import type { Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { tags } from '@lezer/highlight';

export const themeConfig = EditorView.theme({
   '&': {
      color: 'inherit',
      fontSize: '90%',
      backgroundColor: 'inherit',
      outline: 'none !important',
      display: 'block !important',
      width: '100%',
      minHeight: 'inherit',
      cursor: 'text',
      height: '100%',
   },
   '.cm-content': {
      lineHeight: 1.75,
      fontFamily: 'var(--font-mono)',
      caretColor: 'hsl(var(--foreground, 0 0% 100%))',
      padding: '10px 0',
   },
   '.cm-scroller': {
      minHeight: 'inherit',
      height: '100%',
   },
   '.cm-cursor': {
      borderLeftColor: 'inherit',
   },
   '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection':
      {
         backgroundColor: 'rgba(59, 130, 246, 0.25)',
      },
   '.cm-gutters': {
      color: 'inherit',
      backgroundColor: 'inherit',
      borderRight: 'unset',
   },
   '.cm-lineNumbers .cm-gutterElement': {
      paddingRight: '24px',
      opacity: '75%',
   },
   '.cm-lineWrapping ': {
      wordBreak: 'break-all !important',
   },
   '.cm-tooltip': {
      backgroundColor: 'hsl(var(--popover, 0 0% 10%))',
      color: 'hsl(var(--popover-foreground, 0 0% 98%))',
      border: '1px solid hsl(var(--border, 0 0% 25%))',
      boxShadow:
         '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      zIndex: 60,
   },
   '.cm-tooltip-autocomplete': {
      '& > ul': { maxHeight: '240px', overflow: 'auto' },
   },
   '.cm-tooltip-autocomplete ul li': {
      padding: '6px 8px',
   },
   '.cm-tooltip-autocomplete ul li[aria-selected]': {
      backgroundColor: 'hsl(var(--accent, 0 0% 20%))',
      color: 'hsl(var(--accent-foreground, 0 0% 98%))',
   },
   '.cm-completionMatchedText': {
      color: '#60a5fa',
      fontWeight: 600,
      textDecoration: 'none',
   },
   '.cm-lintRange-error': {
      backgroundImage: 'none',
      textDecoration: 'underline wavy #ef4444',
   },
   '.cm-lintRange-warning': {
      backgroundImage: 'none',
      textDecoration: 'underline wavy #f59e0b',
   },
});

export const highlightStyle = HighlightStyle.define([
   { tag: [tags.comment], color: '#64748b' },
   {
      tag: [tags.keyword, tags.typeName, tags.typeOperator],
      color: '#7c3aed',
      fontWeight: '500',
   },
   { tag: [tags.string, tags.meta, tags.regexp], color: '#16a34a' },
   { tag: [tags.number, tags.bool], color: '#ea580c' },
   { tag: [tags.operator, tags.name], color: '#0ea5e9' },
   {
      tag: [tags.variableName, tags.attributeName, tags.propertyName],
      color: '#0ea5e9',
   },
   { tag: [tags.className], color: '#22d3ee' },
   { tag: [tags.tagName], color: '#e11d48' },
   { tag: [tags.heading, tags.strong], color: '#111827', fontWeight: 'bold' },
   { tag: [tags.emphasis], color: '#111827', fontStyle: 'italic' },
   { tag: [tags.link], textDecoration: 'underline' },
   { tag: [tags.strikethrough], textDecoration: 'line-through' },
   { tag: [tags.invalid], color: '#ef4444' },
]);

export const theme: Extension = [
   themeConfig,
   syntaxHighlighting(highlightStyle),
];
