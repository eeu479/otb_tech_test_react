const formatPrice = (
  num: number,
  locale: string = "en-GB",
  currency: string = "GBP"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  }).format(num);
};

export { formatPrice };
