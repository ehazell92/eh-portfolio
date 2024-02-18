
import React from 'react';
import './App.css';
import Navbar from './shared/nav-bar/nav-bar';
import Body from './components/body/body';
import SnackBars from './shared/snack-bar/snack-bar';
import bg from "./shared/assets/bg.webp";
import bg2 from "./shared/assets/bg2.webp";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cfVar: false,
      curView: '',
    };
  }

  setCampFireClasses = (onOff) => {
    this.setState({
      cfVar: (
        onOff 
        // || this.state.curView !== 'portfolio'
      )
    });
  };
  setCurrentView = (cView) => {
    this.setState({ curView: cView });
    // if (cView === 'portfolio') {
    //   this.setCampFireClasses(true);
    // }
  };
  componentDidMount() {
    this.setCampFireClasses(true);
    // eslint-disable-next-line no-restricted-globals        
    // addEventListener("mousemove",
    //   (event) => {
    //     this.setCampFireClasses(event.screenY < 180);
    //   }
    // );
  };
  render() {
    return (
      <div
        style={{
          height: '100vh',
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          overflow: 'hidden'
        }}
      >
        <div className='setFocus'></div>
        <Navbar
          setCurrentView={this.setCurrentView}
          notAtCampFire={this.state.cfVar} 
        />
        <Body
          notAtCampFire={this.state.cfVar} 
        />
        <SnackBars />
      </div>
    );
  }
}

export default App;
