"use client";

import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, type AnchorHTMLAttributes } from "react";
import { contentHash, safeContentUrl, type ContentField } from "@/lib/cms/content-model";
import { useContent } from "./ContentProvider";

function useField(id: string, original: string, kind: ContentField["kind"], scope?: "site", extra?: { altKey: string; alt: string }) {
  const context = useContent();
  const key = `${scope === "site" ? "site" : context?.path ?? "/"}::${id}:${kind === "link" ? "href" : kind === "image" ? "src" : "text"}`;
  const register = context?.register;
  const active = context?.canvas;
  const altKey = extra?.altKey;
  const alt = extra?.alt;
  useEffect(() => {
    if (!active || !register) return;
    return register({ key, original, value: original, kind, label: kind === "image" ? alt || "Image" : original.slice(0, 90) || "Text", ...(altKey ? { altKey, alt } : {}) });
  }, [active, register, key, original, kind, altKey, alt]);
  return { context, key, value: context?.values[key] ?? original };
}

export function EditableText({ id, children, dynamic = false, scope }: { id: string; children: string; dynamic?: boolean; scope?: "site" }) {
  const original = String(children ?? "");
  const { context, key, value } = useField(dynamic ? `${id}-${contentHash(original)}` : id, original, "text", scope);
  const ref = useRef<HTMLSpanElement>(null);
  const start = useRef(value);
  const initial = useRef(value);
  useLayoutEffect(() => {
    if (ref.current && (!document.hasFocus() || document.activeElement !== ref.current) && ref.current.textContent !== value) ref.current.textContent = value;
  }, [value, context?.editing]);
  if (!context?.editing) return <span>{value}</span>;
  return <span ref={ref} data-cms-key={key} data-cms-selected={context.selected === key || undefined} contentEditable suppressContentEditableWarning spellCheck
    role="textbox" aria-label={`Edit ${original.slice(0, 60)}`} aria-multiline="true" tabIndex={0}
    onClick={event => { event.preventDefault(); event.stopPropagation(); context.select(key); }}
    onFocus={() => { start.current = value; context.select(key); }}
    onInput={event => context.change(key, event.currentTarget.innerText)}
    onBlur={event => { event.currentTarget.textContent = event.currentTarget.innerText; }}
    onDrop={event => event.preventDefault()}
    onKeyDown={event => { event.stopPropagation(); if (event.key === "Escape") { event.currentTarget.textContent = start.current; context.change(key, start.current); event.currentTarget.blur(); } }}
    onPaste={event => {
      event.preventDefault();
      const text = event.clipboardData.getData("text/plain");
      const selection = window.getSelection();
      if (!selection?.rangeCount) return;
      const range = selection.getRangeAt(0); range.deleteContents(); const node = document.createTextNode(text); range.insertNode(node); range.setStartAfter(node); range.collapse(true); selection.removeAllRanges(); selection.addRange(range);
      context.change(key, event.currentTarget.innerText);
    }}
  >{initial.current}</span>;
}

type EditableLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { contentId: string; href: string; scope?: "site"; nextLink?: boolean };
export function EditableLink({ contentId, href, scope, nextLink, children, onClick, ...props }: EditableLinkProps) {
  const { context, key, value } = useField(`${contentId}-${contentHash(href)}`, href, "link", scope);
  const safeHref = safeContentUrl(value) ? value : href;
  const common = { ...props, href: safeHref, "data-cms-key": context?.editing ? key : undefined, "data-cms-selected": context?.selected === key || undefined,
    onClick: (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (context?.editing) { event.preventDefault(); context.select(key); }
      else if (!context?.canvas) onClick?.(event);
    } };
  return nextLink ? <Link {...common}>{children}</Link> : <a {...common}>{children}</a>;
}

export function EditableImage({ contentId, scope, ...props }: ImageProps & { contentId: string; scope?: "site" }) {
  const original = typeof props.src === "string" ? props.src : "";
  const context = useContent();
  const fieldId = `${contentId}-${contentHash(original)}`;
  const altKey = `${scope === "site" ? "site" : context?.path ?? "/"}::${fieldId}:alt`;
  const field = useField(fieldId, original, "image", scope, { altKey, alt: props.alt });
  const changed = field.value !== original && safeContentUrl(field.value, true);
  return <Image {...props} src={changed ? field.value : props.src} alt={context?.values[altKey] ?? props.alt} unoptimized={changed || props.unoptimized}
    data-cms-key={context?.editing ? field.key : undefined} data-cms-selected={context?.selected === field.key || undefined}
    onClick={event => { if (context?.editing) { event.preventDefault(); event.stopPropagation(); context.select(field.key); } else props.onClick?.(event); }} />;
}
