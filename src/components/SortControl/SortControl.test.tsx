import { SortMethod } from "@/lib/models/sortMethod";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import SortControl from "./SortControl";

jest.mock("./SortButton", () => {
  return jest.fn(
    ({
      method,
      isSelected,
      onClick,
    }: {
      method: SortMethod;
      isSelected: boolean;
      onClick: (m: SortMethod) => void;
    }) => (
      <button
        data-testid={`sort-button-${method}`}
        className={isSelected ? "selected" : ""}
        onClick={() => onClick(method)}
      >
        Sort by {method} {isSelected ? "(Selected)" : ""}
      </button>
    )
  );
});

describe("SortControl", () => {
  test("renders all sort buttons", () => {
    const mockOnSortByChange = jest.fn();
    render(
      <SortControl
        sortBy={SortMethod.ALPHABETICAL}
        onSortByChange={mockOnSortByChange}
      />
    );

    expect(
      screen.getByTestId(`sort-button-${SortMethod.ALPHABETICAL}`)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`sort-button-${SortMethod.PRICE}`)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`sort-button-${SortMethod.STAR_RATING}`)
    ).toBeInTheDocument();
  });

  test("correctly highlights the selected sort button", () => {
    const mockOnSortByChange = jest.fn();

    const { rerender } = render(
      <SortControl
        sortBy={SortMethod.ALPHABETICAL}
        onSortByChange={mockOnSortByChange}
      />
    );

    expect(
      screen.getByTestId(`sort-button-${SortMethod.ALPHABETICAL}`)
    ).toHaveClass("selected");
    expect(
      screen.getByTestId(`sort-button-${SortMethod.PRICE}`)
    ).not.toHaveClass("selected");
    expect(
      screen.getByTestId(`sort-button-${SortMethod.STAR_RATING}`)
    ).not.toHaveClass("selected");

    rerender(
      <SortControl
        sortBy={SortMethod.PRICE}
        onSortByChange={mockOnSortByChange}
      />
    );

    expect(
      screen.getByTestId(`sort-button-${SortMethod.ALPHABETICAL}`)
    ).not.toHaveClass("selected");
    expect(screen.getByTestId(`sort-button-${SortMethod.PRICE}`)).toHaveClass(
      "selected"
    );
    expect(
      screen.getByTestId(`sort-button-${SortMethod.STAR_RATING}`)
    ).not.toHaveClass("selected");

    rerender(
      <SortControl
        sortBy={SortMethod.STAR_RATING}
        onSortByChange={mockOnSortByChange}
      />
    );

    expect(
      screen.getByTestId(`sort-button-${SortMethod.ALPHABETICAL}`)
    ).not.toHaveClass("selected");
    expect(
      screen.getByTestId(`sort-button-${SortMethod.PRICE}`)
    ).not.toHaveClass("selected");
    expect(
      screen.getByTestId(`sort-button-${SortMethod.STAR_RATING}`)
    ).toHaveClass("selected");
  });

  test("calls onSortByChange with the correct method when a button is clicked", () => {
    const mockOnSortByChange = jest.fn();
    render(
      <SortControl
        sortBy={SortMethod.ALPHABETICAL}
        onSortByChange={mockOnSortByChange}
      />
    );

    fireEvent.click(screen.getByTestId(`sort-button-${SortMethod.PRICE}`));

    expect(mockOnSortByChange).toHaveBeenCalledTimes(1);
    expect(mockOnSortByChange).toHaveBeenCalledWith(SortMethod.PRICE);

    fireEvent.click(
      screen.getByTestId(`sort-button-${SortMethod.STAR_RATING}`)
    );

    expect(mockOnSortByChange).toHaveBeenCalledTimes(2);
    expect(mockOnSortByChange).toHaveBeenCalledWith(SortMethod.STAR_RATING);
  });
});
