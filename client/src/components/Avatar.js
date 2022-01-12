import './Avatar.css';



const Avatar = ({size=96, colourIndex=0, mouthIndex=0, eyeIndex=0}) => {
    function getX(index, columns) {
        return -(index % columns) * size;
    }
    function getY(index, columns) {
        return -Math.floor(index / columns) * size;
    }
    return (
        <div className="avatar-display">
            <div 
                className="avatar-part"
                id='avatar-colour'
                style={{
                    backgroundPosition:`${getX(colourIndex, 10)}px ${getY(colourIndex,10)}px`,
                    backgroundSize:`${size*10}px`,
                    width:`${size}px`,
                    height:`${size}px`
                }}
            />
            <div 
                className="avatar-part"
                id='avatar-mouth' 
                style={{
                    backgroundPosition:`${getX(mouthIndex, 10)}px ${getY(mouthIndex,10)}px`,
                    backgroundSize:`${size*10}px`,
                    width:`${size}px`,
                    height:`${size}px`
                }}
            />
            <div 
                className="avatar-part"
                id='avatar-eyes'
                style={{
                    backgroundPosition:`${getX(eyeIndex, 10)}px ${getY(eyeIndex,10)}px`,
                    backgroundSize:`${size*10}px`,
                    width:`${size}px`,
                    height:`${size}px`
                }}
            />
        </div>
    );
}
 
export default Avatar;