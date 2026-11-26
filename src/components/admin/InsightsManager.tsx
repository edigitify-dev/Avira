"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowDown, ArrowUp, CalendarDays, ExternalLink, FilePenLine, FileText, Globe, LoaderCircle, Plus, Save, Search, Trash2, Upload } from "lucide-react";
import { insightCategories, type Insight } from "@/lib/insights";
import { articleSlug, type InsightRecord } from "@/lib/cms/insight-model";
import { AdminSelect } from "./AdminSelect";
import { ConfirmDialog } from "./ConfirmDialog";

function newArticle(): Insight {
  return { title: "", slug: "", date: new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date()), category: "Merger Control", summary: "", author: "Avira Editorial", image: "", imageAlt: "", introduction: "", quote: "", takeaways: [], sections: [], sample: false };
}
async function read(response: Response) {
  const data = await response.json();
  if (!response.ok) throw new Error(response.status === 401 ? "Your session has ended. Sign in in another tab, then retry. Your edits are still here." : data.error || "The request couldn't be completed.");
  return data;
}
const dateLabel = (date: string) => new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" }).format(new Date(date));
export function InsightsManager() {
  const [items, setItems] = useState<InsightRecord[]>([]);
  const [record, setRecord] = useState<InsightRecord | null>(null);
  const [form, setForm] = useState<Insight | null>(null);
  const [baseline, setBaseline] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [deleting, setDeleting] = useState<InsightRecord | null>(null);
  const [deleteError, setDeleteError] = useState("");
  const slugTouched = useRef(false);
  const titleInput = useRef<HTMLInputElement>(null);
  const dirty = form !== null && JSON.stringify(form) !== baseline;
  const published = items.filter(item => item.published).length;
  const changed = (item: InsightRecord) => !!item.published && JSON.stringify(item.draft) !== JSON.stringify(item.published);

  async function load() {
    setLoading(true); setError("");
    try { setItems((await read(await fetch("/api/admin/insights", { cache: "no-store" }))).items); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Couldn't load articles."); }
    finally { setLoading(false); }
  }
  useEffect(() => {
    const controller = new AbortController();
    void fetch("/api/admin/insights", { signal: controller.signal, cache: "no-store" }).then(read).then(data => { if (!controller.signal.aborted) setItems(data.items); }).catch(cause => { if (!controller.signal.aborted) setError(cause.message); }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, []);
  useEffect(() => {
    if (dirty) document.documentElement.dataset.cmsUnsaved = "true";
    else delete document.documentElement.dataset.cmsUnsaved;
    const guard = (event: BeforeUnloadEvent) => { if (dirty) { event.preventDefault(); event.returnValue = ""; } };
    window.addEventListener("beforeunload", guard);
    return () => { window.removeEventListener("beforeunload", guard); delete document.documentElement.dataset.cmsUnsaved; };
  }, [dirty]);
  useEffect(() => { if (form) titleInput.current?.focus(); }, [record?.id, form !== null]);
  function open(item: InsightRecord | null) {
    if (dirty && !window.confirm("Discard your unsaved article edits?")) return;
    const next = item ? { ...newArticle(), ...item.draft } : newArticle();
    setRecord(item); setForm(next); setBaseline(JSON.stringify(next)); setError(""); setNotice(""); slugTouched.current = !!item;
  }
  function back() {
    if (dirty && !window.confirm("Discard your unsaved article edits?")) return;
    setForm(null); setRecord(null); setError(""); setNotice("");
  }
  function update<K extends keyof Insight>(key: K, value: Insight[K]) { setForm(current => current ? { ...current, [key]: value } : current); setNotice(""); }
  function apply(item: InsightRecord) {
    setRecord(item); const next = { ...newArticle(), ...item.draft }; setForm(next); setBaseline(JSON.stringify(next));
    setItems(current => [item, ...current.filter(row => row.id !== item.id)]);
  }
  async function save(action: "draft" | "publish" | "unpublish") {
    if (!form || busy) return;
    setBusy(true); setError(""); setNotice("");
    const article = { ...form, takeaways: form.takeaways.map(item => item.trim()).filter(Boolean), sections: form.sections.map(section => ({ ...section, paragraphs: section.paragraphs.map(p => p.trim()).filter(Boolean) })) };
    try {
      const data = await read(await fetch(record ? `/api/admin/insights/${record.id}` : "/api/admin/insights", { method: record ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ article, revision: record?.revision, action }) }));
      apply(data.item);
      setNotice(action === "publish" ? "Article published. The homepage and Insights pages are up to date." : action === "unpublish" ? "Article unpublished. Your draft is still available here." : "Draft saved. It is ready to preview and continue editing.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Couldn't save the article."); }
    finally { setBusy(false); }
  }
  async function remove() {
    if (!deleting || busy) return;
    setBusy(true); setDeleteError("");
    try {
      await read(await fetch(`/api/admin/insights/${deleting.id}`, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ revision: deleting.revision }) }));
      setItems(current => current.filter(item => item.id !== deleting.id));
      if (record?.id === deleting.id) { setForm(null); setRecord(null); }
      setDeleting(null); setNotice("Article deleted.");
    } catch (cause) { setDeleteError(cause instanceof Error ? cause.message : "Couldn't delete the article."); }
    finally { setBusy(false); }
  }
  const filtered = items.filter(item => `${item.draft.title} ${item.draft.category} ${item.draft.author ?? ""}`.toLowerCase().includes(query.toLowerCase()) && (status === "all" || (status === "published" ? !!item.published : !item.published)));
  function moveSection(index: number, direction: number) {
    if (!form) return;
    const sections = [...form.sections]; [sections[index], sections[index + direction]] = [sections[index + direction], sections[index]]; update("sections", sections);
  }
  return <main className="min-h-dvh bg-ivory text-ink">
    <header className="flex flex-wrap items-center justify-between gap-5 border-b border-ink/10 bg-paper px-6 py-7 lg:px-10">
      <div><p className="text-xs font-medium uppercase tracking-[0.2em] text-forest">Editorial studio</p><h1 className="mt-2 font-serif text-4xl">{form ? record ? "Edit insight" : "New insight" : "Insights"}</h1></div>
      {form ? <div className="flex flex-wrap items-center gap-3"><span aria-live="polite" className="text-sm text-ink/55">{busy ? "Saving…" : dirty ? "Unsaved edits" : record ? "All edits saved" : "New article"}</span><button onClick={() => void save("draft")} disabled={busy || (!dirty && !!record)} className="cms-button border border-ink/20 text-forest"><Save size={16} />Save draft</button><button onClick={() => void save("publish")} disabled={busy} className="cms-button bg-forest text-cream hover:bg-ink">{busy ? <LoaderCircle size={16} className="motion-safe:animate-spin" /> : <Upload size={16} />}Publish article</button></div> : <button onClick={() => open(null)} disabled={loading} className="cms-button bg-forest text-cream hover:bg-ink"><Plus size={18} />Add insight</button>}
    </header>
    <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10">
      {(error || notice) && <div role={error ? "alert" : "status"} className={`mb-6 flex flex-wrap items-center justify-between gap-3 border-l-2 px-5 py-4 text-sm leading-6 ${error ? "border-danger bg-paper text-danger" : "border-forest bg-forest/10 text-forest"}`}><p>{error || notice}</p>{error && !form && <button className="underline underline-offset-4" onClick={() => void load()}>Try again</button>}{error && form && record && <button className="underline underline-offset-4" onClick={async () => { if (dirty && !window.confirm("Reload the saved article and discard your unsaved edits?")) return; try { const data = await read(await fetch("/api/admin/insights", { cache: "no-store" })); setItems(data.items); const latest = data.items.find((item: InsightRecord) => item.id === record.id); if (latest) { apply(latest); setError(""); } else { setForm(null); setRecord(null); setError("This article was deleted by another editor."); } } catch (cause) { setError(cause instanceof Error ? cause.message : "Please try again."); } }}>Reload saved article</button>}</div>}
      {form ? <>
        <button onClick={back} disabled={busy} className="mb-7 inline-flex min-h-11 items-center gap-2 text-sm text-forest"><ArrowLeft size={17} />All insights</button>
        <div className="grid items-start gap-7 xl:grid-cols-[minmax(0,1fr)_280px]">
          <div className="space-y-6">
            <div className="border border-ink/10 bg-paper p-6 sm:p-8"><p className="mb-6 text-xs font-medium uppercase tracking-[0.18em] text-forest">Article details</p>
              <label htmlFor="article-title" className="text-sm font-medium">Title</label><input ref={titleInput} id="article-title" value={form.title} maxLength={240} disabled={busy} onChange={event => { const title = event.target.value; setForm(current => current ? { ...current, title, ...(!record && !slugTouched.current ? { slug: articleSlug(title) } : {}) } : current); setNotice(""); }} placeholder="A clear, compelling title" className="cms-control mt-2 w-full font-serif text-2xl" />
              <label htmlFor="article-slug" className="mt-6 block text-sm font-medium">Article URL</label><div className="mt-2 flex items-center border border-ink/20 bg-ivory"><span className="pl-4 text-sm text-ink/45">/insights/</span><input id="article-slug" value={form.slug} readOnly={!!record} disabled={busy} maxLength={120} onChange={event => { slugTouched.current = true; update("slug", event.target.value); }} className="min-h-11 min-w-0 flex-1 bg-transparent px-2 py-3 text-sm outline-offset-2 focus-visible:outline-2 focus-visible:outline-forest" /></div>{record && <p className="mt-2 text-xs leading-5 text-ink/50">The URL stays fixed so existing article links keep working.</p>}
              <label htmlFor="article-summary" className="mt-6 block text-sm font-medium">Summary</label><textarea id="article-summary" value={form.summary} disabled={busy} maxLength={1200} onChange={event => update("summary", event.target.value)} rows={3} placeholder="Introduce the idea in a few considered sentences." className="cms-control mt-2 w-full resize-y text-base leading-7" /><p className="mt-2 text-xs text-ink/50">Appears on article cards and in search descriptions.</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2"><div><label htmlFor="article-author" className="text-sm font-medium">Author</label><input id="article-author" value={form.author ?? "Avira Editorial"} disabled={busy} maxLength={120} onChange={event => update("author", event.target.value)} className="cms-control mt-2 w-full" /></div><div><label htmlFor="article-date" className="text-sm font-medium">Article date</label><input id="article-date" type="date" value={form.date} disabled={busy} onChange={event => update("date", event.target.value)} className="cms-control mt-2 w-full" /></div></div>
              <label htmlFor="article-category" className="mt-6 block text-sm font-medium">Category</label><AdminSelect id="article-category" wrapperClassName="mt-2" value={form.category} disabled={busy} onChange={event => update("category", event.target.value as Insight["category"])}>{insightCategories.slice(1).map(category => <option key={category}>{category}</option>)}</AdminSelect>
            </div>
            <div className="border border-ink/10 bg-paper p-6 sm:p-8"><p className="mb-6 text-xs font-medium uppercase tracking-[0.18em] text-forest">Article content</p>
              <label htmlFor="article-introduction" className="text-sm font-medium">Introduction</label><textarea id="article-introduction" value={form.introduction} maxLength={12000} disabled={busy} onChange={event => update("introduction", event.target.value)} rows={5} className="cms-control mt-2 w-full resize-y text-base leading-7" />
              <label htmlFor="article-takeaways" className="mt-6 block text-sm font-medium">Key takeaways <span className="font-normal text-ink/45">· optional</span></label><textarea id="article-takeaways" value={form.takeaways.join("\n")} disabled={busy} onChange={event => update("takeaways", event.target.value ? event.target.value.split("\n") : [])} rows={4} placeholder="One takeaway per line" className="cms-control mt-2 w-full resize-y text-base leading-7" />
              <label htmlFor="article-quote" className="mt-6 block text-sm font-medium">Pull quote <span className="font-normal text-ink/45">· optional</span></label><textarea id="article-quote" value={form.quote} maxLength={2000} disabled={busy} onChange={event => update("quote", event.target.value)} rows={3} className="cms-control mt-2 w-full resize-y font-serif text-xl leading-7" />
            </div>
            <div className="border border-ink/10 bg-paper p-6 sm:p-8"><div className="mb-6 flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-medium uppercase tracking-[0.18em] text-forest">Article sections</p><p className="mt-2 text-sm text-ink/55">Build a clear reading order with headings and paragraphs.</p></div><button disabled={busy || form.sections.length >= 30} onClick={() => update("sections", [...form.sections, { id: `section-${crypto.randomUUID()}`, heading: "", paragraphs: [] }])} className="cms-button border border-ink/20 text-forest"><Plus size={16} />Add section</button></div>
              {!form.sections.length && <div className="bg-ivory px-6 py-10 text-center"><FileText size={25} strokeWidth={1.3} className="mx-auto text-forest" /><p className="mt-4 text-sm text-ink/60">Add your first section to begin the article.</p></div>}
              <div className="space-y-6">{form.sections.map((section, index) => <div key={section.id} className="border border-ink/15 p-5 sm:p-6"><div className="mb-5 flex items-center justify-between gap-3"><p className="text-sm font-medium text-forest">Section {index + 1}</p><div className="flex gap-1"><button aria-label={`Move section ${index + 1} up`} disabled={busy || index === 0} onClick={() => moveSection(index, -1)} className="cms-button px-3 text-forest"><ArrowUp size={16} /></button><button aria-label={`Move section ${index + 1} down`} disabled={busy || index === form.sections.length - 1} onClick={() => moveSection(index, 1)} className="cms-button px-3 text-forest"><ArrowDown size={16} /></button><button aria-label={`Remove section ${index + 1}`} disabled={busy} onClick={() => update("sections", form.sections.filter((_, i) => i !== index))} className="cms-button px-3 text-danger"><Trash2 size={16} /></button></div></div>
                <label htmlFor={`section-${section.id}-heading`} className="text-sm font-medium">Heading</label><input id={`section-${section.id}-heading`} value={section.heading} maxLength={240} disabled={busy} onChange={event => update("sections", form.sections.map((item, i) => i === index ? { ...item, heading: event.target.value } : item))} className="cms-control mt-2 w-full" />
                <label htmlFor={`section-${section.id}-body`} className="mt-5 block text-sm font-medium">Body</label><textarea id={`section-${section.id}-body`} value={section.paragraphs.join("\n\n")} disabled={busy} onChange={event => update("sections", form.sections.map((item, i) => i === index ? { ...item, paragraphs: event.target.value ? event.target.value.split(/\n\s*\n/) : [] } : item))} rows={8} placeholder="Separate paragraphs with a blank line." className="cms-control mt-2 w-full resize-y text-base leading-7" />
              </div>)}</div>
            </div>
            <div className="border border-ink/10 bg-paper p-6 sm:p-8"><p className="mb-6 text-xs font-medium uppercase tracking-[0.18em] text-forest">Cover image <span className="normal-case tracking-normal text-ink/45">· optional</span></p><label htmlFor="article-image" className="text-sm font-medium">Image URL</label><input id="article-image" value={form.image ?? ""} disabled={busy} maxLength={2000} onChange={event => update("image", event.target.value)} placeholder="https://… or /existing-image.jpg" className="cms-control mt-2 w-full" /><label htmlFor="article-image-alt" className="mt-5 block text-sm font-medium">Alternative text</label><input id="article-image-alt" value={form.imageAlt ?? ""} disabled={busy} maxLength={300} onChange={event => update("imageAlt", event.target.value)} className="cms-control mt-2 w-full" /><p className="mt-2 text-xs leading-5 text-ink/50">Describe the image for visitors using screen readers.</p></div>
          </div>
          <aside className="space-y-5 xl:sticky xl:top-8"><div className="border border-ink/10 bg-paper p-6"><p className="text-xs font-medium uppercase tracking-[0.18em] text-forest">Publication</p><span className={`mt-5 inline-flex px-3 py-1.5 text-xs font-medium ${record?.published ? "bg-forest/10 text-forest" : "bg-ivory text-ink/60"}`}>{record?.published ? "Published" : "Draft"}</span><p className="mt-4 text-sm leading-6 text-ink/60">{record?.published ? "Saved draft edits stay private until you publish them." : "Save a private draft or publish when your article is ready."}</p>
            {record && <a href={`/insights/${record.draft.slug}?preview=1`} target="_blank" rel="noopener noreferrer" className="cms-button mt-5 w-full border border-ink/20 text-forest"><ExternalLink size={16} />Preview saved draft</a>}
            {record?.published && <><a href={`/insights/${record.published.slug}`} target="_blank" rel="noopener noreferrer" className="cms-button mt-2 w-full text-forest"><Globe size={16} />View live article</a><button disabled={busy || dirty} onClick={() => void save("unpublish")} className="cms-button mt-3 w-full border border-ink/20 text-forest">Unpublish article</button>{dirty && <p className="mt-2 text-xs leading-5 text-ink/50">Save edits before unpublishing.</p>}</>}
            <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-ink/65"><input type="checkbox" checked={form.sample ?? false} disabled={busy} onChange={event => update("sample", event.target.checked)} className="mt-1 h-4 w-4 accent-forest" />Label as illustrative sample content</label>
          </div>{record && <div className="border border-ink/10 bg-paper p-6"><p className="text-sm text-ink/55">Updated {dateLabel(record.updatedAt)}</p><button onClick={() => { setDeleting(record); setDeleteError(""); }} disabled={busy} className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm text-danger"><Trash2 size={16} />Delete insight</button></div>}</aside>
        </div>
      </> : <>
        <div className="mb-8 grid grid-cols-3 gap-3 sm:gap-4">{[{ label: "All insights", value: items.length, icon: FilePenLine }, { label: "Published", value: published, icon: Globe }, { label: "Private drafts", value: items.length - published, icon: FileText }].map(stat => <div key={stat.label} className="flex items-center justify-between gap-3 border border-ink/10 bg-paper px-4 py-5 sm:px-6 sm:py-6"><div><p className="min-h-10 text-xs text-ink/55 sm:min-h-0 sm:text-sm">{stat.label}</p><p className="mt-2 font-serif text-3xl text-forest sm:text-4xl">{loading ? "—" : stat.value}</p></div><stat.icon size={25} strokeWidth={1.2} className="hidden text-forest/55 lg:block" /></div>)}</div>
        <div className="border border-ink/10 bg-paper"><div className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-end sm:p-6"><div className="flex-1"><label htmlFor="insight-search" className="text-sm font-medium">Find an insight</label><div className="relative mt-2"><Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/45" /><input id="insight-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search by title, author or category" className="cms-control w-full pl-11" /></div></div><div className="sm:w-48"><label htmlFor="insight-status" className="text-sm font-medium">Publication status</label><AdminSelect id="insight-status" value={status} wrapperClassName="mt-2" onChange={event => setStatus(event.target.value)}><option value="all">All insights</option><option value="published">Published</option><option value="draft">Drafts</option></AdminSelect></div></div>
          <div className="hidden grid-cols-[minmax(0,1fr)_160px_130px_100px] gap-5 bg-ivory px-6 py-3 text-xs font-medium uppercase tracking-[0.13em] text-ink/50 xl:grid"><span>Article</span><span>Publication</span><span>Updated</span><span className="text-right">Manage</span></div>
          {loading ? <div role="status" className="flex min-h-72 items-center justify-center gap-3 text-sm text-forest"><LoaderCircle size={22} className="motion-safe:animate-spin" />Loading insights…</div> : filtered.length ? filtered.map(item => <article key={item.id} className="grid items-center gap-5 border-t border-ink/10 px-5 py-6 sm:px-6 xl:grid-cols-[minmax(0,1fr)_160px_130px_100px]"><div className="min-w-0"><p className="text-xs font-medium uppercase tracking-[0.12em] text-forest">{item.draft.category}</p><button onClick={() => open(item)} className="mt-2 text-left font-serif text-2xl leading-snug outline-offset-4 hover:text-forest focus-visible:outline-2 focus-visible:outline-forest">{item.draft.title}</button><p className="mt-2 line-clamp-2 text-sm leading-6 text-ink/55">{item.draft.summary || "No summary yet. Continue editing this draft."}</p></div><div><span className={`inline-flex px-3 py-1.5 text-xs font-medium ${item.published ? "bg-forest/10 text-forest" : "bg-ivory text-ink/60"}`}>{item.published ? "Published" : "Draft"}</span>{changed(item) && <p className="mt-2 text-xs text-ink/50">Unpublished changes</p>}</div><p className="flex items-center gap-2 text-sm text-ink/55"><CalendarDays size={15} />{dateLabel(item.updatedAt)}</p><div className="flex items-center gap-1 xl:justify-end"><button aria-label={`Edit ${item.draft.title}`} onClick={() => open(item)} className="cms-button px-3 text-forest"><FilePenLine size={18} /></button><button aria-label={`Delete ${item.draft.title}`} onClick={() => { setDeleting(item); setDeleteError(""); }} className="cms-button px-3 text-danger"><Trash2 size={18} /></button></div></article>) : <div className="px-8 py-20 text-center"><FileText size={32} strokeWidth={1.2} className="mx-auto text-forest" /><h2 className="mt-5 font-serif text-3xl">{query || status !== "all" ? "No matching insights." : "Your next perspective starts here."}</h2><p className="mt-3 text-sm text-ink/55">{query || status !== "all" ? "Try another title or publication status." : "Create an article and share your firm's thinking."}</p></div>}
          <div className="border-t border-ink/10 px-6 py-4 text-sm text-ink/55">{filtered.length} {filtered.length === 1 ? "insight" : "insights"}{query || status !== "all" ? " matching your filters" : " in your editorial library"}</div>
        </div>
      </>}
    </div>
    {deleting && <ConfirmDialog title="Delete this insight?" pending={busy} error={deleteError} onCancel={() => { if (!busy) setDeleting(null); }} onConfirm={() => void remove()}><p><strong className="font-medium text-ink">{deleting.draft.title}</strong> will be permanently removed, including its draft and published article. This cannot be undone.</p></ConfirmDialog>}
  </main>;
}
