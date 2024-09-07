import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import RecyclingIcon from '@mui/icons-material/Recycling';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import DraftsIcon from '@mui/icons-material/Drafts';
import RefreshIcon from '@mui/icons-material/Refresh';
import WarningIcon from '@mui/icons-material/Warning';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';

import './mail.css';
import { triggerSnackBar } from '../../../../../services/app-service';
import prfleBg from '../mail/assets/userPrfle.webp';

let staticMail = [
    {
        id: 1,
        to: 'user@user.mail',
        from: 'emailOne@other.mail',
        subject: 'Just reaching out!',
        message: `
            Hey! It's been awhile! How are you?
        `,
        html: '',
        read: false,
        checked: false,
    },
    {
        id: 2,
        to: 'user@user.mail',
        from: 'emailTwo@other.mail',
        subject: 'Where were you...',
        message: `
            I was out in the cold waiting for hours!
            Your promised you'd come and you didn't...
        `,
        html: '',
        read: false,
        checked: false,
    },
    {
        id: 3,
        to: 'user@user.mail',
        from: 'emailThree@other.mail',
        subject: `Can't wait to see you!`,
        message: `
            Dinner is going to be amazing, meeting at that italian restaurant
            is exactly what I've been looking forward to.
        `,
        html: '',
        read: false,
        checked: false,
    },
    {
        id: 4,
        to: 'user@user.mail',
        from: 'emailFour@other.mail',
        subject: 'This is obviously just a test email',
        message: `
            So don't get so worried about it, alright?
        `,
        html: '',
        read: false,
        checked: false,
    },
    {
        id: 5,
        to: 'user@user.mail',
        from: 'emailFive@other.mail',
        subject: `Interview Meeting`,
        message: `
            Looking forward to speaking with you about the position.
        `,
        html: '',
        read: false,
        checked: false,
    },
];
let mailViews = {
    inbox: [],
    trash: [],
    spam: [],
    sent: [],
    filtered: [],
};
const notifications = [
    {
        type: 'warn',
        msg: 'You have 3 new messages in your inbox.',
        read: false,
        icon: <WarningIcon />,
    },
    {
        type: 'error',
        msg: 'There was a problem syncing your account.',
        read: false,
        icon: <ErrorIcon />,
    },
    {
        type: 'success',
        msg: 'Profile settings updated successfully.',
        read: false,
        icon: <CheckBoxIcon />,
    },
    {
        type: 'info',
        msg: 'Last successful login was... last week?',
        read: false,
        icon: <InfoIcon />,
    }
];

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Mail() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [openDialog, setDialogOpen] = React.useState(false);
    const [dialogOpts, setDialogOpts] = React.useState({});
    const [viewName, setViewName] = React.useState('Inbox');
    const [noitficats, setNotificats] = React.useState(notifications);
    const [srchValue, setSearchVal] = React.useState('');

    const [mailOpts, setMailOpts] = React.useState([]);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    const handleDialogClickOpen = (dOpts) => {
        if (dOpts) {
            setDialogOpts(dOpts);
            setDialogOpen(true);
        }
    };
    const handleDialogClose = () => {
        if (dialogOpts.type === 'notifications') {
            setNotificats([]);
        }
        setDialogOpen(false);
    };

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };
    const handleLogOut = () => {
        const menuBar = document.querySelector('.menuBar');
        const closeBtn = menuBar ? menuBar.querySelector('button') : null;
        if (closeBtn) {
            closeBtn.click();
        }
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={
                () => {
                    handleDialogClickOpen(
                        {
                            title: 'Profile',
                            type: 'profile',
                        }
                    )
                }
            }>Profile</MenuItem>
            <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={
                () => {
                    handleDialogClickOpen(
                        {
                            title: 'Notifications',
                            type: 'notifications',
                            message: noitficats,
                        }
                    )
                }
            }>
                <IconButton
                    size="large"
                    aria-label="show new notifications"
                    color="inherit"
                >
                    {noitficats.length > 0 &&
                        <Badge badgeContent={noitficats.length} color="error">
                            <NotificationsIcon />
                        </Badge>
                    }
                    {noitficats.length === 0 &&
                        <NotificationsIcon />
                    }
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <SettingsIcon />
                </IconButton>
                <p>Settings</p>
            </MenuItem>
        </Menu>
    );

    const handleDrawerSelection = (selView, ovrRde = false) => {
        const curView = selView.toLowerCase();
        const uncheckedMail = unCheckMail(curView, ovrRde);
        setViewName(selView);

        if (selView === 'All Mail') {
            const allMail = [
                ...mailViews.inbox,
                ...mailViews.trash,
                ...mailViews.spam
            ];
            setMailOpts(allMail);
        } else {
            setMailOpts(uncheckedMail);
        }
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {[
                    {
                        txt: 'Inbox', ico: <InboxIcon />,
                    },
                    {
                        txt: 'All Mail', ico: <AllInboxIcon />
                    },
                    {
                        txt: 'Sent', ico: <SendIcon />
                    },
                    {
                        txt: 'Spam', ico: <RecyclingIcon />
                    }
                ].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton
                            onClick={() => handleDrawerSelection(text.txt)}
                        >
                            <ListItemIcon>
                                {text.ico}
                            </ListItemIcon>
                            <ListItemText primary={text.txt} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['Trash'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton
                            onClick={() => handleDrawerSelection(text)}
                        >
                            <ListItemIcon>
                                {<DeleteIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const handleSelection = (id) => {
        const mailOptsChk = mailOpts.map((mailItem) => {
            if (mailItem.id === id) {
                mailItem.checked = !mailItem.checked;
            }
            return mailItem;
        });
        setMailOpts(mailOptsChk);
    };

    const openMail = (mailId) => {
        let selMail;
        const changeMail = mailOpts.map((mailItem) => {
            if (mailItem.id === mailId) {
                selMail = mailItem;
                mailItem.read = true;
            }
            return mailItem;
        });
        setMailOpts(changeMail);
        const dOpts = {
            title: selMail.subject,
            message: selMail.message,
            from: selMail.from,
            to: selMail.to,
            type: 'mail'
        };
        handleDialogClickOpen(dOpts);
    };

    const hasCheckedMail = () => {
        return mailOpts?.length && mailOpts.some((mail) => mail.checked);
    };

    const handleSelectionButton = (btnType) => {
        const curView = viewName.toLowerCase();
        const curMail = mailViews[curView];
        const mailIDsSelected = viewName === 'All Mail' ? [
            ...mailViews.inbox,
            ...mailViews.trash,
            ...mailViews.spam
        ] : curMail.filter((mO) => mO.checked);
        let msgM = null;
        let msgT = null;
        switch (btnType) {
            case 'inbox':
                mailViews.inbox = [
                    ...mailViews.inbox,
                    ...mailViews.trash.filter((mail) => mailIDsSelected.some((mIDS) => mIDS.id === mail.id)),
                    ...mailViews.spam.filter((mail) => mailIDsSelected.some((mIDS) => mIDS.id === mail.id)),
                ];
                mailViews.spam = mailViews.spam.filter((mail) => !mailIDsSelected.some((mIDS) => mIDS.id === mail.id));
                mailViews.trash = mailViews.trash.filter((mail) => !mailIDsSelected.some((mIDS) => mIDS.id === mail.id));
                reSetMailOpts();
                msgM = 'Messages restored to Inbox';
                msgT = 'success';
                break;
            case 'delete':
                mailViews.trash = [
                    ...mailViews.trash,
                    ...mailViews.inbox.filter((mail) => mailIDsSelected.some((mIDS) => mIDS.id === mail.id)),
                    ...mailViews.spam.filter((mail) => mailIDsSelected.some((mIDS) => mIDS.id === mail.id)),
                ];
                mailViews.spam = mailViews.spam.filter((mail) => !mailIDsSelected.some((mIDS) => mIDS.id === mail.id));
                mailViews.inbox = mailViews.inbox.filter((mail) => !mailIDsSelected.some((mIDS) => mIDS.id === mail.id));
                reSetMailOpts();
                msgM = 'Messages deleted.';
                msgT = 'error';
                break;
            case 'spam':
                mailViews.spam = [
                    ...mailViews.spam,
                    ...mailViews.inbox.filter((mail) => mailIDsSelected.some((mIDS) => mIDS.id === mail.id)),
                    ...mailViews.trash.filter((mail) => mailIDsSelected.some((mIDS) => mIDS.id === mail.id)),
                ];
                mailViews.trash = mailViews.trash.filter((mail) => !mailIDsSelected.some((mIDS) => mIDS.id === mail.id));
                mailViews.inbox = mailViews.inbox.filter((mail) => !mailIDsSelected.some((mIDS) => mIDS.id === mail.id));
                reSetMailOpts();
                msgM = 'Messages marked and moved to Spam';
                msgT = 'warning';
                break;
            case 'read':
            case 'unread':
                const isRead = btnType === 'read';
                mailViews.inbox = mailViews.inbox.map((mail) => {
                    if (mail.checked) {
                        mail.read = isRead;
                        mail.checked = false;
                    }
                    return mail;
                });
                mailViews.trash = mailViews.trash.map((mail) => {
                    if (mail.checked) {
                        mail.read = isRead;
                        mail.checked = false;
                    }
                    return mail;
                });
                mailViews.spam = mailViews.spam.map((mail) => {
                    if (mail.checked) {
                        mail.read = isRead;
                        mail.checked = false;
                    }
                    return mail;
                });
                handleDrawerSelection(viewName);
                msgM = `Messages marked as ${isRead ? 'Read' : 'Unread'}`;
                break;
            case 'refresh':
                mailViews = {
                    inbox: staticMail,
                    trash: [],
                    spam: [],
                    sent: [],
                };
                handleDrawerSelection('Inbox', true);
                setNotificats(notifications);
                break;
            default:
                break;
        }
        if (msgM) {
            triggerSnackBar({
                msg: msgM,
                type: msgT
            });
        }
    };
    const reSetMailOpts = () => {
        mailViews.inbox = mailViews.inbox.map((mvS) => ({ ...mvS, checked: false }));
        mailViews.trash = mailViews.trash.map((mvT) => ({ ...mvT, checked: false }));
        mailViews.spam = mailViews.spam.map((mvS) => ({ ...mvS, checked: false }));
        const curView = viewName.toLowerCase();
        setMailOpts(mailViews[curView]);
    };

    const unCheckMail = (crV, oVR) => {
        const mailViewSels = mailViews[crV] || [];
        return mailViewSels.map((mail) => {
            mail.checked = false;
            mail.read = oVR ? false : mail.read;
            return mail;
        });
    };

    const getDialogComp = () => {
        if (dialogOpts.type === 'mail') {
            return (
                <>
                    <Dialog
                        className='mail-dialog'
                        open={openDialog}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleDialogClose}
                        aria-describedby="message-dialog-slide-description"
                    >
                        <DialogTitle>Subject: {dialogOpts.title}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="message-dialog-slide-description">
                                <span>From: {dialogOpts.from}</span> <br />
                                <span>To: {dialogOpts.to}</span> <br />
                                <span>Body:</span> <br />
                                <span>{dialogOpts.message}</span>
                            </DialogContentText>
                        </DialogContent>
                    </Dialog>
                </>
            );
        }
        if (dialogOpts.type === 'profile') {
            const profileDeets = [
                {
                    title: 'Full Name',
                    label: 'Temp User'
                },
                {
                    title: 'Email',
                    label: 'user@user.mail'
                },
                {
                    title: 'Phone',
                    label: '(123) 456-7891'
                },
                {
                    title: 'Address',
                    label: '123 Any Street, Seattle, WA'
                }
            ];
            return (
                <>
                    <Dialog
                        className='profile-dialog'
                        open={openDialog}
                        onClose={handleDialogClose}
                        aria-describedby="profile-dialog-description"
                    >
                        <DialogTitle>{dialogOpts.title}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="profile-dialog-description">
                                <div
                                    className='user-profile'
                                >
                                    <div
                                        className='profile-image'
                                    >
                                        <div
                                            className='profile-img'
                                            style={{
                                                backgroundImage: `url(${prfleBg})`,
                                            }}
                                        ></div>
                                        <div
                                            className='user-title'
                                        >
                                            <span>
                                                Temp User
                                            </span>
                                            <span>
                                                Temp Location Listed
                                            </span>
                                            <span>
                                                Temp City, Temp State
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        className='profile-details'
                                    >
                                        <div
                                            className='profile-form'
                                        >
                                            {profileDeets.map((pD, index) => (
                                                <div
                                                    className='profile-row'
                                                >
                                                    <div>
                                                        <span>
                                                            {pD.title}
                                                        </span>
                                                    </div>
                                                    <div
                                                        className='txt-div'
                                                    >
                                                        <TextField id={`standard-basic-${index}`} label={`${pD.label}`} disabled="true" variant="standard" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </DialogContentText>
                        </DialogContent>
                    </Dialog >
                </>
            );
        }
        if (dialogOpts.type === 'notifications') {
            return (
                <>
                    <Dialog
                        className='notification-dialog'
                        open={openDialog}
                        onClose={handleDialogClose}
                        aria-describedby="notification-dialog-description"
                    >
                        <DialogTitle>{dialogOpts.title}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="notification-dialog-description">
                                <div
                                    className='notification-container'
                                >
                                    {
                                        dialogOpts.message.map((noti, index) => (
                                            <div
                                                className={`notification-item ${noti.type}`}
                                            >
                                                <span>{noti.msg}</span>
                                                {noti.icon}
                                            </div>
                                        ))
                                    }
                                </div>
                            </DialogContentText>
                        </DialogContent>
                    </Dialog>
                </>
            );
        }
    };

    const handleSearchChange = (event) => {
        const srchVal = event.target.value.toLowerCase() || '';
        setSearchVal(srchVal);
    };
    const matchesSearchValue = (mail, index) => {
        let returnTrue = false;
        const srcV = srchValue.trim();
        if (srcV.length > 0) {
            if (
                mail.from.toLowerCase().includes(srchValue) ||
                mail.subject.toLowerCase().includes(srchValue) ||
                mail.message.toLowerCase().includes(srchValue)
            ) {
                returnTrue = true;
            };
        } else {
            returnTrue = true;
        }
        if (returnTrue) {
            return (
                <div
                    className='mView-prnt'
                    key={`prnt-dv-${index}`}
                >
                    <div
                        className={`chkbx-container ${index === 0 ? 'fot' : ''}`}
                        key={`chk-ky-${index}-${mail.id}`}
                    >
                        <Checkbox
                            checked={!!mailOpts.find((mI) => mI.id === mail.id).checked}
                            onClick={() => { handleSelection(mail.id) }}
                        />
                    </div>
                    <div
                        className={`mail-item ${mail.read ? 'read' : 'unread'} ${index === 0 ? 'fot' : ''}`}
                        onClick={() => { openMail(mail.id) }}
                        key={`mail-ky-${index}-${mail.id}`}
                    >
                        <div
                            className='mail-from'
                            key={'mFrom-ky'}
                        >{mail.from}</div>
                        <div
                            key={'mSbj-ky'}
                        >{mail.subject} - {mail.message}</div>
                    </div>
                </div>
            );
        } else {
            return (
                <div style={{ display: 'none' }}></div>
            )
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <React.Fragment>
                {Object.keys(dialogOpts).length > 0 &&
                    <div>{getDialogComp()}</div>
                }
            </React.Fragment>
            <div>
                <Drawer open={open} onClose={toggleDrawer(false)}>
                    {DrawerList}
                </Drawer>
            </div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        {viewName}
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={handleSearchChange}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            aria-label="show new notifications"
                            color="inherit"
                            disabled={noitficats.length === 0}
                            onClick={
                                () => {
                                    handleDialogClickOpen(
                                        {
                                            title: 'Notifications',
                                            type: 'notifications',
                                            message: noitficats,
                                        }
                                    )
                                }
                            }
                        >
                            {noitficats.length > 0 &&
                                <Badge badgeContent={noitficats.length} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            }
                            {noitficats.length === 0 &&
                                <NotificationsIcon />
                            }
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            <div
                className='main-container'
                key={'mCnt-key'}
            >
                <div
                    className='button-bar'
                    key={'bBar-ky'}
                >
                    <Tooltip title="Move selected items to Inbox">
                        <IconButton
                            aria-label="move to inbox"
                            disabled={!hasCheckedMail() || ['Inbox', 'All Mail'].includes(viewName)}
                            onClick={() => handleSelectionButton('inbox')}
                            key={'inbox-btn-ky'}
                        >
                            <InboxIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Mark selected items as Spam">
                        <IconButton
                            aria-label="mark as spam"
                            disabled={!hasCheckedMail() || ['Spam', 'All Mail'].includes(viewName)}
                            onClick={() => handleSelectionButton('spam')}
                            key={'spam-btn-ky'}
                        >
                            <NewReleasesIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Move selected items to Trash">
                        <IconButton
                            disabled={!hasCheckedMail() || ['Trash', 'All Mail'].includes(viewName)}
                            aria-label="delete email"
                            onClick={() => handleSelectionButton('delete')}
                            key={'delete-btn-ky'}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                    <div key={'vDiv1-ky'} className='v-dv'></div>
                    <Tooltip title="Mark all selected as Read">
                        <IconButton
                            disabled={mailOpts.filter((mO) => mO.checked && !mO.read).length <= 0 || mailOpts.filter((mO) => mO.checked && mO.read).length > 0}
                            aria-label="mark as read"
                            onClick={() => handleSelectionButton('read')}
                            key={'read-btn-ky'}
                        >
                            <DraftsIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Mark all selected as UnRead">
                        <IconButton
                            disabled={mailOpts.filter((mO) => mO.checked && mO.read).length <= 0 || mailOpts.filter((mO) => mO.checked && !mO.read).length > 0}
                            aria-label="mark as unread"
                            onClick={() => handleSelectionButton('unread')}
                            key={'unread-btn-ky'}
                        >
                            <MailIcon />
                        </IconButton>
                    </Tooltip>
                    <div key={'vDiv2-ky'} className='v-dv'></div>
                    <Tooltip title="Reset mailbox messages">
                        <IconButton
                            aria-label="get incoming messages"
                            onClick={() => handleSelectionButton('refresh')}
                            key={'rfrsh-btn-ky'}
                        >
                            <RefreshIcon />
                        </IconButton>
                    </Tooltip>
                </div>
                <div
                    className={`mail-view-container`}
                    key={'mView-ky'}
                >
                    {mailOpts.map((mail, index) =>
                        matchesSearchValue(mail, index)
                    )}
                    {mailOpts.length <= 0 &&
                        <div
                            style={{
                                width: '100%',
                                gridColumn: 'span 2',
                            }}
                            className='no-mail'
                            key={'noMail-ky'}
                        >
                            No mail in this view.
                        </div>
                    }
                </div>
            </div>
        </Box>
    );
}