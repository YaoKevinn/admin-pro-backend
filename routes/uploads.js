/*
    Rutas: api/upload/
*/ 

const { Router } = require("express");
const expressFileUpload = require('express-fileupload');

const { fileUpload } = require("../controllers/uploads");
const { validarJWT } = require("../middleware/validar-jwt");

const router = Router();

router.use(expressFileUpload());

router.put("/:tipo/:id", validarJWT, fileUpload);



module.exports = router;
