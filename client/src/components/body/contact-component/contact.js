
import React from 'react';
import { BodyPane, BodyPart } from '../bodyEls';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { triggerSnackBar } from '../../../services/app-service';

import './contactElements.css';
import './contact-game.css';
import { backgroundScenes } from './contact-game-data.js';


const contactReasons = [
  {
    value: 'JI',
    label: 'Job Inquiry'
  },
  {
    value: 'PR',
    label: 'Project Request'
  },
  {
    value: 'BI',
    label: 'Business Inquiry'
  },
  {
    value: 'CO',
    label: 'Collaboration'
  },
];

const fields = [
  'firstName',
  'lastName',
  'email',
  'contactReason',
  'contactBlurb'
];

class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.clearState(true);
    this.gameData = {};

    this.errsToHandle = this.setErrs();

    this.svgViewBox = '0 0 0 0';

    this.userImgs = [
      require('./contact-assets/user/001.png'),
      require('./contact-assets/user/002.png'),
      require('./contact-assets/user/003.png'),
      require('./contact-assets/user/004.png')
    ];

    this.enemyImgs = {
      tall: {
        z: [
          require('./contact-assets/enemy/tall/001.png'),
          require('./contact-assets/enemy/tall/002.png'),
          require('./contact-assets/enemy/tall/003.png')
        ],
      },
      small: {
        z: [
          require('./contact-assets/enemy/small/0/001.png'),
          require('./contact-assets/enemy/small/0/002.png'),
          require('./contact-assets/enemy/small/0/003.png')
        ],
        o: [
          require('./contact-assets/enemy/small/1/001.png'),
          require('./contact-assets/enemy/small/1/002.png'),
          require('./contact-assets/enemy/small/1/003.png')
        ],
      },
    };
  }

  setFNameError = (hasError) => {
    this.setState({ fNameError: hasError });
  };

  setLNameError = (hasError) => {
    this.setState({ lNameError: hasError });
  };

  setEmailError = (hasError) => {
    this.setState({ emailError: hasError });
  };

  setContactRError = (hasError) => {
    this.setState({ contactRError: hasError });
  };

  setContactBError = (hasError) => {
    this.setState({ contactBError: hasError });
  };

  clearState = (init = false) => {
    if (!init) {
      fields.forEach((fld) => {
        const docEl = document.getElementById(fld);
        if (docEl) {
          if (fld === 'contactReason') {
            docEl.selectedIndex = -1;
          } else {
            docEl.value = '';
          }
        }
      });
    }
    return {
      fName: '',
      lName: '',
      email: '',
      contactReason: '',
      contactBlurb: '',
      fNameError: false,
      lNameError: false,
      emailError: false,
      contactRError: false,
      contactBError: false,
    };
  }
  setErrs = () => {
    return [
      {
        err: this.setFNameError,
        val: this.state.fName,
        hasError: false,
      },
      {
        err: this.setLNameError,
        val: this.state.lName,
        hasError: false,
      },
      {
        err: this.setEmailError,
        val: this.state.email,
        hasError: false,
      },
      {
        err: this.setContactRError,
        val: this.state.contactReason,
        hasError: false,
      },
      {
        err: this.setContactBError,
        val: this.state.contactBlurb,
        hasError: false,
      },
    ];
  };
  handleSubmission = async (event) => {
    let anyErrors = false;
    this.errsToHandle.forEach((errChk) => {
      const failure = (!errChk.val) || (errChk.val && errChk.val.length < 1);
      if (failure) {
        errChk.hasError = true;
        errChk.err(true);
        anyErrors = true;
      }
    });
    let snackBarMsg;
    if (anyErrors) {
      snackBarMsg = {
        type: 'error',
        msg: `Oops! Looks like some required details are missing.`,
      };
      triggerSnackBar(snackBarMsg);
    }
    if (!anyErrors) {
      snackBarMsg = await this.transmitMessage();
      this.clearState();
      triggerSnackBar(snackBarMsg);
    }
  };

  transmitMessage = async () => {
    const subjc = contactReasons.find(
      (cR) => cR.value === this.state.contactReason
    ).label || '(Missing Subject)';
    const dtls = {
      from: this.state.email,
      name: `${this.state.fName} ${this.state.lName}`,
      subject: subjc,
      message: this.state.contactBlurb,
    };

    try {
      const res = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dtls),
      });
      if (res.ok) {
        return {
          type: 'success',
          msg: `Sweet Success ${dtls.name}! Your inquiry has been transmitted!`,
        };
      } else {
        return {
          type: 'error',
          msg: 'Sorry, there seems to be an issue with our comms, please try again!'
        };
      }
    } catch (err) {
      return {
        type: 'error',
        msg: `Catastrophic Failure! Abandon Ship! ... (just kidding) ... this has been logged and we'll investigate shortly.`
      };
    }
  };

  formFieldChange = (e, pos) => {
    const frmId = e.target.name;
    this.setState({ [frmId]: e.target.value }, () => {
      this.hasErrors(this.state[frmId], pos);
    });
  };
  hasErrors = (val = null, pos) => {
    const strRegExp =
      pos === 2 ?
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ :
        /[a-zA-Z]/g;
    val = strRegExp.test(val) ? val : null;
    const errChk = this.errsToHandle[pos];
    const hasError = (pos === 3 && val) ? false : !val;
    errChk.err(hasError);
    errChk.hasError = hasError;
    errChk.val = val;
  };

  postScore = (score, lvl) => {
    document.getElementById('scoreBoard').innerHTML = `
      <span>Score: ${score}</span>
      <br />
      <span>
        Level: ${(lvl + 1)} of ${this.gameData.scene.levels.length}
      </span>
    `;
  };

  drawFrame = () => {
    this.gameData.game.innerHTML += this.gameData.scene.background.sceneTemplate;
    this.gameData.game.innerHTML += this.gameData.scene.user.userTemplate;

    this.postScore(
      this.gameData.user.score,
      this.gameData.user.curLevel
    );
    document.getElementById('instructs').classList.remove('hidden');
    this.forceUpdate();
  };

  startEnemies = () => {
    this.gameData.hasEnemies = true;
    requestAnimationFrame(
      this.gameData.background.backgroundMove
    );
    setTimeout(() => {
      document.getElementById('instructs').classList.add('hidden');
      this.drawEnemy();
    }, 2250);
  };

  drawObjects = (objs, isEnemy = false) => {
    const childsToAppend = [];
    objs.forEach((obj) => {
      const objType = document.createElementNS(
        'http://www.w3.org/2000/svg',
        obj.type
      );
      Object.keys(obj).forEach((prop) => {
        objType.setAttribute(prop, obj[prop]);
      });
      if (obj.type === 'text') {
        objType.textContent = obj.text;
      }
      childsToAppend.push(objType);
    });
    this.addToSvg(childsToAppend, isEnemy);
  };
  addToSvg = (children, isEnemy) => {
    children.forEach((child) => {
      this.gameData.game.appendChild(child);
    });
  };

  drawEnemy = async () => {
    if (
      this.gameData.isStarted &&
      !(this.gameData.user.died)
    ) {
      const enemHeight = Math.floor(Math.random() * 2) + 1;
      const enemImg = Math.floor(Math.random() * 2) + 1;
      const yPlusHeight = Number(this.gameData.scene.user.height) * enemHeight;
      const isSmallEnm = Number(enemImg - 1) === 0 ? 'z' : 'o';
      const enemImage =
        enemHeight === 2 ?
          this.enemyImgs.tall['z'][0] :
          this.enemyImgs.small[isSmallEnm][0];
      const enemyGrnd = (this.gameData.scene.ground.y - yPlusHeight);
      const enemies = {
        ground: {
          type: 'rect',
          x: `${(this.gameData.gameSize.width - this.gameData.scene.user.width)}`,
          y: `${(enemyGrnd)}`,
          width: `${(this.gameData.scene.user.width)}`,
          height: `${yPlusHeight}`,
          fill: 'red',
          stroke: 'black',
          class: 'enemy',
          id: `enem-${(this.gameData.scene.enemiesThisLevel + 1)}`
        },
        sky: {

        }
      };
      const smallTall = (enemHeight === 2) ? 'tall' : 'small';
      const imgs = smallTall === 'tall' ? this.enemyImgs.tall['z'] : this.enemyImgs.small[isSmallEnm];
      this.gameData.scene.enemies.push({
        id: enemies.ground.id,
        time: 0,
        isMoving: false,
        movingImgs: imgs,
        movingIndx: 0,
        build: enemies.ground,
        enemyTemplate: `
        <defs
          id="${enemies.ground.id}Def"
        >
          <image 
            width="${(this.gameData.gameSize.width / 10)}" 
            height="${yPlusHeight}" 
            id="${enemies.ground.id}Img" 
            href=${enemImage}
          />
        </defs>
        <use 
          id="${enemies.ground.id}" 
          href="#${enemies.ground.id}Img"
          class='enemy'
          x="${enemies.ground.x}" 
          y="${enemyGrnd}"
        />
        `,
      });

      if (
        !(this.gameData.user.died)
      ) {
        const enem = this.gameData.scene.enemies[
          this.gameData.scene.enemies.length - 1
        ] || null;
        if (enem) {
          const defsElement = document.createElementNS("http://www.w3.org/2000/svg", "defs");
          const imageElement = document.createElementNS("http://www.w3.org/2000/svg", "image");
          const useElement = document.createElementNS("http://www.w3.org/2000/svg", "use");

          defsElement.setAttribute('id', `${enemies.ground.id}Def`);

          imageElement.setAttribute('width', `${(this.gameData.game.getBoundingClientRect().width / 10)}`);
          imageElement.setAttribute('height', `${yPlusHeight}`);
          imageElement.setAttribute('id', `${enemies.ground.id}Img`);
          imageElement.setAttribute('href', `"${enemImage}"`);

          useElement.setAttribute('id', `${enemies.ground.id}`);
          useElement.setAttribute('href', `#${enemies.ground.id}Img`);
          useElement.setAttribute('class', 'enemy');
          useElement.setAttribute('x', `${enemies.ground.x}`);
          useElement.setAttribute('y', `${enemies.ground.y}`);

          defsElement.appendChild(imageElement);

          this.gameData.game.appendChild(defsElement);
          this.gameData.game.appendChild(useElement);


          if (!this.gameData.user.hitEnemyRunning) {
            this.gameData.user.hitEnemyRunning = true;
            this.gameData.user.hitEnemy();
          }
          this.gameData.scene.enemiesThisLevel += 1;

          const newEnemy = document.getElementById(enem.id);
          this.gameData.enemy.moveEnemy(newEnemy);
        }
      }
    }
  };

  startGame = () => {
    const svg = document.getElementById('theGame');
    const gameGround = `
      ${(
        svg.getBoundingClientRect().height - (
          (svg.getBoundingClientRect().height / 6) * 1.2
        )
      )
      }`;
    const gameGroundHeight = `${gameGround}`;
    const userHeight = `${((svg.getBoundingClientRect().height / 10) * 1)}`;
    this.gameData = {
      isStarted: true,
      hasEnemies: false,
      time: new Date().getTime(),
      startDate: new Date().toLocaleString(),
      score: 0,
      game: svg,
      gameSize: {
        width: svg.getBoundingClientRect().width,
        height: svg.getBoundingClientRect().height,
      },
      user: {
        position: '0,0',
        tries: 0,
        jumping: false,
        jumpLimit: 0,
        running: false,
        falling: false,
        curLevel: 0,
        score: 0,
        died: false,
        default: {
          x: '0',
          y: `${(gameGround - userHeight)}`,
        },
        userMove: (obj, axis, val) => {
          return new Promise(resolve => {
            obj.setAttribute(axis, val);
            setTimeout(() => {
              resolve();
            }, 1);
          });
        },
        fallUser: async (user, gameDefaultY) => {
          this.gameData.user.jumping = true;

          await new Promise((resolve) => {
            setTimeout(resolve, 300);
          });

          this.gameData.user.running = false;
          if (this.gameData.isStarted) {
            this.gameData.user.falling = true;
            const yDiff = gameDefaultY - parseFloat(user.getAttribute('y'));
            for (let i = 1; i < yDiff; i++) {
              const yAxis = parseFloat(user.getAttribute('y'));
              if ((yAxis + 1) < gameDefaultY) {
                await this.gameData.user.userMove(user, 'y', (yAxis + 1));
              }
            }
            await this.gameData.user.userMove(user, 'y', gameDefaultY);
            if (this.gameData.user) {
              this.gameData.user.jumping = false;
              this.gameData.user.falling = false;
              this.gameData.user.jumpLimit = 0;
            }
          }
        },
        moveUser: async (axis, plusMinus) => {
          const user = document.getElementById('gameUser') || null;
          const userI = document.getElementById('userImg') || null;
          const userAxis = parseFloat(user.getAttribute(axis));
          const userMotion = {
            x: (isJumping) =>
              (
                isJumping &&
                !this.gameData.user.falling
              ) ?
                (this.gameData.scene.user.width * 4) :
                (this.gameData.scene.user.width * 1),
            y: (isJumping) => (this.gameData.scene.user.height * 2.8)
          };
          if (this.gameData.isStarted) {
            if (user && userI) {
              const userY = parseFloat(user.getAttribute('y'));
              const gameDefaultY = parseFloat(this.gameData.user.default.y);
              let isJump = userY < gameDefaultY;
              let userMovement = Math.round(userMotion[axis](isJump));
              let isOOBMove = false;
              const changeUserImg = (xAxis) => {
                if (this.gameData.user?.running) {
                  setTimeout(() => {
                    if (xAxis && this.gameData.scene?.user) {
                      const userImg = document.getElementById('userImg');
                      const nextUImg = this.gameData.scene.user.userRunning[useImg];
                      userImg.setAttribute('href', nextUImg);
                      if (upDown) {
                        if (useImg === 3) {
                          useImg = 2;
                          upDown = false;
                          return;
                        }
                        useImg += 1;
                      } else {
                        if (useImg === 0) {
                          upDown = true;
                          useImg = 1;
                          return;
                        }
                        useImg -= 1;
                      }
                    }
                  }, 80);
                }
              };
              const handleSceneMovement = (moveDistance, shouldMoveUser) => {
                return new Promise(async (resolve) => {
                  const userMovePromises = [];

                  for (let i = 1; i < Number(moveDistance); i++) {
                    if (this.gameData.user) {
                      const legDivisor = shouldMoveUser ? 6 : 8;
                      const bgDivisor = shouldMoveUser ? 10 : 10;
                      const legSpeed = ((i % legDivisor) === 0);
                      const bgSpeed = ((i % bgDivisor) === 0);

                      if (legSpeed) {
                        changeUserImg(axis === 'x');
                      }
                      if (bgSpeed) {
                        requestAnimationFrame(this.gameData.background.backgroundMove);
                      }
                      if (shouldMoveUser) {
                        const uAxis = parseFloat(user.getAttribute(axis));
                        const isPlusMinus = plusMinus ? (uAxis + 1) : (uAxis - 1);
                        userMovePromises.push(this.gameData.user.userMove(user, axis, isPlusMinus));
                      }

                      if (!isJump && i === userMovement) {
                        this.gameData.user.running = false;
                      }
                    }
                    await new Promise(resolve => setTimeout(resolve, 2));
                  }

                  if (!isJump) {
                    this.gameData.user.running = false;
                  }

                  await Promise.all(userMovePromises);
                  resolve();
                });
              };


              if (axis === 'y') {
                // This is a jump motion
                if (!plusMinus) {
                  if (this.gameData.user.jumping) {
                    return;
                  } else {
                    isJump = true;
                  }
                }
                // This is "down"
                if (plusMinus) {
                  // console.log('at ground, return');
                  return;
                }
              }
              let theDistance;
              let travelDistance;
              let theCompare;
              if (axis === 'x') {
                // slide user to left
                if (!plusMinus) {
                  theDistance = (Math.round(this.gameData.scene.user.width));
                  travelDistance = theDistance < userAxis ? (userAxis - theDistance) : 1;
                  theCompare = (
                    ((userAxis - Number(userMovement)) <
                      theDistance) || (
                      userAxis <= theDistance
                    )
                  );
                }
                // slide user to right
                if (plusMinus) {
                  this.gameData.scene.background.moveBG = true;
                  theDistance = this.gameData.gameSize.width - (Math.round(this.gameData.scene.user.width) * 2);
                  travelDistance = userAxis < theDistance ? (theDistance - userAxis) : 1;
                  theCompare = (
                    ((userAxis + Number(userMovement)) >
                      theDistance) || (
                      userAxis >= theDistance
                    )
                  );
                }
                userMovement = theCompare ? travelDistance : userMovement;
                isOOBMove = userMovement < Math.round(Number(this.gameData.scene.user.width) / 3);
                this.gameData.user.running = true;
              }

              let upDown = true;
              let useImg = 1;
              if (isJump) {
                this.gameData.user.jumpLimit += 1;
              }

              const moveUser = isOOBMove ? false : true;
              userMovement =
                !moveUser ?
                  Math.round((Number(this.gameData.scene.user.width) / 3) * 2) :
                  userMovement;

              await handleSceneMovement(userMovement, moveUser);

              if (this.gameData.scene) {
                this.gameData.scene.background.moveBG = false;
              }
              if (isJump) {
                if (this.gameData.user) {
                  this.gameData.user.jumping = true;
                  await this.gameData.user.fallUser(user, gameDefaultY);
                  this.gameData.user.jumping = false;
                }
              } else {
                if (this.gameData.user) {
                  this.gameData.user.jumping = false;
                }
              }
            }
          }
        },
        hitEnemyRunning: false,
        hitEnemy: async () => {
          const userBounds = document.getElementById('gameUser') || null;
          const userBoundsI = document.getElementById('userImg') || null;
          if (userBounds) {
            const getAttrNmbr = (att) => { return Number(att) };
            const userIXords = {
              x: getAttrNmbr(userBoundsI.getAttribute('x')),
              y: getAttrNmbr(userBoundsI.getAttribute('y')),
              x2: (
                getAttrNmbr(userBoundsI.getAttribute('x')) +
                getAttrNmbr(userBoundsI.getAttribute('width'))
              ),
              y2: (
                getAttrNmbr(userBoundsI.getAttribute('y')) -
                getAttrNmbr(userBoundsI.getAttribute('height'))
              ),
              width: getAttrNmbr(userBoundsI.getAttribute('width')),
              height: getAttrNmbr(userBoundsI.getAttribute('height')),
            };
            const userXords = {
              x: getAttrNmbr(userBounds.getAttribute('x')),
              y: getAttrNmbr(userBounds.getAttribute('y')),
              x2: (
                getAttrNmbr(userBounds.getAttribute('x')) +
                userIXords.width
              ),
              y2: (
                getAttrNmbr(userBounds.getAttribute('y')) -
                userIXords.height
              ),
              width: userIXords.width,
              height: userIXords.height,
            };
            const allEnemyXords = [];
            this.gameData.scene.enemies.forEach(
              (enem) => {
                const enemEl = document.getElementById(enem.id) || null;
                const enemImgEl = document.getElementById(`${enem.id}Img`) || null;
                if (enemEl) {
                  allEnemyXords.push({
                    x: getAttrNmbr(enemEl.getAttribute('x')),
                    y: getAttrNmbr(enemEl.getAttribute('y')),
                    x2: (
                      getAttrNmbr(userBounds.getAttribute('x')) +
                      getAttrNmbr(enemImgEl.getAttribute('width'))
                    ),
                    y2: (
                      getAttrNmbr(userBounds.getAttribute('y')) -
                      getAttrNmbr(enemImgEl.getAttribute('height'))
                    ),
                    width: getAttrNmbr(enemImgEl.getAttribute('width')),
                    height: getAttrNmbr(enemImgEl.getAttribute('height')),
                  });
                }
              }
            );
            allEnemyXords.every(
              async (enemXord) => {
                if (!(this.gameData.user.died)) {
                  const buffer = (userXords.width / 3);
                  const intersect = (
                    userXords.x < (enemXord.x + enemXord.width - buffer) &&
                    (userXords.x + userXords.width - buffer) > enemXord.x &&
                    userXords.y < (enemXord.y + enemXord.height) &&
                    (userXords.y + userXords.height) > enemXord.y
                  );

                  if (intersect) {
                    this.gameData.user.died = true;
                    this.gameData.user.hitEnemyRunning = false;
                    const newX = enemXord.x - (Math.round(this.gameData.scene.user.width) / 2);

                    const userImageBounds = document.getElementById('userImg') || null;
                    const centerX = (
                      Math.round(
                        Number(newX) +
                        (Number(userImageBounds.getAttribute('width')) / 2)
                      )
                    );
                    const centerY = (
                      Math.round(
                        Number(userBounds.getAttribute('y')) +
                        (Number(userImageBounds.getAttribute('height')) / 2)
                      )
                    );
                    userBounds.remove();
                    this.gameData.game.appendChild(userBounds);
                    for (let i = 0; i < 9; i++) {
                      const rotateAngle = i < 4 ? (90 * i) : ((90 * i) - 360);
                      userBounds.setAttribute('transform', `
                          rotate( ${rotateAngle} ${centerX} ${centerY})
                        `);
                      this.forceUpdate();
                      await new Promise(resolve => setTimeout(resolve, 90));
                    }

                    const gmeAlrt = document.getElementById('gameAlrt');
                    gmeAlrt.innerHTML = `
                      <h1 style='display:table-cell;'>Game Over...</h1>
                    `;
                    gmeAlrt.classList.add('focusAlert');
                    setTimeout(() => {
                      gmeAlrt.classList.remove('focusAlert');
                      this.endGame();
                    }, 5000);
                  }
                }
              }
            );
          }
        }
      },
      enemy: {
        moveEnemy: async (enemEl) => {
          const enemy =
            enemEl.id ?
              this.gameData.scene?.enemies?.find(
                (en) => en.id === enemEl.id
              ) || null :
              null;
          const enemImgEl = document.getElementById(`${enemEl.id}Img`) || null;
          if (
            enemy &&
            this.gameData.isStarted &&
            this.gameData.user &&
            !(this.gameData.user.died)
          ) {
            enemy.isMoving = true;
            const enemyAx = Number(enemEl.getAttribute('x'));
            const enemyWidth = Number(enemImgEl.getAttribute('width'));
            const oobDistance = (enemyWidth * 2);
            const curPosToOOB = Math.round((enemyAx + oobDistance));

            for (let i = 0; i < curPosToOOB; i++) {
              if (
                this.gameData.isStarted &&
                this.gameData.user &&
                !(this.gameData.user.died)
              ) {
                const enemImgObj = this.gameData.scene.enemies.find((enem) => enem.id === enemEl.id) || null;
                requestAnimationFrame(() => {
                  const enemyAxis = Number(enemEl.getAttribute('x'));
                  enemEl.setAttribute('x', (enemyAxis - 1));
                  if (this.gameData.user) {
                    this.gameData.user.hitEnemy();
                  }

                  if (i % Math.round(Math.round(enemImgObj.build.width) / 8) === 0) {
                    if (enemImgEl) {
                      enemImgObj.movingIndx = enemImgObj.movingIndx === 2 ? 0 : enemImgObj.movingIndx + 1;
                      let enemImgInd = enemImgObj.movingIndx;
                      const fndImg = enemImgObj.movingImgs[enemImgInd];
                      enemImgEl.setAttribute('href', fndImg);
                    }
                  }
                });
                await new Promise(resolve => setTimeout(resolve, 10));
              } else {
                break;
              }
            }

            if (
              this.gameData.scene &&
              this.gameData.game &&
              !(this.gameData.user.died)
            ) {
              enemy.isMoving = true;

              // Remove Enemy from queue since task completed
              this.gameData.scene.enemies = this.gameData.scene.enemies.filter(
                (enem) => enem.id !== enemEl.id
              );
              if (enemEl && enemEl.parentNode === this.gameData.game) {
                const defEl = document.getElementById(`${enemEl.id}Def`) || null;
                this.gameData.game.removeChild(enemEl);
                this.gameData.game.removeChild(defEl);
              }

              // Increment the users score
              this.gameData.user.score += (
                Number(
                  this.gameData.scene.levels[this.gameData.user.curLevel].enemies.enemyXp
                )
              );
              this.postScore(
                this.gameData.user.score,
                this.gameData.user.curLevel
              );

              if (this.gameData.isStarted) {
                const gmeAlrt = document.getElementById('gameAlrt');
                const levelData = this.gameData.scene.levels[this.gameData.user.curLevel] || null;
                const enemiesSoFar = this.gameData.scene.enemiesThisLevel;
                const levelEnemyCount = levelData?.enemies?.count;
                let showAlert = false;
                const nextLevel = enemiesSoFar === levelEnemyCount;
                let alertDelay = 5000;
                let drawNextEnemy = (
                  enemiesSoFar <
                  levelEnemyCount
                ) || (
                    enemiesSoFar === levelEnemyCount
                  );
                const displayBlock = `style='display:block;'`;
                if (nextLevel) {
                  const hasNextLevel = this.gameData.scene.levels[Number(this.gameData.user.curLevel + 1)] || null

                  if (hasNextLevel) {
                    this.gameData.scene.enemiesThisLevel = 0;
                    gmeAlrt.innerHTML = `<h2 ${displayBlock}>Sweet! On to the NEXT level</h2>`;
                    showAlert = 'focusAlert';
                    this.gameData.user.curLevel += 1;
                    this.postScore(
                      this.gameData.user.score,
                      this.gameData.user.curLevel
                    );
                  } else {
                    gmeAlrt.innerHTML = `
                    <h2 ${displayBlock}>CONGRATS, YOU'VE WON!!</h2>
                    <span ${displayBlock}>Press [Esc] to play again!</span>
                    <span ${displayBlock}>(O__o)(''')</span>
                  `;
                    showAlert = 'focusAlertEnd';
                    drawNextEnemy = false;
                    alertDelay = false;
                    document.getElementById('fireWorks').classList.add('gameFireworks');
                    document.getElementById('fireWorks').classList.remove('displayNone');
                  }
                }
                if (showAlert) {
                  gmeAlrt.innerHTML += `<h6 ${displayBlock}>Your score is: ${this.gameData.user.score}</h6>`;

                  gmeAlrt.classList.add(showAlert);

                  if (alertDelay) {
                    setTimeout(() => {
                      gmeAlrt.classList.remove(showAlert);
                      gmeAlrt.innerHTML = '';

                      if (drawNextEnemy) {
                        this.drawEnemy();
                      }
                    }, alertDelay);
                  }
                } else {
                  if (drawNextEnemy) {
                    this.drawEnemy();
                  }
                }
              }
            }
          }
        },
      },
      background: {
        moveBG: false,
        backgroundMove: async () => {
          if (this.gameData.time && this.gameData.user) {
            if (this.gameData.scene.background.moveBG) {
              const bgSpeed = document.getElementById('sceneBG');
              const sceneBGImg = document.getElementById('sceneBGImg');
              const bgWidth = Math.round(Number(sceneBGImg.getAttribute('width')) / 2);
              if (bgSpeed) {
                const bgAxis = Math.round(bgSpeed.getAttribute('x'));
                // bgSpeed.setAttribute('x', (Number(bgAxis) - 5));
                if ((bgAxis < -(bgWidth))) {
                  sceneBGImg.classList.remove('scene');
                  bgSpeed.setAttribute('x', 0);
                  sceneBGImg.classList.add('scene');
                  return;
                }
                bgSpeed.setAttribute('x', (Number(bgAxis) - 5));
                this.forceUpdate();
              }
            }
            // setTimeout(() => {
            //   if (this.gameData.background) {
            //     requestAnimationFrame(
            //       this.gameData.background.backgroundMove
            //     );
            //   }
            // }, 50);
          }
        },
      },
      scene: {
        background: {
          sceneTemplate: `
            <defs>
            <image 
              preserveAspectRatio="xMidYMid slice"
              width="${(svg.getBoundingClientRect().width * 2)}" 
              height="${Math.round(svg.getBoundingClientRect().height) * 1.04}" 
              id="sceneBGImg" 
              href="${backgroundScenes.mountains}"
            />
          </defs>
          <use 
            id="sceneBG" 
            href="#sceneBGImg"
            class='scene'
            x="0" 
            y="-10"
          /> 
          `,
        },
        foreground: {
          sceneTemplate: `
            <defs>
            <image 
              preserveAspectRatio="xMidYMid slice"
              width="${(svg.getBoundingClientRect().width * 6)}" 
              height="${gameGroundHeight}" 
              id="sceneBGGrnd" 
              href="${backgroundScenes.ground}"
            />
          </defs>
          <use 
            id="sceneGrnd" 
            href="#sceneBGGrnd"
            class='scene'
            x="0" 
            y="${gameGround}"
          />
          `,
        },
        groundGrad: `
          <defs>
            <linearGradient id='groundGrad' x1='0%' y1='0%' x2='100%' y2='100%'>
              <stop offset="0%" stop-color="rgba(84,21,0,1)" />
              <stop offset="28%" stop-color="rgba(148,72,0,1)" />
              <stop offset="100%" stop-color="rgba(96,42,0,1)" />
            </linearGradient>
          </defs>
        `,
        ground: {
          type: 'rect',
          x: '0',
          y: `${gameGround}`,
          width: `${(svg.getBoundingClientRect().width * 6)}`,
          height: `${gameGroundHeight}`,
          fill: 'url(#groundGrad)',
          class: 'ground'
        },
        user: {
          id: 'gameUser',
          type: 'rect',
          x: '0',
          y: `${(gameGround - userHeight)}`,
          width: `${(svg.getBoundingClientRect().width / 10)}`,
          height: `${userHeight}`,
          class: 'user',
          userTemplate: `
            <defs>
              <image 
                width="${(svg.getBoundingClientRect().width / 10)}" 
                height="${userHeight}" 
                id="userImg" 
                href=${this.userImgs[0]}
              />
            </defs>
            <use 
              id="gameUser" 
              href="#userImg"
              class='user'
              x="0" 
              y="${(gameGround - userHeight)}"
            />          
          `,
          userRunning: this.userImgs,
          // userTemplate: `
          //   <defs>
          //     <image 
          //       width="${(svg.getBoundingClientRect().width / 10)}" 
          //       height="${userHeight}" 
          //       id="userImg" 
          //       href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAADwBAMAAAAQgoCWAAAAAXNSR0IB2cksfwAAACRQTFRFAAAAAAAA/4CA/xJhbl7/////wpNj/8GC9/8I/60fsLCwCm5MTcZB3AAAAAx0Uk5TAP//////////////CcRQJgAAAUhJREFUeJzt2sFtwzAMhWGv4BW6QlfQCl2hK3iFrpAVskKXC0QDfjFB1kIuDYX/nSRL+nQiZCdaliDrn4lW5MHCem/LLfk4EnWxsOpbNvzZo5ZLBCpYWLWsASYdbT1fPTuIhTWv1c7ZmRdrCAvrfyyBA/nucc8WFyysAtbAYst2DhbWdJZKJWXUwsKaydqyyPIgFlYVKwVTK2ewsEpZAqPy0S+heqbjBQurtJWC7h+AEQYLq4C1BomqabhysLAKWAJ/jjhV3QsGC6uKFTEtCBbWnNatR1ZUUhcgFlYpyzFqWeyd6eleDxZWeUugiwpJHwzaCQtrEqudE9HqahkWVi1LI/oUblk0atVkXX+nGQurinXvsQvLmhPlt8f21GVnW4uFVdVy6/zRchwOtp1nNIyFVcCKwIgZnoyFVcXSnAFLky+GsbDe1XoAKxvVDSU29kIAAAAASUVORK5CYII="
          //     />
          //   </defs>
          //   <use 
          //     id="gameUser" 
          //     href="#userImg"
          //     class='user'
          //     x="0" 
          //     y="${(gameGround - userHeight)}"
          //   />          
          // `,
          // userRunning: userRunningSvgs,
        },
        sky: {

        },
        enemies: [],
        enemiesThisLevel: 0,
        levels: [
          {
            enemies: { count: 3, enemyXp: 10 },
            platforms: 0,
            powerUp: 0
          },
          {
            enemies: { count: 6, enemyXp: 15 },
            platforms: 0,
            powerUp: 0
          },
          {
            enemies: { count: 9, enemyXp: 20 },
            platforms: 0,
            powerUp: 0
          },
          {
            enemies: { count: 12, enemyXp: 25 },
            platforms: 0,
            powerUp: 0
          },
        ],
      }
    };
    this.drawFrame();
    document.body.style.cursor = 'none';
  };

  endGame = () => {
    const haveSvg = document.getElementById('theGame') || null;
    if (this.gameData.game) {
      this.gameData.game.innerHTML = '';
      this.gameData.isStarted = false;
      document.getElementById('gameAlrt').innerHTML = '';
      this.gameData = {};

      document.getElementById('fireWorks').classList.add('displayNone');
      document.getElementById('fireWorks').classList.remove('gameFireworks');
      document.getElementById('gameAlrt').classList.remove('focusAlertEnd');
      document.getElementById('gameAlrt').classList.remove('focusAlert');
      this.forceUpdate();
    }
    if (haveSvg) {
      haveSvg.innerHTML = '';
    }
    document.body.style.cursor = 'auto';
  };

  keyHandler = (event) => {
    if (this.gameData.isStarted && event.code === 'Escape') {
      this.endGame();
    }
    if (
      this.gameData.isStarted &&
      !(this.gameData.user.died)
    ) {
      if (
        event.code === 'ArrowUp' &&
        !this.gameData.user.running &&
        this.gameData.user.jumpLimit < 1
      ) {
        this.gameData.user.moveUser('y', false);
      }
      if (
        event.code === 'ArrowLeft' &&
        !this.gameData.user.running
      ) {
        this.gameData.user.moveUser('x', false);
      }
      if (
        event.code === 'ArrowRight' &&
        !this.gameData.user.running
      ) {
        this.gameData.user.moveUser('x', true);
        if (!this.gameData.hasEnemies) {
          this.startEnemies();
        }
      }
    }
  };

  svgViewBoxHandler = () => {
    const svgVB = document.getElementById('theGame').getBoundingClientRect() || null;
    if (svgVB) {
      this.svgViewBox = `0 0 ${parseFloat(svgVB.width)} ${parseFloat(svgVB.height)}`;
    }
  };
  windowHandler = () => {
    this.svgViewBoxHandler();
    this.endGame();
  };

  componentDidMount() {
    this.svgViewBoxHandler();
    // eslint-disable-next-line no-restricted-globals
    window.addEventListener('keydown', this.keyHandler);
    window.addEventListener('resize', this.windowHandler);
  };
  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyHandler);
    window.removeEventListener('resize', this.windowHandler);
    this.endGame();
  };

  render() {
    return (
      <BodyPart id='contact'>
        <BodyPane
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexFlow: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            className='bodyPaneCntct'
          >
            <div
              style={{
                padding: '2em',
              }}
            >
              <Box
                component="form"
                autoComplete='false'
                sx={{
                  '& > :not(style)': { m: 1, width: '25ch' },
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                style={{
                  display: 'grid',
                  width: '100%',
                  gridTemplateColumns: '1fr 1fr',
                  gridTemplateRows: 'auto',
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  padding: '4% 0px 4% 0px',
                }}
              >
                <TextField
                  id="firstName"
                  label="First Name"
                  name="fName"
                  style={{
                    position: 'relative',
                    width: '80%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                  variant="outlined"
                  onChange={(e) => {
                    this.formFieldChange(e, 0);
                  }}
                  onBlur={(e) => {
                    this.formFieldChange(e, 0);
                  }}
                  required
                  error={this.state.fNameError}
                />
                <TextField
                  id="lastName"
                  label="Last Name"
                  name="lName"
                  variant="outlined"
                  style={{
                    position: 'relative',
                    width: '80%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                  onChange={(e) => {
                    this.formFieldChange(e, 1);
                  }}
                  onBlur={(e) => {
                    this.formFieldChange(e, 1);
                  }}
                  required
                  error={this.state.lNameError}
                />
                <TextField
                  id="email"
                  label="Email"
                  name="email"
                  variant="outlined"
                  style={{
                    position: 'relative',
                    width: '90%',
                    gridColumn: '1/-1',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                  type={"email"}
                  onChange={(e) => {
                    this.formFieldChange(e, 2);
                  }}
                  onBlur={(e) => {
                    this.formFieldChange(e, 2);
                  }}
                  required
                  error={this.state.emailError}
                />
                <TextField
                  fullWidth
                  id="contactReason"
                  name="contactReason"
                  select
                  label="Reason for Contact"
                  helperText="Please select a reason for Contact"
                  required
                  onChange={(e) => {
                    this.formFieldChange(e, 3);
                  }}
                  onBlur={(e) => {
                    this.formFieldChange(e, 3);
                  }}
                  error={this.state.contactRError}
                  defaultValue=""
                  style={{
                    gridColumn: '1/-1',
                    position: 'relative',
                    width: '90%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  {
                    contactReasons.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))
                  }
                </TextField>
                <TextField
                  fullwidthform="true"
                  id="contactBlurb"
                  name="contactBlurb"
                  label="What's on your mind?"
                  multiline
                  rows={8}
                  defaultValue=""
                  onChange={(e) => {
                    this.formFieldChange(e, 4);
                  }}
                  onBlur={(e) => {
                    this.formFieldChange(e, 4);
                  }}
                  required
                  error={this.state.contactBError}
                  style={{
                    gridColumn: '1/-1',
                    position: 'relative',
                    width: '90%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                />
                <Button
                  variant="contained"
                  onClick={() => this.handleSubmission()}
                  style={{
                    marginLeft: 'auto',
                    gridColumnEnd: 'span 2',
                    marginRight: '5%',
                  }}
                >Send Form</Button>
              </Box>
            </div>
            <div className='gameContainer'>
              <div
                className={`
                gameTitle
                ${this.gameData.isStarted ? 'hidden' : ''}
              `}
              >
                <div
                  style={{
                    marginTop: '14vw',
                  }}
                >
                  <span>Want to Play a Game?</span>
                  <br />
                  <div
                    className='gameStart'
                    onClick={() => this.startGame()}
                  ></div>
                </div>
              </div>
              <div
                id='fireWorks'
                className='fireworks displayNone'
              ></div>
              <div
                id='gameAlrt'
                className='gameAlert'
              ></div>
              <svg
                id='theGame'
                style={{
                  position: 'absolute',
                  width: '90%',
                  height: '100%',
                }}
                viewBox={this.svgViewBox}
              ></svg>
              <div
                id='scoreBoard'
                className={`
              gameScore
              ${this.gameData.isStarted ? '' : 'hidden'}
            `}
              >
              </div>
              <div
                id='instructs'
                className='instructions hidden'
              >
                <div>
                  Use the Arrows to move
                </div>
                <div>
                  Press Esc to Restart
                </div>
              </div>
            </div>
          </div>
        </BodyPane>
      </BodyPart>
    );
  }
}

export default Contact;