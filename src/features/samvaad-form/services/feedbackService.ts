import { PostAPIRequest } from "@/apiClient/api";
import { EMPLOYEE_FEEDBACK_ENDPOINT } from "@/constants/endpoints";
import { FEEDBACK_SECTIONS } from "../constants/questions";
import type {
  AboutYouValues,
  EmployeeFeedbackApiResponse,
  EmployeeFeedbackPayload,
  FeedbackQuestionResponse,
  FormResponses,
} from "../types";

export const buildEmployeeFeedbackPayload = (
  about: AboutYouValues = {},
  formResponses: FormResponses
): EmployeeFeedbackPayload => {
  const responses: FeedbackQuestionResponse[] = [];

  for (const section of FEEDBACK_SECTIONS) {
    for (const q of section.questions) {
      responses.push({
        section: section.title,
        subheading: q.category,
        questionText: q.text,
        rating: formResponses.ratings[q.id] ? String(formResponses.ratings[q.id]) : "",
        comment: formResponses.comments[q.id] || "",
      });
    }
  }

  return {
    company: about.company || "",
    department: about.department || "",
    tenure: about.tenure || "",
    roleLevel: about.roleLevel || "",
    responses,
    startStopContinue: formResponses.suggestions.startStopContinue || "",
    additionalSuggestions:
      formResponses.suggestions.additionalSuggestions ||
      formResponses.suggestions.otherComments ||
      "",
  };
};

export const submitEmployeeFeedback = async (
  data: EmployeeFeedbackPayload
): Promise<EmployeeFeedbackApiResponse> => {
  return PostAPIRequest<EmployeeFeedbackApiResponse>({
    url: EMPLOYEE_FEEDBACK_ENDPOINT,
    data,
  });
};

export default submitEmployeeFeedback;
