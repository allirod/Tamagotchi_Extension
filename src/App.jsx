/*global chrome*/
import React from 'react';

import Cake from './Cake.jsx';
import Pet from './Pet.jsx';
import Coin from './Coin.jsx'

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = { feedCount: 0, 
      money: 50, 
      cakeSlice: false, 
      petLeft: 105,
      coin: {
        coinCounter: 0,
        coinInterval: 'hold',
        locationInterval: 'hold',
        coinObject: {},
        coinObjectY: {},
        coinObjectX: {}
      }
    }
    this.handleFeedClick = this.handleFeedClick.bind(this);
    this.handleGameClick = this.handleGameClick.bind(this);
    this.randomCoinGenerate = this.randomCoinGenerate.bind(this);
    this.updateCoinLocation = this.updateCoinLocation.bind(this);
  }
  componentDidMount () {
    // get feedCount amd money from storage
    chrome.storage.sync.get(['feedCount','money'], result => {
      if(result.feedCount) this.setState({ feedCount: result.feedCount });
      if(result.money) this.setState({ money: result.money });
    })
    // Change tamagotchi location
    window.addEventListener('keydown', e => {
      if(e.code === 'ArrowRight' && this.state.petLeft < 155){
        this.setState({petLeft: this.state.petLeft + 50});
      }else if(e.code === 'ArrowLeft' && this.state.petLeft > 55){
        this.setState({petLeft: this.state.petLeft - 50});
      }
    })
  }

  setStorage() {
    console.log('entered', this.state.feedCount);
		chrome.storage.sync.set({ 'feedCount': this.state.feedCount }, () => console.log('yes it set'))
  }

  // getStorage() {
  //   chrome.storage.sync.get('feedCount', result => this.setState({feedCount: result.feedCount + 1}, this.setStorage));
  // }

  handleFeedClick() {
    if(this.state.money <= 0) {
      this.setState({ money: 0 })
      return;
    }
    this.setState({ feedCount: this.state.feedCount + 1, money: this.state.money - 10 }, this.setStorage);
    this.setState({ cakeSlice: true },
      () => setTimeout(() => this.setState({cakeSlice: false}), 1000));
  }

  // Method for random coin generation within handleGameClick
  randomCoinGenerate(){
    const coinX = Math.round(Math.random() * 2);
    const coinId = 'coin_' + this.state.coin.coinCounter;
  
    const copyCoinObj = {...this.state.coin};//JSON.parse(JSON.stringify(this.state.coin));
    console.log(JSON.parse(JSON.stringify(this.state.coin)));
    copyCoinObj.coinObjectY[coinId] = 100;
    copyCoinObj.coinObjectX[coinId] = 70 + (coinX * 65);

    copyCoinObj.coinCounter = this.state.coin.coinCounter + 1;

    this.setState({coin: copyCoinObj}, async () => {
      const innerCopy = {...this.state.coin};//JSON.parse(JSON.stringify(this.state.coin));
      const coinElement = <Coin key={coinId} idHTML={coinId} xLoc={this.state.coin.coinObjectX[coinId]} yLoc={this.state.coin.coinObjectY[coinId]}/>
      innerCopy.coinObject[coinId] = coinElement;
      this.setState({coin: innerCopy}, this.updateCoinLocation)
    });
  }

  updateCoinLocation() {
    Object.keys(this.state.coin.coinObject).forEach(el => {
      console.log('entered')
      const coinCopy = {...this.state.coin};//JSON.parse(JSON.stringify(this.state.coin));
      coinCopy.coinObjectY[el] = coinCopy.coinObjectY[el] + 25;
      console.log(coinCopy.coinObject[el])
      this.setState({coin: coinCopy}, () => console.log(this.state.coin));
    }
    )
  }

  handleGameClick(){
    // At game begin setInterval, save id to remove on game end
    const coinInterval = setInterval(() => {
      this.randomCoinGenerate();
    }, 5000);
    //const locationInterval = setInterval(() => this.updateCoinLocation(this.state.coin.coinObject), 1000);
    this.setState({coinInterval});
  }


  render() {
    return (
      <div className="device-border"> 
        <div className="inner-device-border">
          Codesmith
          <div className ="screen">
            {Object.values(this.state.coin.coinObject)}
           <div className="feedCount">You Feed Me: {this.state.feedCount} times</div>
           <div className="moneyLeft">Money Left: $ {this.state.money} </div>
            <Cake renderCake={this.state.cakeSlice}/>
            <Pet left={this.state.petLeft + 'px'}/>        
          </div>
        </div>
        <button className="feedBtn" onClick={this.handleFeedClick}>
          Feed Me!
        </button>
        <button className='playBtn' onClick={this.handleGameClick}>
          Play Game!
        </button>
      </div>
    );
  }
}

export default App;
