import { Box, Button, Grid, Typography } from "@mui/material";
import Layout from "../PageLayout/Layout";
import CircleIcon from "@mui/icons-material/Circle";
// import RectangleIcon from '@mui/icons-material/Rectangle';
import { useEffect, useState } from "react";
// import { getFiveRandomGames } from "../api_calls/Games/getFiveRandomGames";
import { useNavigate } from "react-router-dom";
import data from "../utility/data.json";
import { shuffleArray } from "../utility/shuffleFunction";
import malaysianflag from "../assets/malaysian-flag.png";
import playerUsername from "../utility/playerUsername.json";
import loader from "../assets/loader.gif";

const ScanGames = () => {
  const navigate = useNavigate();
  const [names, setNames] = useState<any>([]);

  const [games, setGames] = useState([]);

  const [visibleNames, setVisibleNames] = useState<any>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [fadeOutName, setFadeOutName] = useState(null);
  const [firstRun, setFirstRun] = useState(true);

  useEffect(() => {
    const shuffledData = shuffleArray(playerUsername.username);
    setNames(shuffledData);
  }, []);

  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === names.length - 1 ? 0 : prevIndex + 1
      );
      console.log(firstRun);
      if (firstRun && visibleNames.length === 3) {
        console.log(visibleNames);
        setFadeOutName(visibleNames[3] as any);
        console.log(fadeOutName);
        setFirstRun(false);
      } else {
        setFadeOutName(visibleNames[2]);
      }

      setFadeOut(true);

      setTimeout(() => {
        setVisibleNames((prevNames: any) => {
          if (prevNames.length >= 4) {
            //return [...prevNames.slice(1), names[currentIndex]];
            return [names[currentIndex], ...prevNames.slice(0, 3)];
          } else {
            return [...prevNames, names[currentIndex]];
          }
        });
        setFadeOutName(null);
        setFadeOut(false);
      }, 500);
    }, 2000);

    return () => clearInterval(interval);
  }, [names, currentIndex]);

  const getGames = async () => {
    const shuffledGames = shuffleArray(data.games).slice(0, 5);
    setGames(shuffledGames);
    localStorage.setItem("lastFetchTime", new Date().getTime().toString());
    localStorage.setItem("games", JSON.stringify(shuffledGames));
  };

  useEffect(() => {
    const lastFetchTime = localStorage.getItem("lastFetchTime");
    const currentTime = new Date().getTime();
    const twentyFourHours = 24 * 60 * 60 * 1000;

    if (lastFetchTime && currentTime - parseInt(lastFetchTime) < twentyFourHours) {
      const storedGames = JSON.parse(localStorage.getItem("games") || "[]");
      setGames(storedGames);
    } else {
      getGames();
      localStorage.setItem("lastFetchTime", currentTime.toString());
    }
  }, []);



  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     getGames();
    
  //   }, 24 * 60 * 60 * 1000);

  //   return () => clearInterval(interval);
  // }, []);
  
 

  const sortedGames = [...games].sort(
    (a: any, b: any) => b.percentage - a.percentage
  );
  // const [animatedIndexes, setAnimatedIndexes] = useState<number[]>([]);
  // useEffect(() => {
  //   const newIndexes = visibleNames
  //     ?.map((item: any, index: number) => index)
  //     .filter((index: number) => !animatedIndexes.includes(index));
  //   if (newIndexes.length > 0) {
  //     setAnimatedIndexes((prevIndexes) => [...prevIndexes, ...newIndexes]);
  //     console.log(animatedIndexes);
  //   }
  // }, [visibleNames]);
  return (
    <Layout>
      <Box
        sx={{
          pt: 2,
          display: "flex",
          flexDirection: "column",
          //justifyContent: "center",
          alignItems: "center",
          maxHeight: "150vh",
          height: { xs: "105vh", md: "115vh" },
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
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "12px", md: "14px" },
                  whiteSpace: "nowrap",
                }}
              >
                {item.title}
                {"-"}
                {item.provider.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "12px", md: "14px" },
                  whiteSpace: "nowrap",
                }}
              >
                {`[Win ${item.percentage}]`}
              </Typography>
            </Grid>
          ))}

          <Grid>
            <Button
              variant="contained"
              onClick={() => navigate("/select-provider")}
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
            bgcolor: "white",
            width: { xs: "85%", md: "35%" },
            pb: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                p: "10px 2px 10px 10px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              Recent Activity
            </Typography>
            <CircleIcon sx={{ width: "13px", color: "#3CFF00" }} />
          </Box>
          <hr />

          {visibleNames.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                my: 1,
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: "12px", textAlign: "center" }}>
                loading activity...
              </Typography>
              <img src={loader} alt="loader" width="180px" />
            </Box>
          ) : (
            visibleNames?.map((item: any, index: number) => (
              <Grid
                key={index}
                sx={{
                  bgcolor: "#F9F9F9",
                  m: "10px",
                  p: 1,
                  display: "flex",
                  animation:
                    visibleNames.length === 1
                      ? "fadeIn 2s ease-in-out"
                      : visibleNames.length >= 4 && index === 0 && fadeOut
                      ? "fadeIn 2s ease-in-out infinite"
                      : index === 1 || index === 2
                      ? "fadeIn 2s ease-in-out"
                      : "",

                  opacity:
                    visibleNames.length >= 4 &&
                    index === visibleNames.length - 1
                      ? fadeOutName === item
                        ? 0
                        : 1
                      : 1,
                  transition: "opacity 0.5s ease-in-out",
                }}
              >
                <img src={malaysianflag} width="13px" height="12px" />
                <Typography sx={{ fontSize: "12px" }}>
                  <span style={{ color: "#4483C4", fontWeight: "bold" }}>
                    {item.finalwords}
                  </span>{" "}
                  * Has Inject Cheat SLOT
                </Typography>
              </Grid>
            ))
          )}

          <hr />
        </Grid>

        <Box
          sx={{
            textAlign: "center",
            color: "white",
            p: "10px 10px",
            mt: 2,
          
          }}
        >
          <Typography sx={{ fontSize: "12px" }}>
            100% Tidak dapat dikesan
          </Typography>
          <Typography sx={{ fontSize: "12px", mt: 1 }}>
          Cheat digunakan untuk pelbagai jenis permainan
          </Typography>
          <Typography sx={{ fontSize: "12px", mt: 1 }}>
          Scanner yang sangat berkesan di laman web ini.
          </Typography>
          <Typography sx={{ fontSize: "12px", mt: 1 }}>
          Copyright ©KakiScanner, all rights reserved 18+
          </Typography>
        </Box>
      </Box>
    </Layout>
  );
};

export default ScanGames;
