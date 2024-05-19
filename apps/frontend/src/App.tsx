import './App.css';
import './index.css';
import { Landing } from "./pages/Landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";
import { GamePage } from './pages/GamePage';
import { useRef, useState, useEffect } from 'react';
import { socketState } from './atoms/atom';

export function App() {
  const musicRef = useRef<HTMLAudioElement>(new Audio('back.mp4'));
  const [sound, setSound] = useState<boolean>(false);
  const [_socket, setSocket] = useRecoilState(socketState);

  useEffect(() => {
    if (sound) {
      musicRef.current.play();
    } else {
      musicRef.current.pause();
    }
  }, [sound]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000');
    ws.onopen = () => {
      console.log('Connected to WebSocket server');
      setSocket(ws);
    };
    ws.onclose = () => {
      console.log('WebSocket connection closed');
      setSocket(null);
    };
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [setSocket]);


  return (
    <div style={{
      backgroundImage: "url('back.jpg')",
      position: 'sticky',
      top: '0px'
    }}>
      <div className="fixed top-2 right-2 rounded-full">
        <button
          className="font-custom font-color text-3xl p-2 focus:outline-none rounded-full border hover:bg-black"
          onClick={() => setSound(!sound)}
        >
          {sound ? (<HiMiniSpeakerXMark className="text-4xl" />) : (<HiMiniSpeakerWave className="text-4xl" />)}
        </button>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/game' element={<GamePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
