import { Holiday } from "@/lib/models/holidayModels";
import { SortMethod } from "@/lib/models/sortMethod";
import { useCallback, useEffect, useMemo, useState } from "react";

const useHolidayData = (sortMethod?: SortMethod) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [rawHolidaysData, setRawHolidaysData] = useState<Holiday[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

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
      setRawHolidaysData(data);
    } catch (error) {
      setErrorMessage("Failed to fetch data");
    }
    setLoading(false);
  }, []);

  const holidaysData = useMemo(() => {
    if (!sortMethod) return rawHolidaysData;

    const sortedData = [...rawHolidaysData];

    switch (sortMethod) {
      case SortMethod.ALPHABETICAL:
        return sortedData.sort((a, b) =>
          a.resort.name.localeCompare(b.resort.name)
        );
      case SortMethod.PRICE:
        return sortedData.sort(
          (a, b) =>
            a.bookingDetails.price.amount - b.bookingDetails.price.amount
        );
      case SortMethod.STAR_RATING:
        return sortedData.sort(
          (a, b) => b.resort.starRating - a.resort.starRating
        );
      default:
        return sortedData;
    }
  }, [rawHolidaysData, sortMethod]);

  useEffect(() => {
    fetchHolidays();

    return () => {
      setLoading(false);
      setRawHolidaysData([]);
      setErrorMessage(undefined);
    };
  }, [fetchHolidays]);

  return {
    loading,
    holidaysData,
    errorMessage,
  };
};

export default useHolidayData;
