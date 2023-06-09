const express = require('express');
const router = new express.Router();
const ProductController = require('../controllers/product-controller');
const PageController = require('../controllers/page-contoller');
const UserController = require('../controllers/user-controller');

const upload = require('../services/uploader')


router.get('/produkty', ProductController.showProducts);
router.get('/produkty/:name', ProductController.showProduct);

router.get('/zarejestruj', UserController.showRegister);
router.post('/zarejestruj', UserController.register);
router.get('/zaloguj', UserController.showLogin);
router.post('/zaloguj', UserController.login);
router.get('/wyloguj', UserController.logout);

router.get('/admin/profil', UserController.showProfile);
router.post('/admin/profil', UserController.updateProfile);

router.get('/admin/produkty/dodaj', ProductController.showCreateProductForm);
router.post('/admin/produkty/dodaj', upload.single('image'), ProductController.createProduct);

router.get('/admin/produkty/:name/edytuj', ProductController.showEditProductForm);
router.post('/admin/produkty/:name/edytuj', upload.single('image'), ProductController.editProduct);

router.get('/admin/produkty/:name/usun', ProductController.deleteProduct);
router.get('/admin/produkty/:name/usun-zdjecie', ProductController.deleteImage)

router.get('/', PageController.showHome );
router.get('*', PageController.showNotFound);

module.exports = router;