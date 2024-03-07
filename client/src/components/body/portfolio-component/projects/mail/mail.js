import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Checkbox from '@mui/material/Checkbox';

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

import './mail.css';

let staticMail = [
    {
        id: 1,
        to: 'user@user.mail',
        from: 'otherUser@other.mail',
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
        from: 'oddball@other.mail',
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
        from: 'lover@other.mail',
        subject: `Can't wait to see you ;)`,
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
        from: 'fourth@other.mail',
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
        from: 'fifth@other.mail',
        subject: `Interview Meeting`,
        message: `
            Looking forward to speaking with you about the position.
        `,
        html: '',
        read: false,
        checked: false,
    },
];
const mailViews = {
    inbox: [],
    trash: [],
    spam: [],
    sent: [],
};
const notifications = [];

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

export default function Mail() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [checkedMail, setCheckedMail] = React.useState({});
    const [viewName, setViewName] = React.useState('Inbox');

    const [mailOpts, setMailOpts] = React.useState([]);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
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
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
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
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
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
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    const getCurrentInbox = () => {
        const curInbox = [
            ...mailViews.inbox,
            ...mailViews.trash,
            ...mailViews.spam
        ].length ? mailViews.inbox : staticMail;
        const filteredMail = curInbox.filter(
            (iMail) =>
                !(mailViews.spam.find((sMail) => sMail.id === iMail.id)) &&
                !(mailViews.trash.find((tMail) => tMail.id === iMail.id))
        ) || [];
        mailViews.inbox = filteredMail;
        return filteredMail;
    };

    const handleDrawerSelection = (selView) => {
        unCheckMail();
        setViewName(selView);
        const curView = selView.toLowerCase();
        console.log(mailViews);

        if (selView === 'All Mail') {
            const allMail = [
                ...mailViews.inbox,
                ...mailViews.trash,
                ...mailViews.spam
            ];
            setMailOpts(allMail);
        } else {
            console.log(mailViews);
            setMailOpts(mailViews[curView]);
        }
        console.log('');
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
        alert(selMail.message);
    };

    const hasCheckedMail = () => {
        return mailOpts?.length && mailOpts.some((mail) => mail.checked);
    };

    const handleSelectionButton = (btnType) => {
        switch (btnType) {
            case 'inbox':
                // mailViews.inbox = [
                //     ...mailViews.trash,
                //     ...mailViews.spam
                // ].filter((mail) => mail.checked);
                // mailViews.spam = mailViews.spam.filter((mail) => !mail.checked);
                // mailViews.trash = mailViews.trash.filter((mail) => !mail.checked);
                // console.log(mailViews);
                // reSetMailOpts();
                break;
            case 'delete':
                mailViews.trash = [
                    ...mailViews.inbox,
                    ...mailViews.spam
                ].filter((mail) => mail.checked);
                mailViews.spam = mailViews.spam.filter((mail) => !mail.checked);
                mailViews.inbox = mailViews.inbox.filter((mail) => !mail.checked);
                console.log(mailViews);
                reSetMailOpts();
                break;
            case 'spam':
                mailViews.spam = [
                    ...mailViews.inbox,
                    ...mailViews.trash
                ].filter((mail) => mail.checked);
                mailViews.trash = mailViews.trash.filter((mail) => !mail.checked);
                mailViews.inbox = mailViews.inbox.filter((mail) => !mail.checked);
                console.log(mailViews);
                reSetMailOpts();
                break;
            case 'read':
            case 'unread':
                const isRead = btnType === 'read';
                const newMOpts = mailOpts.map((mail) => {
                    if (mail.checked) {
                        mail.read = isRead;
                        mail.checked = false;
                    }
                    return mail;
                });
                setMailOpts(newMOpts);
                break;
            case 'refresh':
                const newMOptsR = getCurrentInbox();
                setMailOpts(newMOptsR);
                break;
        }
    };
    const reSetMailOpts = () => {
        const newMailOpts = mailOpts.filter((mail) => !mail.checked);
        // mailViews.inbox = mailViews.inbox.map((mvS) => ({ ...mvS, checked: false }));
        mailViews.trash = mailViews.trash.map((mvT) => ({ ...mvT, checked: false }));
        mailViews.spam = mailViews.spam.map((mvS) => ({ ...mvS, checked: false }));        
        console.log(mailViews);
        console.log('');
        console.log(newMailOpts);
        console.log('');
        setMailOpts(newMailOpts);
    };

    const unCheckMail = () => {
        const newMailOpts = mailOpts.map((mail) => {
            mail.checked = false;
            return mail;
        });
        setMailOpts(newMailOpts);
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
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
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
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
            >
                <div
                    className='button-bar'
                >
                    <IconButton
                        aria-label="mark as spam"
                        disabled={!hasCheckedMail() || viewName === 'Inbox'}
                        onClick={() => handleSelectionButton('inbox')}
                    >
                        <InboxIcon />
                    </IconButton>
                    <IconButton
                        aria-label="mark as spam"
                        disabled={!hasCheckedMail() || viewName === 'Spam'}
                        onClick={() => handleSelectionButton('spam')}
                    >
                        <NewReleasesIcon />
                    </IconButton>
                    <IconButton
                        disabled={!hasCheckedMail()}
                        aria-label="delete email"
                        onClick={() => handleSelectionButton('delete')}
                    >
                        <DeleteIcon />
                    </IconButton>
                    <IconButton
                        disabled={mailOpts.filter((mO) => mO.checked && !mO.read).length <= 0}
                        aria-label="mark as read"
                        onClick={() => handleSelectionButton('read')}
                    >
                        <DraftsIcon />
                    </IconButton>
                    <IconButton
                        disabled={mailOpts.filter((mO) => mO.checked && mO.read).length <= 0}
                        aria-label="mark as unread"
                        onClick={() => handleSelectionButton('unread')}
                    >
                        <MailIcon />
                    </IconButton>
                    <IconButton
                        disabled={viewName !== 'Inbox'}
                        aria-label="get incoming messages"
                        onClick={() => handleSelectionButton('refresh')}
                    >
                        <RefreshIcon />
                    </IconButton>
                </div>
                <div
                    className={`mail-view-container`}
                >
                    {mailOpts.map((mail, index) => (
                        <>
                            <div
                                className='chkbx-container'
                            >
                                <Checkbox
                                    checked={!!mailOpts.find((mI) => mI.id === mail.id).checked}
                                    onClick={() => { handleSelection(mail.id) }}
                                />
                            </div>
                            <div
                                className={`mail-item ${mail.read ? 'read' : 'unread'} ${index === 0 ? 'fot' : ''}`}
                                onClick={() => { openMail(mail.id) }}
                            >
                                <div
                                    className='mail-from'
                                >{mail.from}</div>
                                <div>{mail.subject} - {mail.message}</div>
                            </div>
                        </>
                    ))}
                    {mailOpts.length <= 0 &&
                        <div
                            style={{
                                width: '100%',
                                gridColumn: 'span 2',
                            }}
                            className='no-mail'
                        >
                            No mail in this view.
                        </div>
                    }
                </div>
            </div>
        </Box>
    );
}