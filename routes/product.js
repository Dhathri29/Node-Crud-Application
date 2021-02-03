const router = require("express").Router();

const { select } = require("async");
const { DH_NOT_SUITABLE_GENERATOR } = require("constants");

//import controller
const {
    getallProductsForm,
    getProduct,
    editProduct,
    handleEditProduct,
    deleteProduct,
    addProduct,
    addProductForm,
    register,
    registeredUser,
    loginPage,
    loginCheck,
} = require("../controllers/product");

//routes for the pages
router.route("/register").get(register).post(registeredUser);
router.route("/login").get(loginPage).post(loginCheck);
router.get("/products", getallProductsForm);
router.route("/products/addproduct").get(addProductForm).post(addProduct);
router.get("/products/:id", getProduct);
router.route("/products/:id/edit").get(editProduct).put(handleEditProduct);
router.route("/products/:id/delete").get(deleteProduct);

module.exports = router;
