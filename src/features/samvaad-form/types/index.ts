export interface HeroSectionProps {
  completedQuestions?: number;
  totalQuestions?: number;
  initiativeText?: string;
  title?: string;
  description?: string;
}

export interface AboutYouValues {
  company?: string;
  department?: string;
  tenure?: string;
  roleLevel?: string;
}

export interface AboutSectionProps {
  values?: AboutYouValues;
  onChange?: (field: keyof AboutYouValues, value: string) => void;
}

export interface FeedbackSection {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  questionCount: number;
}
