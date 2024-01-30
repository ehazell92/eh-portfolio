
import React from 'react';
import { BodyPart } from '../bodyEls';
import { campFireOptions } from '../../../shared/constants';
import Tooltip from '@mui/material/Tooltip';
import CloseIcon from '@mui/icons-material/Close'
import './camp-site.css';
import { IconButton } from '@mui/material';

let isAppFS = false;

class CampFire extends React.Component {
  handleAppSelection(app) {
    if (!isAppFS) {
      const ele = document.getElementById(app.id);
      if (ele) {
        ele.classList.remove('appOption');
        ele.classList.add('appFS');
        document.getElementById('theBody').classList.add('noOverflow');
        isAppFS = true;
      }
    }
  };
  handleCloseApp(eleId) {
    setTimeout(() => {
      const ele = document.getElementById(eleId);
      if (ele) {
        ele.classList.remove('appFS');
        ele.classList.add('appOption');
        document.getElementById('theBody').classList.remove('noOverflow');
        isAppFS = false;
      }
    }, 100);
  }
  getLocalComponent(compId) {
    return <div>This is a test! {compId}</div>
  }
  componentDidMount() {}
  componentDidUpdate() {}
  render() {
    const { notAtCampFire } = this.props;
    return (
      <BodyPart
        id='campsite'
        className={`
          campSite-animate
          ${notAtCampFire ? '' : 'fs '}
        `}
      >
        <div
          id='portfolio'
          className='port'
        >
          {
            campFireOptions.map(
              (cfOpt, i) =>
              <div
                className='appHldr'
                key={`hldr-${cfOpt.name}-${i}`}
              >
                <Tooltip 
                  key={`${cfOpt.name}-TT`} 
                  title={cfOpt.label}
                >
                  <div
                    className='appOption'
                    onClick={() => this.handleAppSelection(cfOpt)}
                    key={cfOpt.name}
                    id={cfOpt.id}
                  >
                    <div className='title'>{cfOpt.name}</div>
                    <div
                      className='app'
                    >
                      <div className='menuBar'>
                        <IconButton 
                          onClick={() => this.handleCloseApp(cfOpt.id)} 
                          aria-label="Close App" 
                          color="error"
                        >
                          <CloseIcon />
                        </IconButton>
                      </div>
                      {
                        cfOpt.external ? 
                        <iframe 
                          src={cfOpt.external} 
                          title={cfOpt.title}
                          style={{
                            "border": "0px"
                          }}
                        ></iframe> : 
                        this.getLocalComponent(cfOpt.id)
                      }
                    </div>
                  </div>
                </Tooltip>
              </div>
            )
          }
        </div>
      </BodyPart>
    )
  }
};

export default CampFire;