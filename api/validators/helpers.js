// Tiny validation helpers (no extra library needed).
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const URL_REGEX = /^https?:\/\/\S+$/i;

const isEmpty = (v) => v === undefined || v === null || (typeof v === "string" && v.trim() === "");
const isString = (v) => typeof v === "string";
const isNumber = (v) => typeof v === "number" && !Number.isNaN(v);

module.exports = { EMAIL_REGEX, URL_REGEX, isEmpty, isString, isNumber };
