import { SortMethod } from "@/lib/models/sortMethod";
import { FC } from "react";
import SortButton from "./SortButton";
import styles from "./sortControl.module.css";

interface SortControlProps {
  sortBy: SortMethod;
  onSortByChange: (sortBy: SortMethod) => void;
}

const SortControl: FC<SortControlProps> = ({ sortBy, onSortByChange }) => {
  return (
    <div className={styles.sort_control_container}>
      <SortButton
        method={SortMethod.ALPHABETICAL}
        isSelected={sortBy === SortMethod.ALPHABETICAL}
        onClick={onSortByChange}
      />
      <SortButton
        method={SortMethod.PRICE}
        isSelected={sortBy === SortMethod.PRICE}
        onClick={onSortByChange}
      />
      <SortButton
        method={SortMethod.STAR_RATING}
        isSelected={sortBy === SortMethod.STAR_RATING}
        onClick={onSortByChange}
      />
    </div>
  );
};

export default SortControl;
