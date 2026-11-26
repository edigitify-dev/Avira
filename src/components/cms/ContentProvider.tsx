"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { ContentField, ContentValues } from "@/lib/cms/content-model";

type Context = {
  values: ContentValues; canvas: boolean; editing: boolean; selected: string | null; path: string;
  register: (field: ContentField) => () => void;
  select: (key: string) => void; change: (key: string, value: string) => void;
};
const ContentContext = createContext<Context | null>(null);
export const useContent = () => useContext(ContentContext);

export function ContentProvider({ initial, children }: { initial: ContentValues; children: React.ReactNode }) {
  const path = usePathname();
  const [overrides, setOverrides] = useState<ContentValues | null>(null);
  const [canvas, setCanvas] = useState(false);
  const [editing, setEditing] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const fields = useRef(new Map<string, ContentField>());
  const values = overrides ?? initial;
  const latest = useRef(values);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => { latest.current = values; }, [values]);

  const sendFields = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      window.parent.postMessage({ source: "avira-canvas", type: "fields", path, fields: [...fields.current.values()].map(field => ({ ...field, value: latest.current[field.key] ?? field.original, alt: field.altKey ? latest.current[field.altKey] ?? field.alt : field.alt })) }, window.location.origin);
    }, 60);
  }, [path]);

  const register = useCallback((field: ContentField) => {
    fields.current.set(field.key, field);
    sendFields();
    return () => { fields.current.delete(field.key); sendFields(); };
  }, [sendFields]);

  useEffect(() => {
    if (path.startsWith("/admin") || window.parent === window || new URLSearchParams(window.location.search).get("cmsCanvas") !== "1") return;
    const controller = new AbortController();
    void fetch("/api/admin/content", { signal: controller.signal, cache: "no-store" }).then(async response => {
      if (!response.ok) throw new Error("Please sign in again to edit this page.");
      const document = await response.json();
      if (controller.signal.aborted) return;
      setOverrides(document.draft);
      setCanvas(true);
    }).catch(error => {
      if (!controller.signal.aborted) window.parent.postMessage({ source: "avira-canvas", type: "error", path, message: error.message }, window.location.origin);
    });
    return () => controller.abort();
  }, [path]);

  useEffect(() => {
    if (!canvas) return;
    document.documentElement.dataset.cmsCanvas = "true";
    if (editing) document.documentElement.dataset.cmsEditing = "true";
    else delete document.documentElement.dataset.cmsEditing;
    sendFields();
    const receive = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== window.parent || event.data?.source !== "avira-editor" || event.data.path !== path) return;
      if (event.data.type === "sync") { setOverrides(event.data.values); setEditing(event.data.editing); sendFields(); }
      if (event.data.type === "select") {
        setSelected(event.data.key);
        const element = [...document.querySelectorAll<HTMLElement>("[data-cms-key]")].find(node => node.dataset.cmsKey === event.data.key);
        element?.scrollIntoView({ behavior: "instant", block: "center" });
        if (element?.isContentEditable) element.focus({ preventScroll: true });
      }
    };
    const click = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const link = target?.closest("a");
      if (link) { event.preventDefault(); if (editing && !target?.closest("[data-cms-key]")) event.stopPropagation(); }
      if (editing && target?.closest("button:not([data-cms-allow])") && !target.closest("[contenteditable]")) { event.preventDefault(); event.stopPropagation(); }
    };
    const submit = (event: Event) => { event.preventDefault(); event.stopPropagation(); };
    window.addEventListener("message", receive);
    window.parent.postMessage({ source: "avira-canvas", type: "ready", path }, window.location.origin);
    document.addEventListener("click", click, true);
    document.addEventListener("submit", submit, true);
    return () => {
      delete document.documentElement.dataset.cmsCanvas;
      delete document.documentElement.dataset.cmsEditing;
      window.removeEventListener("message", receive);
      document.removeEventListener("click", click, true);
      document.removeEventListener("submit", submit, true);
    };
  }, [canvas, editing, path, sendFields]);

  const select = useCallback((key: string) => {
    setSelected(key);
    window.parent.postMessage({ source: "avira-canvas", type: "selected", path, key }, window.location.origin);
  }, [path]);
  const change = useCallback((key: string, value: string) => {
    setOverrides(current => ({ ...(current ?? latest.current), [key]: value }));
    window.parent.postMessage({ source: "avira-canvas", type: "change", path, key, value }, window.location.origin);
  }, [path]);
  const context = useMemo(() => ({ values, path, canvas, editing: canvas && editing, selected, register, select, change }), [values, path, canvas, editing, selected, register, select, change]);
  return <ContentContext.Provider value={context}>{children}</ContentContext.Provider>;
}
