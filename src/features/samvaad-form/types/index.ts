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

export interface QuestionItem {
  id: number;
  number: string;
  category: string;
  text: string;
}

export interface FeedbackSectionData {
  id: string;
  sectionCode: string;
  title: string;
  subtitle: string;
  pillar: string;
  questions: QuestionItem[];
}

export type RatingValue = "5" | "4" | "3" | "2" | "1" | "N/A";

export interface FormResponses {
  ratings: Record<number, RatingValue>;
  comments: Record<number, string>;
  suggestions: {
    startStopContinue?: string;
    otherComments?: string;
    keepDoing?: string;
    improveArea?: string;
    leadershipThoughts?: string;
  };
}

export interface SectionsProps {
  responses?: FormResponses;
  onRatingChange?: (questionId: number, rating: RatingValue) => void;
  onCommentChange?: (questionId: number, comment: string) => void;
  onSuggestionChange?: (field: keyof FormResponses["suggestions"], value: string) => void;
  onSubmit?: (responses: FormResponses) => void;
}
