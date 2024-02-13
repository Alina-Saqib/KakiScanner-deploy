import axios from '../BaseUrl'

export const getFiveRandomGames = async() =>{

  try{  const response = await axios.get('/games/get-randomGames')

  console.log(response)
  return response
}catch(error){
    console.log(error);
};


}