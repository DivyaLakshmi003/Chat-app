import React from 'react';
import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({users})=>{
    return(
    <div className="textContainer">
        <div className="firstchild">
            <h1>Realtime Chat Application <span role="img" aria-label="emoji">💬</span></h1>
        </div>
            <div>
                <h2>Created with React, Express, Node and Socket.IO <span role="img" aria-label="emoji">❤️</span></h2>
                <h2>Try it out right now! <span role="img" aria-label="emoji">⬅️</span></h2>
        </div>
        {
            users
            ? (
                <div>
                    <h1 className="firstchild">People Currently Chatting:</h1>
                    <div className="activeContainer">
                        <h2>
                            {users.map(({name})=> (
                                <div key={name} className="activeItem">
                                    <img src={onlineIcon} alt="Online Icon" />
                                    {name}
                                </div>
                            ))}
                        </h2>
                    </div>
                </div>
            )
            : null
    }              
    </div>

    )
}

export default TextContainer;