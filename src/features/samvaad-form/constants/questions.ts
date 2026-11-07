import type { FeedbackSectionData } from "../types";

export const FEEDBACK_SECTIONS: FeedbackSectionData[] = [
  {
    id: "section-a",
    sectionCode: "Section A",
    title: "Section A — Team",
    subtitle: "People, Process, Tools & Culture",
    pillar: "TEAM",
    questions: [
      {
        id: 1,
        number: "1",
        category: "PEOPLE",
        text: "My team has the right number of people with the right skills to deliver our work.",
      },
      {
        id: 2,
        number: "2",
        category: "PEOPLE",
        text: "I feel safe raising ideas, concerns or mistakes within my team.",
      },
      {
        id: 3,
        number: "3",
        category: "PROCESS",
        text: "Our work processes (SOPs) are clearly defined, documented and followed consistently.",
      },
      {
        id: 4,
        number: "4",
        category: "TOOLS",
        text: "I have the software tools, equipment and resources I need to do my job well.",
      },
      {
        id: 5,
        number: "5",
        category: "CULTURE",
        text: "Team members treat each other with respect and help one another succeed.",
      },
      {
        id: 6,
        number: "6",
        category: "CULTURE",
        text: "I feel safe raising concerns or grievances with HR & Get Timely Support.",
      },
    ],
  },
  {
    id: "section-b",
    sectionCode: "Section B",
    title: "Section B — Customer",
    subtitle: "Trust, Delivery, Quality & Communication",
    pillar: "CUSTOMER",
    questions: [
      {
        id: 7,
        number: "7",
        category: "TRUST",
        text: "Our customers can rely on us to keep the commitments we make.",
      },
      {
        id: 8,
        number: "8",
        category: "DELIVERY",
        text: "We consistently deliver projects and products on the agreed timelines.",
      },
      {
        id: 9,
        number: "9",
        category: "QUALITY",
        text: "Quality is never compromised to meet a deadline or cost target.",
      },
      {
        id: 10,
        number: "10",
        category: "COMMUNICATION",
        text: "We communicate to customer clearly & customer requirements, changes and feedback reach my team clearly and on time.",
      },
    ],
  },
  {
    id: "section-c",
    sectionCode: "Section C",
    title: "Section C — Leadership",
    subtitle: "Aspiration, Innovation, Technology & Collaboration",
    pillar: "LEADERSHIP",
    questions: [
      {
        id: 11,
        number: "11",
        category: "ASPIRATION",
        text: "Leadership has shared a clear vision and goals, and I understand how my work contributes to them.",
      },
      {
        id: 12,
        number: "12",
        category: "INNOVATION",
        text: "Leadership encourages new ideas, feedback and improvements.",
      },
      {
        id: 13,
        number: "13",
        category: "TECHNOLOGY",
        text: "The organization invests in new technologies and digital tools to stay competitive.",
      },
      {
        id: 14,
        number: "14",
        category: "COLLABORATION",
        text: "Leadership promotes teamwork across departments and group of companies.",
      },
    ],
  },
  {
    id: "section-d",
    sectionCode: "Section D",
    title: "Section D — Teamwork",
    subtitle: "Workplace, Learning & Growth",
    pillar: "TEAMWORK",
    questions: [
      {
        id: 15,
        number: "15",
        category: "WORKPLACE",
        text: "My manager sets clear expectations, priorities and targets for my work.",
      },
      {
        id: 16,
        number: "16",
        category: "FEEDBACK",
        text: "My manager gives me regular, constructive feedback on my performance.",
      },
      {
        id: 17,
        number: "17",
        category: "LEARNING",
        text: "My manager supports my learning through training, coaching and allot new responsibilities.",
      },
      {
        id: 18,
        number: "18",
        category: "RECOGNITION",
        text: "My manager recognizes and appreciates good work.",
      },
    ],
  },
  {
    id: "section-e",
    sectionCode: "Section E",
    title: "Section E — Operations",
    subtitle: "HR, IT, Admin & Grievance Resolution",
    pillar: "OPERATIONS",
    questions: [
      {
        id: 19,
        number: "19",
        category: "HR",
        text: "HR policies (leave, timesheet, attendance, benefits & others) are clearly communicated and applied fairly to everyone.",
      },
      {
        id: 20,
        number: "20",
        category: "PAYROLL",
        text: "Payroll, Expenses, reimbursements and HR queries are handled accurately and on time.",
      },
      {
        id: 21,
        number: "21",
        category: "ADMIN",
        text: "Office facilities (workspace, rooms, cleanliness, safety, canteen, amenities) support my productivity.",
      },
      {
        id: 22,
        number: "22",
        category: "IT",
        text: "Admin & IT support (IT assets, travel, transport, stationery) is responsive when I need it.",
      },
      {
        id: 23,
        number: "23",
        category: "GRIEVANCE",
        text: "I know how to raise grievance, and I trust it will be resolved fairly, promptly and confidentially.",
      },
    ],
  },
];

export const RATING_NUMBERS = ["5", "4", "3", "2", "1"] as const;
