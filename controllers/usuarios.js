/*
   Aqui entra la logica de los apis
*/

// para ayudar con la visualizacion de los metodos de response
const { response } = require("express");

const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");

const getUsuarios = async (req, res) => {

    const desde = Number(req.query.desde) || 0;
    // const usuarios = await Usuario
    //     .find({}, "nombre email google")
    //     .skip( desde )
    //     .limit( 5 );
    // const total = await Usuario.count();
    // console.log(desde)

    const [ usuarios, total ] = await Promise.all([
        Usuario
        .find({}, "nombre email google img")
        .skip( desde )
        .limit( 5 ),
        Usuario.countDocuments(),
    ])

    res.json({
        ok: true,
        usuarios,
        total
    });
};

const crearUsuario = async (req, res = response) => {
    const { email, password, nombre } = req.body;

    try {
        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: "El correo ya esta registrado",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar",
        });
    }

    const usuario = new Usuario(req.body);

    // Encryptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    // Guardar usuario
    await usuario.save();

    // Generar web token
    const token = await generarJWT(usuario.id);

    res.json({
        ok: true,
        usuario,
        token
    });
};

const actualizarUsuario = async(req, res = response) => {
    // TODO Validar Token y comprobar si es usuario correcto
    const uid = req.params.id;

    try { 
        const usuarioDB = Usuario.findById(uid);
        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        // Actualizaciones
        const { password, google, email, ...campos} = req.body;

        if ( usuarioDB.email !== email){
            const existeEmail = await Usuario.findOne({ email: req.body.email });
            if (existeEmail) {
                return res.status(404).json({
                   ok: false,
                   msg: 'Ya existe un usuario con ese email'
                })
            }
        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            uid: uid,
            usuario: usuarioActualizado
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        })
    }
}

const borrarUsuario = async(req, res = response) => {
    const uid = req.params.id;
    try {
        const usuarioDB = Usuario.findById(uid);
        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }
        await Usuario.findOneAndDelete(uid)
        res.json({
            ok: true,
            msg: 'Usuario eliminado!'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con su administrador'
        })
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
};
