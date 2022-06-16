import React from 'react';

function Coin(props){

    return(
        <div className="coin" id={props.idHTML} style={{left: props.xLoc + 'px', top: props.yLoc + 'px'}}>
            <img src="./images/coin.png" alt="" height='25px'/>
        </div>
    )
            

}

export default Coin;