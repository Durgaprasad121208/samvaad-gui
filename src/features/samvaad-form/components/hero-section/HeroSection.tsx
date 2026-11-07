"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Progress, ConfigProvider } from "antd";
import { ShieldCheck, Clock } from "lucide-react";
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

  // Track scroll direction for "scroll-up only" fixed progress header
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Only activate after scrolling past the hero header (~280px)
      if (currentScrollY <= 260) {
        setIsStickyVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling UP -> reveal sticky progress bar at top
        setIsStickyVisible(true);
      } else {
        // Scrolling DOWN -> hide sticky progress bar
        setIsStickyVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
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
                trailColor="#243147"
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

        {/* Top Navigation Row: Enggis Badge */}
        <div className={styles.topNav}>
          <div className={styles.initiativeBadge}>
            <div className={styles.enggisLogoMark} aria-hidden="true">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="24" height="24" rx="4.5" fill="#1A4CA0" />
                <path
                  d="M6.5 6H17.5M6.5 12H15M6.5 18H17.5"
                  stroke="#FDFAF4"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className={styles.initiativeText}>{initiativeText}</span>
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
          <div className={styles.progressContainer}>
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
                  trailColor="#243147"
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
