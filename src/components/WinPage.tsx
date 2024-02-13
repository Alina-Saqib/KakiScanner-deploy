import {
  Box,
  Button,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import Layout from "../PageLayout/Layout";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import background from '../assets/background.png';
import data from '../utility/data.json';
// import { getProviderGame } from "../api_calls/Games/getProviderGame";
// import { toast } from "react-toastify";

const WinPage = () => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [providerGames , setProviderGames] = useState([])
  const navigate = useNavigate();
  const {id} = useParams();

  const getProvidersGames = async () =>{
    console.log(data.games)
    const response= data.games.filter(game => game.provider.id === parseInt(id as any));
  setProviderGames(response as any)
    // const res = await getProviderGame(id as any);
   
    // if(res?.status === 200){
    //   setProviderGames(res?.data);
    //   console.log(providerGames)
    // }
    // else if(res?.status === 404){
    //   toast.info("No Provider Game")
    // }
    // else{
    //   toast.error("Cannot fetch provider games")
    // }
  }

  useEffect(()=>{
    getProvidersGames()
  },[])

  const sortedGames = [...providerGames].sort((a: any, b: any) => b.percentage - a.percentage);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timer);
          navigate("/");

          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  return (
    <Layout>
      <Box
        sx={{
          pt: 6,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "white",
            textAlign: "center",
            fontSize: "25px",
            lineHeight: "45px",
            letterSpacing: "2px",
            pt: 1,
          }}
        >
          Hack Status : Active
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: "white",
            textAlign: "center",
            fontSize: "25px",
            lineHeight: "45px",
            letterSpacing: "2px",
            pt: 1,
          }}
        >
          {formattedTime}
        </Typography>
        <Box
          sx={{
            bgcolor: "white",
            borderRadius: "6px",
            width: { xs: "90%", md: "50%", lg: "40%" },
            mt: {xs:12 ,md :9},

          }}
        >
          <DialogTitle
            id="alert-dialog-title"
            sx={{
              textAlign: "center",
            }}
          >
            CONGRATULATIONS!
          </DialogTitle>
          <DialogContent sx={{ textAlign: "center" }}>
            <DialogContentText id="alert-dialog-description">
              Your Account Has Been Injected Cheat SLOT
            </DialogContentText>
            <Button
              variant="contained"
              sx={{
                bgcolor: "black",
                color: "white",
                mt: 2,
                '&:hover': {
                  backgroundColor: "#02140a",
                },
              }}
              onClick={() => navigate('/')}
            >
              Continue
            </Button>
          </DialogContent>
        </Box>
        <Box
        sx={{
          background:`url(${background})`,
          backgroundSize:"cover",
          backgroundRepeat:"no-repeat",
          backgroundPosition:"50% 50%",
          my:8,
          maxHeight:"200px",
          overflowY:"auto",
          width:{xs:'90%', md:"35%"},
          p:1
        }}>
          {
            sortedGames.map((item: any) =>(
             <Box sx={{display:"flex", justifyContent:"space-between",color:"#C8AC2F"}}>
              <Typography sx={{fontWeight:"bold",fontSize:{xs:"12px",md:"14px"}}}>
                {`${item?.provider.name}/>PirateScanning=${item.title}`}
              </Typography>
              <Typography sx={{fontWeight:"bold",fontSize:{xs:"12px",md:"14px"}}}>
               {`[Win ${item.percentage}]`}
              </Typography>
            </Box>
            ))
          }

        </Box>
      </Box>
    </Layout>
  );
};

export default WinPage;
