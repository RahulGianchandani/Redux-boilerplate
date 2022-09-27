import { combineReducers } from "redux";
import signin from "./signin.reducer";
import login from "./login.reducer";
import userimage from "./imageupload.reducer";
import product from "./product.reducer";
import newproduct from "./newproduct.reducer";
import newproductselect from "./newproductselect.reducer";
import createStore from "./createStore.reducer";
import stores from "./getStores.reducer";
import storeurl from "./storeurl.reducer";
import searchstoreurl from "./searchstoreurl.reducer";
import getStores from "./getStores.reducer";
import deleteStoreById from "./deleteStoreById.reducer";

import setupsuccess from "./setupSuccess.reducer";
import userProducts from "./getProduct.reducer";
import addUserProducts from "./addUserProducts.reducer";

import deleteUserProducts from "./deleteuserProducts.reducer";
import myteam from "./team.reducer";

import userDetail from "../reducers/manageStore";

import allMediaOfUser from "./allMediaOfUser.reducer";
import oneMediaOfUser from "./oneMediaOfUser.reducer";
import updatedUserMedia from "./updatedUserMedia.reducer";
import addedOrRemovedChildProduct from "./addOrRemoveChildProduct.reducer";
import imageupload from "./imageupload.reducer";
import getProducts from "./getProductsById.reducer";
import introVideo from './introVideo.reducer'
import videoR from './videoupload.reducer'
import resetPassword from './resetPassword.reducer'
import forgotPass from "./forgotPassword.reducer";
import mySales from "./mySales.reducer";
import totalSales from './totalSales.reducer'
import slmSales from './slmSales.reducer'
import packages from "./packages"
import transaction from "./transaction"
import adminLogin from "./adminLogin.reducer"
import userAccountStats from "./userAccountStats.reducer"
import usertransaction from "./userTransaction.reducer"
import adminTokenValidate from "./adminTokenValidate.reducer"
import allUsers from "./getAllUsers.reducer"
import deleteUser from "./deleteuser.reducer";
import adminProducts from "./adminProducts.reducer";
import deletingadminProducts from "./deleteAdminProduct.reducer";

import user from "./user"
import children from "./parent"
import sales from "./sales"
import sidebar from "./sidebar.reducer";


export default combineReducers({
  signin,
  login,
  userimage,
  product,
  newproduct,
  newproductselect,
  createStore,
  stores,
  storeurl,
  searchstoreurl,
  getStores,
  deleteStoreById,
  setupsuccess,
  addUserProducts,
  userProducts,
  deleteUserProducts,
  myteam,
  userDetail,
  setupsuccess,
  imageupload,
  allMediaOfUser,
  oneMediaOfUser,
  updatedUserMedia,
  addedOrRemovedChildProduct,
  getProducts,
  introVideo,
  videoR,
  resetPassword,
  forgotPass,
  mySales,
  totalSales,
  slmSales,
  packages,
  transaction,
  adminLogin,
  userAccountStats,
  usertransaction,
  adminTokenValidate,
  allUsers,
  deleteUser,
  adminProducts,
  deletingadminProducts,
  user,
  children,
  sales,
  sidebar

});
