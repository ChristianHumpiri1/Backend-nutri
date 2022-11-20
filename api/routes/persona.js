const express = require('express');
const router = express.Router();


const mysqlConnection = require('../connection/connection');
const app = require('../../app');


router.get('/persona', (req,res) =>{
    mysqlConnection.query('select * from persona', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
       }else{
        console.log(err);
       }
    })    
  })
  router.post('/persona',( req, res)=>{
    const{nombre, apepat, apemat, codigo, telefono, genero, 
        religion, nacionalidad,fechanacimiento,ubigeo,dni,estadocivil} = req.body
  
    let sql = `insert into persona(nombre, apepat, apemat, codigo, telefono, genero, religion, nacionalidad,fechanacimiento,ubigeo,dni,estadocivil) values('${nombre}','${apepat}','${apemat}','${codigo}','${telefono}','${genero}','${religion}','${nacionalidad}','${fechanacimiento}','${ubigeo}','${dni}','${estadocivil}')`
    mysqlConnection.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else{
            res.json({status: 'persona registrada'})
        }
    })
  })
  router.put('/persona/:id',(req, res)=>{
    const{id}=req.params
    const{nombre, apepat, apemat, codigo, telefono, genero, 
        religion, nacionalidad,fechanacimiento,ubigeo,dni,estadocivil} = req.body
  
    let sql = `update persona set 
                nombre ='${nombre}',
                apepat='${apepat}',
                apemat='${apemat}',
                codigo='${codigo}',
                telefono='${telefono}',
                genero='${genero}',
                religion='${religion}',
                nacionalidad='${nacionalidad}',
                fechanacimiento='${fechanacimiento}',
                ubigeo='${ubigeo}',
                dni='${dni}',
                estadocivil='${estadocivil}'
                where idpersona = '${id}'`
    
        mysqlConnection.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else{
            res.json({status: 'persona modificada'})
        }
    })
  
  })
  router.get('/persona/:id',(req, res)=>{
    const {id} = req.params
    let sql ='select em.nombree, em.ruc,em.nombrerep,pe.nombre,pe.apepat,pe.apemat from empresa em inner join persona pe on idperson=idpersona where idpersona = ?;'
    mysqlConnection.query(sql,[id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
  })
  

  module.exports = router;