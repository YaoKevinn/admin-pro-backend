const { response } = require("express");

const Hospital = require("../models/hospital");
const Medico = require("../models/medico");
const Usuario = require("../models/usuario");

// getTodo()
const getTodo = async (req, res = response) => {
    const busqueda = req.params.busqueda;

    // indicar que esta busqueda es insensible, not case sensitive
    const regex = new RegExp(busqueda, "i");

    // Hacer las 3 promises en simultaneo pero espera que termine todo para avanzar
    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre:regex }),
        Hospital.find({ nombre:regex })
    ]);

    res.json({
        ok: true,
        busqueda,
        usuarios,
        hospitales,
        medicos
    });
};

module.exports = {
    getTodo,
};


const getDocumentosColeccion = async (req, res = response) => {
    
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;

    // indicar que esta busqueda es insensible, not case sensitive
    const regex = new RegExp(busqueda, "i");
    
    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img');
        break;
        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
                                 .populate('usuario', 'nombre img');
        break;
        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
        break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
            })
    }

    res.json({ ok: true, resultados:data });
};

module.exports = {
    getTodo,
    getDocumentosColeccion
};