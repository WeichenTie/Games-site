import Avatar from '../components/avatar/Avatar';
import ChatBox from '../components/communication/ChatBox';
import './TicTacToe.css'
const TicTacToe = () => {
    return (
        <div className="tic-tac-toe">
            <div className="game-area">
                <div className="board">

                </div>
                <div className="players">
                    <Avatar
                        size={96}
                        colourIndex={0}
                        mouthIndex={2}
                        eyeIndex={1}/>
                    <Avatar
                        size={96}
                        colourIndex={5}
                        mouthIndex={4}
                        eyeIndex={12}/>
                </div>
            </div>
            <div className="spectator-chat">
                <ChatBox/>
            </div>
        </div>
    );
}
 
export default TicTacToe;