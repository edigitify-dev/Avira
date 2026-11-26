"use client";

import { useEffect, useRef, useState } from "react";
import { Archive, ArrowLeft, Building2, Check, ChevronLeft, ChevronRight, Inbox, LoaderCircle, Mail, MailCheck, MailOpen, Phone, RefreshCw, Search, Trash2, X } from "lucide-react";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { enquiryStatuses, statusLabels, type Enquiry, type EnquiryStatus, type InboxData } from "@/lib/cms/types";
import { emailLink } from "@/lib/cms/links";
import { AdminSelect } from "./AdminSelect";
import { ConfirmDialog } from "./ConfirmDialog";

const formatDate = (date: string, detailed = false) => new Intl.DateTimeFormat("en-IN", {
  day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata",
  ...(detailed ? { hour: "numeric", minute: "2-digit", timeZoneName: "short" } : {}),
}).format(new Date(date));
const initials = (name: string) => name.trim().split(/\s+/).slice(0, 2).map(part => part[0]).join("").toUpperCase();
const statusClass: Record<EnquiryStatus, string> = { new: "bg-forest text-cream", read: "bg-forest/10 text-forest", replied: "bg-forest/10 text-forest", archived: "bg-ivory text-ink/55" };
async function readResponse(response: Response) {
  const result = await response.json();
  if (!response.ok) throw new Error(response.status === 401 ? "Your session has ended. Please sign in again." : result.error || "We couldn't complete your request.");
  return result;
}

