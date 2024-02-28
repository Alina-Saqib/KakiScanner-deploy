import {
  Box,
  Button,
  InputLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import logo from '../assets/logo.png'
import whatsappIcon from '../assets/WhatsApp_icon.png';
import telegramIcon from '../assets/telegramIcon.png';
import { useState } from "react";
import Layout from "../PageLayout/Layout";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import kiss from "../assets/918kiss.png";
import playtech from "../assets/11-playtech-white.png";
import pragmaticPlay from "../assets/12 pragmatic play.png";
import pussy from "../assets/3 Pussy888.png";
import mega from "../assets/mega888_logo.png";

const Login = ({handleIsLogin}: any) => {
 
  const [username , setUsername] = useState("");
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = () =>{

    if(username === 'test' && password === '1234'){
      localStorage.setItem('isLogin','true')
      handleIsLogin();
      navigate('/')
      
      toast.success("Login successful")
     
      
    }else{
      toast.error("Invalid username or password")
    }
  }
  return (
   <Layout>

      <Box
      sx={{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        p:"25px 52px",
        maxHeight: "150vh",
        height: { xs: "100vh", md: "115vh" },
      }}>
        <img 

        src={logo}/>
      <Typography
        variant="h4"
        sx={{
          color: "white",
          fontWeight: "bold",
          textAlign:"center",
          mt:1
        }}
      >
        Login
      </Typography>
      <Typography
        sx={{
          color: "#c7c8c7",
          textAlign:"center",
          mt:1,
          width: {xs:'100%', md:"28%" ,lg:"25%"}
        }}
      >
        Belum ada ID? daftar di website yang kami hack.{" "}
        <Link
          sx={{
            color: "#c7c8c7",
            textDecoration: '2px solid underline'
          }}
        >
          Daftar Sini
        </Link>
      </Typography>

      <form
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <InputLabel sx={{ color: "#c7c8c7" , fontSize:"10px", m:"16px 4px", letterSpacing:"2px"}}>USERNAME</InputLabel>
        <TextField
          required
          onChange={(e: any)=>setUsername(e.target.value)}
          size="medium"
          type="username"
          name="username"
          value={username}
          sx={{
            border:"none",
            bgcolor: "#a1a2a2",
            borderRadius:"16px",
            opacity:0.5,
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
          }}
        />
        <InputLabel sx={{ color: "#c7c8c7" , fontSize:"10px", m:"10px 4px 12px 4px", letterSpacing:"2px"}}>PASSWORD</InputLabel>
        <TextField
         onChange={(e: any)=>setPassword(e.target.value)}
        required
        size="medium"
         type="password"
         name="password"
         value={password}
          sx={{
            bgcolor: "#a1a2a2",
            border:"none",
            borderRadius:"16px",
            opacity:0.5,
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
          }}
        />
        <Box
        sx={{
          mt:2
        }}>
          <Button
            variant="outlined"
            sx={{
              border:"2px solid white",
              color: "white",
              borderRadius:"12px",
              textTransform:"none",
              p:'8px 25px',
              '&:hover': {
                border:"2px solid white",
              },
            }}
          >
            Daftar
          </Button>
          <Button
            variant="contained"
            onClick={handleLogin}
            sx={{
              color: "white",
              bgcolor: "#02140a",
              borderRadius:"12px",
              textTransform:"none",
              p:'12px 25px',
              ml:2,
              '&:hover': {
                backgroundColor: "#02140a",
              },
            }}
          >
            Log Masuk
          </Button>
        </Box>
      </form>

      <Box sx={{width:{md:'40%'},mt:2, display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}} gap="12px">
        <Box display="flex" gap="10px" sx={{alignContent:"center",textAlign:"center"}}>
        <img src={mega} width="150px"/>
        <img src={kiss} width="80px"/>
        <img src={pussy} width="80px"/>
        </Box>
        <Box display="flex" gap="16px" sx={{alignContent:"center",textAlign:"center"}}>
        <img src={playtech} width="150px"/>
        <img src={pragmaticPlay} width="80px"/>
        </Box>
      </Box>

      <Typography
      variant="body1"
      sx={{
        color:"white",
        letterSpacing:"1px",
        mt:2
      }}>Join Community</Typography>

      <Box 
      sx={{
        
        textAlign:"center",
        width:{md:"17%",xs:"70%"},
        display:"flex",
        justifyContent:"space-between"
       
      }}>
      <Link>
      <img src={whatsappIcon} width="80px"/>
      </Link>
      <Link>
      <img src={telegramIcon} width="72px" style={{marginLeft:"15px"}}/>
      </Link>

      </Box>

      </Box>
      </Layout>
  );
};

export default Login;
