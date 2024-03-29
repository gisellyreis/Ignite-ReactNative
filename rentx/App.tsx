import { Home } from "./src/screens/Home";
import { useFonts, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter'
import { Archivo_400Regular, Archivo_500Medium, Archivo_600SemiBold } from '@expo-google-fonts/archivo'
import AppLoading from "expo-app-loading";
import { ThemeProvider } from "styled-components";
import theme from "./src/styles/theme";
import { CarDetails } from "./src/screens/CarDetails";
import { Scheduling } from "./src/screens/Scheduling";
import { SchedulingDetails } from "./src/screens/SchedulingDetails";
import { Confirmation } from "./src/screens/Confirmation";
import { MyCars } from "./src/screens/MyCars";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular, Inter_500Medium,
    Archivo_400Regular, Archivo_500Medium, Archivo_600SemiBold
  })

  if(!fontsLoaded){
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme} >
     {/* <Home /> */}
     <MyCars />
    </ThemeProvider>
  )   
}