"use client";

import { formatPrice } from "@/lib/helpers/formatPrice";
import { Price } from "@/lib/models/holidayModels";
import { FC } from "react";
import styles from "./bookNowButton.module.css";

interface BookNowButtonProps {
  price: Price;
  onClick: () => void;
}

const BookNowButton: FC<BookNowButtonProps> = ({ price, onClick }) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      aria-label={`Book now for ${price}`}
    >
      <span id="text_book_now" className={styles.button_text}>
        Book now
      </span>
      <span className={styles.button_price} aria-hidden="true">
        {/* We could get the users browser locale in the production application */}
        {formatPrice(price.amount, "en-GB", price.currency)}
      </span>
    </button>
  );
};

export default BookNowButton;
