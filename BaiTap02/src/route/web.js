// src/route/web.js
import express from "express";
import homeController from "../controller/homeController.js"; // nhớ đúng tên thư mục

const router = express.Router();

const initWebRoutes = (app) => {
  // Cách 1 (ví dụ đơn giản)
  // router.get("/", (req, res) => res.send("Nguyễn Hữu Trung"));

  // Cách 2: gọi hàm trong controller
  router.get("/home", homeController.getHomePage);          // trang chủ
  router.get("/about", homeController.getAboutPage);        // trang about

  router.get("/crud", homeController.getCRUD);              // form GET CRUD
  router.post("/post-crud", homeController.postCRUD);       // submit tạo mới
  router.get("/get-crud", homeController.getAllCRUD);       // lấy danh sách
  router.get("/edit-crud", homeController.getEditCRUD);     // mở form edit
  router.post("/put-crud", homeController.putCRUD);         // submit cập nhật
  router.get("/delete-crud", homeController.deleteCRUD);    // xoá

  return app.use("/", router); // url gốc
};

module.exports=initWebRoutes;