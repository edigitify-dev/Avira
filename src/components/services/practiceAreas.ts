export type PracticeArea = {
  slug: string;
  index: string;
  title: string;
  description: string;
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: "litigation",
    index: "01",
    title: "Litigation",
    description:
      "Representation in civil, commercial, corporate and regulatory disputes before courts, tribunals and statutory authorities, including the NCLT and NCLAT, High Courts and the Supreme Court of India. The practice spans disputes arising from commercial and corporate relationships, regulatory action and intellectual property, together with writ and constitutional proceedings, statutory appeals, recovery and enforcement, and urgent interim relief.",
  },
  {
    slug: "arbitration",
    index: "02",
    title: "Arbitration",
    description:
      "Representation in domestic and international commercial arbitration, including institutional and ad hoc arbitrations, and investment treaty arbitration. The practice advises on pre-arbitration strategy and interim relief, represents clients through arbitral proceedings, and handles related court proceedings, including challenges to awards and recognition and enforcement.",
  },
  {
    slug: "corporate-commercial",
    index: "03",
    title: "Corporate & Commercial",
    description:
      "Corporate, transactional and commercial matters across the life of a business. The practice covers acquisitions and investments, joint ventures and shareholder arrangements, reorganisations, commercial agreements, and all stages of a transaction, including structuring, legal due diligence, negotiation, documentation and closing.",
  },
  {
    slug: "white-collar",
    index: "04",
    title: "White Collar, Investigations & Regulatory Enforcement",
    description:
      "Advice and representation in white-collar, criminal and regulatory enforcement matters involving companies, directors, promoters and individuals, including economic offences, anti-corruption, money laundering, foreign exchange and securities-related matters. The practice advises and represents clients at all stages of enforcement proceedings, from initial investigations through adjudication, trial and appeal. It also undertakes internal and regulatory investigations involving corporate fraud, financial irregularities, misconduct and compliance failures.",
  },
  {
    slug: "corporate-governance",
    index: "05",
    title: "Corporate Governance",
    description:
      "Counsel to boards, audit committees, independent directors and promoters on corporate governance and decision-making, including board and committee composition, directors’ duties and liability, related party transactions, disclosure and insider trading frameworks, governance reviews, and ESG and BRSR reporting.",
  },
  {
    slug: "technology-data-privacy",
    index: "06",
    title: "Technology & Data Privacy",
    description:
      "Advice on legal, regulatory and commercial issues relating to technology, digital businesses and data protection. The practice advises on technology transactions and contracts, digital products and platforms, emerging technologies and sector-specific regulatory requirements. Its privacy and data protection capabilities include data governance, privacy audits, cybersecurity, and compliance with the Digital Personal Data Protection Act, 2023, as well as other applicable laws.",
  },
  {
    slug: "employment",
    index: "07",
    title: "Employment",
    description:
      "Advice on employment, workplace and industrial relations matters across the employment relationship. The practice covers senior appointments and exits, compensation and incentive arrangements, workforce issues arising from transactions and restructurings, labour law compliance, workplace conduct and disputes.",
  },
];
