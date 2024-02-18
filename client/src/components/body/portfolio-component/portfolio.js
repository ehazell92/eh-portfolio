
import React from 'react';
import { BodyPart } from '../bodyEls';
import { portfolioOptions } from '../../../shared/constants';
import Tooltip from '@mui/material/Tooltip';
import CloseIcon from '@mui/icons-material/Close'
import './portfolio.css';
import { IconButton } from '@mui/material';
import { triggerSnackBar } from '../../../services/app-service';

let isAppFS = false;

class Portfolio extends React.Component {
  handleAppLoad = (isOpen, id, cmp) => {
    if (isOpen && isAppFS) {
      return;
    }
    const bdy = document.getElementById('theBody');
    const ele = document.getElementById(id);
    const cmpExists = this.getLocalComponent(cmp);
    if (bdy && ele) {
      if (isOpen) {
        if (cmpExists) {
          if (!isAppFS) {
            bdy.classList.add('noOverflow');
            isAppFS = true;
            ele.classList.add('appFS');
            ele.classList.remove('appOption');
            this.forceUpdate();
          } else {
            return;
          }
        } else {
          triggerSnackBar(
            {
              vert: 'top',
              hor: 'center',
              type: 'error',
              msg: `Sorry, these are just placeholders for now. Check back later!`,
            }
          );
          return;
        }
      } else {
        setTimeout(() => {
          bdy.classList.remove('noOverflow');
          isAppFS = false;
          ele.classList.remove('appFS');
          ele.classList.add('appOption');
          this.forceUpdate();
        }, 100);
      }
    }
  }
  appIsFS = (compId) => {
    const docEl = document.getElementById(compId);
    if (docEl) {
      return docEl.classList.contains('appFS');
    } else {
      return false;
    }
  }
  getLocalComponent(cmp) {
    return cmp || null;
  }

  componentDidMount() { }
  componentDidUpdate() { }
  render() {
    const { notAtCampFire } = this.props;
    return (
      <BodyPart
        id='portfolio'
        className={`
          portfolio-animate
          ${notAtCampFire ? '' : 'fs '}
        `}
      >
        <div
          id='portfolio'
          className='port'
        >
          {
            portfolioOptions.map(
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
                      onClick={() => this.handleAppLoad(true, cfOpt.id, cfOpt.cmp)}
                      key={cfOpt.name}
                      id={cfOpt.id}
                      style={{
                        backgroundSize: !this.appIsFS(cfOpt.id) ? 'contain' : '',
                        backgroundImage: !this.appIsFS(cfOpt.id) ? `url(${cfOpt.bgImg})` : ''
                      }}
                    >
                      <div className='title'>{cfOpt.name}</div>
                      <div
                        className='app'
                        id={`app-${cfOpt.id}`}
                      >
                        {
                          this.appIsFS(cfOpt.id) &&
                          <>
                            <div className='menuBar'>
                              <IconButton
                                onClick={() => this.handleAppLoad(false, cfOpt.id, cfOpt.cmp)}
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
                                this.getLocalComponent(cfOpt.cmp)
                            }
                          </>
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

export default Portfolio;