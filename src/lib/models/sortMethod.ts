// I wouldn't neccessarily locate this file here, but for the purpose of this test, I've added it here.
enum SortMethod {
  ALPHABETICAL = "alphabetical",
  PRICE = "price",
  STAR_RATING = "star_rating",
}

const SortMethodData = {
  [SortMethod.ALPHABETICAL]: {
    text: "alphabetically",
    imageSrc: "/assets/ic_sort_alpha.svg",
    altText: "sort alphabetically",
  },
  [SortMethod.PRICE]: {
    text: "price",
    imageSrc: "/assets/ic_gbp.svg",
    altText: "sort by price",
  },
  [SortMethod.STAR_RATING]: {
    text: "star rating",
    imageSrc: "/assets/ic_star.svg",
    altText: "sort by star rating",
  },
};

export { SortMethod, SortMethodData };
