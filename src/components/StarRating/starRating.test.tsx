import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import StarRating from "./StarRating";

jest.mock("next/image", () => ({
  __esModule: true, // Required for ES Module interoperability with CommonJS
  default: (props: any) => {
    // For simplicity, directly render an img tag and pass all props
    return <img {...props} />;
  },
}));

describe("StarRating", () => {
  test("renders 5 stars when star_count is 5", () => {
    render(<StarRating star_count={5} />);
    const stars = screen.getAllByRole("img");
    expect(stars).toHaveLength(5);
  });

  test("renders 4 star when star_count is 1", () => {
    render(<StarRating star_count={1} />);
    const stars = screen.getAllByRole("img");
    expect(stars).toHaveLength(1);
  });

  test("renders 3 stars when star_count is 3", () => {
    render(<StarRating star_count={3} />);
    const stars = screen.getAllByRole("img");
    expect(stars).toHaveLength(3);
  });

  test("renders 2 stars when star_count is 2", () => {
    render(<StarRating star_count={2} />);
    const stars = screen.getAllByRole("img");
    expect(stars).toHaveLength(2);
  });

  test("renders 1 stars when star_count is 1", () => {
    render(<StarRating star_count={1} />);
    const stars = screen.getAllByRole("img");
    expect(stars).toHaveLength(1);
  });

  test("renders 0 stars when star_count is 0", () => {
    render(<StarRating star_count={0} />);
    const stars = screen.queryAllByRole("img");
    expect(stars).toHaveLength(0);
  });

  test("each star image has the correct src, alt, width and height", () => {
    const testStarCount = 2;
    render(<StarRating star_count={testStarCount} />);
    const stars = screen.getAllByRole("img");

    stars.forEach((star, index) => {
      expect(star).toHaveAttribute("src", "/assets/ic_star.svg");
      expect(star).toHaveAttribute("alt", `${index + 1} star`);
      expect(star).toHaveAttribute("width", "16");
      expect(star).toHaveAttribute("height", "16");
    });
  });
});