export function EnquiryInbox({ username }: { username: string }) {
  const [data, setData] = useState<InboxData | null>(null);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [selected, setSelected] = useState<Enquiry | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<Enquiry | null>(null);
  const [deleteError, setDeleteError] = useState("");
  const detailHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => { if (window.innerWidth < 1024) detailHeading.current?.focus(); }, [selected?.id]);
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setLoading(true); setError("");
      try {
        const params = new URLSearchParams({ q: query, status, page: String(page) });
        const result: InboxData = await readResponse(await fetch(`/api/admin/enquiries?${params}`, { signal: controller.signal, cache: "no-store" }));
        if (!controller.signal.aborted) {
          const lastPage = Math.max(1, Math.ceil(result.total / result.pageSize));
          if (result.page > lastPage) { setPage(lastPage); return; }
          setData(result);
          setSelected(current => current ? result.items.find(item => item.id === current.id) ?? null : null);
        }
      } catch (cause) { if (!controller.signal.aborted) setError(cause instanceof Error ? cause.message : "The inbox couldn't be loaded."); }
      finally { if (!controller.signal.aborted) setLoading(false); }
    }
    void load(); return () => controller.abort();
  }, [query, status, page, refresh]);

  async function changeStatus(item: Enquiry, nextStatus: EnquiryStatus) {
    if (saving) return;
    setSaving(true); setError(""); setNotice("");
    try {
      const result: { item: Enquiry } = await readResponse(await fetch(`/api/admin/enquiries/${item.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: nextStatus }) }));
      setSelected(current => current?.id === item.id ? result.item : current);
      setData(current => current ? { ...current, items: current.items.map(row => row.id === item.id ? result.item : row) } : current);
      setRefresh(value => value + 1);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "The status couldn't be updated."); }
    finally { setSaving(false); }
  }
  function openEnquiry(item: Enquiry) {
    if (saving || loading) return;
    setSelected(item); setNotice("");
    if (item.status === "new") void changeStatus(item, "read");
  }
  async function remove() {
    if (!deleting || saving) return;
    setSaving(true); setDeleteError("");
    try {
      await readResponse(await fetch(`/api/admin/enquiries/${deleting.id}`, { method: "DELETE" }));
      setSelected(current => current?.id === deleting.id ? null : current);
      setData(current => current ? { ...current, items: current.items.filter(item => item.id !== deleting.id), total: Math.max(0, current.total - 1) } : current);
      setDeleting(null); setNotice("Enquiry permanently deleted."); setRefresh(value => value + 1);
    } catch (cause) { setDeleteError(cause instanceof Error ? cause.message : "The enquiry couldn't be deleted."); }
    finally { setSaving(false); }
  }
  const pages = Math.max(1, Math.ceil((data?.total ?? 0) / (data?.pageSize ?? 20)));
  const buttonClass = "cms-button border border-ink/20 text-forest hover:bg-ivory";

  return <main className="min-h-dvh bg-ivory text-ink">
    <header className="flex flex-wrap items-center justify-between gap-5 border-b border-ink/10 bg-paper px-6 py-7 lg:px-10">
      <div><p className="text-xs font-medium uppercase tracking-[0.2em] text-forest">Client correspondence</p><h1 className="mt-2 font-serif text-4xl">Enquiries</h1></div>
      <div className="flex items-center gap-3 text-sm text-ink/55"><Mail size={19} strokeWidth={1.4} /><span>Contact Us inbox<span className="mt-1 block text-xs text-ink/45">Managed by {username}</span></span></div>
    </header>
    <AnimatedSection as="div" variant="fadeIn" amount={0.02} className="mx-auto max-w-[1600px] px-5 py-8 sm:px-8 lg:px-10">
      <dl className="grid grid-cols-3 gap-3 sm:gap-4" aria-label="Enquiry summary">
        {[{ label: "Total enquiries", value: data?.counts.total, icon: Inbox }, { label: "Awaiting review", value: data?.counts.new, icon: MailOpen }, { label: "Replied", value: data?.counts.replied, icon: MailCheck }].map(stat => <div key={stat.label} className="flex items-center justify-between gap-3 border border-ink/10 bg-paper px-4 py-5 sm:px-6 sm:py-6"><div><dt className="min-h-10 text-xs text-ink/55 sm:min-h-0 sm:text-sm">{stat.label}</dt><dd className="mt-2 font-serif text-3xl text-forest sm:text-4xl">{stat.value ?? "—"}</dd></div><stat.icon aria-hidden size={25} strokeWidth={1.2} className="hidden text-forest/55 lg:block" /></div>)}
      </dl>
      <div className="mt-7 flex flex-col gap-5 border border-ink/10 bg-paper p-5 xl:flex-row xl:items-end sm:p-6">
        <form onSubmit={event => { event.preventDefault(); setQuery(search.trim()); setPage(1); setSelected(null); }} className="flex-1">
          <label htmlFor="enquiry-search" className="text-sm font-medium">Find a conversation</label>
          <div className="mt-2 flex min-h-12 items-center border border-ink/20 bg-paper focus-within:outline-2 focus-within:outline-forest"><Search aria-hidden size={18} strokeWidth={1.5} className="ml-4 shrink-0 text-ink/45" /><input id="enquiry-search" type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Name, email, organisation or message" maxLength={160} className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none" /><button type="submit" className="min-h-12 px-4 text-sm font-medium text-forest outline-offset-[-2px] hover:bg-ivory focus-visible:outline-2 focus-visible:outline-forest">Search</button></div>
        </form>
        <div className="flex flex-wrap items-end gap-3"><div className="min-w-44 flex-1 xl:w-52"><label htmlFor="enquiry-status" className="text-sm font-medium">Filter by status</label><AdminSelect id="enquiry-status" value={status} wrapperClassName="mt-2" className="min-h-12" onChange={event => { setStatus(event.target.value); setPage(1); setSelected(null); }}><option value="">All enquiries</option>{enquiryStatuses.map(value => <option key={value} value={value}>{statusLabels[value]}</option>)}</AdminSelect></div><button onClick={() => setRefresh(value => value + 1)} disabled={loading || saving} className={`${buttonClass} min-h-12`}><RefreshCw aria-hidden size={17} strokeWidth={1.5} />Refresh</button></div>
      </div>
      {(error || notice) && <div role={error ? "alert" : "status"} className={`mt-5 flex flex-wrap items-center justify-between gap-3 border-l-2 bg-paper px-5 py-4 text-sm leading-6 ${error ? "border-danger text-danger" : "border-forest text-forest"}`}><p>{error || notice}</p>{error && <button onClick={() => setRefresh(value => value + 1)} className="underline underline-offset-4">Try again</button>}</div>}
      <div className="mt-7 grid items-stretch border border-ink/10 bg-paper lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)]">
        <div className={`${selected ? "hidden lg:flex" : "flex"} min-w-0 flex-col lg:border-r lg:border-ink/10`} aria-busy={loading}>
          <div className="flex flex-wrap items-center justify-between gap-2 bg-ivory/60 px-5 py-4 text-sm text-ink/55 sm:px-6"><p aria-live="polite">{loading ? "Loading enquiries…" : `${data?.total ?? 0} ${data?.total === 1 ? "conversation" : "conversations"}`}</p>{(query || status) && <button onClick={() => { setQuery(""); setSearch(""); setStatus(""); setPage(1); setSelected(null); }} className="text-forest underline underline-offset-4">Clear filters</button>}</div>
          <div className="min-h-64 flex-1 lg:max-h-[40rem] lg:overflow-y-auto">
            {loading && !data && <div role="status" className="flex min-h-72 items-center justify-center gap-3 text-sm text-forest"><LoaderCircle size={22} className="motion-safe:animate-spin" />Loading conversations…</div>}
            {!loading && !error && data?.items.length === 0 && <div className="flex min-h-96 flex-col items-center justify-center px-8 py-16 text-center"><Inbox aria-hidden size={32} strokeWidth={1.2} className="text-forest" /><h2 className="mt-5 font-serif text-3xl">{query || status ? "No matching enquiries." : "A new conversation starts here."}</h2><p className="mt-4 max-w-sm text-sm leading-7 text-ink/55">{query || status ? "Try another search or choose a different status." : "Messages from your contact form will appear here, ready for a considered response."}</p></div>}
            {data?.items.map(item => <button key={item.id} onClick={() => openEnquiry(item)} disabled={saving || loading} aria-pressed={selected?.id === item.id} className={`block w-full border-t border-ink/10 border-l-[3px] px-5 py-6 text-left outline-offset-[-3px] focus-visible:outline-2 focus-visible:outline-forest disabled:opacity-60 sm:px-6 ${selected?.id === item.id ? "border-l-forest bg-forest/[0.055]" : "border-l-transparent hover:bg-ivory/60"}`}>
              <div className="flex items-start gap-3"><span className={`flex h-10 w-10 shrink-0 items-center justify-center font-serif text-lg ${item.status === "new" ? "bg-forest text-cream" : "bg-ivory text-forest"}`}>{initials(item.name)}</span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1"><h2 className={`break-words text-sm ${item.status === "new" ? "font-semibold" : "font-medium"}`}>{item.name}</h2><time dateTime={item.createdAt} className="text-xs text-ink/45">{formatDate(item.createdAt)}</time></div><p className="mt-1 truncate text-sm text-ink/50">{item.organisation || item.email}</p></div></div>
              <p className="mt-4 line-clamp-2 text-sm leading-6 text-ink/65">{item.message}</p><span className={`mt-4 inline-flex px-2.5 py-1 text-xs font-medium ${statusClass[item.status]}`}>{statusLabels[item.status]}</span>
            </button>)}
          </div>
          {data && data.total > 0 && <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 px-5 py-4 text-sm sm:px-6"><span className="text-ink/55">Page {page} of {pages}</span><div className="flex gap-2"><button aria-label="Previous page" disabled={page <= 1 || loading || saving} onClick={() => { setPage(value => value - 1); setSelected(null); }} className={`${buttonClass} px-3`}><ChevronLeft aria-hidden size={17} /></button><button aria-label="Next page" disabled={page >= pages || loading || saving} onClick={() => { setPage(value => value + 1); setSelected(null); }} className={`${buttonClass} px-3`}><ChevronRight aria-hidden size={17} /></button></div></div>}
        </div>
        <div className={`${selected ? "flex" : "hidden lg:flex"} min-w-0 flex-col`}>
          {selected ? <article className="flex h-full flex-col p-6 sm:p-8 xl:p-10">
            <div className="flex flex-wrap items-center justify-between gap-3"><button onClick={() => setSelected(null)} disabled={saving} className="inline-flex min-h-11 items-center gap-2 text-sm text-forest lg:hidden"><ArrowLeft size={16} />All enquiries</button><span className={`inline-flex px-3 py-1.5 text-xs font-medium ${statusClass[selected.status]}`}>{statusLabels[selected.status]}</span><button aria-label="Close enquiry" onClick={() => setSelected(null)} disabled={saving} className="hidden h-11 w-11 items-center justify-center text-ink/45 hover:text-forest lg:inline-flex"><X size={20} /></button></div>
            <div className="mt-6"><h2 ref={detailHeading} tabIndex={-1} className="break-words font-serif text-4xl leading-tight outline-none">{selected.name}</h2><time dateTime={selected.createdAt} className="mt-3 block text-xs leading-6 text-ink/50">Received {formatDate(selected.createdAt, true)}</time></div>
            <dl className="mt-8 grid gap-6 bg-ivory/60 p-5 sm:grid-cols-2 sm:p-6">
              <div className="min-w-0"><dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.1em] text-ink/45"><Mail size={14} />Email</dt><dd className="mt-2 break-all text-sm text-forest"><a href={emailLink(selected.email)} className="underline-offset-4 hover:underline">{selected.email}</a></dd></div>
              <div><dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.1em] text-ink/45"><Phone size={14} />Telephone</dt><dd className="mt-2 break-words text-sm text-forest">{selected.phone ? <a href={`tel:${selected.phone.replace(/[^+\d]/g, "")}`} className="underline-offset-4 hover:underline">{selected.phone}</a> : <span className="text-ink/45">Not provided</span>}</dd></div>
              <div className="sm:col-span-2"><dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.1em] text-ink/45"><Building2 size={14} />Organisation</dt><dd className="mt-2 break-words text-sm">{selected.organisation || <span className="text-ink/45">Not provided</span>}</dd></div>
            </dl>
            <div className="my-8"><h3 className="text-xs font-medium uppercase tracking-[0.16em] text-forest">Message</h3><p className="mt-4 whitespace-pre-wrap break-words text-base leading-8 text-ink/80">{selected.message}</p></div>
            <div className="mt-auto border-t border-ink/10 pt-7"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div className="w-full sm:max-w-56"><label htmlFor="detail-status" className="text-sm font-medium">Enquiry status</label><AdminSelect id="detail-status" wrapperClassName="mt-2" value={selected.status} disabled={saving} onChange={event => void changeStatus(selected, event.target.value as EnquiryStatus)}>{enquiryStatuses.map(value => <option key={value} value={value}>{statusLabels[value]}</option>)}</AdminSelect></div><p aria-live="polite" className="text-xs text-ink/45">{saving ? "Saving changes…" : "Status saves automatically"}</p></div>
              <div className="mt-6 flex flex-wrap items-center gap-3"><a href={`${emailLink(selected.email)}?subject=${encodeURIComponent("Your enquiry to Avira Law")}`} className="cms-button bg-forest text-cream hover:bg-ink"><Mail size={16} />Reply by email</a>{selected.status !== "replied" && <button onClick={() => void changeStatus(selected, "replied")} disabled={saving} className={buttonClass}><Check size={16} />Mark replied</button>}{selected.status !== "archived" && <button onClick={() => void changeStatus(selected, "archived")} disabled={saving} className={buttonClass}><Archive size={16} />Archive</button>}</div>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3"><p className="max-w-sm text-xs leading-6 text-ink/45">Replies open in your email app. Mark the enquiry as replied after sending.</p><button onClick={() => { setDeleting(selected); setDeleteError(""); }} disabled={saving} className="inline-flex min-h-11 items-center gap-2 text-sm text-danger disabled:opacity-40"><Trash2 size={16} />Delete enquiry</button></div>
            </div>
          </article> : <div className="flex min-h-[36rem] flex-1 flex-col items-center justify-center px-8 py-16 text-center"><div className="flex h-20 w-20 items-center justify-center border border-forest/15 text-forest"><MailOpen size={32} strokeWidth={1.1} /></div><p className="mt-7 text-xs font-medium uppercase tracking-[0.18em] text-forest">A thoughtful response starts here</p><h2 className="mt-4 font-serif text-4xl">Every conversation matters.</h2><p className="mt-4 max-w-sm text-sm leading-7 text-ink/55">Select an enquiry to read the message, review the details, and manage your response.</p></div>}
        </div>
      </div>
    </AnimatedSection>
    {deleting && <ConfirmDialog title="Delete this enquiry?" pending={saving} error={deleteError} onCancel={() => { if (!saving) setDeleting(null); }} onConfirm={() => void remove()}><p>The message from <strong className="font-medium text-ink">{deleting.name}</strong> and their contact details will be permanently deleted. This cannot be undone.</p></ConfirmDialog>}
  </main>;
}
