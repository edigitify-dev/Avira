export const insightCategories = [
  "All insights",
  "Merger Control",
  "Litigation & Enforcement",
  "Counselling & Compliance",
  "Policy & Advocacy",
] as const;

export type InsightCategory = Exclude<(typeof insightCategories)[number], "All insights">;

export type InsightSection = {
  id: string;
  heading: string;
  paragraphs: string[];
};

export type Insight = {
  slug: string;
  title: string;
  date: string;
  category: InsightCategory;
  summary: string;
  introduction: string;
  quote: string;
  takeaways: string[];
  sections: InsightSection[];
};

// Illustrative editorial content. Replace with approved publications, newest first.
export const insights: Insight[] = [
  {
    slug: "competition-strategy-before-the-deal",
    title: "Competition strategy begins before the deal.",
    date: "2026-10-28",
    category: "Merger Control",
    summary: "Why the most useful competition questions belong at the beginning of a transaction, alongside its commercial ambitions.",
    introduction: "A transaction is a story about the future: what two businesses can achieve together, where they can grow, and how they will compete. A considered competition strategy starts by understanding that story before the timetable becomes fixed.",
    quote: "The strongest transaction narrative connects commercial ambition with a clear understanding of the market.",
    takeaways: [
      "Bring competition questions into the first commercial conversations.",
      "Build a consistent picture of customers, competitors and the transaction rationale.",
      "Give information gathering a clear owner and a realistic place in the timetable.",
    ],
    sections: [
      {
        id: "start-with-the-market",
        heading: "Start with the market, not the paperwork",
        paragraphs: [
          "Consider a fictional acquisition between two specialist suppliers. The deal team sees complementary products and a wider distribution network. Customers may see something different: two familiar alternatives becoming one. Exploring both perspectives early creates a more complete picture of the proposed combination.",
          "A useful opening conversation brings commercial and legal teams together around a few basic questions. What do customers value? Which alternatives do they consider? Where do the businesses genuinely overlap? These questions give later analysis a firmer foundation than a product list alone.",
        ],
      },
      {
        id: "build-the-evidence",
        heading: "Make the evidence part of the process",
        paragraphs: [
          "Market understanding often sits across different teams. Sales colleagues know why a bid was lost. Product teams know which alternatives customers compare. Finance teams can explain how the business measures performance. Bringing those perspectives together is a practical exercise in coordination.",
          "For the fictional deal team, a shared information plan would identify the questions, the people best placed to answer them, and the assumptions that still need testing. It would also separate established facts from expectations about what the combined business might achieve.",
        ],
      },
      {
        id: "leave-room-for-judgment",
        heading: "Leave room for judgment in the timetable",
        paragraphs: [
          "A credible timetable makes space for questions that emerge as the transaction develops. A new product overlap, an unexpected customer perspective, or a change in the commercial rationale can all warrant another look at the original assumptions.",
          "The broader lesson is about preparation. When a team understands its market story and knows where its evidence comes from, it can discuss uncertainty more clearly. Competition strategy then becomes part of the deal conversation from the outset.",
        ],
      },
    ],
  },
  {
    slug: "a-clearer-record-for-complex-disputes",
    title: "A clearer record. A stronger starting point.",
    date: "2026-10-21",
    category: "Litigation & Enforcement",
    summary: "A perspective on turning a complicated commercial history into a focused, intelligible dispute narrative.",
    introduction: "Commercial disputes rarely arrive as a tidy sequence of events. They arrive as emails, agreements, meeting notes and competing recollections. The first challenge is often to understand what happened well enough to explain it simply.",
    quote: "Clarity comes from understanding the difficult details, then choosing the ones that matter.",
    takeaways: [
      "Distinguish the chronology of events from the arguments built around them.",
      "Read important documents in their original commercial context.",
      "Keep unanswered questions visible as the record develops.",
    ],
    sections: [
      {
        id: "find-the-through-line",
        heading: "Find the through line",
        paragraphs: [
          "Imagine a fictional supply relationship that deteriorated over several years. One team remembers a pricing disagreement; another points to delivery problems. A neutral chronology can show how the two issues developed together without prematurely deciding which account is more persuasive.",
          "The aim is a working record that everyone can interrogate. Dates, decisions and source documents form its backbone. Interpretations can then be considered against that shared sequence rather than becoming a substitute for it.",
        ],
      },
      {
        id: "read-in-context",
        heading: "Read the documents in context",
        paragraphs: [
          "A sentence in an email can look different when read alongside the discussion that preceded it. Commercial shorthand, changing responsibilities and incomplete information can all affect what a document communicates.",
          "In the fictional example, meeting notes and contemporaneous explanations help the team understand why a decision was taken. Where the record does not provide an answer, that gap remains a question rather than being quietly filled with an assumption.",
        ],
      },
      {
        id: "make-complexity-readable",
        heading: "Make complexity readable",
        paragraphs: [
          "A useful narrative gives the reader a route through the material. It explains the relationship, identifies the turning points and connects each material proposition to the underlying record. Supporting detail remains available without overwhelming the main account.",
          "This discipline is valuable beyond the eventual dispute. It helps a business understand its own history, compare different perspectives and have a more informed conversation about the decisions ahead.",
        ],
      },
    ],
  },
  {
    slug: "compliance-that-fits-the-business",
    title: "Compliance that fits the way a business works.",
    date: "2026-10-14",
    category: "Counselling & Compliance",
    summary: "Moving from a policy on the shelf to useful conversations at the moments that matter.",
    introduction: "A policy can describe a business perfectly on paper and still feel remote from daily work. The more interesting design question is how to make a compliance conversation relevant to the people making commercial decisions.",
    quote: "A useful programme speaks the language of the people who need to use it.",
    takeaways: [
      "Use realistic situations drawn from the work of each team.",
      "Make the route to asking a question easy to understand.",
      "Treat feedback from employees as part of programme design.",
    ],
    sections: [
      {
        id: "begin-with-daily-decisions",
        heading: "Begin with daily decisions",
        paragraphs: [
          "Consider a fictional business with sales, procurement and product teams. Each group encounters different conversations and pressures. A single presentation may introduce a common vocabulary, but the examples that make it meaningful will differ.",
          "A sales workshop might explore a trade event conversation. A procurement discussion might examine how a supplier meeting is prepared. These scenarios can create space for questions without pretending that every situation has a simple, universal answer.",
        ],
      },
      {
        id: "make-questions-easier",
        heading: "Make it easier to ask a question",
        paragraphs: [
          "In our fictional business, colleagues know a policy exists but are unsure whom to contact when a situation feels unfamiliar. Clarifying that route can be as useful as refining the wording of the policy itself.",
          "The design of an internal programme includes its practical details: who receives a question, how the relevant context is collected, and how a response reaches the person who needs it. Those details shape whether a programme feels usable.",
        ],
      },
      {
        id: "keep-the-conversation-open",
        heading: "Keep the conversation open",
        paragraphs: [
          "Businesses change. Products, partnerships and responsibilities evolve, and training examples can lose their relevance. Feedback from the people using a programme offers a way to understand where the next conversation should begin.",
          "The aspiration is a programme that remains connected to the organisation. Its usefulness can be explored through the quality of the questions it invites and the ease with which people find the right discussion.",
        ],
      },
    ],
  },
  {
    slug: "asking-better-questions-about-digital-markets",
    title: "Asking better questions about digital markets.",
    date: "2026-10-07",
    category: "Policy & Advocacy",
    summary: "Looking beyond familiar labels to understand the different relationships inside a digital ecosystem.",
    introduction: "The word platform can describe very different businesses. A marketplace, a discovery service and a software ecosystem may connect people in different ways. A productive policy conversation begins by making those differences visible.",
    quote: "Understanding a digital market starts with the relationships inside it.",
    takeaways: [
      "Describe the service before relying on a broad market label.",
      "Consider the perspectives of each group using the ecosystem.",
      "Be explicit about the assumptions behind a policy proposal.",
    ],
    sections: [
      {
        id: "describe-the-relationships",
        heading: "Describe the relationships",
        paragraphs: [
          "Imagine a fictional marketplace connecting independent sellers with customers. Sellers may value access to an audience; customers may value convenient discovery. Service providers could add another layer, helping sellers manage fulfilment or payments.",
          "Mapping these relationships creates a starting point for discussion. It encourages participants to explain who uses the service, what each group contributes and which alternatives they consider meaningful.",
        ],
      },
      {
        id: "look-at-the-trade-offs",
        heading: "Look closely at the trade-offs",
        paragraphs: [
          "A product design choice may have different implications for different participants. Greater consistency in presentation might help customers compare offers while changing how sellers distinguish themselves. A useful analysis leaves room for both perspectives.",
          "In the fictional marketplace, a policy discussion would benefit from concrete examples of those experiences. The objective is to describe the trade-offs clearly enough for competing explanations to be examined.",
        ],
      },
      {
        id: "make-assumptions-visible",
        heading: "Make the assumptions visible",
        paragraphs: [
          "Every proposal rests on a view of how people and businesses will respond. Separating that view from the evidence supporting it helps readers understand both the ambition of a proposal and the questions that remain open.",
          "A careful contribution to policy can be both clear and provisional. It can set out a position, explain its reasoning and identify the evidence that would change the analysis.",
        ],
      },
    ],
  },
  {
    slug: "the-commercial-story-behind-a-joint-venture",
    title: "The commercial story behind a joint venture.",
    date: "2026-09-23",
    category: "Merger Control",
    summary: "Understanding the shared ambition, separate interests and practical design of a proposed collaboration.",
    introduction: "A joint venture brings businesses together around something they want to build. Understanding the collaboration means looking at that shared ambition alongside the activities each participant will continue to pursue independently.",
    quote: "The starting point is a precise account of what the collaboration is intended to do.",
    takeaways: [
      "Describe the venture’s intended activities in concrete terms.",
      "Distinguish shared work from the participants’ independent businesses.",
      "Keep the operational design connected to the commercial rationale.",
    ],
    sections: [
      {
        id: "define-the-shared-project",
        heading: "Define the shared project",
        paragraphs: [
          "Consider two fictional manufacturers exploring a shared research facility. Their commercial rationale may include combining technical expertise and spreading the cost of experimentation. Writing that rationale in practical terms helps explain the project to colleagues outside the negotiating team.",
          "The description becomes more useful when it identifies the work the venture will undertake, the resources it will use and the decisions still to be made. Broad language about synergies offers less insight than a clear account of the proposed activity.",
        ],
      },
      {
        id: "understand-the-boundaries",
        heading: "Understand the boundaries",
        paragraphs: [
          "The fictional manufacturers will also continue to run their own businesses. Understanding which activities belong to the research project and which remain separate is part of understanding the arrangement as a whole.",
          "An operational picture can clarify the questions for further review: which people work on the project, how resources are allocated and how decisions are recorded. The answers depend on the design of the particular collaboration.",
        ],
      },
      {
        id: "revisit-the-original-rationale",
        heading: "Revisit the original rationale",
        paragraphs: [
          "As negotiations develop, a proposed venture can change shape. An additional product line, a different funding arrangement or a broader research objective may alter the original picture.",
          "Returning to the commercial rationale gives the team a common reference point. It helps everyone explain what the project has become and why its final design makes sense to the participants.",
        ],
      },
    ],
  },
  {
    slug: "making-space-for-meaningful-consultation",
    title: "Making space for meaningful consultation.",
    date: "2026-09-09",
    category: "Policy & Advocacy",
    summary: "How a focused, evidence-led submission can bring an industry’s practical experience into a wider policy conversation.",
    introduction: "A consultation invites different experiences into the same conversation. The most useful contributions help a reader understand a concrete issue, the evidence behind it and the practical implications of the options being discussed.",
    quote: "A persuasive submission makes its reasoning easy for the reader to follow.",
    takeaways: [
      "Organise the response around the questions being asked.",
      "Use specific examples to explain practical implications.",
      "Separate observations, assumptions and proposed alternatives.",
    ],
    sections: [
      {
        id: "begin-with-the-question",
        heading: "Begin with the question being asked",
        paragraphs: [
          "Imagine a fictional industry association preparing a response to a discussion paper. Its members bring different experiences, and not every concern addresses the same question. An initial mapping exercise can connect each observation to the issue it helps illuminate.",
          "This approach gives the submission a clear structure. A reader can find the response to a particular question, understand the reasoning and see where members hold different views.",
        ],
      },
      {
        id: "bring-experience-to-life",
        heading: "Bring practical experience to life",
        paragraphs: [
          "General statements about cost or complexity are difficult to assess in isolation. A carefully described example can show the sequence of decisions, the people involved and the point at which a proposed approach would change an existing process.",
          "For the fictional association, this might mean comparing two common workflows rather than asserting that all members operate in the same way. Explaining the limits of an example makes it easier to understand what it does and does not demonstrate.",
        ],
      },
      {
        id: "offer-a-clear-way-forward",
        heading: "Offer a clear way forward",
        paragraphs: [
          "Where a response proposes an alternative, its reasoning should be as visible as the concern it addresses. Readers benefit from understanding how the alternative serves the stated objective and which trade-offs it introduces.",
          "A thoughtful submission can make a contribution without claiming to settle every question. Its value lies in giving the wider conversation a clearer view of the experience and reasoning behind its position.",
        ],
      },
    ],
  },
];

export function formatInsightDate(date: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  }).format(new Date(date));
}

export function getReadingTime(insight: Insight): number {
  const text = [insight.introduction, insight.quote, ...insight.takeaways,
    ...insight.sections.flatMap((section) => [section.heading, ...section.paragraphs]),
  ].join(" ");
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200));
}

export function getInsightBySlug(slug: string): Insight | undefined {
  return insights.find((insight) => insight.slug === slug);
}

export function getLatestInsights(count: number): Insight[] {
  return insights.slice(0, count);
}

export function getRelatedInsights(insight: Insight, count = 3): Insight[] {
  const others = insights.filter((item) => item.slug !== insight.slug);
  return [
    ...others.filter((item) => item.category === insight.category),
    ...others.filter((item) => item.category !== insight.category),
  ].slice(0, count);
}
