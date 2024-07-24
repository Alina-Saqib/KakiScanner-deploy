import axios from "../BaseUrl";

export const getLinks = async () => {
  try {
    const response = await axios.get("/link/get");
    return response;
  } catch (error) {
    console.log(error);
  }
};
