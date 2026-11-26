const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/apiResponse");
const { createLogger } = require("../utils/requestContext");
const ageGroupService = require("../services/ageGroup.service");

const log = createLogger("controller");

// @route   GET /api/age-groups
// @access  Public
const getAgeGroups = asyncHandler(async (req, res) => {
    log.debug("ageGroupController.getAgeGroups → ageGroupService.listAgeGroups()");
    const ageGroups = await ageGroupService.listAgeGroups();
    log.debug(`Sending 200 with ${ageGroups.length} age groups`);
    sendSuccess(res, { message: "Age groups fetched successfully", data: { ageGroups } });
});

// @route   GET /api/age-groups/:slug
// @access  Public
const getAgeGroupBySlug = asyncHandler(async (req, res) => {
    log.debug(`ageGroupController.getAgeGroupBySlug(${req.params.slug}) → ageGroupService.getAgeGroupBySlug()`);
    const ageGroup = await ageGroupService.getAgeGroupBySlug(req.params.slug);
    log.debug(`Sending 200 with age group "${ageGroup.name}"`);
    sendSuccess(res, { message: "Age group fetched successfully", data: { ageGroup } });
});

// @route   GET /api/age-groups/:slug/products
// @access  Public
const getAgeGroupProducts = asyncHandler(async (req, res) => {
    log.debug(`ageGroupController.getAgeGroupProducts(${req.params.slug}) → ageGroupService.getProductsByAgeGroup()`);
    const { ageGroup, products, meta } = await ageGroupService.getProductsByAgeGroup(req.params.slug, req.validated.query);
    log.debug(`Sending 200 with ${products.length} of ${meta.total} products for "${ageGroup.name}"`);
    sendSuccess(res, { message: `Products for ${ageGroup.name} (${ageGroup.ageRange}) fetched successfully`, data: { ageGroup, products }, meta });
});

module.exports = { getAgeGroups, getAgeGroupBySlug, getAgeGroupProducts };
