import {
  Box,
  Button,
  InputLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import logo from '../assets/logo.png'
import whatsappIcon from '../assets/whatsappIcon.png';
import telegramIcon from '../assets/telegramIcon.png';
import { useState } from "react";
import Layout from "../PageLayout/Layout";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
 console.log('login')
  const [username , setUsername] = useState("");
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = () =>{

    if(username === 'test' && password === '1234'){
      navigate('/scan-games')
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
        p:"25px 52px"
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

      <Typography
      variant="body1"
      sx={{
        color:"white",
        letterSpacing:"1px",
        mt:2
      }}>Contact Admin</Typography>

      <Box 
      sx={{
        mt:2
      }}>
      <Link>
      <img src={whatsappIcon} width="80px"/>
      </Link>
      <Link>
      <img src={telegramIcon} width="74px" style={{marginLeft:"42px"}}/>
      </Link>

      </Box>

      </Box>
      </Layout>
  );
};

export default Login;
