"use client";

import React, { useState } from "react";
import { Card } from "antd";
import type { AboutSectionProps, AboutYouValues } from "../../types";
import styles from "./AboutSection.module.css";

const RATING_LEGEND = [
  { value: "5", label: "Strongly agree" },
  { value: "4", label: "Agree" },
  { value: "3", label: "Neutral" },
  { value: "2", label: "Disagree" },
  { value: "1", label: "Strongly disagree" },
  { value: "N/A", label: "Not applicable" },
];

const COMPANIES = [
  "Stability Automation",
  "NexSys Process Automations Pvt Ltd",
  "Mantix Digital Solutions Pvt Ltd",
];

const DEPARTMENTS = [
  "Engineering",
  "Business Development",
  "Sales",
  "Software",
  "Execution",
  "Operations",
  "Leadership",
];

const TENURES = [
  "Less than 1 year",
  "1–2 years",
  "2–4 years",
  "More than 4 years",
];

const ROLE_LEVELS = [
  "Individual contributor",
  "Team lead",
  "Managerial/Leadership",
];

export const AboutSection: React.FC<AboutSectionProps> = ({
  values: propValues,
  onChange,
}) => {
  const [internalValues, setInternalValues] = useState<AboutYouValues>({
    company: "",
    department: "",
    tenure: "",
    roleLevel: "",
  });

  const values = propValues || internalValues;

  const handleSelect = (field: keyof AboutYouValues, option: string) => {
    const nextVal = values[field] === option ? "" : option;
    if (!propValues) {
      setInternalValues((prev) => ({ ...prev, [field]: nextVal }));
    }
    onChange?.(field, nextVal);
  };

  return (
    <section className={styles.aboutSectionWrapper} aria-label="Before you begin and About you">
      {/* Card 1: Before you begin */}
      <Card className={styles.card} variant="borderless">
        <h2 className={styles.cardTitle}>Before you begin</h2>
        <p className={styles.cardDescription}>
          Responses are reported only as group results, never by individuals. Answer based on your
          own experience. Choose &quot;N/A&quot; only if a statement doesn&apos;t apply to your role.
        </p>

        {/* 6 Rating scale tiles */}
        <div className={styles.legendGrid}>
          {RATING_LEGEND.map((item) => (
            <div key={item.value} className={styles.legendTile}>
              <span className={styles.legendNumber}>{item.value}</span>
              <span className={styles.legendText}>{item.label}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Card 2: About you */}
      <Card id="about-you-section" className={styles.card} variant="borderless">
        <h2 className={styles.cardTitle}>About you</h2>

        {/* Company */}
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Company</label>
          <div className={styles.optionsRow} role="radiogroup" aria-label="Company">
            {COMPANIES.map((company) => {
              const isSelected = values.company === company;
              return (
                <button
                  key={company}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  className={`${styles.optionPill} ${isSelected ? styles.optionPillSelected : ""}`}
                  onClick={() => handleSelect("company", company)}
                >
                  {company}
                </button>
              );
            })}
          </div>
        </div>

        {/* Department */}
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Department</label>
          <div className={styles.optionsRow} role="radiogroup" aria-label="Department">
            {DEPARTMENTS.map((dept) => {
              const isSelected = values.department === dept;
              return (
                <button
                  key={dept}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  className={`${styles.optionPill} ${isSelected ? styles.optionPillSelected : ""}`}
                  onClick={() => handleSelect("department", dept)}
                >
                  {dept}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tenure */}
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Tenure</label>
          <div className={styles.optionsRow} role="radiogroup" aria-label="Tenure">
            {TENURES.map((tenure) => {
              const isSelected = values.tenure === tenure;
              return (
                <button
                  key={tenure}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  className={`${styles.optionPill} ${isSelected ? styles.optionPillSelected : ""}`}
                  onClick={() => handleSelect("tenure", tenure)}
                >
                  {tenure}
                </button>
              );
            })}
          </div>
        </div>

        {/* Role level */}
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Role level</label>
          <div className={styles.optionsRow} role="radiogroup" aria-label="Role level">
            {ROLE_LEVELS.map((role) => {
              const isSelected = values.roleLevel === role;
              return (
                <button
                  key={role}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  className={`${styles.optionPill} ${isSelected ? styles.optionPillSelected : ""}`}
                  onClick={() => handleSelect("roleLevel", role)}
                >
                  {role}
                </button>
              );
            })}
          </div>
        </div>
      </Card>
    </section>
  );
};

export default AboutSection;
