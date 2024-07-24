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
import { Link, useNavigate, useParams } from "react-router-dom";

import { getLinks } from "../api_calls/Links/getLinks";
import { toast } from "react-toastify";
import { getProviderGame } from "../api_calls/Games/getProviderGame";
// import { toast } from "react-toastify";

const WinPage = () => {
  const [timeLeft, setTimeLeft] = useState(1800);
  const [providerGames , setProviderGames] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0);
  const [continueLink,setContinueLink]= useState("")
  const navigate = useNavigate();
  const {id} = useParams();


  const getAllLinks = async () =>{

    const response: any = await getLinks();
    if(response.status === 200){
      setContinueLink(response.data?.continueLink);
      
    }else{
      toast.error("Cannot fetch links")
    }
  }

  
  const getProvidersGames = async () =>{
    //const response= data.games.filter(game => game.provider.id === parseInt(id as any));
    const response = await getProviderGame(id as any)
    if(response?.status === 200){
      setProviderGames(response.data.games as any)
    }else{
      toast.error("cannot fetch provider games")
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < providerGames.length - 1) {
        setCurrentIndex(prevIndex => prevIndex + 1);
      } else {
        clearInterval(timer);
      }
    }, 1000); // Delay of 1 second between each item

    return () => clearInterval(timer);
  }, [currentIndex, providerGames]);

  useEffect(()=>{
    getProvidersGames()
    getAllLinks();
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

    const [activityDetected, setActivityDetected] = useState(false);

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        if (!activityDetected) {
          window.open("https://b88mys.com/m/?aff_id=292", "_blank");
        }
      }, 5000);
  
      return () => clearTimeout(timeoutId);
    }, []);
  
    useEffect(() => {
      const resetActivityTimer = () => {
        setActivityDetected(true);
  
        setTimeout(() => {
          setActivityDetected(false);
        }, 1000); 
      };
  
      window.addEventListener('mousemove', resetActivityTimer);
      window.addEventListener('mousedown', resetActivityTimer);
  
      return () => {
        window.removeEventListener('mousemove', resetActivityTimer);
        window.removeEventListener('mousedown', resetActivityTimer);
      };
    }, []);
  

  return (
    <Layout>
      <Box
        sx={{
          pt: 6,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          maxHeight: "150vh",
          height: { xs: "100vh", md: "115vh" },
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
             Tahniah! 
          </DialogTitle>
          <DialogContent sx={{ textAlign: "center" }}>
            <DialogContentText id="alert-dialog-description">
           ID anda telah berjaya inject dengan winrate 89% - 99%. Sila main terus di website yang anda didaftar.
            </DialogContentText>
            <Link to={continueLink} target="_blank">
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
            >
              Continue
            </Button>
            </Link>
          </DialogContent>
        </Box>
        <Box
        sx={{
          // background:`url(${background})`,
          // backgroundSize:"cover",
          // backgroundRepeat:"no-repeat",
          // backgroundPosition:"50% 50%",
          my:8,
          width:{xs:'90%', md:"35%"},
          p:1
        }}>
          {
            sortedGames.map((item: any, index) => (
              index <= currentIndex &&
              <Box key={index} sx={{ display: "flex", justifyContent: "space-between", color: "white" }}>
                <Typography sx={{ fontWeight: "bold", fontSize: { xs: "12px", md: "14px" } , whiteSpace:"nowrap"}}>
                  {`${item.provider.name.replace(/\s/g, '')}\\>Kakiscanner=${item.title.replace(/\s/g, '')}`}
                </Typography>
                <Typography sx={{ fontWeight: "bold", fontSize: { xs: "12px", md: "14px" }, whiteSpace:"nowrap" }}>
                  {`[Win ${parseFloat(item.percentage).toFixed(2)}%]`}
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
