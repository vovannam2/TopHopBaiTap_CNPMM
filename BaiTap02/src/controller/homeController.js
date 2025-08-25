import db from "../models/index.js";               // Sequelize models
import CRUDService from "../services/CRUDService.js"; // Service CRUD (có default export)

// ========== GET HOME PAGE ==========
export const getHomePage = async (req, res) => {
  try {
    const data = await db.User.findAll();
    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.error(e);
    return res.status(500).send("❌ Error loading home page");
  }
};

// ========== GET ABOUT PAGE ==========
export const getAboutPage = (_req, res) => {
  return res.render("test/about.ejs");
};

// ========== GET CRUD PAGE ==========
export const getCRUD = (_req, res) => {
  return res.render("crud.ejs");
};

// ========== TẠO USER ==========
export const postCRUD = async (req, res) => {
  try {
    await CRUDService.createNewUser(req.body);
    // Sau khi tạo xong, quay về danh sách
    const data = await CRUDService.getAllUser();
    return res.render("users/findAllUser.ejs", { datalist: data });
    // hoặc: return res.redirect("/get-crud"); nếu route của bạn là như vậy
  } catch (e) {
    console.error(e);
    return res.status(500).send("❌ Error creating user");
  }
};

// ========== LẤY TẤT CẢ USER ==========
export const getFindAllCrud = async (_req, res) => {
  try {
    const data = await CRUDService.getAllUser();
    return res.render("users/findAllUser.ejs", { datalist: data });
    // nếu bạn dùng view cũ: return res.render("displayCRUD.ejs", { dataTable: data });
  } catch (e) {
    console.error(e);
    return res.status(500).send("❌ Error fetching users");
  }
};

// ========== LẤY USER ĐỂ EDIT ==========
export const getEditCRUD = async (req, res) => {
  const userId = req.query.id;
  if (!userId) return res.send("❌ User id is required");
  try {
    const userData = await CRUDService.getUserById(userId);
    if (!userData) return res.send("❌ User not found");
    return res.render("users/editUser.ejs", { data: userData });
  } catch (e) {
    console.error(e);
    return res.status(500).send("❌ Error loading edit form");
  }
};

// ========== CẬP NHẬT USER ==========
export const putCRUD = async (req, res) => {
  try {
    await CRUDService.updateUserData(req.body);
    const allUsers = await CRUDService.getAllUser();
    return res.render("users/findAllUser.ejs", { datalist: allUsers });
  } catch (e) {
    console.error(e);
    return res.status(500).send("❌ Error updating user");
  }
};

// ========== XOÁ USER ==========
export const deleteCRUD = async (req, res) => {
  const id = req.query.id;
  if (!id) return res.send("❌ User id is required");
  try {
    await CRUDService.deleteUserById(id);
    return res.send("✅ Delete user success!");
    // hoặc load lại danh sách:
    // const allUsers = await CRUDService.getAllUser();
    // return res.render("users/findAllUser.ejs", { datalist: allUsers });
  } catch (e) {
    console.error(e);
    return res.status(500).send("❌ Error deleting user");
  }
};

// (Tuỳ chọn) export default để import gộp
export default {
  getHomePage,
  getAboutPage,
  getCRUD,
  postCRUD,
  getFindAllCrud,
  getEditCRUD,
  putCRUD,
  deleteCRUD,
};
