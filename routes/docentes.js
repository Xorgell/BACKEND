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
            .execute('stp_docentes_getall');
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
            .input('IdDocente', sql.Int, req.params.Id)
            .execute('stp_docentes_getbyid');
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
            .input('Edad', req.body.Edad)
            .input('Titulo', req.body.Titulo)
            .input('Tipo', req.body.Tipo)

        .execute('stp_docentes_add');
    }).then(result => {
        res.status(201).json({
            status: "ok",
            msg: "Docente agregado correctamente"
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
            .input('IdDocente', req.params.Id)
            .input('Nombre', req.body.Nombre)
            .input('Edad', req.body.Edad)
            .input('Titulo', req.body.Titulo)
            .input('Tipo', req.body.Tipo)
            .execute('stp_docentes_put');
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
            .input('IdDocente', sql.Int, req.params.Id)
            .execute('stp_docentes_delete');
    }).then(result => {
        res.status(201).json({
            status: "ok",
            msg: "Docente eliminado correctamente"
        });
    }).catch(err => {
        res.json(err);
    });
});




module.exports = router;