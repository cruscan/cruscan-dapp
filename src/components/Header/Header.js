import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpen from '@material-ui/icons/MenuOpen';
import Paper from '@material-ui/core/Paper';

import Visibility from '@material-ui/icons/Visibility';
import InputAdornment from '@material-ui/core/InputAdornment';

import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Badge from '@material-ui/core/Badge';
import axios from 'axios';

import CircularProgress from '@material-ui/core/CircularProgress';

import { ApiPromise, WsProvider } from '@polkadot/api';
import { typesBundleForPolkadot } from '@crustio/type-definitions';

import ShareIcon from '@material-ui/icons/Share';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';

import InfoIcon from '@material-ui/icons/Info';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import logo from '../../assets/logo/cruscan_full_v1-white.svg';

import Sidebar from '../Sidebar/Sidebar';

import style from '../../assets/jss/components/headerStyle';

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

function createData(name, calories, fat, carbs, protein, price) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
        price,
        history: [
            { date: '2020-01-05', customerId: '11091700', amount: 3 },
            { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
        ],
    };
}

function Row(props) {
    const classes = useStyles();
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const consensusDate = new Date(2021, 0, 26, 6, 56, 36);
    console.log(row.reported_replica_count);
    return (
        <>
            <TableRow>
                <TableCell
                    style={{ paddingRight: 0 }}
                    className={classes.hideOnSmall}
                >
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell
                    component="th"
                    scope="row"
                    style={{
                        wordWrap: 'anywhere',
                    }}
                    align="center"
                >
                    {row.cid}
                </TableCell>
                <TableCell align="center">
                    {row.reported_replica_count === undefined ? (
                        <CircularProgress size={20} />
                    ) : (
                        row.reported_replica_count
                    )}
                </TableCell>
                <TableCell align="center">
                    {row.file_size ? (
                        `${
                            Math.round((row.file_size / 1024 / 1024) * 100) /
                            100
                        }MB`
                    ) : (
                        <CircularProgress size={20} />
                    )}
                </TableCell>
                <TableCell align="center" className={classes.hideOnSmall}>
                    {row.calculated_at ? (
                        new Date(
                            consensusDate.getTime() +
                                row.calculated_at * 6 * 1000
                        )
                            .toISOString()
                            .split('T')[0]
                    ) : (
                        <CircularProgress size={20} />
                    )}
                </TableCell>
                <TableCell align="center">
                    {row.expired_on ? (
                        new Date(
                            consensusDate.getTime() + row.expired_on * 6 * 1000
                        )
                            .toISOString()
                            .split('T')[0]
                    ) : (
                        <CircularProgress size={20} />
                    )}
                </TableCell>
                <TableCell align="center" className={classes.hideOnSmall}>
                    {typeof row.prepaid === 'number' ? (
                        row.prepaid
                    ) : (
                        <CircularProgress size={20} />
                    )}
                </TableCell>
            </TableRow>

            <TableRow className={classes.hideOnSmall}>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                            >
                                Technical Replicas Info
                            </Typography>
                            <Table size="small" aria-label="orderStatus">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Anchor</TableCell>
                                        <TableCell>Is Reported</TableCell>
                                        <TableCell align="right">
                                            Valid At
                                        </TableCell>
                                        <TableCell align="right">Who</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.replicas.map((historyRow) => (
                                        <TableRow key={historyRow.anchor}>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                style={{
                                                    wordWrap: 'anywhere',
                                                    width: 350,
                                                }}
                                            >
                                                {historyRow.anchor}
                                            </TableCell>
                                            <TableCell>
                                                {historyRow.is_reported}
                                            </TableCell>
                                            <TableCell align="right">
                                                {historyRow.valid_at}
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                style={{ wordWrap: 'anywhere' }}
                                            >
                                                {historyRow.who}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        cid: PropTypes.string.isRequired,
        amount: PropTypes.number,
        calculated_at: PropTypes.number,
        replicas: PropTypes.arrayOf(
            PropTypes.shape({
                anchor: PropTypes.string,
                is_reported: PropTypes.bool,
                valid_at: PropTypes.number,
                who: PropTypes.string,
            })
        ),
        reported_replica_count: PropTypes.number,
        expired_on: PropTypes.number,
        file_size: PropTypes.number,
        prepaid: PropTypes.number,
    }).isRequired,
};

const consensusDate = new Date(2021, 0, 26, 6, 56, 36);

export const SidebarContext = React.createContext();

export default function MiniDrawer() {
    const classes = useStyles();
    const theme = useTheme();
    const smallDisplay = useMediaQuery(theme.breakpoints.down('xs'));

    const [valueInput, setValueInput] = React.useState('');
    const [rowsState, setRowsState] = React.useState([]);
    const [cidCruScan, setCidCruScan] = React.useState('');
    const [cruScanLink, setCruScanLink] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const getOrderInfo = async () => {
        if (valueInput !== '') {
            for (let i = 0; i < rowsState.length; i += 1) {
                if (valueInput === rowsState[i].cid) {
                    rowsState.splice(i, 1);
                    setRowsState([...rowsState]);
                    break;
                }
            }
            rowsState.unshift({ cid: valueInput, replicas: [] });
            setRowsState([...rowsState]);

            const wsProvider = new WsProvider('wss://api.decloudf.com/');
            const api = await ApiPromise.create({
                provider: wsProvider,
                typesBundle: typesBundleForPolkadot,
            });
            await api.isReadyOrError;

            const maybeFileUsedInfo = JSON.parse(
                await api.query.market.files(valueInput)
            );
            if (maybeFileUsedInfo) {
                for (let i = 0; i < rowsState.length; i += 1) {
                    if (valueInput === rowsState[i].cid) {
                        rowsState.splice(i, 1);
                        setRowsState([...rowsState]);
                        break;
                    }
                }
                rowsState.unshift({ cid: valueInput, ...maybeFileUsedInfo[0] });
                setRowsState([...rowsState]);
            } else {
                for (let i = 0; i < rowsState.length; i += 1) {
                    if (valueInput === rowsState[i].cid) {
                        rowsState.splice(i, 1);
                        setRowsState([...rowsState]);
                        break;
                    }
                }

                rowsState.unshift({
                    cid: valueInput,
                    reported_replica_count: 'Not found',
                });
                setRowsState([...rowsState]);
            }

            setValueInput('');
        }
    };

    const eraseCid = () => {
        setValueInput('');
    };

    const eraseResult = () => {
        setRowsState([]);
    };

    useEffect(() => {
        axios
            .get(
                'https://raw.githubusercontent.com/cruscan/release-info/main/v1.0.0.json'
            )
            .then((res) => {
                setCidCruScan(res.data.cid);
                setCruScanLink(`https://ipfs.io/ipfs/${res.data.cid}`);
            });
    }, []);
    return (
        <div className={classes.root}>
            <CssBaseline />
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
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerClose}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: !open,
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
            <SidebarContext.Provider value={{ open, handleDrawerClose }}>
                <Sidebar />
            </SidebarContext.Provider>

            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Grid container spacing={1}>
                    <Grid item xs={12} md={4}>
                        <Paper
                            elevation={0}
                            classes={{ root: classes.customColorProjectInfo }}
                            className={classes.paper}
                        >
                            <Grid container xs={12} spacing={1}>
                                <Grid item xs={3}>
                                    <InfoIcon
                                        style={{ fontSize: 50, color: '#fff' }}
                                    />
                                </Grid>
                                <Grid item xs={9}>
                                    <Grid container xs={12}>
                                        <Grid item xs={12}>
                                            <Box
                                                component="h2"
                                                color="white"
                                                p={0}
                                                m={0}
                                                textAlign="left"
                                                fontWeight="400"
                                            >
                                                CruScan CID
                                            </Box>
                                            <Box
                                                component="h5"
                                                color="white"
                                                fontWeight="100"
                                                p={0}
                                                m={0}
                                                mb={0.5}
                                                textAlign="left"
                                                style={{
                                                    wordWrap: 'break-word',
                                                }}
                                            >
                                                {cidCruScan}
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container xs={12} spacing={1}>
                                                <Grid item>
                                                    <IconButton
                                                        aria-label="delete"
                                                        classes={{
                                                            root: classes.iconInCards,
                                                        }}
                                                        size="small"
                                                        href={cruScanLink}
                                                        target="_blank"
                                                    >
                                                        <ExitToAppIcon />
                                                    </IconButton>
                                                </Grid>
                                                <Grid item>
                                                    <IconButton
                                                        aria-label="delete"
                                                        classes={{
                                                            root: classes.iconInCards,
                                                        }}
                                                        size="small"
                                                        onClick={() =>
                                                            navigator.clipboard.writeText(
                                                                cidCruScan
                                                            )
                                                        }
                                                    >
                                                        <FileCopyIcon />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper
                            elevation={0}
                            classes={{
                                root: classes.customColorHackerChallenge,
                            }}
                            className={classes.paper}
                        >
                            <Grid container xs={12} spacing={1}>
                                <Grid item xs={3}>
                                    <ThumbsUpDownIcon
                                        style={{ fontSize: 50, color: '#fff' }}
                                    />
                                </Grid>
                                <Grid item xs={9}>
                                    <Grid container xs={12}>
                                        <Grid item xs={12}>
                                            <Box
                                                component="h3"
                                                color="white"
                                                p={0}
                                                m={0}
                                                textAlign="left"
                                                fontWeight="400"
                                            >
                                                DDOS challenge. I dare you,
                                                hackers!
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper
                            elevation={0}
                            classes={{ root: classes.customColorHackerPool }}
                            className={classes.paper}
                        >
                            <Grid container xs={12} spacing={1}>
                                <Grid item xs={3}>
                                    <AttachMoneyIcon
                                        style={{ fontSize: 50, color: '#fff' }}
                                    />
                                </Grid>
                                <Grid item xs={9}>
                                    <Grid container xs={12}>
                                        <Grid item xs={12}>
                                            <Box
                                                component="h3"
                                                color="white"
                                                p={0}
                                                m={0}
                                                textAlign="left"
                                                fontWeight="400"
                                            >
                                                Hackers&apos;s reward if success
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={3} style={{ marginTop: 1 }}>
                    <Grid item xs={12}>
                        <Paper elevation={1} className={classes.paper}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Box
                                                component="h2"
                                                m={0}
                                                textAlign="left"
                                                fontWeight="500"
                                                color="#000"
                                            >
                                                Scan Order
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="CID"
                                                variant="outlined"
                                                fullWidth="true"
                                                style={{
                                                    marginTop: 10,
                                                }}
                                                value={valueInput}
                                                onChange={(e) =>
                                                    setValueInput(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            style={{ marginTop: 10 }}
                                        >
                                            <Grid container>
                                                <Button
                                                    color="primary"
                                                    onClick={getOrderInfo}
                                                >
                                                    Scan
                                                </Button>
                                                <Button
                                                    color="secondary"
                                                    onClick={eraseCid}
                                                >
                                                    Erase CID
                                                </Button>
                                                <Button
                                                    style={{ color: '#ff6f00' }}
                                                    onClick={eraseResult}
                                                >
                                                    Erase Results
                                                </Button>
                                                <Button disabled>Help</Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>

                <TableContainer
                    component={Paper}
                    // style={{ marginTop: 10, overflowX: 'auto', width: '100%' }}
                    style={{ marginTop: 10 }}
                >
                    <Table
                        aria-label="collapsible table"
                        // style={{ minWidth: 700 }}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.hideOnSmall} />
                                <TableCell align="center">CID</TableCell>
                                <TableCell
                                    align="center"
                                    style={{
                                        wordWrap: 'anywhere',
                                    }}
                                >
                                    Replicas
                                </TableCell>
                                <TableCell align="center">File Size</TableCell>
                                <TableCell
                                    align="center"
                                    className={classes.hideOnSmall}
                                >
                                    Last Storage Order
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{
                                        wordWrap: 'anywhere',
                                    }}
                                >
                                    Expired On
                                </TableCell>
                                <TableCell
                                    align="center"
                                    className={classes.hideOnSmall}
                                >
                                    Prepaid
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rowsState.map((row) => (
                                <Row key={row.name} row={row} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </main>
        </div>
    );
}
