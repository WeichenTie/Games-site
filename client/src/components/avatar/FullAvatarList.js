import Avatar from "./Avatar";
import './styles/FullAvatarList.css'

const FullAvatarList = (props) => {

    const group = props.players
        .map(player => 
            <div className="avatar-name-pair" key={Date.now() * Math.random()}>
                <Avatar
                    size={props.avatarSize}
                    colourIndex={player.colourIndex}
                    mouthIndex={player.mouthIndex}
                    eyeIndex={player.eyeIndex}/>
                <div className="avatar-name">{player.name}</div>
            </div>)

        for (let i = 0; i < 10; i++) {
            group.push(
                <div className="avatar-name-pair" key={Date.now() * Math.random()}>
                    <Avatar
                        size={props.avatarSize}
                        colourIndex={0}
                        mouthIndex={0}
                        eyeIndex={0}/>
                    <div className="avatar-name">EMPTY</div>
                </div>)
        }

        //console.log(group.type)
    return ( 
        <div className="full-avatar-list">
            {group}
        </div>
     );
}
 
export default FullAvatarList;