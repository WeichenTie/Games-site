import './Avatar.css';


const Avatar = (props) => {
    return (
        <div className="avatar-display">
            <div className="avatar-part" id='avatar-colour'></div>
            <div className="avatar-part" id='avatar-mouth'></div>
            <div className="avatar-part" id='avatar-eyes'></div>
        </div>
    );
}
 
export default Avatar;