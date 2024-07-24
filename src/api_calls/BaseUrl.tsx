import axios from 'axios';

const instance = axios.create({
   // baseURL: "http://localhost:8000"
   //baseURL: "http://194.163.45.56:8000"
   baseURL:"https://kakiscanner.com"
    ,
    headers: {
        "Content-type": "application/json",
      },
  
  });
  
  
  export default instance;