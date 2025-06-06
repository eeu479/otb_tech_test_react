import { formatPrice } from "./formatPrice";

describe("formatPrice", () => {
  test("should format numbers with to two decimal places and correct rounding", () => {
    const amount1 = 1136.5;
    const amount2 = 1234.567;
    const amount3 = 0.999;
    const amount4 = 0.001;

    expect(formatPrice(amount1)).toBe("£1,136.50");
    expect(formatPrice(amount2)).toBe("£1,234.57");
    expect(formatPrice(amount3)).toBe("£1.00");
    expect(formatPrice(amount4)).toBe("£0.00");
  });

  test("should format zero correctly", () => {
    const amount = 0;
    expect(formatPrice(amount)).toBe("£0.00");
  });

  //Added this for completeness, however it is not a valid use case for pricing
  test("should format negative numbers correctly", () => {
    const amount = -100;
    expect(formatPrice(amount)).toBe("-£100.00");
  });

  test("should format large numbers with correct thousands grouping", () => {
    const amount = 1234567.89;
    expect(formatPrice(amount)).toBe("£1,234,567.89");
  });

  test("should format with en-FB locale but default GBP currency", () => {
    const amount = 500;
    const locale = "en-GB";
    const currency = "GBP";
    expect(formatPrice(amount, locale, currency)).toBe("£500.00");
  });
});
