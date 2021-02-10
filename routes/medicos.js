/*
    Ruta: './routes/medicos'
*/
const { Router, response } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middleware/validar-campos");

const { validarJWT } = require("../middleware/validar-jwt");

const router = Router();

const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
} = require("../controllers/medicos");

router.get("/", validarJWT, getMedicos);

router.post(
    "/",
    [
        validarJWT,
        check("nombre", "El nombre del medico es obligatorio").not().isEmpty(),
        check("hospital", "El ID del hospial debe de ser valido").isMongoId(),
        validarCampos,
    ],
    crearMedico
);

router.put("/:id", [], actualizarMedico);

router.delete("/:id", validarJWT, borrarMedico);

module.exports = router;
