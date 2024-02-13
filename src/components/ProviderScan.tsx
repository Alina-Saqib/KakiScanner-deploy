import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Layout from "../PageLayout/Layout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useEffect, useState } from "react";
// import { getAllProviders } from "../api_calls/Games/getAllProviders";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import data from '../utility/providerData.json';

const ProviderScan = () => {
  // const menuItems = [
  //   "Pilih Cheater",
  //   "Cheat Auto Scatter",
  //   "Auto Sensational",
  //   "Auto wild",
  // ];

  const [processing, setProcessing] = useState(false);
  const [serverMessages, setServerMessages] = useState([]);
  const [providers, setProviders] = useState([]);
  const [providerId , setProviderId]=useState()
    const navigate = useNavigate()

  const getProviders = async ()=>{

    setProviders(data?.providers as any)

    // const response = await getAllProviders();

    // if(response?.status === 200){
    //   setProviders(response.data)
    // }
    // else{
    //   console.log("could not fetch Providers") ;
      
    // }
  }
  useEffect(()=>{
    getProviders()
     
  },[])

  const handleSelectChange = (e: any) =>{
    e.preventDefault();
    setProvider(e.target.value);
    const selectedProvider: any = providers.find((oneprovider: any) => oneprovider.name === e.target.value);
    console.log(selectedProvider)
    setProviderId(selectedProvider?.id)

  }

  const connectToServer = async () => {
   
    const messages: any = [];

    if(!providerId){
      toast.error("select a Provider")
      return
    }


    setProcessing(true);
    await simulateProcessing("Connecting to global server", messages); 

    await simulateProcessing("Performing User Authentication", messages); 

    await simulateProcessing(
      "Encrypting server: 256bit_Packet_Encryption",
      messages
    );

    await simulateProcessing(
      "Retrieving current server script: read_source_server_source",
      messages
    );

    await simulateProcessing("Connect to database", messages);

    await simulateProcessing(
      "Attempt (1)  to bypass the security System",
      messages
    );

    await simulateProcessing(
      "Attempt (2)  to bypass the security System",
      messages
    );

    await simulateProcessing(
      "Sending Requested WINRATE to Your Account",
      messages
    );

    await simulateProcessing(
      "Sending Requested JACKPOT and WINRATE to Your Account",
      messages
    );

    await simulateProcessing("Changing packets in the database", messages);

    await simulateProcessing("Connecting to All slots Server", messages);

    await simulateProcessing("Connecting to All slots database", messages);

    await simulateProcessing("Generate WINRATE and JACKPOT", messages);

    await simulateProcessing("Process was completed successfully", messages);

    setServerMessages(messages);
    setProcessing(false);
    navigate(`/success-cheat/${providerId}`)
  };

  const simulateProcessing = async (message: any, messages: any) => {
    messages.push(message);
    setServerMessages([...messages] as any);
    await new Promise((resolve) => setTimeout(resolve, 2000)); 
  };
  const [provider, setProvider] = useState("");
  return (
    <Layout>
      <Box
        sx={{
          pt: 6,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height:'100vh'
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
          }}
        >
          {providers.map((item: any) => (
            <MenuItem key={item.id} value={item.name} sx={{ color: "green" }}>
              {item.name}
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
              <Box
                sx={{
                  bgcolor: "#202124",
                  width: {xs:"50%",md:"40%"},
                  pl: 1,
                }}
              >
                <Typography sx={{ fontSize: "12px" }}>
                  Connecting BBB Server
                </Typography>
                <Typography sx={{ fontSize: "12px" }}>
                  Connecting {`${provider}`} Server
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                borderLeft: "1px solid white",
                boxShadow:"inset 0px 0px 10px 5px rgba(0, 0, 0, 0.2)",
                pb:3
              }}
            >
              {serverMessages.map((message, index) => (
                <Typography
                  key={index}
                  sx={{
                    fontSize: "10px",
                    pl: 1,
                    color:
                      index === serverMessages.length - 1
                        ? "#1B5D12"
                        : "#368DE0",
                  }}
                  variant="body1"
                >
                  {"> "}
                  {message}...
                  {!(index === serverMessages.length - 1) && (
                    <span style={{ color: index === 5 ? "red" : "#1B5D12" }}>
                      {index === 0
                        ? "Connected"
                        : index === 5
                        ? "Buffering"
                        : "Done"}
                    </span>
                  )}
                </Typography>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default ProviderScan;
