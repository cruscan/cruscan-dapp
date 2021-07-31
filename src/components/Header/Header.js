import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpen from '@material-ui/icons/MenuOpen';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import logo from '../../assets/logo/cruscan_full_v1-white.svg';
import style from '../../assets/jss/components/headerStyle';
import { OpenSideBarContext } from '../../layouts/Explore/Explore';

const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        top: theme.spacing(2) + 3,
        left: -theme.spacing(0.5),
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))(Badge);

const useStyles = makeStyles(style);

export const SidebarContext = React.createContext();

export default function Header() {
    const classes = useStyles();
    const theme = useTheme();
    const smallDisplay = useMediaQuery(theme.breakpoints.down('xs'));

    const openSideBar = useContext(OpenSideBarContext);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: false,
            })}
            style={{ background: '#343434' }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={openSideBar.handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, {
                        [classes.hide]: openSideBar.open,
                    })}
                >
                    <MenuIcon />
                </IconButton>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={openSideBar.handleDrawerClose}
                    edge="start"
                    className={clsx(classes.menuButton, {
                        [classes.hide]: !openSideBar.open,
                    })}
                >
                    <MenuOpen />
                </IconButton>
                <img src={logo} alt="Logo" className={classes.logo} />

                <div>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        variant="dot"
                        invisible={smallDisplay}
                    >
                        <Button
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                            endIcon={<ArrowDropDownIcon />}
                            style={{ textTransform: 'none', color: '#fff' }}
                        >
                            <Box
                                component="div"
                                display={smallDisplay ? 'none' : 'block'}
                            >
                                wss://api.decloudf.com/
                            </Box>
                        </Button>
                    </StyledBadge>

                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>
                            wss://api.decloudf.com/
                        </MenuItem>
                        <MenuItem onClick={handleClose} disabled>
                            wss://api.crust.network
                        </MenuItem>

                        <MenuItem onClick={handleClose} disabled>
                            Share your WebSocket
                        </MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
}
