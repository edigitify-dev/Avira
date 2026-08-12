export type HighlightGroup = {
  heading?: string;
  items: string[];
};

export type PracticeArea = {
  slug: string;
  index: string;
  title: string;
  teaser: string;
  paragraphs: string[];
  capabilities?: string[];
  highlightGroups: HighlightGroup[];
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: "litigation-enforcement",
    index: "01",
    title: "Litigation & Enforcement",
    teaser: "Representing clients — and the CCI itself — from cartel inquiries to the Supreme Court.",
    paragraphs: [
      "We're mindful that not all competition law issues can be addressed through compliance alone, and that our clients will require effective litigation and enforcement strategies to serve their commercial interests. We are perfectly positioned to provide holistic advice even in complex competition litigation, with our experience of representing the CCI, informants, and opposite parties in a number of cases from the earliest days of competition law enforcement in India.",
      "We provide a full suite of litigation, litigation support, strategy, and competition law enforcement support before the CCI, appellate courts, and various high courts exercising their writ jurisdiction.",
      "We act for both informants/plaintiffs as well as opposite parties/defendants in competition enforcement proceedings across India. Our team members enjoy rights of audience before all Indian courts, tribunals, and regulatory agencies. We are equally adept at engaging with senior counsel and local counsel in various locations to present our client's case most effectively.",
      "We also work as sounding boards to our clients' senior management or general counsel when developing a competition litigation strategy.",
    ],
    highlightGroups: [
      {
        heading: "Cartel inquiries before the CCI",
        items: [
          "Leading global FMCG manufacturer in an ongoing cartel inquiry.",
          "A leading global alcohol beverage manufacturing company in an ongoing cartel investigation.",
          "Leading global advertising services company in an ongoing cartel inquiry.",
          "Leading global financial services company in securing an early termination of a potential cartel inquiry.",
          "Leading global automobile company in securing an early termination of a potential cartel inquiry.",
        ],
      },
      {
        heading: "Abuse of dominance / vertical restraint inquiries before the CCI",
        items: [
          "A leading global technology company in an ongoing abuse of dominance inquiry.",
          "Successfully represented Tata Motors Limited in termination of an abuse of dominance and vertical restraints inquiry.",
        ],
      },
      {
        heading: "Appellate litigation",
        items: [
          "UFO Moviez before the NCLAT contesting the CCI's finding of anti-competitive vertical restraints.",
          "Super Cassettes Industries Pvt. Ltd. before the NCLAT contesting the CCI's finding of abuse of dominance arising out of interplay between IPR and competition law.",
          "Competition Commission of India in a compensation claim before the NCLAT.",
          "A leading global technology company on litigation strategy before the NCLAT contesting CCI's finding of abuse of dominance.",
          "A leading technology company in the hospitality sector on litigation strategy before the NCLAT contesting CCI's finding of abuse of dominance and vertical restraints.",
        ],
      },
      {
        heading: "Appeals before the Supreme Court",
        items: [
          "Warner Brothers and its Indian subsidiary in an appeal contesting appellate tribunal's direction to initiate an inquiry against Digital Cinema Initiative LLC and its members.",
          "A leading global automobile company in an appeal contesting the appellate tribunal's order upholding CCI's findings on abuse of dominance and anticompetitive vertical restraints.",
        ],
      },
      {
        heading: "Constitutional challenges",
        items: [
          "F. Hoffmann-La Roche AG and its Indian subsidiary in a Delhi High Court constitutional challenge against the CCI's decision to investigate potential abuse of dominance.",
        ],
      },
    ],
  },
  {
    slug: "merger-control",
    index: "02",
    title: "Merger Control",
    teaser: "Clearing complex transactions through the CCI, from conception to closing.",
    paragraphs: [
      "We work closely with our clients to understand whether a transaction — from its conception to its implementation — is likely to require competition approvals or raise competition concerns, and how such concerns can be best addressed.",
      "We work with the client's internal business and strategy teams as well as internal and external legal counsel to arrive at pragmatic and well-considered views on deal structure and implementation. If the transaction requires notification, we identify the choice of form, prepare the merger filing, and engage with the regulator to address any issues and secure speedy approvals.",
      "We also advise our clients on how to avoid and mitigate process risks — such as gun-jumping — through advocacy, planning, and, where required, litigation.",
      "Where a transaction involves divestitures or is challenged in court, our team works seamlessly with senior business leadership, internal and external counsel, and the CCI and its monitoring trustees to develop a reasonable divestiture or litigation strategy depending on what is needed.",
    ],
    highlightGroups: [
      {
        items: [
          "Fitness First Luxembourg S.C.A in securing the Competition Commission of India's approval in a combination involving Curefit Healthcare Private Limited, Cultfit Healthcare Private Limited and Curefit Services Private Limited.",
          "Soleite Limited and PMC Ventures India Limited on their acquisition of the entire issued share capital of Lightsource India Investments (UK) Limited, and Lightsource India Holdings (Mauritius) Limited.",
          "Brookfield (through its various entities) on their acquisition of American Towers Corporation (ATC) India.",
          "India-Japan Fund on its investment in Ather Energy Limited.",
          "Plutus Wealth Management on their acquisition of a controlling stake in Nazara Technologies Limited.",
          "TVS Holdings, and Srinivas Trading Services on their acquisition of Home Credit India Finance Private Limited.",
          "The Manipal Group on its acquisition of shares in Aakash Educational Services Ltd. and related proceedings before the CCI.",
          "Garagepreneurs Internet Private Limited (Slice) on its merger with North East Small Finance Bank.",
          "A fin-tech company in relation to gun-jumping proceedings before the CCI.",
          "Enam, and various other independent investors on their acquisition of certain shareholding of WeWork India's equity share capital.",
          "A leading automobile manufacturer on all aspects related to a potential pre-merger notification process and ensuring standstill arrangements before the CCI.",
          "Zest Holding Investments Limited on their acquisition of shareholding in Agro Tech Foods Limited.",
          "Clicktech Retail Private Limited (CRPL) in its acquisition of Appario Retail's entire business.",
          "A leading global technology company in avoiding gun-jumping proceedings before the CCI.",
          "LANXESS Deutschland GmbH in obtaining unconditional Phase I approval for the creation of a global joint venture with Advent.",
          "Promoters of Caratlane Trading Private Limited in securing unconditional Phase I CCI approval for the sale of their 27.18% stake to Titan Company Limited.",
          "Leading sovereign wealth fund and a leading private equity group on various aspects related to the potential pre-merger notification process before the CCI, including as per the newly introduced Deal Value Threshold.",
        ],
      },
    ],
  },
  {
    slug: "counselling-compliance",
    index: "03",
    title: "Counselling & Compliance",
    teaser: "Compliance programmes built to hold up before they're ever tested.",
    paragraphs: [
      "We work with our clients and their internal and external advisors to ensure that they receive thoughtful and constructive advice that is best suited to their business.",
      "We help them calibrate their commercial decisions and understand their competition law implications.",
    ],
    capabilities: [
      "Design customised competition compliance programmes",
      "Create policies and practices that reduce infringement risk while achieving business goals",
      "Review business models and address competition law issues the in-house legal team and management can rectify",
      "Build awareness and training around competition law risks, and preparedness for investigations or 'dawn' raids",
    ],
    highlightGroups: [
      {
        items: [
          "A leading global agro-chemical manufacturing company on various aspects of antitrust compliance in India.",
          "Advising a leading global automotive company on the antitrust implications of an ongoing strategic restructuring exercise.",
          "A leading global pharmaceutical and medical device manufacturer in conducting a bespoke competition compliance exercise for each of their key products.",
          "A global motorcycle manufacturer in conducting a comprehensive competition compliance exercise, including a review of its dealership and distribution network and contractual terms.",
          "A global automotive company on competition law aspects of its ongoing collaboration to develop new products for the Indian market.",
          "A global confectionery and beverage manufacturer, and Indian FMCG firms, on competition compliance, devising custom solutions like dawn raid protocols and revised agency/distribution models.",
        ],
      },
    ],
  },
  {
    slug: "policy-advocacy",
    index: "04",
    title: "Competition Policy & Advocacy",
    teaser: "Shaping the law as it ought to be, not just applying it as it is.",
    paragraphs: [
      "We believe that a good legal practitioner not only applies the law as it is, but also imagines the law as it ought to be. We use our diverse experience in law, economics, policy making and design to craft policy solutions that are evidence-based, impactful and practical.",
      "We're excited by the growing interface between competition law and other areas of law, such as privacy, data protection, e-commerce, platform markets and intellectual property rights.",
      "We author papers, research studies, and offer policy recommendations, as a firm and in collaboration with industry associations or clients.",
    ],
    highlightGroups: [
      {
        items: [
          "Advising a leading e-commerce company on various aspects of Indian competition policy.",
          "Advising numerous Indian & global technology companies on the implications of the proposed Digital Competition Bill.",
          "Partner and co-founder Rahul Rai is a member of the Committee for Digital Competition Law, set up by the Ministry of Corporate Affairs, Government of India, tasked with evaluating the need for and creating a new 'ex ante' law to address competition issues in the digital economy.",
          "Partner and co-founder Samir R Gandhi was a special invitee to the Parliamentary Standing Committee for Finance in January 2023 to provide feedback on the proposed amendments to the Competition Act, 2002.",
          "Regularly advising global and Indian technology companies on emerging issues in Indian competition policy.",
          "Providing comments on a series of draft regulations issued for public consultation by the CCI, as part of the recent overhaul of the Competition Act in early 2023 — including a proposed settlements & commitments regime, revisions to the merger control regime, and a 'leniency plus' mechanism for cartel enforcement.",
        ],
      },
    ],
  },
  {
    slug: "pro-bono",
    index: "05",
    title: "Pro Bono",
    teaser: "Representing the CCI, and those who couldn't otherwise afford us.",
    paragraphs: [
      "We understand that access to legal recourse is often limited by financial considerations and information asymmetry. As a firm, we are committed to representing individuals, social sector organisations or governmental bodies who are otherwise commercially constrained from engaging us. This includes advising or representing Indian regulators — such as the Competition Commission of India. Being a member of the panel of law firms appointed to represent the Competition Commission of India, we represent the CCI at various judicial fora.",
      "We are also committed to spending some of our time contributing to academic thought and writing outside of client mandates, through which we hope to address the existing information asymmetry.",
      "Various members of our firm are closely engaged with academic institutions in India and abroad as visiting faculty, guest lecturers, and moot court judges. Our partner, Samir R Gandhi, is a visiting faculty member at National Law School of India University, Bangalore. Our Knowledge Management Counsel, Shruti A. Murali, and Policy Lead, Shashank Sharma, also teach competition law courses at national law schools across India.",
    ],
    highlightGroups: [
      {
        heading: "High Court",
        items: [
          "Representing the Competition Commission of India in a jurisdictional challenge before the Delhi High Court against the Commission's prima facie order directing investigation into alleged abusive conduct by the Basketball Federation of India.",
        ],
      },
      {
        heading: "NCLAT",
        items: [
          "Representing the Competition Commission of India in an appeal filed against a final order passed by the Commission imposing monetary penalty and behavioural remedies on Intel Corp.",
          "Representing the Competition Commission of India in the first-ever compensation claim before the National Company Law Appellate Tribunal, filed following a terminated inquiry by the Commission.",
        ],
      },
    ],
  },
];
