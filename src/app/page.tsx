"use client";

import { useState } from "react";
import { ConfigProvider, App, theme } from "antd";
import { HeroSection } from "@/features/samvaad-form/components/hero-section";
import { AboutSection } from "@/features/samvaad-form/components/about-section";
import { Sections } from "@/features/samvaad-form/components/sections";
import { NotificationProvider } from "@/utils/notify";
import type { FormResponses, RatingValue } from "@/features/samvaad-form/types";

export default function Home() {
  const [responses, setResponses] = useState<FormResponses>({
    ratings: {},
    comments: {},
    suggestions: {
      startStopContinue: "",
      otherComments: "",
    },
  });

  const handleRatingChange = (questionId: number, rating: RatingValue) => {
    setResponses((prev) => {
      const nextRatings = { ...prev.ratings };
      if (!rating) {
        delete nextRatings[questionId];
      } else {
        nextRatings[questionId] = rating;
      }
      return { ...prev, ratings: nextRatings };
    });
  };

  const handleCommentChange = (questionId: number, text: string) => {
    setResponses((prev) => ({
      ...prev,
      comments: { ...prev.comments, [questionId]: text },
    }));
  };

  const handleSuggestionChange = (
    field: keyof FormResponses["suggestions"],
    value: string
  ) => {
    setResponses((prev) => ({
      ...prev,
      suggestions: { ...prev.suggestions, [field]: value },
    }));
  };

  const completedQuestions = Object.keys(responses.ratings).length;

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#F7A329",
          colorWarning: "#F7A329",
          colorSuccess: "#4BC6C6",
          colorError: "#EF4444",
          colorInfo: "#E5B151",
          colorBgElevated: "#0D192F",
          colorText: "#EEE7D9",
          colorTextHeading: "#EEE7D9",
          colorBorder: "rgba(238, 231, 217, 0.12)",
          fontFamily: "var(--font-mulish), system-ui, -apple-system, sans-serif",
        },
        components: {
          Notification: {
            colorBgElevated: "#0D192F",
            colorText: "#EEE7D9",
            colorTextHeading: "#EEE7D9",
            borderRadiusLG: 14,
          },
          Message: {
            contentBg: "#0D192F",
            colorText: "#EEE7D9",
            borderRadiusLG: 9999,
          },
        },
      }}
    >
      <App>
        <NotificationProvider>
          <main style={{ minHeight: "100vh", backgroundColor: "var(--bg-page, #050E21)" }}>
            <HeroSection completedQuestions={completedQuestions} totalQuestions={23} />
            <AboutSection />
            <Sections
              responses={responses}
              onRatingChange={handleRatingChange}
              onCommentChange={handleCommentChange}
              onSuggestionChange={handleSuggestionChange}
            />
          </main>
        </NotificationProvider>
      </App>
    </ConfigProvider>
  );
}
