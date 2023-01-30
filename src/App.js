import { createContext,useState } from 'react';
import './App.css';
import ThemeButton from './components/theme-button';
import Homepage from './pages/homepage';




export const ThemeContext = createContext(null)

function App() {

  const [theme,setTheme] = useState(false);
  return (
    <ThemeContext.Provider
     value={{
      theme,setTheme,
     }}
    
    >
    <div className="App" style={theme ? {backgroundColor: "#feb300"}:{}}>
         <ThemeButton/>
         <Homepage/>  
    </div>
    </ThemeContext.Provider>
  );
}

export default App;
