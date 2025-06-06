import Image from "next/image";
import { FC } from "react";
import styles from "./starRating.module.css";
interface StarRatingProps {
  star_count: number;
}

const StarRating: FC<StarRatingProps> = ({ star_count }) => {
  return (
    <div
      className={styles.star_rating_container}
      aria-label={`Rating: ${star_count} star rating`}
    >
      {Array.from({ length: star_count }).map((_, i) => (
        <Image
          src="/assets/ic_star.svg"
          key={i}
          height={"16"}
          width={16}
          alt={`${i + 1} star`}
        />
      ))}
    </div>
  );
};

export default StarRating;
