
// pages/api/store.js

import fsPromises from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), "./data.json");

/*
let loadedData = {
    "data":{
       "medicos":[
           {
           "id":0,
           "nome":"Mario de Santos",
           "especialidade":"Psiquiatria",
           "endereco":"Endereço I - Atende na Unidade X",

           "descricao":"",
           "consultas":[],
           "src":""
           },
           {
           "id":1,
           "nome":"Vanessa Arantes",
           "especialidade":"Pediatria",
           "endereco":"Endereço II - Atende na Unidade Y",
   
           "descricao":"Possui ",
           "consultas":[],
           "src":""
           },
           {
           "id":2,
           "nome":"Ana de Armas",
           "especialidade":"Armas",
           "endereco":"Endereço III - Atende na Unidade Z",
       
           "descricao":"Bela garota",
           "consultas":[],
           "src":"/anadearmas.jpg"
           },
           {
           "id":3,
           "nome":"Raphael",
           "especialidade":"Cardiologia",
           "endereco":"Endereço II - Atende na Unidade Z",
           
           "descricao":"Delicioso",
           "consultas":[],
           "src":""
           }


       ]
   }
};
*/

export default async function handler(req,res){

    /*if(req.method == 'GET'){
        //console.log(dataFilePath)
        //const jsonData = fs.readFileAsync(dataFilePath);
        //const objectData = await JSON.parse(jsonData);
        res.status(200).json(loadedData);
    }else if(req.method == 'POST'){

        fs.writeFileSync("/public/data.json", data);
        // Send a success response
        res.status(200).json({ message: 'Bike updated successfully' })

    }*/
}