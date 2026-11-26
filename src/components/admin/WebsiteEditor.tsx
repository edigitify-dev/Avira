"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, ExternalLink, FileText, ImageIcon, Link2, LoaderCircle, Monitor, MousePointer2, PanelRightClose, PanelRightOpen, Redo2, RotateCcw, Save, Search, Smartphone, Type, Undo2, Upload } from "lucide-react";
import { AdminSelect } from "./AdminSelect";
import { type EditablePage } from "@/lib/cms/page-catalog";
import { type ContentDocument, type ContentField, type ContentValues } from "@/lib/cms/content-model";

const equal = (a: ContentValues, b: ContentValues) => JSON.stringify(Object.entries(a).sort()) === JSON.stringify(Object.entries(b).sort());
async function responseData(response: Response): Promise<ContentDocument> {
  if (response.status === 401) throw new Error("Your session has ended. Open the sign-in page in another tab, then try again. Your edits are still here.");
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "The content couldn't be loaded.");
  return result;
}

export function WebsiteEditor({ pages: editablePages }: { pages: EditablePage[] }) {
  const [document, setDocument] = useState<ContentDocument | null>(null);
  const [history, setHistory] = useState<ContentValues[]>([{}]);
  const [position, setPosition] = useState(0);
  const [path, setPath] = useState("/");
  const [fields, setFields] = useState<ContentField[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [editing, setEditing] = useState(true);
  const [mobile, setMobile] = useState(false);
  const [inspector, setInspector] = useState(true);
  const [search, setSearch] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [reload, setReload] = useState(0);
  const [scale, setScale] = useState(0.65);
  const [height, setHeight] = useState(850);
  const frame = useRef<HTMLIFrameElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const values = history[position] ?? {};
  const current = useRef(values);
  const draftLoaded = useRef(false);
  const unsaved = document !== null && !equal(values, document.draft);
  const unpublished = document !== null && !equal(values, document.published);
  const page = editablePages.find(item => item.path === path)!;
  const field = fields.find(item => item.key === selected);

  useEffect(() => { current.current = values; }, [values]);
  const commit = useCallback((next: ContentValues) => {
    if (equal(current.current, next)) return;
    current.current = next;
    setHistory(items => [...items.slice(0, position + 1), next].slice(-100));
    setPosition(Math.min(position + 1, 99));
    setNotice("");
  }, [position]);
  const update = useCallback((key: string, value: string) => commit({ ...current.current, [key]: value }), [commit]);
  const send = useCallback((message: Record<string, unknown>) => frame.current?.contentWindow?.postMessage({ source: "avira-editor", path, ...message }, window.location.origin), [path]);

  async function load() {
    setError("");
    try {
      const result = await responseData(await fetch("/api/admin/content", { cache: "no-store" }));
      setDocument(result); setHistory([result.draft]); setPosition(0); current.current = result.draft; draftLoaded.current = true;
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Please try again."); }
  }
  useEffect(() => {
    const controller = new AbortController();
    void fetch("/api/admin/content", { signal: controller.signal, cache: "no-store" }).then(responseData).then(result => {
      if (!controller.signal.aborted) { setDocument(result); setHistory([result.draft]); setPosition(0); current.current = result.draft; draftLoaded.current = true; }
    }).catch(cause => { if (!controller.signal.aborted) setError(cause instanceof Error ? cause.message : "Please try again."); });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow || event.data?.source !== "avira-canvas" || event.data.path !== path) return;
      if (event.data.type === "ready") { setReady(true); send({ type: "sync", values: current.current, editing }); }
      if (event.data.type === "fields") setFields(event.data.fields);
      if (event.data.type === "selected") { setSelected(event.data.key); setInspector(true); }
      if (event.data.type === "change" && draftLoaded.current) update(event.data.key, event.data.value);
      if (event.data.type === "error") setError(event.data.message);
    };
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, [path, editing, update, send]);
  useEffect(() => { if (ready) send({ type: "sync", values, editing }); }, [values, editing, ready, send]);
  useEffect(() => {
    if (unsaved) window.document.documentElement.dataset.cmsUnsaved = "true";
    else delete window.document.documentElement.dataset.cmsUnsaved;
    const beforeUnload = (event: BeforeUnloadEvent) => { if (unsaved) { event.preventDefault(); event.returnValue = ""; } };
    window.addEventListener("beforeunload", beforeUnload);
    return () => { window.removeEventListener("beforeunload", beforeUnload); delete window.document.documentElement.dataset.cmsUnsaved; };
  }, [unsaved]);
  useEffect(() => {
    if (!container.current) return;
    const resize = new ResizeObserver(([entry]) => {
      const width = mobile ? 390 : 1280;
      const ratio = Math.min(1, Math.max(0.15, (entry.contentRect.width - 40) / width));
      setScale(ratio); setHeight(Math.max(500, (entry.contentRect.height - 40) / ratio));
    });
    resize.observe(container.current); return () => resize.disconnect();
  }, [mobile, inspector, document]);

  useEffect(() => {
    if (!document || ready) return;
    const timeout = setTimeout(() => setError("The canvas is taking longer than expected. Reload the saved version to reconnect."), 30000);
    return () => clearTimeout(timeout);
  }, [document, ready, path, reload]);

  async function save(action: "draft" | "publish") {
    if (!document || busy) return;
    setBusy(true); setError(""); setNotice("");
    try {
      const result = await responseData(await fetch("/api/admin/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ values: current.current, revision: document.revision, action }) }));
      setDocument(result);
      setNotice(action === "publish" ? "Changes published. Your website is up to date." : "Draft saved. Your live website is unchanged.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Your changes couldn't be saved."); }
    finally { setBusy(false); }
  }
  function select(key: string) { setSelected(key); send({ type: "select", key }); }
  function switchPage(next: string) {
    setPath(next); setReady(false); setSelected(null); setFields([]); setSearch(""); setError("");
  }
  const selectedValue = field ? values[field.key] ?? field.original : "";

  return <main className="flex min-h-[calc(100dvh-4.5rem)] flex-col lg:h-dvh lg:min-h-[48rem]">
    <header className="flex flex-wrap items-center justify-between gap-5 bg-paper px-5 py-6 xl:px-8">
      <div><p className="text-xs font-medium uppercase tracking-[0.2em] text-forest">Content management</p><h1 className="mt-2 font-serif text-3xl">Website pages</h1></div>
      <div className="flex flex-wrap items-center gap-3">
        <span className="mr-2 text-sm text-ink/60" aria-live="polite">{busy ? "Saving changes…" : !document ? "Connecting…" : unsaved ? "Unsaved edits" : unpublished ? "Draft saved" : "All changes published"}</span>
        <button className="cms-button border border-ink/20 text-forest hover:bg-ivory" disabled={!document || !unsaved || busy} onClick={() => void save("draft")}><Save size={16} />Save draft</button>
        <button className="cms-button bg-forest text-cream hover:bg-ink" disabled={!document || !unpublished || busy} onClick={() => void save("publish")}>{busy ? <LoaderCircle size={16} className="motion-safe:animate-spin" /> : <Upload size={16} />}Publish changes</button>
      </div>
    </header>
    {(error || notice) && <div role={error ? "alert" : "status"} className={`flex flex-wrap items-center justify-between gap-3 px-6 py-3 text-sm ${error ? "bg-ink text-cream" : "bg-forest/10 text-forest"}`}><p>{error || notice}</p>{error && <button className="underline underline-offset-4" onClick={() => { if (!unsaved || window.confirm("Reload the saved draft and discard your unsaved edits?")) { void load(); setReload(n => n + 1); setReady(false); } }}>Reload saved version</button>}</div>}
    <div className="flex min-h-0 flex-1 flex-col border-t border-ink/10 lg:flex-row">
      <aside className="w-full shrink-0 bg-paper px-4 py-5 lg:w-48 lg:overflow-y-auto lg:border-r lg:border-ink/10 xl:w-52" aria-label="Website pages">
        <div className="relative lg:hidden"><label htmlFor="page-select" className="sr-only">Select a page</label><AdminSelect id="page-select" value={path} onChange={event => switchPage(event.target.value)} className="w-full">{editablePages.map(item => <option value={item.path} key={item.path}>{item.title}</option>)}</AdminSelect></div>
        <div className="hidden lg:block">{["Main pages", "Legal"].map(group => <div key={group} className="mb-7"><p className="mb-3 px-3 text-xs font-medium uppercase tracking-[0.15em] text-ink/50">{group}</p><div className="space-y-1">{editablePages.filter(item => item.group === group).map(item => <button key={item.path} onClick={() => switchPage(item.path)} aria-current={path === item.path ? "page" : undefined} className={`flex w-full items-start gap-2.5 px-3 py-3 text-left text-sm leading-5 outline-offset-[-2px] focus-visible:outline-2 focus-visible:outline-forest ${path === item.path ? "bg-forest/10 font-medium text-forest" : "text-ink/65 hover:bg-ivory hover:text-ink"}`}><FileText size={16} strokeWidth={1.5} className="mt-0.5 shrink-0" /><span>{item.title}</span></button>)}</div></div>)}</div>
        <p className="hidden px-3 text-xs leading-6 text-ink/55 lg:block">Navigation and footer edits apply across the website.</p>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 bg-paper px-4 py-3">
          <div className="flex min-w-0 items-center gap-3"><span className="max-w-40 truncate text-sm font-medium">{page.title}</span><a href={path} target="_blank" rel="noopener noreferrer" aria-label={`Open ${page.title} on the live website`} className="p-2 text-forest"><ExternalLink size={15} /></a></div>
          <div className="flex flex-wrap items-center gap-1">
            <button className={`cms-button px-3 ${editing ? "bg-forest/10 text-forest" : "text-ink/55"}`} aria-pressed={editing} onClick={() => setEditing(!editing)}><MousePointer2 size={16} />{editing ? "Edit" : "Preview"}</button>
            <div className="mx-2 h-5 w-px bg-ink/15" />
            <button aria-label="Desktop preview" aria-pressed={!mobile} className={`cms-button px-3 ${!mobile ? "text-forest" : "text-ink/40"}`} onClick={() => setMobile(false)}><Monitor size={18} /></button>
            <button aria-label="Mobile preview" aria-pressed={mobile} className={`cms-button px-3 ${mobile ? "text-forest" : "text-ink/40"}`} onClick={() => setMobile(true)}><Smartphone size={18} /></button>
            <button aria-label="Undo edit" className="cms-button px-3 text-forest" disabled={position === 0 || busy} onClick={() => setPosition(n => n - 1)}><Undo2 size={17} /></button>
            <button aria-label="Redo edit" className="cms-button px-3 text-forest" disabled={position >= history.length - 1 || busy} onClick={() => setPosition(n => n + 1)}><Redo2 size={17} /></button>
            <button aria-label={inspector ? "Hide content panel" : "Show content panel"} aria-pressed={inspector} className="cms-button px-3 text-forest" onClick={() => setInspector(!inspector)}>{inspector ? <PanelRightClose size={18} /> : <PanelRightOpen size={18} />}</button>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 px-5 py-3 text-xs text-ink/60"><span>{editing ? "Click any text to edit. Select images and links for their settings." : "Preview your draft. Forms and navigation stay on this page."}</span><span className="shrink-0">{mobile ? "390" : "1280"} px · {Math.round(scale * 100)}%</span></div>
        <div ref={container} className="relative min-h-[70dvh] flex-1 overflow-hidden bg-cream/50 lg:min-h-0" style={{ backgroundImage: "radial-gradient(#6f8c8933 1px, transparent 1px)", backgroundSize: "16px 16px" }}>
          {document && <div className="absolute left-1/2 top-5 -translate-x-1/2 overflow-hidden border border-ink/15 bg-paper shadow-[0_6px_30px_rgba(31,43,42,0.07)]" style={{ width: (mobile ? 390 : 1280) * scale, height: height * scale }}>
            <iframe key={`${path}-${reload}`} ref={frame} title={`${page.title} editable page canvas`} src={`${path}?cmsCanvas=1`} className={`block border-0 bg-paper ${busy ? "pointer-events-none" : ""}`} style={{ width: mobile ? 390 : 1280, height, transform: `scale(${scale})`, transformOrigin: "top left", visibility: ready ? "visible" : "hidden" }} />
          </div>}
          {(!document || !ready) && <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-forest"><LoaderCircle size={24} strokeWidth={1.5} className="motion-safe:animate-spin" /><p className="text-sm">{!document ? "Connecting to your website…" : "Preparing the page canvas…"}</p></div>}
        </div>
      </div>
      {inspector && <aside className="w-full shrink-0 overflow-y-auto border-t border-ink/10 bg-paper p-5 lg:w-64 lg:border-l lg:border-t-0 xl:w-72" aria-label="Content inspector">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-forest">Content inspector</p>
        {field ? <div className="mt-6">
          <div className="flex items-center gap-2 text-sm font-medium">{field.kind === "image" ? <ImageIcon size={18} /> : field.kind === "link" ? <Link2 size={18} /> : <Type size={18} />}{field.kind === "text" ? "Text content" : field.kind === "image" ? "Image settings" : "Link destination"}</div>
          {field.key.startsWith("site::") && <p className="mt-3 bg-ivory px-3 py-2 text-xs leading-5 text-forest">Shared content · updates every page.</p>}
          <label htmlFor="field-value" className="mt-5 block text-sm text-ink/65">{field.kind === "text" ? "Content" : field.kind === "image" ? "Image URL" : "Destination URL"}</label>
          <textarea id="field-value" value={selectedValue} disabled={busy} maxLength={20000} rows={field.kind === "text" ? 7 : 3} onChange={event => update(field.key, event.target.value)} className="cms-control mt-2 w-full resize-y leading-6" />
          {field.kind === "image" && field.altKey && <><label htmlFor="image-alt" className="mt-5 block text-sm text-ink/65">Alternative text</label><textarea id="image-alt" rows={3} value={values[field.altKey] ?? field.alt ?? ""} disabled={busy} onChange={event => update(field.altKey!, event.target.value)} className="cms-control mt-2 w-full resize-y leading-6" /><p className="mt-2 text-xs leading-5 text-ink/55">Describe the image for visitors using screen readers. Use a local path or HTTPS image address.</p></>}
          {field.kind === "link" && <p className="mt-2 text-xs leading-5 text-ink/55">Use a page path, web address, mailto: or tel: link. Click its text on the canvas to edit the label.</p>}
          <button className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm text-forest disabled:opacity-40" disabled={!(field.key in values || (field.altKey && field.altKey in values)) || busy} onClick={() => { const next = { ...current.current }; delete next[field.key]; if (field.altKey) delete next[field.altKey]; commit(next); }}><RotateCcw size={15} />Restore original</button>
        </div> : <div className="mt-7 bg-ivory px-4 py-6"><MousePointer2 size={24} strokeWidth={1.25} className="text-forest" /><h2 className="mt-4 font-serif text-2xl">Make it yours.</h2><p className="mt-3 text-sm leading-6 text-ink/65">Select content on the canvas to edit it in place. Choose a field below to jump straight to it.</p></div>}
        <div className="mt-8"><label htmlFor="field-search" className="text-sm font-medium">Page content <span className="text-ink/45">({fields.length})</span></label><div className="relative mt-3"><Search size={15} className="absolute left-3 top-3.5 text-ink/45" /><input id="field-search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Find content…" className="cms-control w-full" style={{ paddingLeft: "2.25rem" }} /></div>
          <div className="mt-3 max-h-80 space-y-1 overflow-y-auto lg:max-h-none lg:overflow-visible">{fields.filter(item => `${item.label} ${values[item.key] ?? item.original}`.toLowerCase().includes(search.toLowerCase())).map(item => <button key={item.key} className={`flex w-full items-start gap-2.5 px-3 py-3 text-left text-sm leading-5 ${selected === item.key ? "bg-forest/10 text-forest" : "text-ink/65 hover:bg-ivory"}`} onClick={() => select(item.key)}>{item.kind === "image" ? <ImageIcon size={15} className="mt-0.5 shrink-0" /> : item.kind === "link" ? <Link2 size={15} className="mt-0.5 shrink-0" /> : <Type size={15} className="mt-0.5 shrink-0" />}<span className="line-clamp-2">{item.label}</span></button>)}{ready && !fields.length && <p className="py-4 text-sm text-ink/55">No editable fields on this page.</p>}</div>
        </div>
      </aside>}
    </div>
    <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-ink/10 bg-paper px-6 py-3 text-xs text-ink/55"><span className="flex items-center gap-2"><Check size={14} />Publishing applies your draft changes across all pages.</span><span>{document?.updatedAt ? `Last saved ${new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" }).format(new Date(document.updatedAt))} IST` : "Your website, thoughtfully managed."}</span></footer>
  </main>;
}
