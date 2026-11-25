import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact | Avira Law",
  description:
    "Contact Avira Law for new matters and general enquiries. Email info@aviralaw.com, call +91 98188 93922, or visit our office in Noida, Uttar Pradesh.",
};

export default function Contact() {
  return <ContactPage />;
}
