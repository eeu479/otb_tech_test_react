import { formatPrice } from "@/lib/helpers/formatPrice";
import { Price } from "@/lib/models/holidayModels";
import "@testing-library/jest-dom"; // For extended match
import { fireEvent, render, screen } from "@testing-library/react";
import BookNowButton from "./BookNowButton";

jest.mock("@/lib/helpers/formatPrice", () => ({
  formatPrice: jest.fn(),
}));

const mockFormatPrice = formatPrice as jest.MockedFunction<typeof formatPrice>;

describe("BookNowButton", () => {
  const mockPrice: Price = {
    amount: 1136.5,
    currency: "GBP",
  };

  beforeEach(() => {
    mockFormatPrice.mockClear();

    mockFormatPrice.mockImplementation((amount, locale, currency) => {
      let symbol = "";
      if (currency === "GBP") symbol = "£";
      else if (currency === "EUR") symbol = "€";
      else if (currency === "USD") symbol = "$";

      const formattedAmount = new Intl.NumberFormat(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true,
      }).format(amount);

      return `${symbol}${formattedAmount}`;
    });
  });

  test('renders the "Book Now" text correctly', () => {
    render(<BookNowButton price={mockPrice} onClick={() => {}} />);
    expect(screen.getByText("Book now")).toBeInTheDocument();
  });

  test("renders the correctly formatted price based on the price prop", () => {
    render(<BookNowButton price={mockPrice} onClick={() => {}} />);

    expect(mockFormatPrice).toHaveBeenCalledTimes(1);
    expect(mockFormatPrice).toHaveBeenCalledWith(
      mockPrice.amount,
      "en-GB",
      mockPrice.currency
    );

    const expectedFormattedPrice = `£${new Intl.NumberFormat("en-GB", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(mockPrice.amount)}`;
    expect(screen.getByText(expectedFormattedPrice)).toBeInTheDocument();
  });

  test("calls onClick handler when button is clicked", () => {
    const mockOnClick = jest.fn();
    render(<BookNowButton price={mockPrice} onClick={mockOnClick} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
