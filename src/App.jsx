/*global chrome*/

import React from 'react';

import Cake from './Cake.jsx';
import Pet from './Pet.jsx';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = { feedCount: 0, cakeSlice: false,
    petLeft: 105 }
    this.handleFeedClick = this.handleFeedClick.bind(this);
  }
  componentDidMount () {
    chrome.storage.sync.get('feedCount', result => {
      if(result.feedCount) {
        this.setState({ feedCount: result.feedCount })
      }
    })

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
    this.setState({ feedCount: this.state.feedCount + 1 }, this.setStorage);
    this.setState({ cakeSlice: true },
      () => setTimeout(() => this.setState({cakeSlice: false}), 1000));
  }


  render() {
    return (
      <div className="device-border"> 
        <div className="inner-device-border">
          <div className ="screen">
            <Cake renderCake={this.state.cakeSlice} />
            <Pet left={this.state.petLeft + 'px'}/>        
            <button className="feedBtn" 
              onClick={this.handleFeedClick}>Feed Me!</button>
            <div className="feedCount">You Feed Me: {this.state.feedCount} times</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
