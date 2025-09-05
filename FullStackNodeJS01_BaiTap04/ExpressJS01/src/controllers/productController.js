const Product = require("../models/Product");
const Category = require("../models/Category");
const {
  createProductService,
  getProductByIdService,
  updateProductService,
  deleteProductService,
  listProductsService,
  listProductsByCategorySlugService,
} = require("../services/productService");
/**
 * GET /api/products
 * Query:
 *  - page (default 1)
 *  - limit (default 12)
 *  - category (id hoặc slug)
 *  - q (search theo tên)
 *  - sort (vd: "price:asc" | "createdAt:desc")
 */

// Tạo sản phẩm mới
const createProduct = async (req, res) => {
  const { name, price, categoryId, thumbnail } = req.body;
  const result = await createProductService(name, price, categoryId, thumbnail);
  return res.status(200).json(result);
};

// Lấy chi tiết sản phẩm
const getProductById = async (req, res) => {
  const { id } = req.params;
  const result = await getProductByIdService(id);
  return res.status(200).json(result);
};

// Cập nhật sản phẩm
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await updateProductService(id, data);
  return res.status(200).json(result);
};

// Xoá sản phẩm
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const result = await deleteProductService(id);
  return res.status(200).json(result);
};

// Lấy danh sách sản phẩm (phân trang + lọc)
const listProducts = async (req, res) => {
  const { page, limit, category, q, sort } = req.query;
  const result = await listProductsService(page, limit, category, q, sort);
  if (result.EC === 0) {
    res.json(result.DT);
  } else if (result.EC === 2) {
    res.status(404).json({ message: result.EM });
  } else {
    res.status(500).json({ message: result.EM });
  }
};

// Lấy sản phẩm theo slug category
const listProductsByCategorySlug = async (req, res) => {
  const { slug } = req.params;
  const { page, limit, q, sort } = req.query;
  const result = await listProductsByCategorySlugService(slug, page, limit, q, sort);
  if (result.EC === 0) {
    res.json(result.DT);
  } else if (result.EC === 2) {
    res.status(404).json({ message: result.EM });
  } else {
    res.status(500).json({ message: result.EM });
  }
};
module.exports = {
  listProducts,
  listProductsByCategorySlug,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
