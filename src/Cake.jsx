import React from 'react';

function Cake(props) {
    console.log(props.renderCake)
    if(!props.renderCake){
        return null
    }

    return(
        <img className="cupcake" src="./images/cupcake.png" alt="" height="50px"/>
    )
}

export default Cake;