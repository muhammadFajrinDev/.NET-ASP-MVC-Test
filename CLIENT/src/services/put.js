import axios from 'axios';
import { RootPath,OnlinePath } from './config';

const Put = (path,root,data) =>{
    const promise = new Promise((resolve,reject)=>{
        axios.put(`${root ? OnlinePath : RootPath}/${path}`, data)
        .then((response) => {
            resolve(response)
        },(err) =>{
            reject(err)
        })
    })
    return promise;
}

export default Put;

