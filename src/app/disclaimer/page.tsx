import type { Metadata } from "next";
import { LegalPage, type LegalBlock } from "@/components/legal/LegalPage";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Disclaimer | Avira Law",
  description: "Disclaimer for the Avira Law website, in line with Bar Council of India rules.",
};

const blocks: LegalBlock[] = [
  {
    paragraphs: [
      "The rules of the Bar Council of India prohibit law firms from soliciting work or advertising in any manner. By clicking on 'I AGREE', the user acknowledges that:",
    ],
    items: [
      "The user wishes to gain more information about Avira Law, its practice areas and its attorneys, for his/her own information and use;",
      "The information is made available/provided to the user only on his/her specific request and any information obtained or material downloaded from this website is completely at the user's volition and any transmission, receipt or use of this site is not intended to, and will not, create any lawyer-client relationship; and",
      "None of the information contained on the website is in the nature of a legal opinion or otherwise amounts to any legal advice.",
    ],
  },
  {
    paragraphs: [
      "Avira Law is not liable for any consequence of any action taken by the user relying on material/information provided under this website. In cases where the user has any legal issues, he/she in all cases must seek independent legal advice.",
    ],
  },
];

export default function DisclaimerPage() {
  return (
    <div className="flex flex-col flex-1">
      <LegalPage title="Disclaimer" blocks={blocks} />
      <Footer />
    </div>
  );
}
