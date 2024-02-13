import { Box, Button, Grid, Typography } from "@mui/material";
import Layout from "../PageLayout/Layout";
import CircleIcon from '@mui/icons-material/Circle';
// import RectangleIcon from '@mui/icons-material/Rectangle';
import { useEffect, useState } from "react";
// import { getFiveRandomGames } from "../api_calls/Games/getFiveRandomGames";
import { useNavigate } from "react-router-dom";
import data from '../utility/data.json';
import { shuffleArray } from "../utility/shuffleFunction";
import {faker} from '@faker-js/faker'

const ScanGames = () => {

  // const dummyData = [
  //   { name: "Mega888", title: "Seaworld", percent: "96.5%" },
  //   { name: "918Kiss", title: "Wukong", percent: "88.5%" },
  //   { name: "Pragmatic Play", title: "Starlight", percent: "23.5%" },
  //   { name: "Pussy888", title: "Highway Kings", percent: "78.5%" },
  //   { name: "Playtech", title: "Blue Wizards", percent: "93.76%" },
  // ];
  const navigate = useNavigate()
  const [names, setNames] = useState(["forcone123","olive","Bob23","MyOne34"]);
 
  const [fadeOutName, setFadeOutName] = useState(null);
  // const [slideOut, setSlideOut] = useState(false);

  const generateRandomNames = (count: any) => {
    const names = [];
    for (let i = 0; i < count; i++) {
      const randomName = faker.internet.userName();
      names.push(randomName);
    }
    return names;
  };
  const [games , setGames] = useState([]);

  useEffect(() => {
    
    const interval = setInterval(() => {
      // const shuffledNames = shuffleArray(generateRandomNames(4)); 
      setFadeOutName(names[0] as any); 
     // setSlideOut(true);
      setTimeout(() => {
        setNames(prevNames => {
          const newNames = prevNames.slice(1); 
          newNames.push(generateRandomNames(1) as any); 
          return newNames;
        });
        setFadeOutName(null);
      //  setSlideOut(false);
      },500); 
    }, 1000); 

    return () => clearInterval(interval);
  }, [names]); // Re-run effect when names change
  
 

  const getGames = async() =>{

    const shuffledGames = shuffleArray(data.games).slice(0, 5);
    setGames(shuffledGames);
  }

  useEffect(() => {
    
    getGames();

    const interval = setInterval(() => {
      getGames();
    }, getRandomInterval());

    return () => clearInterval(interval); 
  }, []);

  const getRandomInterval = () => {
    return Math.floor(Math.random() * (3600000 - 1800000 + 1)) + 1800000; 
  };

  

  const sortedGames = [...games].sort((a: any, b: any) => b.percentage - a.percentage);
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
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "30px",
            lineHeight: "45px",
            letterSpacing: "2px",
            pt: 1,
          }}
        >
          Top 5 Games Today
        </Typography>

        <Grid
          sx={{
            p: "32px 40px",
            textAlign: "center",
            width: { xs: "100%", md: "35%", lg: "30%" },
          }}
        >
          {sortedGames.map((item: any) => (
            <Grid
              key={item._id}
              item
              xs={12}
              sx={{
                color: "#c7c8c7",
                display: "flex",
                justifyContent: "space-between",
                mt: 1,
               
                // opacity: fadeOutName === name ? 0 : 1, transition: 'opacity 0.5s ease-in-out' 
              }}
            >
              <Typography
                sx={{
                  fontSize:{xs:"12px",md:"14px"},
                  whiteSpace: "nowrap",
                }}
              >
                {item.title}
                {"-"}
                {item.provider.name}
              </Typography>
              <Typography
              sx={{
                fontSize:{xs:"12px",md:"14px"},
                whiteSpace: "nowrap"
              }}>{`[Win ${item.percentage}]`}</Typography>
            </Grid>
          ))}

          <Grid>
            <Button
              variant="contained"
              onClick={() =>navigate('/select-provider')}
              sx={{
                textTransform: "none",
                bgcolor: "#A1A3A4",
                p: "0px 50px",
                mt: 3,
                fontSize: "25px",
                borderRadius: "14px",
                color: "black",
                "&:hover": {
                  bgcolor: "#A1A3A4",
                },
              }}
            >
              Mula Scan
            </Button>
          </Grid>
        </Grid>

        <Grid 
        sx={{
            bgcolor:"white",
            width:{xs:"85%",md:"35%"},
            pb:1
        }}>
            <Box
            sx={{
                display:"flex",
                alignItems:"center"
            }}>
            <Typography
            sx={{
                p:"10px 2px 10px 10px",
                fontSize:"12px",
                fontWeight:"bold"
            }}>
                Recent Activity 
            </Typography>
            <CircleIcon sx={{width:"13px", color:"#3CFF00"}}/>
            </Box>
            <hr/>
       

        {names.map((item: any)=>(
            <Grid
            sx={{
                bgcolor:"#F9F9F9",
                m:"10px 10px 10px 10px",
                p:1,
                display:"flex",
                opacity: fadeOutName === item ? 0 : 1,
            transition: 'opacity 0.5s ease-in-out',
            }}>
                <Box sx={{width:"13px",height:"5px",bgcolor:"red",mt:"3px"}}/>
                <Typography
                sx={{
                    fontSize:"12px"
                }}>
                         <span style={{color:"#4483C4", fontWeight:"bold"}}>{item}</span>*** Has Inject Cheat SLOT
                </Typography>
            </Grid>
        ))

        }
        <hr/>
         </Grid>

         <Box
         sx={{
            textAlign:"center",
            color:"white",
            p:"10px 10px",
            mt:2
         }}>
            <Typography sx={{fontSize:"12px"}}>
                100% Tidak dapat dikesan
            </Typography>
            <Typography  sx={{fontSize:"12px",mt:1}}>
                Cheatdigunakan untuk pelbagai jenis permainan
            </Typography>
            <Typography  sx={{fontSize:"12px",mt:1}}>
                Penipuan yang sangat berkesan di laman web ini. 
            </Typography>
         </Box>
      </Box>
    </Layout>
  );
};

export default ScanGames;
