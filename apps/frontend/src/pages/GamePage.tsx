import '../App.css';
import { Board} from "../components/Board";
import { Popup } from '@repo/ui/Popup';
import { useRecoilState } from "recoil";
import { colorState } from "../atoms/atom";

export const GamePage = () => {
    const [color, _setColor] = useRecoilState(colorState);
    
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            {color !== 'black' && <Popup color={color} />}
            <Board/>
        </div>
    );
};
