import axios from 'axios';
import path from 'path';
import data from './data.json';
const fs = require('fs');

import fsPromises from 'fs/promises';
const fetch = require('sync-fetch')


function loadData(){
    let loadData;

    let rawdata = data;

    return rawdata;


}

function saveData(changeData){

    const writeData = async() => {
        const response = await fetch('/api/store', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bicycle: {
              color: 'green',
              id: 1,
              price: Math.floor(Math.random() * 1000),
            },
          }),
        });
        const data = await response.json();
        console.log(data);
      };

      writeData()
    
}

export{
    loadData,
    saveData,

}