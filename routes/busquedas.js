/*
    Rutas: api/todo/
*/ 

const { Router } = require("express");

const { getTodo, getDocumentosColeccion } = require("../controllers/busquedas");
const { check } = require("express-validator");
const { validarCampos } = require("../middleware/validar-campos");
const { validarJWT } = require("../middleware/validar-jwt");

const router = Router();

router.get("/:busqueda", validarJWT, getTodo);
router.get("/coleccion/:tabla/:busqueda", validarJWT, getDocumentosColeccion)


module.exports = router;
