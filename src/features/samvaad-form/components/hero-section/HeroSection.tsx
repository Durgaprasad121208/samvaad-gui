"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Progress, ConfigProvider } from "antd";
import { ShieldCheck, Clock } from "lucide-react";
import enggisLogo from "@/assets/enggis-logo.png";
import samvaadLogo from "@/assets/samvaad-logo-dark.png";
import type { HeroSectionProps } from "../../types";
import styles from "./HeroSection.module.css";

export const HeroSection: React.FC<HeroSectionProps> = ({
  completedQuestions = 0,
  totalQuestions = 23,
  initiativeText = "An Enggis Group of Companies initiative",
  title = "Employee Feedback Forum",
  description = "A dedicated channel to share feedback on the pillars of our Business Excellence Framework. Your feedback helps us improve employee experience, strengthen HR practices, and build a better workplace. Please avoid naming individuals in written responses.",
}) => {
  const percent = totalQuestions > 0 ? Math.round((completedQuestions / totalQuestions) * 100) : 0;

  // Keep fixed progress bar visible whenever scrolled past the hero (both scrolling down and up)
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const inlineProgressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (inlineProgressRef.current) {
        const rect = inlineProgressRef.current.getBoundingClientRect();
        setIsStickyVisible(rect.bottom < 0);
      } else {
        setIsStickyVisible(window.scrollY > 350);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Fixed Sticky Header - Visible only when scrolling UP */}
      <div
        className={`${styles.stickyScrollHeader} ${
          isStickyVisible ? styles.stickyScrollHeaderVisible : ""
        }`}
        aria-hidden={!isStickyVisible}
      >
        <div className={styles.topStrip} role="presentation" />
        <div className={styles.stickyInnerContainer}>
          <div className={styles.progressBarWrapper}>
            <ConfigProvider
              theme={{
                components: {
                  Progress: {
                    defaultColor: "#F7A329",
                    remainingColor: "#243147",
                  },
                },
              }}
            >
              <Progress
                percent={percent}
                showInfo={false}
                strokeColor={{
                  "0%": "#E5B151",
                  "50%": "#F7A329",
                  "100%": "#4BC6C6",
                }}
                railColor="#243147"
                size={["100%", 8]}
              />
            </ConfigProvider>
          </div>
          <span className={styles.progressLabel}>
            {completedQuestions}/{totalQuestions}
          </span>
        </div>
      </div>

      <header className={styles.heroWrapper} aria-label="Samvaad Hero Section">
        {/* Top Strip Gradient: Gold -> Saffron -> Teal */}
        <div className={styles.topStrip} role="presentation" />

        {/* Top Navigation Row: Enggis Logo */}
        <div className={styles.topNav}>
          <div className={styles.enggisLogoBox} title="Enggis Group of Companies">
            <Image
              src={enggisLogo}
              alt="Enggis Group of Companies"
              width={48}
              height={48}
              className={styles.enggisLogoImg}
              priority
            />
          </div>
        </div>

        {/* Main Hero Center Content */}
        <div className={styles.heroContent}>
          {/* Samvaad Logo */}
          <div className={styles.logoWrapper}>
            <Image
              src={samvaadLogo}
              alt="Samvaad - A Feedback Forum to Build Culture & Fuel Growth"
              className={styles.samvaadLogo}
              priority
              width={380}
              height={130}
            />
          </div>

          {/* Title */}
          <h1 className={styles.title}>{title}</h1>

          {/* Description */}
          <p className={styles.description}>{description}</p>

          {/* Badges / Pills */}
          <div className={styles.pillsRow}>
            <div className={styles.pillItem}>
              <ShieldCheck className={styles.pillIconTeal} size={16} strokeWidth={2.2} />
              <span>Anonymous &amp; confidential</span>
            </div>
            <div className={styles.pillItem}>
              <Clock className={styles.pillIconSaffron} size={16} strokeWidth={2.2} />
              <span>About 10 minutes</span>
            </div>
          </div>

          {/* Default Inline Progress Bar (at normal hero position) */}
          <div ref={inlineProgressRef} className={styles.progressContainer}>
            <div className={styles.progressBarWrapper}>
              <ConfigProvider
                theme={{
                  components: {
                    Progress: {
                      defaultColor: "#F7A329",
                      remainingColor: "#243147",
                    },
                  },
                }}
              >
                <Progress
                  percent={percent}
                  showInfo={false}
                  strokeColor={{
                    "0%": "#E5B151",
                    "50%": "#F7A329",
                    "100%": "#4BC6C6",
                  }}
                  railColor="#243147"
                  size={["100%", 8]}
                />
              </ConfigProvider>
            </div>
            <span className={styles.progressLabel}>
              {completedQuestions}/{totalQuestions}
            </span>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeroSection;
