/*
    Ruta: './routes/hospitales'
*/
const { Router, response } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middleware/validar-campos");

const { validarJWT } = require("../middleware/validar-jwt");

const router = Router();

const {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital,
} = require("../controllers/hospitales");

router.get("/", getHospitales);

router.post(
    "/",
    [
        validarJWT,
        check("nombre", "El nombre del hospital es necesario").not().isEmpty(),
        validarCampos
    ],
    crearHospital
);

router.put("/:id", [], actualizarHospital);

router.delete("/:id", validarJWT, borrarHospital);

module.exports = router;
