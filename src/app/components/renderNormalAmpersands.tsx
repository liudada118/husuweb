import { Fragment, type CSSProperties, type ReactNode } from "react";

const normalAmpersandStyle = {
  fontFamily: '"Helvetica Neue", "Segoe UI", Arial, sans-serif',
  fontWeight: 300,
};

type AmpersandStyle = {
  fontFamily: string;
  fontWeight: number;
};

const inlineMarkerPattern = /\[color\s*=\s*(#[0-9a-fA-F]{3,8}|[a-zA-Z]+)\]([\s\S]*?)\[\/color\]|\*\*([^*\n]+?)\*\*|\*([^*\n]+?)\*/g;

function renderAmpersands(text: string, ampersandStyle: AmpersandStyle, keyPrefix: string): ReactNode {
  if (!text.includes("&")) {
    return text;
  }

  const parts = text.split("&");

  return parts.map((part, index) => (
    <Fragment key={`${keyPrefix}-ampersand-${index}`}>
      {part}
      {index < parts.length - 1 ? <span style={ampersandStyle}>&</span> : null}
    </Fragment>
  ));
}

function renderInlineText(text: string, ampersandStyle: AmpersandStyle, keyPrefix: string): ReactNode {
  const markerPattern = new RegExp(inlineMarkerPattern);

  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = markerPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const plainText = text.slice(lastIndex, match.index);
      nodes.push(
        <Fragment key={`${keyPrefix}-plain-${nodes.length}`}>
          {renderAmpersands(plainText, ampersandStyle, `${keyPrefix}-plain-${nodes.length}`)}
        </Fragment>,
      );
    }

    const [, colorValue, colorText, boldText, italicText] = match;
    const nodeKey = `${keyPrefix}-marker-${nodes.length}`;

    if (colorText !== undefined) {
      nodes.push(
        <span key={nodeKey} style={{ color: colorValue } satisfies CSSProperties}>
          {renderInlineText(colorText, ampersandStyle, nodeKey)}
        </span>,
      );
    } else if (boldText !== undefined) {
      nodes.push(
        <strong key={nodeKey} className="font-semibold">
          {renderInlineText(boldText, ampersandStyle, nodeKey)}
        </strong>,
      );
    } else if (italicText !== undefined) {
      nodes.push(
        <em key={nodeKey}>
          {renderInlineText(italicText, ampersandStyle, nodeKey)}
        </em>,
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    const plainText = text.slice(lastIndex);
    nodes.push(
      <Fragment key={`${keyPrefix}-plain-${nodes.length}`}>
        {renderAmpersands(plainText, ampersandStyle, `${keyPrefix}-plain-${nodes.length}`)}
      </Fragment>,
    );
  }

  return nodes.length > 0 ? nodes : renderAmpersands(text, ampersandStyle, keyPrefix);
}

export function renderNormalAmpersands(text: string): ReactNode {
  return renderInlineText(text, normalAmpersandStyle, "normal-text");
}

export function renderTitleAmpersands(text: string): ReactNode {
  return renderInlineText(text, {
    fontFamily: '"Helvetica Neue", "Segoe UI", Arial, sans-serif',
    fontWeight: 700,
  }, "title-text");
}
