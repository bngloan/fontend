import React,{useState} from 'react'
import Login from './components/Login'
import Header from './components/Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';


function App() {
 

  const [token] = useState(localStorage.getItem("awesomeLeadsToken"))
  const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: 'Sarabun',

      },
    },
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
      {!token ? (<Login/>):(<Header/>)}
      </ThemeProvider>
    </div>
  )
}

export default App