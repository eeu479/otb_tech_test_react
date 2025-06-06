"use client";
import HolidayCard from "@/components/HolidayCard/HolidayCard";
import { Holiday } from "@/lib/models/holidayModels";
import styles from "./page.module.css";

const stubHoliday: Holiday = {
  resort: {
    id: "7dd27e42-2b5c-4237-86ac-97c26f72eb5b",
    name: "Iberostar Grand Salome",
    regionName: "Costa Adeje",
    countryName: "Tenerife",
    starRating: 5,
    overview:
      "The Iberostar Grand Salomehas an exceptional location in the south of Tenrife, overlooking the Atlantic Ocean. It is situated between the Golf del Sur and the Amarillo Golf Courses, and is an ideal hotel for families couples and groups who are looking for a holiday full of sport, sun and sea.",
    image: {
      url: "https://static.onthebeach.co.uk/fe-code-test/hotel-image-1.jpg",
      description:
        "A tranquil resort swimming pool with clear blue water, surrounded by two-story villas with terracotta roofs under a bright blue sky.",
    },
  },
  flightDetails: {
    departureAirport: "East Midlands",
    departureDate: "2030-07-03T00:00:00.000Z",
  },
  bookingDetails: {
    party: { adults: 2, children: 2, infants: 1 },
    lengthOfStay: 7,
    price: {
      amount: 1136.5,
      currency: "GBP",
    },
  },
};

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* I've placed the component here while i build, in the real world i'd like to have storybook or a component library to view component in its various states. */}
        <HolidayCard holiday={stubHoliday} />
      </main>
    </div>
  );
}
