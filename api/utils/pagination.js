// Reads ?page & ?limit from the query string with safe defaults and limits.
const DEFAULT_LIMIT = 12;
const MAX_LIMIT = 50;

const getPagination = (query = {}) => {
    const page = Math.max(parseInt(query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(query.limit, 10) || DEFAULT_LIMIT, 1), MAX_LIMIT);
    return { page, limit, skip: (page - 1) * limit };
};

const buildMeta = ({ page, limit, total }) => {
    const totalPages = Math.ceil(total / limit) || 1;
    return {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
    };
};

module.exports = { getPagination, buildMeta, DEFAULT_LIMIT, MAX_LIMIT };
