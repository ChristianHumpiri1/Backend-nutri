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
  router.put('/empresa/:id',(req, res)=>{
    const{id}=req.params
    const{nombree, ruc, direccion, nombrerep, cargorep, gradosup, 
        telefono, fechappp,areappp,idperson} = req.body
  
    let sql = `update empresa set 
                nombree ='${nombree}',
                ruc='${ruc}',
                direccion='${direccion}',
                nombrerep='${nombrerep}',
                cargorep='${cargorep}',
                gradosup='${gradosup}',
                telefono='${telefono}',
                fechappp='${fechappp}',
                areappp='${areappp}',
                idperson='${idperson}
                where idempresa = '${id}'`
    
        mysqlConnection.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else{
            res.json({status: 'empresa modificada'})
        }
    })
  })
  


  

  module.exports = router;