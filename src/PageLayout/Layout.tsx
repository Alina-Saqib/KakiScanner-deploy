import { Box } from "@mui/material"
import bgImage from '../assets/bgImage.png';

const Layout = ({children}: any) => {
  return (
    <Box
    sx={{
    //   background: "linear-gradient(to bottom, #00020E, #011200, #00988B)",
    //   backgroundBlendMode: "overlay",
    background:`url(${bgImage})`,
    backgroundRepeat:"no-repeat",
    backgroundSize:"cover",
    backgroundPosition:"50% 80%",
    height:"100%",
    //   p:'25px 52px'
    }}
  >
    {children}
    </Box>
  )
}

export default Layout
