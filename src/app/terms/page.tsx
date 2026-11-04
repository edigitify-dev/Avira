import type { Metadata } from "next";
import { LegalPage, type LegalBlock } from "@/components/legal/LegalPage";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions | Avira Law",
  description: "Terms and conditions for using the Avira Law website.",
};

const blocks: LegalBlock[] = [
  {
    heading: "Use of this website",
    paragraphs: [
      "By accessing this website you agree to these terms and to our Disclaimer. If you do not agree, please do not use the website.",
    ],
  },
  {
    heading: "No legal advice; no lawyer-client relationship",
    paragraphs: [
      "The content of this website is for general information only. It is not legal advice or a legal opinion, and your use of the website, or any communication sent through it, does not create a lawyer-client relationship with Avira Law.",
    ],
  },
  {
    heading: "Intellectual property",
    paragraphs: [
      "All content on this website, including text, design and logos, belongs to Avira Law unless stated otherwise. You may view and download content for your own personal, non-commercial use. You may not reproduce, modify or distribute it without our written permission.",
    ],
  },
  {
    heading: "Accuracy of information",
    paragraphs: [
      "We try to keep the information on this website accurate and current, but we make no warranty that it is complete or up to date. The law changes; please take independent legal advice before acting on anything you read here.",
    ],
  },
  {
    heading: "Limitation of liability",
    paragraphs: [
      "To the extent permitted by law, Avira Law is not liable for any loss or damage arising from your use of, or reliance on, this website or its content.",
    ],
  },
  {
    heading: "Third-party links",
    paragraphs: [
      "This website may link to other websites. We do not control them and are not responsible for their content or practices.",
    ],
  },
  {
    heading: "Governing law",
    paragraphs: [
      "These terms are governed by the laws of India, and the courts of competent jurisdiction in India will have jurisdiction over any dispute arising from them.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: ["Questions about these terms can be sent to info@aviralaw.com."],
  },
];

export default function TermsPage() {
  return (
    <div className="flex flex-col flex-1">
      <LegalPage title="Terms & Conditions" blocks={blocks} />
      <Footer />
    </div>
  );
}
