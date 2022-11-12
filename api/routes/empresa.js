const express = require('express');
const router = express.Router();


const mysqlConnection = require('../connection/connection');
const app = require('../../app');


router.get('/empresa', (req,res) =>{
    mysqlConnection.query('select * from empresa', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
       }else{
        console.log(err);
       }
    })    
  })
  router.post('/empresa',( req, res)=>{
    const{nombree, ruc, direccion, nombrerep, cargorep, gradosup, 
        telefono, fechappp,areappp,idperson} = req.body
  
    let sql = `insert into empresa(nombree, ruc, direccion, nombrerep, cargorep, gradosup, 
               telefono, fechappp,areappp,idperson) values('${nombree}','${ruc}','${direccion}','${nombrerep}','${cargorep}',
               '${gradosup}','${telefono}','${fechappp}','${areappp}','${idperson}')`
    mysqlConnection.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else{
            res.json({status: 'empresa registrada'})
        }
    })
  })
  

  module.exports = router;