import axios from '../BaseUrl'

export const gettop5Games = async() =>{

  try{  const response = await axios.get('/games/get-top5games')

  return response
}catch(error){
    console.log(error);
};


}