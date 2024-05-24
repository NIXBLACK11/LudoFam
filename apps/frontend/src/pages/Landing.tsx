import '../App.css';

import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { codeState, socketState, colorState } from '../atoms/atom';
import { useEffect, useRef } from 'react';
import { initGame } from '../backendCalls/initGame';

export const Landing = () => {
    const [code, setCode] = useRecoilState(codeState);
    const [socket, _setSocket] = useRecoilState(socketState);
    const [_color, setColor] = useRecoilState(colorState);

    const navigate = useNavigate();
    const clickRef = useRef(new Audio('click.wav'));
    const typeRef = useRef(new Audio('type.wav'));

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCode(event.target.value);
    };
    
    useEffect(() => {
        if (!socket) return;
        console.log(socket);
        const handleMessage = (event: { data: { toString: () => string; }; }) => {
            try {
                const message = JSON.parse(event.data.toString());
                console.log('Message from server:', message);
              
                if (message.type === "init_game") {
                  setColor(message.payload.color);
                  navigate('/game');
                }
              } catch (error) {
                console.error('Error parsing JSON:', error);
              }
        };

        socket.onmessage = handleMessage;
    }, [socket, setColor, navigate]);

    return (
        <div className='flex flex-col pb-10'>
            <div className='flex flex-row justify-center'>
                <div className='text-center'>
                    <img className='w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto' src='icon.png' alt='Icon'/>
                    <h1 className='font-custom font-color text-5xl' >Welcome to Ludo Fam</h1>
                </div>
            </div>
            <div className='flex flex-row justify-center mt-16'>
                <p className='font-custom font-color text-3xl mr-20'>Generate a code: </p>
                <input 
                    className='bg-black font-custom font-color text-3xl border-2 rounded'
                    onChange={(e)=>{
                        typeRef.current.play();
                        handleChange(e);
                    }}
                />
            </div>
            <div className='flex flex-row justify-center mt-16'>
                <p className='font-custom font-color text-3xl mr-20'>Enter the code: </p>
                <input 
                    className='bg-black font-custom font-color text-3xl border-2 rounded'
                    onChange={(e)=>{
                        typeRef.current.play();
                        handleChange(e);
                    }}
                />
            </div>
            <div className='flex flex-row justify-center mt-16'>
                <button 
                    type='button' 
                    className='font-custom font-color text-3xl p-4 focus:outline-none rounded-full border hover:bg-black'
                    onClick={()=>{
                        clickRef.current.play();
                        if(!socket) return;
                        initGame(socket, code);
                    }}
                >
                    Enter Game
                </button>
            </div>
        </div>
    );
}