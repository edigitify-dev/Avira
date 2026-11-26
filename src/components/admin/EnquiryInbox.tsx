"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Archive, Check, ChevronLeft, ChevronRight, Inbox, LogOut, Mail, RefreshCw, Search, X } from "lucide-react";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { enquiryStatuses, statusLabels, type Enquiry, type EnquiryStatus, type InboxData } from "@/lib/cms/types";
import { emailLink } from "@/lib/cms/links";

const formatDate = (date: string, detailed = false) => new Intl.DateTimeFormat("en-IN", {
  day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata",
  ...(detailed ? { hour: "numeric", minute: "2-digit", timeZoneName: "short" } : {}),
}).format(new Date(date));

async function readResponse(response: Response) {
  if (response.status === 401) {
    window.location.assign("/admin/login");
    throw new Error("Your session has ended. Please sign in again.");
  }
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "We couldn't complete your request.");
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
  const [selected, setSelected] = useState<Enquiry | null>(null);
  const [saving, setSaving] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const detailHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (window.innerWidth < 1024) detailHeading.current?.focus();
  }, [selected?.id]);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams({ q: query, status, page: String(page) });
        const result: InboxData = await readResponse(await fetch(`/api/admin/enquiries?${params}`, { signal: controller.signal, cache: "no-store" }));
        if (!controller.signal.aborted) {
          const lastPage = Math.max(1, Math.ceil(result.total / result.pageSize));
          if (result.page > lastPage) { setPage(lastPage); return; }
          setData(result);
          setSelected(current => current ? result.items.find(item => item.id === current.id) ?? current : null);
        }
      } catch (cause) {
        if (!controller.signal.aborted) setError(cause instanceof Error ? cause.message : "The inbox couldn't be loaded.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void load();
    return () => controller.abort();
  }, [query, status, page, refresh]);

  async function changeStatus(item: Enquiry, nextStatus: EnquiryStatus) {
    setSaving(true);
    setError("");
    try {
      const result: { item: Enquiry } = await readResponse(await fetch(`/api/admin/enquiries/${item.id}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: nextStatus }),
      }));
      setSelected(current => current?.id === item.id ? result.item : current);
      setData(current => {
        if (!current) return current;
        return {
          ...current,
          items: current.items.map(row => row.id === item.id ? result.item : row),
        };
      });
      setRefresh(value => value + 1);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "The status couldn't be updated."); }
    finally { setSaving(false); }
  }

  function openEnquiry(item: Enquiry) {
    if (saving) return;
    setSelected(item);
    if (item.status === "new") void changeStatus(item, "read");
  }

  async function logout() {
    setSigningOut(true);
    try {
      await readResponse(await fetch("/api/admin/logout", { method: "POST" }));
      window.location.assign("/admin/login");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Please try signing out again.");
      setSigningOut(false);
    }
  }

  const pages = Math.max(1, Math.ceil((data?.total ?? 0) / (data?.pageSize ?? 20)));
  const buttonClass = "inline-flex min-h-11 items-center justify-center gap-2 border border-ink/20 px-4 py-2.5 text-sm text-forest outline-offset-4 transition-colors hover:border-forest hover:bg-forest hover:text-cream focus-visible:outline-2 focus-visible:outline-forest disabled:cursor-not-allowed disabled:opacity-45 motion-reduce:transition-none";

  return (
    <main className="min-h-dvh bg-cream text-ink">
      <header className="bg-ink px-6 py-5 text-cream sm:px-10">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-5">
          <Link href="/admin" className="flex items-center gap-6 outline-offset-4 focus-visible:outline-2">
            <Image src="/logo.png" alt="Avira Law" width={200} height={100} className="h-12 w-auto brightness-0 invert" priority />
            <span className="text-sm uppercase tracking-[0.18em] text-cream/70">Administration</span>
          </Link>
          <nav aria-label="Admin navigation" className="flex items-center gap-6 text-sm">
            <Link href="/" className="text-cream/80 underline-offset-4 hover:underline">View website</Link>
            <button onClick={logout} disabled={signingOut} className="inline-flex min-h-11 items-center gap-2 text-cream/80 hover:text-cream disabled:opacity-50">
              <LogOut aria-hidden size={17} strokeWidth={1.5} /> {signingOut ? "Signing out…" : "Sign out"}
            </button>
          </nav>
        </div>
      </header>

      <AnimatedSection as="div" variant="fadeIn" amount={0.05} className="mx-auto max-w-[1580px] px-6 py-10 sm:px-10 sm:py-12">
        <div className="flex flex-col justify-between gap-8 xl:flex-row xl:items-end">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-forest">Contact inbox</p>
            <h1 className="mt-3 font-serif text-5xl sm:text-6xl">Enquiries</h1>
            <p className="mt-4 text-base leading-7 text-ink/70">Conversations with your next client. Signed in as {username}.</p>
          </div>
          <dl className="grid grid-cols-3 gap-4 sm:flex sm:gap-14" aria-label="Enquiry summary">
            {[{ label: "Total enquiries", value: data?.counts.total }, { label: "Awaiting review", value: data?.counts.new }, { label: "Replied", value: data?.counts.replied }].map(stat => (
              <div key={stat.label}>
                <dt className="min-h-10 text-sm text-ink/65 sm:min-h-0">{stat.label}</dt>
                <dd className="mt-2 font-serif text-4xl text-forest">{stat.value ?? "—"}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-end">
          <form onSubmit={event => { event.preventDefault(); setQuery(search.trim()); setPage(1); setSelected(null); }} className="flex flex-1 flex-col gap-2">
            <label htmlFor="enquiry-search" className="text-sm font-medium">Search enquiries</label>
            <div className="flex border border-ink/25 bg-paper focus-within:outline-2 focus-within:outline-forest">
              <Search aria-hidden className="ml-4 mt-3.5 shrink-0 text-forest" size={20} strokeWidth={1.5} />
              <input id="enquiry-search" type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Name, email, organisation or message" maxLength={160}
                className="min-w-0 flex-1 bg-transparent px-3 py-3.5 text-base outline-none" />
              <button type="submit" className="px-5 text-sm font-medium text-forest hover:bg-forest hover:text-cream focus-visible:outline-2 focus-visible:outline-forest">Search</button>
            </div>
          </form>
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex min-w-44 flex-1 flex-col gap-2">
              <label htmlFor="enquiry-status" className="text-sm font-medium">Status</label>
              <select id="enquiry-status" value={status} onChange={event => { setStatus(event.target.value); setPage(1); setSelected(null); }}
                className="min-h-13 border border-ink/25 bg-paper px-4 py-3 text-base outline-offset-2 focus:outline-2 focus:outline-forest">
                <option value="">All enquiries</option>
                {enquiryStatuses.map(value => <option key={value} value={value}>{statusLabels[value]}</option>)}
              </select>
            </div>
            <button onClick={() => setRefresh(value => value + 1)} disabled={loading} className={`${buttonClass} min-h-13`}>
              <RefreshCw aria-hidden size={18} strokeWidth={1.5} /> Refresh
            </button>
          </div>
        </div>

        {error && <div role="alert" className="mt-6 flex flex-wrap items-center justify-between gap-4 border-l-2 border-forest bg-paper px-5 py-4 text-sm leading-6">
          <p>{error}</p><button onClick={() => setRefresh(value => value + 1)} className="font-medium text-forest underline underline-offset-4">Try again</button>
        </div>}

        <div className="mt-6 grid border border-ink/15 bg-paper lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)]">
          <div className={`${selected ? "hidden lg:block" : ""} min-w-0 lg:border-r lg:border-ink/15`} aria-busy={loading}>
            <div className="flex items-center justify-between bg-ivory px-5 py-4 text-sm text-ink/70 sm:px-6">
              <p aria-live="polite">{loading ? "Loading enquiries…" : `${data?.total ?? 0} ${data?.total === 1 ? "enquiry" : "enquiries"}${query ? " matching your search" : ""}`}</p>
              {query && <button onClick={() => { setQuery(""); setSearch(""); setPage(1); }} className="text-forest underline underline-offset-4">Clear search</button>}
            </div>
            {!loading && !error && data?.items.length === 0 && (
              <div className="flex min-h-96 flex-col items-center justify-center px-8 py-16 text-center">
                <Inbox aria-hidden size={32} strokeWidth={1.25} className="text-forest" />
                <h2 className="mt-6 font-serif text-3xl">{query || status ? "No matching enquiries." : "A new conversation starts here."}</h2>
                <p className="mt-4 max-w-sm text-sm leading-7 text-ink/65">{query || status ? "Try another search or choose a different status." : "Messages submitted through your contact form will appear in this inbox."}</p>
              </div>
            )}
            {data?.items.map(item => (
              <button key={item.id} onClick={() => openEnquiry(item)} disabled={saving || loading}
                aria-pressed={selected?.id === item.id}
                className={`block w-full border-t border-ink/10 px-5 py-5 text-left outline-offset-[-3px] transition-colors focus-visible:outline-2 focus-visible:outline-forest disabled:opacity-60 motion-reduce:transition-none sm:px-6 ${selected?.id === item.id ? "bg-forest/10" : "hover:bg-ivory"}`}>
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                  <h2 className={`break-words text-base ${item.status === "new" ? "font-semibold" : "font-medium"}`}>{item.name}</h2>
                  <time dateTime={item.createdAt} className="text-sm text-ink/60">{formatDate(item.createdAt)}</time>
                </div>
                <p className="mt-1 break-all text-sm text-forest">{item.email}</p>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-ink/65">{item.message}</p>
                <span className={`mt-3 inline-block px-2.5 py-1 text-xs font-medium uppercase tracking-wider ${item.status === "new" ? "bg-forest text-cream" : "bg-ivory text-forest"}`}>{statusLabels[item.status]}</span>
              </button>
            ))}
            {data && data.total > 0 && <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink/15 px-5 py-4 text-sm sm:px-6">
              <span className="text-ink/65">Page {page} of {pages}</span>
              <div className="flex gap-2">
                <button aria-label="Previous page" disabled={page <= 1 || loading} onClick={() => { setPage(value => value - 1); setSelected(null); }} className={buttonClass}><ChevronLeft aria-hidden size={17} /></button>
                <button aria-label="Next page" disabled={page >= pages || loading} onClick={() => { setPage(value => value + 1); setSelected(null); }} className={buttonClass}><ChevronRight aria-hidden size={17} /></button>
              </div>
            </div>}
          </div>

          <div className={`${selected ? "" : "hidden lg:flex"} min-w-0 flex-col`}>
            {selected ? (
              <article className="p-6 sm:p-9">
                <div className="mb-7 flex items-center justify-between gap-4">
                  <button onClick={() => setSelected(null)} className="inline-flex min-h-11 items-center gap-2 text-sm text-forest lg:hidden"><ChevronLeft aria-hidden size={18} /> Back to enquiries</button>
                  <span className="text-sm text-ink/60">Enquiry details</span>
                  <button aria-label="Close enquiry" onClick={() => setSelected(null)} className="hidden h-11 w-11 items-center justify-center text-forest lg:inline-flex"><X aria-hidden size={20} /></button>
                </div>
                <h2 ref={detailHeading} tabIndex={-1} className="break-words font-serif text-4xl outline-none">{selected.name}</h2>
                <time dateTime={selected.createdAt} className="mt-3 block text-sm text-ink/60">Received {formatDate(selected.createdAt, true)}</time>
                <dl className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div><dt className="text-sm text-ink/60">Email address</dt><dd className="mt-2 break-all text-base text-forest"><a href={emailLink(selected.email)} className="underline underline-offset-4">{selected.email}</a></dd></div>
                  <div><dt className="text-sm text-ink/60">Contact number</dt><dd className="mt-2 break-words text-base">{selected.phone ? <a href={`tel:${selected.phone.replace(/[^+\d]/g, "")}`} className="text-forest underline underline-offset-4">{selected.phone}</a> : "Not provided"}</dd></div>
                  <div className="sm:col-span-2"><dt className="text-sm text-ink/60">Organisation</dt><dd className="mt-2 break-words text-base">{selected.organisation || "Not provided"}</dd></div>
                </dl>
                <div className="mt-9">
                  <h3 className="text-sm font-medium text-forest">Message</h3>
                  <p className="mt-4 whitespace-pre-wrap break-words font-sans text-base leading-8 text-ink/80">{selected.message}</p>
                </div>
                <div className="mt-10 bg-ivory p-5">
                  <label htmlFor="detail-status" className="block text-sm font-medium">Enquiry status</label>
                  <select id="detail-status" value={selected.status} disabled={saving} onChange={event => void changeStatus(selected, event.target.value as EnquiryStatus)}
                    className="mt-3 w-full border border-ink/25 bg-paper px-3 py-3 text-base outline-offset-2 focus:outline-2 focus:outline-forest disabled:opacity-60">
                    {enquiryStatuses.map(value => <option key={value} value={value}>{statusLabels[value]}</option>)}
                  </select>
                  <p aria-live="polite" className="mt-3 text-sm text-ink/60">{saving ? "Saving…" : "Status changes are saved automatically."}</p>
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a href={`${emailLink(selected.email)}?subject=${encodeURIComponent("Your enquiry to Avira Law")}`} className="inline-flex min-h-11 items-center gap-2 bg-forest px-5 py-3 text-sm text-cream hover:bg-ink"><Mail aria-hidden size={17} strokeWidth={1.5} /> Reply by email</a>
                  {selected.status !== "replied" && <button onClick={() => void changeStatus(selected, "replied")} disabled={saving} className={buttonClass}><Check aria-hidden size={17} strokeWidth={1.5} /> Mark replied</button>}
                  {selected.status !== "archived" && <button onClick={() => void changeStatus(selected, "archived")} disabled={saving} className={buttonClass}><Archive aria-hidden size={17} strokeWidth={1.5} /> Archive</button>}
                </div>
                <p className="mt-5 text-sm leading-6 text-ink/60">Replies open in your email app. Mark the enquiry as replied after you send your response.</p>
              </article>
            ) : (
              <div className="flex min-h-[34rem] flex-1 flex-col items-center justify-center px-10 py-16 text-center">
                <Mail aria-hidden size={36} strokeWidth={1.1} className="text-forest" />
                <h2 className="mt-6 font-serif text-3xl">The details matter.</h2>
                <p className="mt-4 max-w-xs text-sm leading-7 text-ink/65">Select an enquiry to read the message, view contact information, and manage your response.</p>
              </div>
            )}
          </div>
        </div>
      </AnimatedSection>
    </main>
  );
}
