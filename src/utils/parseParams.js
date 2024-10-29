function parseNumber(pageNumber, defaultPage) {
  if (typeof pageNumber === "undefined") {
    return defaultPage;
  }
  const pageParse = parseInt(pageNumber);
  if (Number.isNaN(pageParse) === true) {
    return defaultPage;
  }
  return pageParse;
}

export function parseParams(query) {
  const { page, perPage } = query;
  const parsedPage = parseNumber(page,1);
  const parsedPerPage = parseNumber(perPage,10);
  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
}
