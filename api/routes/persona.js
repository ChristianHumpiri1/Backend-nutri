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
  

  module.exports = router;