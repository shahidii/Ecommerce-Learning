const ApiError = require("../utils/ApiError");
const ageGroupRepository = require("../repositories/ageGroup.repository");
const { createLogger } = require("../utils/requestContext");
const productService = require("./product.service");

const log = createLogger("service");

const listAgeGroups = () => {
    log.debug("ageGroupService.listAgeGroups: aggregate age groups + $lookup products to count them");
    return ageGroupRepository.findAllWithProductCount();
};

const getAgeGroupBySlug = async (slug) => {
    log.debug(`ageGroupService.getAgeGroupBySlug: loading "${slug}"`);
    const ageGroup = await ageGroupRepository.findBySlug(slug);
    if (!ageGroup) {
        log.debug("No age group with this slug → 404");
        throw ApiError.notFound("AGE_GROUP_NOT_FOUND", `Age group "${slug}" not found`);
    }
    return ageGroup;
};

const getProductsByAgeGroup = async (slug, query) => {
    const ageGroup = await getAgeGroupBySlug(slug);
    log.debug("Age group found. Reusing productService.listProducts() with ageGroup filter");
    const { products, meta } = await productService.listProducts({ ...query, ageGroup: ageGroup.slug });
    return { ageGroup, products, meta };
};

module.exports = { listAgeGroups, getAgeGroupBySlug, getProductsByAgeGroup };
