module.exports.getPaginationRange = ({currentPage, totalPages}) => {
  const visibleCount = 7;
  const half = Math.floor(visibleCount / 2);
  let start = currentPage - half;
  let end = currentPage + half;

  if (start < 1) {
    start = 1;
    end = visibleCount;
  }
  if (end > totalPages) {
    end = totalPages;
    start = totalPages - visibleCount + 1;
    if (start < 1) start = 1;
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};
