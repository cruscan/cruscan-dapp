import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import AllInboxIcon from '@material-ui/icons/AllInbox';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import AppsIcon from '@material-ui/icons/Apps';
import YoutubeSearchedForIcon from '@material-ui/icons/YoutubeSearchedFor';

import InfoIcon from '@material-ui/icons/Info';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// eslint-disable-next-line import/no-cycle
import { OpenSideBarContext } from '../../layouts/Explore/Explore';

import style from '../../assets/jss/components/sidebarStyle';

const useStyles = makeStyles(style);

export default function Sidebar() {
    const classes = useStyles();
    const theme = useTheme();
    const openSideBar = useContext(OpenSideBarContext);
    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: openSideBar.open,
                [classes.drawerClose]: !openSideBar.open,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: openSideBar.open,
                    [classes.drawerClose]: !openSideBar.open,
                }),
            }}
        >
            <div className={classes.toolbar}>
                <IconButton onClick={openSideBar.handleDrawerClose}>
                    {theme.direction === 'rtl' ? (
                        <ChevronRightIcon />
                    ) : (
                        <ChevronLeftIcon />
                    )}
                </IconButton>
            </div>
            <Divider />
            <List>
                <ListItem button key="home">
                    <ListItemIcon>
                        <AppsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button key="orderscan" disabled>
                    <ListItemIcon>
                        <YoutubeSearchedForIcon />
                    </ListItemIcon>
                    <ListItemText primary="Order Scan" />
                </ListItem>
                <ListItem button key="accountorders" disabled>
                    <ListItemIcon>
                        <AllInboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Account Orders" />
                </ListItem>
                <ListItem button disabled key="getjson">
                    <ListItemIcon>
                        <AllInclusiveIcon />
                    </ListItemIcon>
                    <ListItemText primary="Get CID json" />
                </ListItem>
                <ListItem button disabled key="placestorageorder">
                    <ListItemIcon>
                        <CloudUploadIcon />
                    </ListItemIcon>
                    <ListItemText primary="Place Storage Order" />
                </ListItem>
                <ListItem button disabled key="reneworder">
                    <ListItemIcon>
                        <AutorenewIcon />
                    </ListItemIcon>
                    <ListItemText primary="Renew Order" />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button disabled key="reneworder">
                    <ListItemIcon>
                        <InfoIcon />
                    </ListItemIcon>
                    <ListItemText primary="About Cruscan" />
                </ListItem>
            </List>
        </Drawer>
    );
}
