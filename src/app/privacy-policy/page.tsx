import type { Metadata } from "next";
import { LegalPage, type LegalBlock } from "@/components/legal/LegalPage";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Avira Law",
  description: "How Avira Law collects, uses and protects personal information shared through this website.",
};

const blocks: LegalBlock[] = [
  {
    heading: "Information we collect",
    paragraphs: ["We collect only the information you choose to give us through this website:"],
    items: [
      "Contact enquiries: your name, organisation, email address, contact number and the message you send.",
      "Newsletter: your email address, if you subscribe.",
      "Your acknowledgement of our Disclaimer, which is stored in your browser so that you are not asked again on each visit.",
    ],
  },
  {
    heading: "How we use it",
    paragraphs: [
      "We use this information to respond to your enquiry, to send the newsletter you asked for, and to operate and improve this website. We do not sell your personal information.",
    ],
  },
  {
    heading: "Sharing",
    paragraphs: [
      "We do not share your personal information with third parties, except with service providers who help us run the website and email services on our behalf, or where disclosure is required by law.",
    ],
  },
  {
    heading: "Confidentiality of enquiries",
    paragraphs: [
      "Sending an enquiry through this website does not create a lawyer-client relationship. Please do not send confidential or privileged information until we have confirmed that we can act for you.",
    ],
  },
  {
    heading: "Retention and security",
    paragraphs: [
      "We keep personal information only for as long as needed for the purpose it was collected, and take reasonable steps to protect it. No method of transmission over the internet is completely secure.",
    ],
  },
  {
    heading: "Your choices",
    paragraphs: [
      "You may ask us to access, correct or delete the personal information we hold about you, or unsubscribe from the newsletter at any time, by writing to info@aviralaw.com.",
    ],
  },
  {
    heading: "Changes to this policy",
    paragraphs: ["We may update this policy from time to time. The current version will always be available on this page."],
  },
  {
    heading: "Contact",
    paragraphs: ["Questions about this policy can be sent to info@aviralaw.com."],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col flex-1">
      <LegalPage
        title="Privacy Policy"
        intro="This policy explains what personal information Avira Law collects through this website and how it is used."
        blocks={blocks}
      />
      <Footer />
    </div>
  );
}
