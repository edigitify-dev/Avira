import { EditableLink, EditableText } from "@/components/cms/Editable";
import type { Metadata } from "next";
import { LegalPage, type LegalBlock } from "@/components/legal/LegalPage";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Avira Law",
  description: "How Avira Law collects, uses and protects personal information shared through this website.",
};

const contactEmail = (
  <EditableLink contentId="app-privacy-policy-page-1"
    href="mailto:info@aviralaw.com"
    className="text-forest underline underline-offset-4 outline-offset-4 hover:text-ink focus-visible:outline-2 focus-visible:outline-forest"
  ><EditableText id="app-privacy-policy-page-2">{"info@aviralaw.com"}</EditableText></EditableLink>
);

const blocks: LegalBlock[] = [
  {
    paragraphs: [
      "This Privacy Policy explains the personal information we may collect through aviralaw.com (the “Website”), how we use and protect that information, and how you may contact us in relation to it.",
      "This Policy applies to information collected through the Website, enquiries made to Avira, newsletter subscriptions and recruitment applications. Information received or processed in the course of a professional engagement is also subject to applicable legal and professional obligations, including duties of confidentiality.",
    ],
  },
  {
    heading: "1. Information we collect",
    paragraphs: [
      "The information we collect depends on how you interact with us.",
    ],
    subsections: [
      {
        heading: "Information you provide to us",
        paragraphs: [
          "When you contact Avira or submit an enquiry, we may collect information such as your name, email address, telephone number, organisation and the information contained in your communication.",
          "If you apply to work or intern with us, we may receive your CV and information relating to your education, qualifications, professional experience and application.",
          "If you subscribe to our newsletter or other updates, we collect the contact information necessary to send those communications.",
          "Please do not submit confidential, privileged or sensitive information through the Website unless Avira has requested you to do so.",
        ],
      },
      {
        heading: "Information generated when you use the Website",
        paragraphs: [
          "Certain technical information may be generated when you access the Website, such as your IP address, browser or device information, pages visited and similar information relating to the operation and use of the Website.",
          "The Website may also store limited information in your browser, including your acknowledgement of the website disclaimer.",
        ],
      },
    ],
  },
  {
    heading: "2. How we use information",
    paragraphs: [
      "We may use personal information:",
    ],
    items: [
      "to respond to enquiries and communications;",
      "to consider potential professional engagements, including for conflict-checking and related purposes;",
      "to process applications for employment and internships;",
      "to send newsletters or legal updates where you have chosen to receive them;",
      "to operate, maintain, secure and improve the Website;",
      "to maintain appropriate business and administrative records; and",
      "to comply with applicable legal, regulatory and professional obligations.",
    ],
    closingParagraphs: [
      "We do not sell personal information.",
    ],
  },
  {
    heading: "3. Enquiries and potential engagements",
    paragraphs: [
      "Sending information to Avira through the Website or by email does not, by itself, create a lawyer-client relationship.",
      "Information submitted in connection with a potential engagement may be reviewed for the purpose of responding to the enquiry, assessing whether Avira is able to act, and carrying out appropriate conflict checks.",
      "Until Avira has confirmed that it is able to act for you, you should not send confidential, privileged or sensitive information through the Website or by unsolicited email.",
    ],
  },
  {
    heading: "4. Newsletter and other communications",
    paragraphs: [
      "If you subscribe to Avira’s newsletter or other updates, we may use the contact information you provide to send those communications.",
      <><EditableText id="app-privacy-policy-page-3">{"You may unsubscribe at any time by using the unsubscribe mechanism provided in the communication or by writing to "}</EditableText>{contactEmail}.</>,
    ],
  },
  {
    heading: "5. Cookies and similar technologies",
    paragraphs: [
      "The Website may use cookies, browser storage or similar technologies that are necessary for its operation or used to remember preferences and interactions with the Website.",
      "Where Avira uses analytics or other non-essential technologies that require additional notice or consent under applicable law, appropriate information and choices will be provided.",
      "You may also be able to control certain cookies through your browser settings.",
    ],
  },
  {
    heading: "6. Sharing of information",
    paragraphs: [
      "We may disclose personal information to service providers that support the operation of the Website or Avira’s business, including providers of website hosting, email, communications, analytics or similar services.",
      "Such service providers may process information only for the purposes for which they have been engaged and subject to appropriate contractual or other safeguards, as required by applicable law.",
      "We may also disclose information where required by applicable law, regulation, legal process or a competent governmental, judicial or regulatory authority, or where necessary for the establishment, exercise or defence of legal rights.",
      "We do not share personal information with third parties for their independent marketing purposes.",
    ],
  },
  {
    heading: "7. Retention",
    paragraphs: [
      "We retain personal information only for so long as reasonably necessary for the purpose for which it was collected, or for such longer period as may be required or permitted by applicable law or by our legal, regulatory or professional obligations.",
      "The appropriate retention period may therefore depend on the nature of the information and the circumstances in which it was provided.",
    ],
  },
  {
    heading: "8. Security",
    paragraphs: [
      "We take reasonable technical and organisational measures designed to protect personal information against unauthorised access, use, alteration, disclosure or loss.",
      "No system for transmitting or storing information electronically can, however, be guaranteed to be completely secure.",
    ],
  },
  {
    heading: "9. Your information",
    paragraphs: [
      "You may write to us to request access to personal information you have provided to Avira, or to ask us to correct, update or delete that information.",
      "Where processing is based on your consent, you may also withdraw that consent, subject to applicable law and any information that Avira is required or permitted to retain.",
      <><EditableText id="app-privacy-policy-page-4">{"Requests may be sent to "}</EditableText>{contactEmail}<EditableText id="app-privacy-policy-page-5">{". We will consider and respond to requests in accordance with applicable law."}</EditableText></>,
    ],
  },
  {
    heading: "10. Third-party websites",
    paragraphs: [
      "The Website may contain links to third-party websites or platforms, including LinkedIn.",
      "Avira does not control the privacy practices of those third parties. Information you provide to them is governed by their own privacy policies and practices.",
    ],
  },
  {
    heading: "11. Changes to this Policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time, including to reflect changes to the Website, our practices or applicable law.",
      "The date of the most recent update will appear at the top of this page.",
    ],
  },
  {
    heading: "12. Contact and grievances",
    paragraphs: [
      <><EditableText id="app-privacy-policy-page-6">{"Questions, requests or grievances concerning this Privacy Policy or Avira’s handling of personal information may be sent to: "}</EditableText>{contactEmail}</>,
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col flex-1">
      <LegalPage
        title="Privacy Policy"
        lastUpdated="25 November 2026"
        intro={"Avira Law (“Avira”, “we”, “us” or “our”) respects the privacy of individuals who visit our website or otherwise communicate with us digitally."}
        blocks={blocks}
      />
      <Footer />
    </div>
  );
}
