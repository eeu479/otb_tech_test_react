"use client";

import HolidayCard from "@/components/HolidayCard/HolidayCard";
import SortControl from "@/components/SortControl/SortControl";
import useHolidayData from "@/lib/hooks/useHolidayData";
import { SortMethod } from "@/lib/models/sortMethod";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [sortMethod, setSortMethod] = useState<SortMethod>(SortMethod.PRICE);
  const { loading, holidaysData, errorMessage } = useHolidayData(sortMethod);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.page_content}>
          <div className={styles.sort_container}>
            <SortControl sortBy={sortMethod} onSortByChange={setSortMethod} />
          </div>
          <div className={styles.holiday_list_container}>
            {loading && <p>Loading...</p>}
            {errorMessage && <p>{errorMessage}</p>}
            {holidaysData.map((holiday) => (
              <HolidayCard
                key={holiday.resort.id}
                holiday={holiday}
                onBookNow={() => {}}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
