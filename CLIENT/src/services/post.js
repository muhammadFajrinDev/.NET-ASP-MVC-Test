import axios from 'axios';
import { RootPath,OnlinePath } from './config';

const Post = (path,root,data) =>{
    console.log(data)
    const promise = new Promise((resolve,reject)=>{
        axios.post(`${root ? OnlinePath : RootPath}/${path}`, data)
        .then((response) => {
            resolve(response)
        },(err) =>{
            reject(err)
        })
    })
    return promise;
}

export default Post;