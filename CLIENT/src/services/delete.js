import axios from 'axios';
import { RootPath,OnlinePath } from './config';

const Delete = (path,root) =>{
    const promise = new Promise((resolve,reject)=>{
        axios.delete(`${root ? OnlinePath : RootPath}/${path}`)
        .then((response) => {
            resolve(response)
        },(err) =>{
            reject(err)
        })
    })
    return promise;
}


export default Delete;