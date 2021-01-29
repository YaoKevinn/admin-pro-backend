const { Router } = require("express");
/*
    Path: '/api/login'
*/

const { route } = require("./usuarios");

const { login } = require("../controllers/auth");
const { check } = require("express-validator");
const { validarCampos } = require("../middleware/validar-campos");

const router = Router();

router.post(
    "/",
    [
        check("email", "El email es obligatorio").not().isEmpty(),
        check("password", "El password esobligatorio").not().isEmpty(),
        validarCampos,
    ],
    login
);

module.exports = router;
