import axios from '../BaseUrl'

export const getProviderGame = async(id: any) =>{

  try{  const response = await axios.get(`/games/get-providerGames/${id}`)

  console.log(response)
  return response
}catch(error){
    
};


}