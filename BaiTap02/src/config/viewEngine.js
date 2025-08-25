import express from "express";

let configViewEngine = (app) => {
  app.use(express.static("./src/public")); // file tĩnh
  app.set("view engine", "ejs");           // dùng ejs
  app.set("views", "./src/views");         // thư mục chứa file ejs
};

module.exports = configViewEngine;