"use client";

import {
  BookingDetails,
  FlightDetails,
  Holiday,
  Party,
} from "@/lib/models/holidayModels";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import Image from "next/image";
import { FC, useRef, useState } from "react";
import BookNowButton from "../BookNowButton/BookNowButton";
import StarRating from "../StarRating/StarRating";
import styles from "./holidayCard.module.css";

interface HolidayCardProps {
  holiday: Holiday;
  onBookNow: () => void;
}

dayjs.extend(advancedFormat);

const HolidayCard: FC<HolidayCardProps> = ({ holiday, onBookNow }) => {
  const [isOverviewVisible, setIsOverviewVisible] = useState(false);
  const overviewRef = useRef<HTMLDivElement>(null);

  const handleToggleReadMore = () => {
    setIsOverviewVisible(!isOverviewVisible);
  };

  const formatPartyDetails = (party: Party) => {
    const { adults, children, infants } = party;

    return (
      <div>
        {adults && (
          <span>
            <span className={styles.bold_text}>{adults}</span> Adult
            {adults !== 1 ? "s" : ""}
          </span>
        )}
        {children && (
          <span>
            , <span className={styles.bold_text}>{children}</span> child
            {children !== 1 ? "ren" : ""}
          </span>
        )}
        {infants && (
          <span>
            {" &"} <span className={styles.bold_text}>{infants}</span> infant
            {infants !== 1 ? "s" : ""}
          </span>
        )}
      </div>
    );
  };

  const formatDateInformation = (
    flightDetails: FlightDetails,
    bookingDetails: BookingDetails
  ) => {
    const { lengthOfStay } = bookingDetails;

    const departureDate = dayjs(flightDetails.departureDate);
    return (
      <div>
        <span className={styles.featured_text}>
          {departureDate.format("Do MMMM YYYY")}
        </span>{" "}
        for <strong>{lengthOfStay}</strong> days
      </div>
    );
  };

  const formatDepartureInformation = (flightDetails: FlightDetails) => {
    return (
      <div>
        departing from <strong>{flightDetails.departureAirport}</strong>
      </div>
    );
  };

  return (
    <article className={styles.holiday_card}>
      <div className={styles.holiday_card_content}>
        <div className={styles.holiday_image_container}>
          {/* I've not used Image here as i didn't want to set static height and width */}
          <img
            className={styles.holiday_image}
            src={holiday.resort.image.url}
            alt={holiday.resort.image.description}
          />
          <div className={styles.read_more_container}>
            <button
              className={styles.read_more_button}
              onClick={handleToggleReadMore}
            >
              <span>
                <span className={styles.bold_text}>
                  {isOverviewVisible ? "Read less" : "Read more "}
                </span>{" "}
                about this hotel
              </span>
              <Image
                src="/assets/ic_chevron_down.svg"
                alt={`arrow ${isOverviewVisible ? "up" : "down"}`}
                width={16}
                height={16}
                className={
                  isOverviewVisible ? styles.chevron_up : styles.chevron_down
                }
              />
            </button>
          </div>
        </div>
        <div className={styles.holiday_details}>
          <h3 className={styles.holiday_name}>{holiday.resort.name}</h3>
          <p className={styles.holiday_location}>
            {holiday.resort.regionName}, {holiday.resort.countryName}
          </p>
          <div className={styles.star_rating}>
            <StarRating star_count={holiday.resort.starRating} />
          </div>
          <div className={styles.travel_info}>
            {formatPartyDetails(holiday.bookingDetails.party)}
            {formatDateInformation(
              holiday.flightDetails,
              holiday.bookingDetails
            )}
            {formatDepartureInformation(holiday.flightDetails)}
          </div>
          <div className={styles.booking_section}>
            <BookNowButton
              price={holiday.bookingDetails.price}
              onClick={onBookNow}
            />
          </div>
        </div>
      </div>

      <div
        ref={overviewRef}
        className={`${styles.overview_section} ${
          isOverviewVisible ? styles.overview_visible : styles.overview_hidden
        }`}
      >
        <h4 className={styles.overview_title}>Overview</h4>
        <p className={styles.overview_text}>{holiday.resort.overview}</p>
      </div>
    </article>
  );
};

export default HolidayCard;
