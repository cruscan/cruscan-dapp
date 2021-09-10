import React, { createContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles/';
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from '../../views/Home/Home';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import style from '../../assets/jss/layouts/explore';

const useStyles = makeStyles(style);

export const OpenSideBarContext = createContext();

export default function Explore() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <OpenSideBarContext.Provider
                value={{ open, handleDrawerOpen, handleDrawerClose }}
            >
                <CssBaseline />
                <Header />
            </OpenSideBarContext.Provider>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Home />
            </main>
            {/* <div>{switchRoutes}</div> */}
        </div>
    );
}
