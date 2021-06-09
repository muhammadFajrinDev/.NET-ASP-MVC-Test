import axios from 'axios';
import { RootPath,OnlinePath } from './config';

const Get = (path,root) =>{
    const promise = new Promise((resolve,reject)=>{
        axios.get(`${root ? OnlinePath : RootPath}/${path}`)
        .then((response) => {
            resolve(response.data)
        }, (err)=>{
            reject(err)
        })
    })
    return promise;
}

export default Get;