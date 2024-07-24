import axios from '../BaseUrl'

export const getProviderGame = async(id: any) =>{

  try{  const response = await axios.get(`/games/getGames?providerId=${id}`)


  return response
}catch(error){
    
};


}