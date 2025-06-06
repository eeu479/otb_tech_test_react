"use client";

import HolidayCard from "@/components/HolidayCard/HolidayCard";
import SortControl from "@/components/SortControl/SortControl";
import { Holiday } from "@/lib/models/holidayModels";
import { SortMethod } from "@/lib/models/sortMethod";
import { useCallback, useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [sortMethod, setSortMethod] = useState<SortMethod>(SortMethod.PRICE);

  const [loading, setLoading] = useState(false);
  const [holidaysData, setHolidaysData] = useState<Holiday[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchHolidays = useCallback(async () => {
    setLoading(true);
    const response = await fetch(
      "https://static.onthebeach.co.uk/fe-code-test/data.json"
    );
    try {
      if (!response.ok) {
        setErrorMessage(
          `HTTP error! Status: ${response.status} - ${response.statusText}`
        );
      }

      const data: Holiday[] = await response.json();
      setHolidaysData(data);
    } catch (error) {
      setErrorMessage(`Failed to fetch data: ${error}`);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchHolidays();
  }, [fetchHolidays]);

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
