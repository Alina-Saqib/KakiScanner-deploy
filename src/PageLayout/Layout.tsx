import { Box, useMediaQuery } from "@mui/material"
import bgImage from '../assets/kaki-scanner-bg-360x780.jpg';
import bgImage2 from '../assets/kaki-scanner-bg-1440x1080.jpg';

const Layout = ({children}: any) => {

  const smallScreen = useMediaQuery('(max-width: 360px) and (max-height: 780px)');

  return (
    <Box
    sx={{
      position: "relative",
      height: "100%",
      overflow: "hidden",
    }}
  >
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: `url(${smallScreen ? bgImage : bgImage2})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "50% 80%",
        filter: "blur(1.5px)",
        zIndex: -1,
      }}
    />
    {children}
  </Box>
  )
}

export default Layout
