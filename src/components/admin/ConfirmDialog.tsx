"use client";
import { useEffect, useRef } from "react";
import { Trash2, X } from "lucide-react";
export function ConfirmDialog({ title, children, pending, error, onCancel, onConfirm, confirmLabel = "Delete permanently" }: { title: string; children: React.ReactNode; pending: boolean; error?: string; onCancel: () => void; onConfirm: () => void; confirmLabel?: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { const dialog = ref.current; dialog?.showModal(); return () => dialog?.close(); }, []);
  return <dialog ref={ref} aria-labelledby="confirm-heading" onCancel={event => { event.preventDefault(); if (!pending) onCancel(); }} className="m-auto w-[calc(100%-2rem)] max-w-lg border border-ink/15 bg-paper p-0 text-ink backdrop:bg-ink/55">
    <div className="p-7 sm:p-9"><div className="flex items-start justify-between gap-5"><Trash2 size={25} strokeWidth={1.4} className="text-danger" /><button aria-label="Close confirmation" onClick={onCancel} disabled={pending} className="p-2 text-ink/50 disabled:opacity-40"><X size={20} /></button></div>
      <h2 id="confirm-heading" className="mt-5 font-serif text-3xl">{title}</h2><div className="mt-4 text-sm leading-7 text-ink/65">{children}</div>
      {error && <p role="alert" className="mt-4 text-sm text-danger">{error}</p>}
      <div className="mt-8 flex flex-wrap justify-end gap-3"><button autoFocus onClick={onCancel} disabled={pending} className="cms-button border border-ink/20 text-forest">Cancel</button><button onClick={onConfirm} disabled={pending} className="cms-button bg-danger text-white hover:bg-danger/90">{pending ? "Deleting…" : confirmLabel}</button></div>
    </div>
  </dialog>;
}
