"use client";

import { Fragment, type CSSProperties, type ReactNode } from "react";

const inlineMarkerPattern = /\[color\s*=\s*(#[0-9a-fA-F]{3,8}|[a-zA-Z]+)\]([\s\S]*?)\[\/color\]|\*\*([^*\n]+?)\*\*|\*([^*\n]+?)\*/g;

function renderInlineText(text: string, keyPrefix: string): ReactNode {
  const pattern = new RegExp(inlineMarkerPattern);
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(
        <Fragment key={`${keyPrefix}-plain-${nodes.length}`}>
          {text.slice(lastIndex, match.index)}
        </Fragment>,
      );
    }

    const [, colorValue, colorText, boldText, italicText] = match;
    const nodeKey = `${keyPrefix}-marker-${nodes.length}`;

    if (colorText !== undefined) {
      nodes.push(
        <span key={nodeKey} style={{ color: colorValue } satisfies CSSProperties}>
          {renderInlineText(colorText, nodeKey)}
        </span>,
      );
    } else if (boldText !== undefined) {
      nodes.push(
        <strong key={nodeKey} className="font-semibold">
          {renderInlineText(boldText, nodeKey)}
        </strong>,
      );
    } else if (italicText !== undefined) {
      nodes.push(
        <em key={nodeKey}>
          {renderInlineText(italicText, nodeKey)}
        </em>,
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(
      <Fragment key={`${keyPrefix}-plain-${nodes.length}`}>
        {text.slice(lastIndex)}
      </Fragment>,
    );
  }

  return nodes.length ? nodes : text;
}

export function FormattedText({ text }: { text: string }) {
  const lines = text.split(/\r?\n/);

  return (
    <>
      {lines.map((line, index) => (
        <Fragment key={`${line}-${index}`}>
          {renderInlineText(line, `line-${index}`)}
          {index < lines.length - 1 ? <br /> : null}
        </Fragment>
      ))}
    </>
  );
}
