//ruta de alumnos

const Router = require('express');
const conString = require('../database/config');
const sql = require('mssql');

const router = Router();

//get all
router.get('/', (req, res) => {
    sql.on('error', err => {
        console.log(err);
        res.json(err);
    });
    sql.connect(conString).then(pool => {
        return pool.request()
            .execute('stp_alumnos_getall');
    }).then(result => {
        res.json(result.recordset);
    }).catch(err => {
        res.json(err);
    });
});

//get byId
router.get('/:Id', (req, res) => {
    sql.on('error', err => {
        console.log(err);
        res.json(err);
    });
    sql.connect(conString).then(pool => {
        return pool.request()
            .input('IdAlumno', sql.Int, req.params.Id)
            .execute('stp_alumnos_getbyid');
    }).then(result => {
        res.json(result.recordset[0]);
    }).catch(err => {
        res.json(err);
    });
});

//add

router.post('/', (req, res) => {
    sql.on('error', err => {
        console.log(err);
        res.json(err);
    });
    sql.connect(conString).then(pool => {
        return pool.request()
            .input('nombre', req.body.nombre)
            .input('edad', req.body.edad)
            .input('sexo', req.body.sexo)
            .input('semestre', req.body.semestre)
            .input('carrera', req.body.carrera)
            .execute('stp_alumnos_add');
    }).then(result => {
        res.status(201).json({
            status: "ok",
            msg: "Alumno agregado correctamente"
        });
    }).catch(err => {
        res.json(err);
    });
});

//actualizar
router.put('/:Id', (req, res) => {
    sql.on('error', err => {
        console.log(err);
        res.json(err);
    });
    sql.connect(conString).then(pool => {
        return pool.request()
            .input('IdAlumno', req.params.Id)
            .input('nombre', req.body.nombre)
            .input('edad', req.body.edad)
            .input('sexo', req.body.sexo)
            .input('semestre', req.body.semestre)
            .input('carrera', req.body.carrera)
            .execute('stp_alumnos_put');
    }).then(result => {
        res.status(201).json({
            status: "ok",
            msg: "se actualizo registro correctamente"
        });
    }).catch(err => {
        res.json(err);
    });
});

//delete

router.delete('/:Id', (req, res) => {
    sql.on('error', err => {
        console.log(err);
        res.json(err);
    });
    sql.connect(conString).then(pool => {
        return pool.request()
            .input('IdAlumno', sql.Int, req.params.Id)
            .execute('stp_alumnos_delete');
    }).then(result => {
        res.status(201).json({
            status: "ok",
            msg: "Alumno eliminado correctamente"
        });
    }).catch(err => {
        res.json(err);
    });
});


module.exports = router;