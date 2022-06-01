var _super = require('dw/catalog/SearchModel');

var ProductSearchModel = function () {};

ProductSearchModel.prototype = new _super();

ProductSearchModel.prototype.search = function () {};
ProductSearchModel.prototype.getCategory = function () {};
ProductSearchModel.prototype.getSortingRule = function () {};
ProductSearchModel.prototype.getProducts = function () {};
ProductSearchModel.urlForCategory = function () {};
ProductSearchModel.urlForProduct = function () {};
ProductSearchModel.urlForRefine = function () {};
ProductSearchModel.prototype.setRecursiveCategorySearch = function () {};
ProductSearchModel.prototype.getCategoryID = function () {};
ProductSearchModel.prototype.getPromotionID = function () {};
ProductSearchModel.prototype.getPromotionProductType = function () {};
ProductSearchModel.prototype.getDeepestCommonCategory = function () {};
ProductSearchModel.prototype.getPriceMax = function () {};
ProductSearchModel.prototype.getPriceMin = function () {};
ProductSearchModel.prototype.getProductID = function () {};
ProductSearchModel.prototype.getProductSearchHit = function () {};
ProductSearchModel.prototype.getProductSearchHits = function () {};
ProductSearchModel.prototype.getRefinements = function () {};
ProductSearchModel.prototype.getSuggestedSearchPhrase = function () {};
ProductSearchModel.prototype.getSuggestedSearchPhrases = function () {};
ProductSearchModel.prototype.isCategorySearch = function () {};
ProductSearchModel.prototype.isRefinedByCategory = function () {};
ProductSearchModel.prototype.isRefinedByPrice = function () {};
ProductSearchModel.prototype.isRefinedByPriceRange = function () {};
ProductSearchModel.prototype.isRefinedCategorySearch = function () {};
ProductSearchModel.prototype.isRecursiveCategorySearch = function () {};
ProductSearchModel.prototype.getOrderableProductsOnly = function () {};
ProductSearchModel.prototype.setOrderableProductsOnly = function () {};
ProductSearchModel.prototype.setCategoryID = function () {};
ProductSearchModel.prototype.setPromotionID = function () {};
ProductSearchModel.prototype.setPromotionProductType = function () {};
ProductSearchModel.prototype.setPriceMax = function () {};
ProductSearchModel.prototype.setPriceMin = function () {};
ProductSearchModel.prototype.setProductID = function () {};
ProductSearchModel.prototype.setSortingRule = function () {};
ProductSearchModel.prototype.urlRefineCategory = function () {};
ProductSearchModel.prototype.urlRefinePrice = function () {};
ProductSearchModel.prototype.urlRelaxCategory = function () {};
ProductSearchModel.prototype.urlRelaxPrice = function () {};
ProductSearchModel.prototype.urlSortingRule = function () {};
ProductSearchModel.prototype.getSearchRedirect = function () {};
ProductSearchModel.prototype.category = null;
ProductSearchModel.prototype.sortingRule = null;
ProductSearchModel.prototype.products = null;
ProductSearchModel.prototype.categoryID = null;
ProductSearchModel.prototype.promotionID = null;
ProductSearchModel.prototype.promotionProductType = null;
ProductSearchModel.prototype.deepestCommonCategory = null;
ProductSearchModel.prototype.priceMax = null;
ProductSearchModel.prototype.priceMin = null;
ProductSearchModel.prototype.productID = null;
ProductSearchModel.prototype.productSearchHit = null;
ProductSearchModel.prototype.productSearchHits = null;
ProductSearchModel.prototype.refinements = null;
ProductSearchModel.prototype.suggestedSearchPhrase = null;
ProductSearchModel.prototype.suggestedSearchPhrases = null;
ProductSearchModel.prototype.orderableProductsOnly = null;

module.exports = ProductSearchModel;