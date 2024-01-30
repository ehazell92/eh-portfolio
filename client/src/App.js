
import React from 'react';
import './App.css';
import Navbar from './shared/nav-bar/nav-bar';
import Body from './components/body/body';
import SnackBars from './shared/snack-bar/snack-bar';
import background from "./shared/assets/bg.jpg"


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
        // || this.state.curView !== 'campsite'
      )
    });
  };
  setCurrentView = (cView) => {
    this.setState({ curView: cView });
    // if (cView === 'campsite') {
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
          backgroundImage: `url(${background})`,
          backgroundSize: '100% 100%',
          overflow: 'hidden'
        }}
      >
        <Navbar
          setCurrentView={this.setCurrentView}
          notAtCampFire={this.state.cfVar} />
        <Body
          notAtCampFire={this.state.cfVar} />
        <SnackBars />
      </div>
    );
  }
}

export default App;
