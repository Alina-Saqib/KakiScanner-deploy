
import axios from '../BaseUrl'
export const getAllProviders = async()=>{

    try {
        const response = await axios.get('/game-providers')

        console.log(response);
        return response
        
    } catch (error) {
        console.log(error)
    }
}