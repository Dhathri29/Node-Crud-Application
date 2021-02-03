const db = require("../config/db");
var bcrypt = require("bcryptjs");
//register
const register = (req, res) => {
    res.render("register");
    console.log("get worked");
};

//add registered user
const registeredUser = async (req, res) => {
    const { username, password } = req.body;
    await db.query(
        `insert into register (username,password) values ('${username}','${password}') `
    );
    res.redirect("/login");
};

//loginPage
const loginPage = (req, res) => {
    console.log("login get");
    res.render("login");
};

//loginCheck
const loginCheck = async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);

    // var salt = bcrypt.genSaltSync(10);
    // var hash = bcrypt.hashSync(password, salt);
    // console.log(salt);
    // console.log(hash);

    console.log("login post worked");
    const userDetails = await db.query(
        `select * from register where username= '${username}' and password= '${hash}'`
    );
    console.log(userDetails.length);
    if (userDetails.length === 0) {
        //alert("invalid login");
        res.redirect("/login");
    } else {
        res.redirect("/products");
    }
};

//get
const getallProductsForm = async (req, res) => {
    const allProducts = await db.query(`select *from products`);
    console.log(allProducts);
    res.render("allProducts", { allProductsVar: allProducts });
};

//getProduct
const getProduct = async (req, res) => {
    console.log(req.params, req.query);

    const getProductDetails = await db.query(
        `select * from products where id = ${req.params.id} `
    );

    res.render("productDetails", { getProductDetailsVar: getProductDetails });
};

//edit product
const editProduct = async (req, res) => {
    const editProductDetails = await db.query(
        `select * from products where id = ${req.params.id}  `
    );
    console.log(editProductDetails);
    res.render("editProduct", { editProductVar: editProductDetails });
};

//handle edit products
const handleEditProduct = async (req, res) => {
    console.log(req.params);
    console.log(req.body);
    await db.query(
        `update products set prodname='${
            req.body.productName
        }', price='${parseInt(req.body.price)}' where id=  ${req.params.id} `
    );
    res.redirect("/products");
};

//delete product
const deleteProduct = async (req, res) => {
    await db.query(`delete from products where id=${req.params.id}`);
    res.redirect("/products");
};

//add product (get)
const addProductForm = (req, res) => {
    res.render("addProduct");
};

//add product (post)
const addProduct = async (req, res) => {
    //get the data from the form
    const { prodname, price } = req.body;
    console.log("---------------");
    console.log(req.body);

    //insert values into the table
    await db.query(
        `insert into products (prodname,price) values ('${prodname}','${price}') `
    );
    res.redirect("/products");
};

module.exports = {
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
};
