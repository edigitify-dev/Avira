export type PracticeArea = {
  slug: string;
  index: string;
  title: string;
  description: string;
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: "corporate-commercial",
    index: "01",
    title: "Corporate & Commercial",
    description:
      "Advice on corporate, transactional and commercial matters across the life of a business. The practice covers acquisitions and investments, joint ventures and shareholder arrangements, reorganisations, commercial and technology agreements, and all stages of a transaction, including structuring, legal due diligence, negotiation, documentation and closing.",
  },
  {
    slug: "corporate-governance",
    index: "02",
    title: "Corporate Governance",
    description:
      "Counsel to boards, audit committees, independent directors and promoters on corporate governance and decision-making, including board and committee composition, directors’ duties and liability, related party transactions, disclosure and insider trading frameworks, governance reviews, and ESG and BRSR reporting.",
  },
  {
    slug: "litigation",
    index: "03",
    title: "Litigation",
    description:
      "Representation in civil, commercial, corporate and regulatory disputes before courts, tribunals and statutory authorities, including the NCLT and NCLAT, High Courts and the Supreme Court of India. The practice spans disputes arising from commercial and corporate relationships, regulatory action and intellectual property, together with writ and constitutional proceedings, statutory appeals, recovery and enforcement, and urgent interim relief.",
  },
  {
    slug: "arbitration",
    index: "04",
    title: "Arbitration",
    description:
      "Representation in domestic and international commercial arbitration, including institutional and ad hoc arbitrations, and investment treaty arbitration. The practice advises on pre-arbitration strategy and interim relief, represents clients through arbitral proceedings, and handles related court proceedings, including challenges to awards and recognition and enforcement.",
  },
  {
    slug: "white-collar",
    index: "05",
    title: "White Collar",
    description:
      "Advice and representation in white-collar, criminal and regulatory enforcement matters involving companies, directors, promoters and individuals. The practice covers economic offences, anti-corruption, money laundering, foreign exchange and securities-related matters, from the investigative stage through adjudication, trial and appellate proceedings.",
  },
  {
    slug: "investigations",
    index: "06",
    title: "Investigations",
    description:
      "Internal and regulatory investigations arising from allegations of fraud, bribery, financial irregularities, conflicts of interest, data and confidentiality breaches and workplace misconduct. The practice advises boards, audit committees, management and multinational companies on the investigation itself and the legal, regulatory and remedial issues that follow from it.",
  },
  {
    slug: "employment",
    index: "07",
    title: "Employment",
    description:
      "Advice on employment, workplace and industrial relations matters across the employment relationship. The practice covers senior appointments and exits, compensation and incentive arrangements, workforce issues arising from transactions and restructurings, labour law compliance, workplace conduct and disputes.",
  },
];
