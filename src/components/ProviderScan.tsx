import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import Layout from "../PageLayout/Layout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useEffect, useState } from "react";
import { getAllProviders } from "../api_calls/Games/getAllProviders";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "./TypeAnimation";


const ProviderScan = () => {
  const [menuItems,setMenuItems] = useState<Array<string>>([])
  const [processing, setProcessing] = useState(false);
  const [providers, setProviders] = useState([]);
  const [providerId, setProviderId] = useState();
  const [cheatSheet, setCheatSheet] = useState("");
  const [status ,setStatus]= useState(false);
  const [serverStatus, setServerStatus] = useState(false)
  const [provider, setProvider] = useState("");


  const getProvidersGames = async () => {
    const response = await getAllProviders();
    if(response?.status === 200){
      const filteredProviders = response.data.filter((provider: any) => provider.hideProvider === false);
      setProviders(filteredProviders);
    } else {
      toast.error("Error in fetching providers");
    }
  };
  

  useEffect(() => {
    getProvidersGames();
  }, []);

  const navigate = useNavigate();

 

  const handleSelectChange = (e: any) => {
    e.preventDefault();
    setProvider(e.target.value);
    const selectedProvider: any = providers.find(
      (oneprovider: any) => oneprovider.name === e.target.value
    );
    setProviderId(selectedProvider?._id);
    const name =selectedProvider?.name
    // Update menuItems based on selected provider
    if (name.toLowerCase() === 'mega888' || name.toLowerCase() === '918kiss' || name.toLowerCase() === 'pussy888') {
      setCheatSheet(''); // Reset cheat sheet selection
      setMenuItems([
        "-Pilih Cheat-",
        "Free Angpow",
        "Random Jackpot",
        "Ultra Mega Bigwin",
        "Free Game"
      ]);
    } else if (name.toLowerCase() === 'playtech') {
      setCheatSheet('');
      setMenuItems([
        "-Pilih Cheat-",
        "Auto Free Games",
        "Auto Big/Mega Win",
        "Auto Featured Jackpot"
      ]);
    }else{
      setCheatSheet('');
      setMenuItems([
        "-Pilih Cheat-",
        "Cheat Auto Scatter",
        "Auto Sensational",
        "Auto wild",
        "Cheat Max Win",
        "Cheat Auto Jackpot"
      ]);
    }
  };
  

  const [attemptSequence, setAttemptSequence] = useState('');

  useEffect(() => {

    const generateAttempts = () => {
      const numAttempts = Math.floor(Math.random() * 4) + 1; 
      let attempts = '';
      for (let i = 1; i <= numAttempts; i++) {
        if (i === numAttempts) {
          attempts += `Attempt (${i}) to bypass the security System... <span style="color: green;">Done</span><br/>`;
        } else {
          attempts += `Attempt (${i}) to bypass the security System... Buffering<br/>`;
        }
      }
      return attempts;
    };

    // Update the attempt sequence state with the generated attempts
    setAttemptSequence(generateAttempts());
  }, []);
  const connectToServer = async () => {
   
    if (!providerId) {
      toast.error("Select a Provider");
      return;
    }

    if (!cheatSheet) {
      toast.error("Pilih Cheat");
      return;
    }

    setProcessing(true);

   


  };

  useEffect(()=>{
    if(status){
      navigate(`/success-cheat/${providerId}`);
      setProcessing(false);
    }
  },[status])



 
  return (
    <Layout>
      <Box
        sx={{
          pt: 6,
          display: "flex",
          flexDirection: "column",
          //justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          maxheight: "300vh",
          pb: 6,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "white",
            textAlign: "center",
            fontSize: "28px",
            lineHeight: "45px",
            letterSpacing: "2px",
            pt: 1,
          }}
        >
          Choose Provider to scan
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#A1A3A4",
            textTransform: "none",
            color: "black",
            mt: 2,
            fontSize: "20px",
            borderRadius: "14px",
            p: "8px 45px",
            "&:hover": {
              bgcolor: "#A1A3A4",
            },
          }}
        >
          Provider
        </Button>
        {/* <Box
        sx={{
          background:`url(${background})`,
          backgroundSize:"cover",
          backgroundRepeat:"no-repeat",
          backgroundPosition:"50% 50%",
          my:4,
          width:{xs:'90%', md:"35%"},
          p:1
        }}>
          
           {providers.map((provider: any) => {
            const providerGames = gamedata.games.filter(game => game.provider.name === provider?.name);
            const sortedGames = providerGames.sort((a, b) => b.percentage - a.percentage);
            return sortedGames.map((game, index) => (
              <Box key={index} sx={{display:"flex", justifyContent:"space-between",color:"#C8AC2F"}}>
                <Typography sx={{fontWeight:"bold",fontSize:{xs:"12px",md:"14px"}}}>
                  {`${provider?.name}/>KakiScanning=${game.title}`}
                </Typography>
                <Typography sx={{fontWeight:"bold",fontSize:{xs:"12px",md:"14px"}}}>
                  {`[Win ${game.percentage}]`}
                </Typography>
              </Box>
            ));
          })} 
          {providerGames.map((games: any, index) => (
        <div key={index}>
            {games?.map((game: any) => (
              <Box key={index} sx={{display:"flex", justifyContent:"space-between",color:"#C8AC2F"}}>
              <Typography sx={{fontWeight:"bold",fontSize:{xs:"12px",md:"14px"}}}>
                {`${game?.provider?.name}/>KakiScanning=${game.title}`}
              </Typography>
              <Typography sx={{fontWeight:"bold",fontSize:{xs:"12px",md:"14px"}}}>
                {`[Win ${game.percentage}]`}
              </Typography>
            </Box>
            ))}
        
        </div>
      ))} 
        </Box> */}

        <TextField
          select
          name="provider"
          value={provider}
          onChange={handleSelectChange}
          SelectProps={{
            IconComponent: KeyboardArrowDownIcon,
          }}
          label={provider === "" ? "Select Provider" : ""}
          InputLabelProps={{ shrink: false }}
          sx={{
            borderRadius: "14px",
            width: { xs: "50%", md: "15%" },
            mt: 2,
            bgcolor: "#FFFFFF",
            color: "green",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            ".MuiInputLabel-root": {
              color: "green",
            },
          }}
        >
          {providers.map((item: any, index) => (
            <MenuItem key={index} value={item.name} sx={{ color: "green" }}>
              {item.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          name="cheatSheet"
          value={cheatSheet}
          onChange={(e) => setCheatSheet(e.target.value)}
          SelectProps={{
            IconComponent: KeyboardArrowDownIcon,
          }}
          label={cheatSheet === "" ? "-Pilih Cheat-" : ""}
          InputLabelProps={{ shrink: false }}
          sx={{
            borderRadius: "14px",
            width: { xs: "50%", md: "15%" },
            mt: 2,
            bgcolor: "#FFFFFF",
            color: "green",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            ".MuiInputLabel-root": {
              color: "green",
            },
          }}
        >
          {menuItems.map((item: any, index) => (
            <MenuItem key={index} value={item} sx={{ color: "green" }}>
              {item}
            </MenuItem>
          ))}
        </TextField>

        <Button
          variant="contained"
          sx={{
            bgcolor: "#A1A3A4",
            textTransform: "none",
            color: "black",
            mt: 2,
            fontSize: "20px",
            borderRadius: "14px",
            p: "8px 70px",
            "&:hover": {
              bgcolor: "#A1A3A4",
            },
          }}
          onClick={connectToServer}
          disabled={processing}
        >
          Activate
        </Button>
        {processing && (
          <Box
            sx={{
              mt: 5,
              width: { xs: "90%", md: "35%" },
              backgroundColor: "#292929",
              color: "white",
            }}
          >
            <Box
              sx={{
                bgcolor: "#4B4B4B",
                width: "100%",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
              }}
            >
              {/* <Box
                sx={{
                  bgcolor: "#202124",
                  width: { xs: "60%", md: "50%" },
                  pl: 1,
                }}
              > */}
                {/* <Typography sx={{ fontSize: "11px" }}>
                  Connecting B88 Server... Connected
                </Typography>
                <Typography sx={{ fontSize: "11px" }}>
                  Connecting to {`${provider}`} Server... Connected
                </Typography> */}
                {/* <TypeAnimation
                sequence={[
                  `Connecting B88 Server... <span style="color: green">Connected</span><br/>Connecting to ${provider} Server... <span style="color: green">Connected</span>`
                ]}
                wrapper='span'
              speed={10}
              style={{
                whiteSpace: 'pre-line',
                fontSize: '11px',
                color: 'white',
              }}
              cursor={false}
              
              setServerStatus={setServerStatus}/> */}
              <Box sx={{
                textAlign:"center"
              }}>
               <Typography sx={{ fontSize: "14px" }}>
                 {serverStatus ? "SUCCESS!" : "Scanning"}
                </Typography>
                </Box> 


              {/* </Box> */}
            </Box>
            <Box
              sx={{
                borderLeft: "1px solid white",
                boxShadow: "inset 0px 0px 10px 5px rgba(0, 0, 0, 0.2)",
                pb: 1,
                pl:1
              }}
            >
         
          <TypeAnimation
          sequence={[
           `Connecting B88 Server... <span style="color: green">Connected</span><br/>Connecting to ${provider} Server... <span style="color: green">Connected</span><br/>Connecting to global server... <span style="color: green">Connected</span><br/>Performing User Authentication... <span style="color: green">Done</span> <br/>Encrypting server: 256bit_Packet_Encryption... <span style="color: green">Done</span><br/>Retrieving current server script: read_source_server_source... <span style="color: green">Done</span><br/>Connect to database... <span style="color: green">Done</span><br/>${attemptSequence}Sending Requested WINRATE to Your Account... <span style="color: green">Done</span><br/>Sending Requested JACKPOT and WINRATE to Your Account... <span style="color: green">Done</span><br/>Changing packets in the database... <span style="color: green">Done</span><br/>Connecting to All slots Server... <span style="color: green">Done</span><br/>Connecting to All slots database... <span style="color: green">Done</span><br/>Generate WINRATE and JACKPOT... <span style="color: green">Done</span><br/><span style="color: green">Process was completed successfully.</span><br/>`,
         ]}
         wrapper='span'
         speed={10}
         style={{
           whiteSpace: 'pre-line',
           fontSize: '11px',
           color: '#368DE0',
         }}
         cursor={false}
         setStatus={setStatus}
         setServerStatus={setServerStatus}
         />
     
             
            </Box>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default ProviderScan;
