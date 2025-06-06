import { SortMethod, SortMethodData } from "@/lib/models/sortMethod";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import SortButton from "./SortButton";
import styles from "./sortButton.module.css";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe("SortButton", () => {
  test("renders correctly for ALPHABETICAL method when not selected", () => {
    const mockOnClick = jest.fn();
    const { imageSrc, altText } = SortMethodData[SortMethod.ALPHABETICAL];

    render(
      <SortButton
        method={SortMethod.ALPHABETICAL}
        isSelected={false}
        onClick={mockOnClick}
      />
    );

    expect(screen.getByRole("button")).toHaveTextContent(
      "sort by alphabetically"
    );
    const image = screen.getByAltText(altText);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", imageSrc);

    expect(image).not.toHaveClass(styles.selected);
  });

  test("renders correctly for PRICE method when selected", () => {
    const mockOnClick = jest.fn();
    const { imageSrc, altText } = SortMethodData[SortMethod.PRICE];

    render(
      <SortButton
        method={SortMethod.PRICE}
        isSelected={false}
        onClick={mockOnClick}
      />
    );

    expect(screen.getByRole("button")).toHaveTextContent("sort by price");
    const image = screen.getByAltText(altText);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", imageSrc);

    expect(image).not.toHaveClass(styles.selected);
  });

  test("renders correctly for STAR_RATING method when not selected", () => {
    const mockOnClick = jest.fn();
    const { imageSrc, altText } = SortMethodData[SortMethod.STAR_RATING];

    render(
      <SortButton
        method={SortMethod.STAR_RATING}
        isSelected={false}
        onClick={mockOnClick}
      />
    );

    expect(screen.getByRole("button")).toHaveTextContent("sort by star rating");
    const image = screen.getByAltText(altText);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", imageSrc);

    expect(image).not.toHaveClass(styles.selected);
  });

  test("calls onClick handler with the correct method when clicked", () => {
    const mockOnClick = jest.fn();
    const methodToTest = SortMethod.ALPHABETICAL;

    render(
      <SortButton
        method={methodToTest}
        isSelected={false}
        onClick={mockOnClick}
      />
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(methodToTest);
  });
});
