import React from 'react';

function Pet(props){
    return (<img className="pet" src="./images/Mimitchi_anime.PNG.webp" alt="" 
    height="90px" style={{left: props.left}}/>  )
}

export default Pet;