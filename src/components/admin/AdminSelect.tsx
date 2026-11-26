"use client";
import { ChevronDown } from "lucide-react";
import { forwardRef, type SelectHTMLAttributes } from "react";
export const AdminSelect = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement> & { wrapperClassName?: string }>(function AdminSelect({ className = "", wrapperClassName = "", children, ...props }, ref) {
  return <div className={`relative ${wrapperClassName}`}>
    <select ref={ref} {...props} className={`cms-control w-full appearance-none pr-12 ${className}`}>{children}</select>
    <ChevronDown aria-hidden size={17} strokeWidth={1.5} className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-forest ${props.disabled ? "opacity-40" : ""}`} />
  </div>;
});
