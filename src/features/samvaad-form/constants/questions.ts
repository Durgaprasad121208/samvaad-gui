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
        number: "01",
        text: "My team has the right number of people with the right skills to deliver our work.",
      },
      {
        id: 2,
        number: "02",
        text: "I feel safe raising ideas, concerns or mistakes within my team.",
      },
      {
        id: 3,
        number: "03",
        text: "Our work processes (SOPs) are clearly defined, documented and followed consistently.",
      },
      {
        id: 4,
        number: "04",
        text: "I have the software tools, equipment and resources I need to do my job well.",
      },
      {
        id: 5,
        number: "05",
        text: "Team members treat each other with respect and help one another succeed.",
      },
      {
        id: 6,
        number: "06",
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
        number: "07",
        text: "Our customers can rely on us to keep the commitments we make.",
      },
      {
        id: 8,
        number: "08",
        text: "We consistently deliver projects and products on the agreed timelines.",
      },
      {
        id: 9,
        number: "09",
        text: "Quality is never compromised to meet a deadline or cost target.",
      },
      {
        id: 10,
        number: "10",
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
        text: "Leadership has shared a clear vision and goals, and I understand how my work contributes to them.",
      },
      {
        id: 12,
        number: "12",
        text: "Leadership encourages new ideas, feedback and improvements.",
      },
      {
        id: 13,
        number: "13",
        text: "The organization invests in new technologies and digital tools to stay competitive.",
      },
      {
        id: 14,
        number: "14",
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
        text: "My manager sets clear expectations, priorities and targets for my work.",
      },
      {
        id: 16,
        number: "16",
        text: "My manager gives me regular, constructive feedback on my performance.",
      },
      {
        id: 17,
        number: "17",
        text: "My manager supports my learning through training, coaching and allot new responsibilities.",
      },
      {
        id: 18,
        number: "18",
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
        text: "HR policies (leave, timesheet, attendance, benefits & others) are clearly communicated and applied fairly to everyone.",
      },
      {
        id: 20,
        number: "20",
        text: "Payroll, Expenses, reimbursements and HR queries are handled accurately and on time.",
      },
      {
        id: 21,
        number: "21",
        text: "Office facilities (workspace, rooms, cleanliness, safety, canteen, amenities) support my productivity.",
      },
      {
        id: 22,
        number: "22",
        text: "Admin & IT support (IT assets, travel, transport, stationery) is responsive when I need it.",
      },
      {
        id: 23,
        number: "23",
        text: "I know how to raise grievance, and I trust it will be resolved fairly, promptly and confidentially.",
      },
    ],
  },
];

export const RATING_OPTIONS = [
  { value: "5", label: "Strongly agree", short: "5" },
  { value: "4", label: "Agree", short: "4" },
  { value: "3", label: "Neutral", short: "3" },
  { value: "2", label: "Disagree", short: "2" },
  { value: "1", label: "Strongly disagree", short: "1" },
  { value: "N/A", label: "N/A", short: "N/A" },
] as const;
