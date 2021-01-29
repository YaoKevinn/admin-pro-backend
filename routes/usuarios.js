/*
    Ruta: /api/usuarios
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middleware/validar-campos");

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require("../controllers/usuarios");
const { validarJWT } = require("../middleware/validar-jwt");

const router = Router();

router.get("/", validarJWT, getUsuarios);

router.post(
    "/",
    [
        check("nombre", "El nombre es oblogatorio").not().isEmpty(),
        check("password", "El password es oblogatorio").not().isEmpty(),
        check("email", "El email es oblogatorio").isEmail(),
        validarCampos,
    ],
    crearUsuario
);

router.put(
    '/:id',
    [
        validarJWT,
        check("nombre", "El nombre es oblogatorio").not().isEmpty(),
        check("email", "El email es oblogatorio").isEmail(),
        check("role", "El role es oblogatorio").not().isEmpty(),
        validarCampos
    ],
    actualizarUsuario
);

router.delete(
    '/:id',
    validarJWT,
    borrarUsuario
)

module.exports = router;
