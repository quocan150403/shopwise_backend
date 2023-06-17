// Middleware để xử lý phân trang
const applyPagination = (req, res, next) => {
  const { _page, _limit } = req.query;

  if (_page && _limit) {
    const page = parseInt(_page) || 1;
    const limit = parseInt(_limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    req.pagination = {
      page,
      limit,
      startIndex,
      endIndex,
    };
  }

  next();
};
