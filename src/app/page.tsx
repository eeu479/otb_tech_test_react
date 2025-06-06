"use client";
import BookNowButton from "@/components/BookNowButton/BookNowButton";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* I've placed the component here while i build, in the real world i'd like to have storybook or a component library to view component in its various states. */}
        <BookNowButton
          price={{ amount: 1150.5, currency: "GBP" }}
          onClick={() => {}}
        />
      </main>
    </div>
  );
}
