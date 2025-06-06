import { SortMethod, SortMethodData } from "@/lib/models/sortMethod";
import Image from "next/image";
import { FC } from "react";
import styles from "./sortButton.module.css";

interface SortButtonProps {
  method: SortMethod;
  isSelected: boolean;
  onClick: (method: SortMethod) => void;
}

const SortButton: FC<SortButtonProps> = ({ method, isSelected, onClick }) => {
  const { text, imageSrc, altText } = SortMethodData[method];

  return (
    <button
      className={`${styles.sort_button} ${isSelected ? styles.selected : ""}`}
      onClick={() => onClick(method)}
    >
      <span>
        sort by <strong>{text}</strong>
      </span>
      <Image
        className={`${styles.sort_button_image} ${
          isSelected ? styles.selected : ""
        }`}
        src={imageSrc}
        alt={altText}
        width={16}
        height={16}
      />
    </button>
  );
};

export default SortButton;
