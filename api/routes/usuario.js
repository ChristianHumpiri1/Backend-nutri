const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const pool = require('../connection/connection');
const app = require('../../app');


router.get('/usuario', (req,res) =>{
  pool.query('select * from usuario', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
       }else{
        console.log(err);
       }
    })    
  })

  router.post('/login', (req,res) => {
    const { usuario, password } = req.body;
    mysqlConnection.query('select usuario,rol from usuarios where usuario=? and password=?',
    [usuario,password],
    (err,rows,fields) => {
      if(!err){
        if(rows.length >0){
            let data = JSON.stringify(rows[0]);
            const token = jwt.sign(data, 'stil');
            res.json({token});
          }else{
            res.json('Usuario o clave incorrectos');
          }
        
      }else{
        console.log(err);
      }
    }
    )
  })
  router.post('/test',verifyToken, (req,res) => {
    res.json('Informacion secreta');
  })

  function verifyToken(req,res, next){
    if(!req.headers.authorization) return res.status(401).json('No autorizado');

    const token = req.headers.authorization.substr(7);
    if(token!==''){
        const content = jwt.verify(token,'stil');
        req.data = content;
        next();
      }else{
        res.status(401).json('Token vacio');
      }
  }  

  

  module.exports = router;