"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card, Button, Input, message } from "antd";
import { Send, CheckCircle } from "lucide-react";
import enggisLogo from "@/assets/enggis-logo.png";
import { FEEDBACK_SECTIONS, RATING_NUMBERS } from "../../constants/questions";
import type { FormResponses, RatingValue, SectionsProps } from "../../types";
import styles from "./Sections.module.css";

const { TextArea } = Input;

export const Sections: React.FC<SectionsProps> = ({
  responses: propResponses,
  onRatingChange,
  onCommentChange,
  onSuggestionChange,
  onSubmit,
}) => {
  const [internalResponses, setInternalResponses] = useState<FormResponses>({
    ratings: {},
    comments: {},
    suggestions: {
      startStopContinue: "",
      otherComments: "",
    },
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const responses = propResponses || internalResponses;

  const handleRatingSelect = (questionId: number, rating: RatingValue) => {
    const currentRating = responses.ratings[questionId];
    const newRating = currentRating === rating ? ("" as RatingValue) : rating;

    if (!propResponses) {
      setInternalResponses((prev) => {
        const nextRatings = { ...prev.ratings };
        if (!newRating) {
          delete nextRatings[questionId];
        } else {
          nextRatings[questionId] = newRating;
        }
        return { ...prev, ratings: nextRatings };
      });
    }

    onRatingChange?.(questionId, newRating);
  };

  const handleCommentChange = (questionId: number, text: string) => {
    if (!propResponses) {
      setInternalResponses((prev) => ({
        ...prev,
        comments: { ...prev.comments, [questionId]: text },
      }));
    }
    onCommentChange?.(questionId, text);
  };

  const handleSuggestionChange = (
    field: keyof FormResponses["suggestions"],
    value: string
  ) => {
    if (!propResponses) {
      setInternalResponses((prev) => ({
        ...prev,
        suggestions: { ...prev.suggestions, [field]: value },
      }));
    }
    onSuggestionChange?.(field, value);
  };

  const totalAnswered = Object.keys(responses.ratings).length;

  const handleSubmit = () => {
    if (totalAnswered === 0) {
      message.warning("Please answer at least one statement before submitting.");
      return;
    }

    setIsSubmitted(true);
    onSubmit?.(responses);
    message.success("Thank you for your feedback!");
  };

  if (isSubmitted) {
    return (
      <div className={styles.sectionsContainer}>
        <Card className={styles.thankYouCard} variant="borderless">
          <CheckCircle size={56} color="#4BC6C6" style={{ marginBottom: "1.25rem" }} />
          <h2 className={styles.thankYouTitle}>Thank you!</h2>
          <p className={styles.thankYouText}>
            Your feedback has been received. Your responses help us build culture, strengthen HR
            practices, and fuel sustainable growth across the Enggis Group of Companies.
          </p>
          <Button
            className={styles.submitBtn}
            onClick={() => {
              setIsSubmitted(false);
            }}
          >
            Review or Edit Response
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.sectionsContainer}>
      {/* Sections A to E (Rating Questions matching screenshot design) */}
      {FEEDBACK_SECTIONS.map((section) => (
        <Card key={section.id} className={styles.sectionCard} variant="borderless">
          {/* Header */}
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{section.title}</h2>
            <p className={styles.sectionSubtitle}>{section.subtitle}</p>
          </div>

          {/* Question List */}
          <div className={styles.questionList}>
            {section.questions.map((q) => {
              const selectedRating = responses.ratings[q.id];

              return (
                <div key={q.id} className={styles.questionItem}>
                  {/* Question Meta: Number (Saffron Fraunces) & Category Tag (Teal Mulish) */}
                  <div className={styles.questionMeta}>
                    <span className={styles.questionNumber}>{q.number}</span>
                    <span className={styles.questionCategory}>{q.category}</span>
                  </div>

                  {/* Statement Text */}
                  <h3 className={styles.questionText}>{q.text}</h3>

                  {/* Rating Controls: All in one single compact row (5 4 3 2 1 N/A) */}
                  <div
                    className={styles.ratingRow}
                    role="radiogroup"
                    aria-label={`Rating for question ${q.number}`}
                  >
                    {RATING_NUMBERS.map((num) => {
                      const isSelected = selectedRating === num;
                      return (
                        <button
                          key={num}
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          className={`${styles.ratingTileBtn} ${
                            isSelected ? styles.ratingTileBtnSelected : ""
                          }`}
                          onClick={() => handleRatingSelect(q.id, num as RatingValue)}
                        >
                          {num}
                        </button>
                      );
                    })}

                    <button
                      type="button"
                      role="radio"
                      aria-checked={selectedRating === "N/A"}
                      className={`${styles.ratingTileBtn} ${styles.naBtn} ${
                        selectedRating === "N/A" ? styles.ratingTileBtnSelected : ""
                      }`}
                      onClick={() => handleRatingSelect(q.id, "N/A")}
                    >
                      N/A
                    </button>
                  </div>

                  {/* Comments Box: Small textarea for each statement */}
                  <div className={styles.commentBoxWrapper}>
                    <TextArea
                      size="small"
                      rows={2}
                      placeholder="Comments (optional)"
                      maxLength={1000}
                      className={styles.statementCommentInput}
                      value={responses.comments[q.id] || ""}
                      onChange={(e) => handleCommentChange(q.id, e.target.value)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      ))}

      {/* Section F — Your Suggestions */}
      {/* Section F - Suggestions */}
      <Card className={styles.sectionCard} variant="borderless">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Section F — Your Suggestions</h2>
        </div>

        {/* Question 24 */}
        <div className={styles.suggestionGroup}>
          <label className={styles.suggestionLabel}>
            24. What is one thing the organization should start, stop or continue doing to make this a better place to work?
          </label>
          <TextArea
            rows={4}
            maxLength={3000}
            className={styles.commentInput}
            value={responses.suggestions.startStopContinue || ""}
            onChange={(e) => handleSuggestionChange("startStopContinue", e.target.value)}
          />
        </div>

        {/* Question 25 */}
        <div className={styles.suggestionGroup}>
          <label className={styles.suggestionLabel}>
            25. Any other comments or suggestions for your team, manager, leadership or HR &amp; Admin?
          </label>
          <TextArea
            rows={4}
            maxLength={3000}
            className={styles.commentInput}
            value={responses.suggestions.otherComments || ""}
            onChange={(e) => handleSuggestionChange("otherComments", e.target.value)}
          />
        </div>
      </Card>

      {/* Submit Action Bar */}
      <div className={styles.submitSection}>
        <Button
          type="primary"
          size="large"
          className={styles.submitBtn}
          onClick={handleSubmit}
        >
          <Send size={18} />
          <span>Submit Feedback</span>
        </Button>
        <p className={styles.submitInfoText}>
          {totalAnswered} of 23 statements answered • Your responses are 100% confidential
        </p>
      </div>

      {/* Footer Initiative Card (from screenshot) */}
      <Card className={styles.footerCard} variant="borderless">
        <div className={styles.footerLogoBox}>
          <Image
            src={enggisLogo}
            alt="Enggis Group of Companies"
            className={styles.footerLogoImg}
            width={90}
            height={90}
          />
        </div>
        <div className={styles.footerTextContent}>
          <p>
            Samvaad is an initiative of the <strong>Enggis Group of Companies</strong>.
          </p>
          <p>
            What you share here helps us improve employee experience across the group.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Sections;
