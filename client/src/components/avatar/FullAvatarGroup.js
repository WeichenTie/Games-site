import Avatar from "./Avatar";
import './FullAvatarGroup.css'

const FullAvatarGroup = (props) => {
    const group = props.players
        .map(player => 
            <div className="avatar-name-pair" key={Date.now() * Math.random()}>
                <Avatar
                    size={60}
                    colourIndex={player.colourIndex}
                    mouthIndex={player.mouthIndex}
                    eyeIndex={player.eyeIndex}/>
                <div className="avatar-group-name">{player.name}</div>
            </div>)

    return ( 
        <div className="full-avatar-group">
            {group}
        </div>
     );
}
 
export default FullAvatarGroup;