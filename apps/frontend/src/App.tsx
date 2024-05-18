import './App.css';
import './index.css';
import { Landing } from "./pages/Landing"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import { GamePage } from './pages/GamePage';

export function App() {
  return (
      <div style={{
        backgroundImage: "url('back.jpg')",
        position: 'sticky',
        top: '0px'
      }}>
    <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Landing/>}/>
            <Route path='/game' element={<GamePage/>}/>
          </Routes>
        </BrowserRouter>
    </RecoilRoot>
      </div>
  )
}

