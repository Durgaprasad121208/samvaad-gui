"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card, Button, Input, message } from "antd";
import { Send, CheckCircle, MessageSquare } from "lucide-react";
import enggisLogo from "@/assets/enggis-logo.png";
import { FEEDBACK_SECTIONS, RATING_OPTIONS } from "../../constants/questions";
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
      keepDoing: "",
      improveArea: "",
      leadershipThoughts: "",
    },
  });

  const [activeComments, setActiveComments] = useState<Record<number, boolean>>({});
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

  const toggleCommentBox = (questionId: number) => {
    setActiveComments((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
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
      {/* Sections A to E (Rating Questions) */}
      {FEEDBACK_SECTIONS.map((section) => (
        <Card key={section.id} className={styles.sectionCard} variant="borderless">
          {/* Header */}
          <div className={styles.sectionHeader}>
            <span className={styles.pillarLabel}>{section.pillar}</span>
            <h2 className={styles.sectionTitle}>{section.title}</h2>
            <p className={styles.sectionSubtitle}>{section.subtitle}</p>
          </div>

          {/* Question List */}
          <div className={styles.questionList}>
            {section.questions.map((q) => {
              const selectedRating = responses.ratings[q.id];
              const showComment = activeComments[q.id] || Boolean(responses.comments[q.id]);

              return (
                <div key={q.id} className={styles.questionItem}>
                  {/* Question Title & Number */}
                  <div className={styles.questionHeader}>
                    <span className={styles.questionNumber}>{q.number}</span>
                    <h3 className={styles.questionText}>{q.text}</h3>
                  </div>

                  {/* Rating Options */}
                  <div className={styles.ratingRow} role="radiogroup" aria-label={`Rating for question ${q.number}`}>
                    {RATING_OPTIONS.map((opt) => {
                      const isSelected = selectedRating === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          className={`${styles.ratingBtn} ${isSelected ? styles.ratingBtnSelected : ""}`}
                          onClick={() => handleRatingSelect(q.id, opt.value as RatingValue)}
                        >
                          <span className={styles.ratingValue}>{opt.short}</span>
                          <span className={styles.ratingDesc}>{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Optional Comment Toggle */}
                  {!showComment ? (
                    <button
                      type="button"
                      className={styles.commentToggle}
                      onClick={() => toggleCommentBox(q.id)}
                    >
                      <MessageSquare size={13} />
                      <span>Add a note (optional)</span>
                    </button>
                  ) : (
                    <div className={styles.commentTextareaWrapper}>
                      <TextArea
                        rows={2}
                        placeholder="Share specific context or examples (avoid naming individuals)..."
                        className={styles.customTextarea}
                        value={responses.comments[q.id] || ""}
                        onChange={(e) => handleCommentChange(q.id, e.target.value)}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      ))}

      {/* Section F — Your Suggestions */}
      <Card className={styles.sectionCard} variant="borderless">
        <div className={styles.sectionHeader}>
          <span className={styles.pillarLabel}>SUGGESTIONS</span>
          <h2 className={styles.sectionTitle}>Section F — Your Suggestions</h2>
          <p className={styles.sectionSubtitle}>
            What you share here helps us improve employee experience across the group.
          </p>
        </div>

        {/* Suggestion Prompt 1 */}
        <div className={styles.suggestionGroup}>
          <label className={styles.suggestionLabel}>
            What is one thing we do well and should continue doing?
          </label>
          <TextArea
            rows={3}
            placeholder="Share what works well for you or your team..."
            className={styles.customTextarea}
            value={responses.suggestions.keepDoing || ""}
            onChange={(e) => handleSuggestionChange("keepDoing", e.target.value)}
          />
        </div>

        {/* Suggestion Prompt 2 */}
        <div className={styles.suggestionGroup}>
          <label className={styles.suggestionLabel}>
            What is one area where we can improve the most?
          </label>
          <TextArea
            rows={3}
            placeholder="Share your ideas or areas that need attention..."
            className={styles.customTextarea}
            value={responses.suggestions.improveArea || ""}
            onChange={(e) => handleSuggestionChange("improveArea", e.target.value)}
          />
        </div>

        {/* Suggestion Prompt 3 */}
        <div className={styles.suggestionGroup}>
          <label className={styles.suggestionLabel}>
            Any other thoughts, ideas or feedback for leadership?
          </label>
          <TextArea
            rows={3}
            placeholder="Any other comments or constructive suggestions..."
            className={styles.customTextarea}
            value={responses.suggestions.leadershipThoughts || ""}
            onChange={(e) => handleSuggestionChange("leadershipThoughts", e.target.value)}
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
