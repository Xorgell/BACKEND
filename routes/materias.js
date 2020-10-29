//ruta de docentes

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
            .execute('stp_Materias_getall');
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
            .input('IdMateria', sql.Int, req.params.Id)
            .execute('stp_Materias_getbyid');
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
            .input('Nombre', req.body.Nombre)
            .input('Horas', req.body.Horas)
            .input('HorasP', req.body.HorasP)
            .input('Horast', req.body.Horast)
            .input('Creditos', req.body.Creditos)

        .execute('stp_Materias_add');
    }).then(result => {
        res.status(201).json({
            status: "ok",
            msg: "Materia agregada correctamente"
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
            .input('IdMateria', req.params.Id)
            .input('Nombre', req.body.Nombre)
            .input('Horas', req.body.Horas)
            .input('HorasP', req.body.HorasP)
            .input('Horast', req.body.Horast)
            .input('Creditos', req.body.Creditos)
            .execute('stp_materia_put');
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
            .input('IdMateria', sql.Int, req.params.Id)
            .execute('stp_Materias_delete');
    }).then(result => {
        res.status(201).json({
            status: "ok",
            msg: "Materia eliminada correctamente"
        });
    }).catch(err => {
        res.json(err);
    });
});


module.exports = router;