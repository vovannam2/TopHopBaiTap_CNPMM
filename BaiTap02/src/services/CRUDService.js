// src/services/CRUDService.js
import bcrypt from "bcryptjs";
import db from "../models/index.js";

const salt = bcrypt.genSaltSync(10);

// ================= HASH PASSWORD =================
export const hashUserPassword = async (password) => {
  try {
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  } catch (e) {
    throw e;
  }
};

// ================= CREATE =================
export const createNewUser = async (data) => {
  try {
    const hashPasswordFromBcrypt = await hashUserPassword(data.password);

    await db.User.create({
      email: data.email,
      password: hashPasswordFromBcrypt,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      phoneNumber: data.phoneNumber,
      gender: data.gender === "1" ? true : false, // "1" => true
      roleId: data.roleId,
    });

    return "✅ OK, created a new user successfully!";
  } catch (e) {
    throw e;
  }
};

// ================= READ =================
export const getAllUser = async () => {
  try {
    const users = await db.User.findAll({ raw: true });
    return users;
  } catch (e) {
    throw e;
  }
};

export const getUserById = async (userId) => {
  try {
    const user = await db.User.findOne({ where: { id: userId }, raw: true });
    return user;
  } catch (e) {
    throw e;
  }
};

// ================= UPDATE =================
export const updateUserData = async (data) => {
  try {
    const user = await db.User.findOne({ where: { id: data.id } });
    if (!user) return "⚠️ User not found!";

    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.address = data.address;
    user.phoneNumber = data.phoneNumber;

    await user.save();
    return "✅ Update user success!";
  } catch (e) {
    throw e;
  }
};

// ================= DELETE =================
export const deleteUserById = async (userId) => {
  try {
    await db.User.destroy({ where: { id: userId } });
    return "✅ Delete user success!";
  } catch (e) {
    throw e;
  }
};

// ========= Aliases (nếu controller cũ dùng tên này) =========
export const getUserInfoById = getUserById;    // alias cho tương thích
export const updateUser = updateUserData;      // alias cho tương thích

// ================= DEFAULT EXPORT =================
export default {
  createNewUser,
  getAllUser,
  getUserById,
  getUserInfoById, // alias
  updateUserData,
  updateUser,      // alias
  deleteUserById,
  hashUserPassword,
};
