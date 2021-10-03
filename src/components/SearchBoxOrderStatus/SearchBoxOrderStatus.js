import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import { ApiPromise, WsProvider } from '@polkadot/api';
import { typesBundleForPolkadot } from '@crustio/type-definitions';

import style from '../../assets/jss/components/searchBoxOrderStatusStyle';

const useStyles = makeStyles(style);

function Row(props) {
    const classes = useStyles();
    const { row } = props;
    const [open, setOpen] = useState(false);
    const consensusDate = new Date(2021, 6, 9, 7, 50, 30);
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
                    {row.reported_replica_count === null ? (
                        <CircularProgress size={20} />
                    ) : (
                        row.reported_replica_count
                    )}
                </TableCell>
                <TableCell align="center">
                    {row.file_size
                        ? `${
                              Math.round((row.file_size / 1024 / 1024) * 100) /
                              100
                          }MB`
                        : ''}
                </TableCell>
                <TableCell align="center" className={classes.hideOnSmall}>
                    {row.calculated_at
                        ? new Date(
                              consensusDate.getTime() +
                                  row.calculated_at * 6 * 1000
                          )
                              .toISOString()
                              .split('T')[0]
                        : ''}
                </TableCell>
                <TableCell align="center">
                    {row.expired_at
                        ? new Date(
                              consensusDate.getTime() +
                                  row.expired_at * 6 * 1000
                          )
                              .toISOString()
                              .split('T')[0]
                        : ''}
                </TableCell>
                <TableCell align="center" className={classes.hideOnSmall}>
                    {typeof row.prepaid === 'number' ? row.prepaid : ''}
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

export default function SearchBoxOrderStatus() {
    const classes = useStyles();

    const [valueInput, setValueInput] = useState('');
    const [rowsState, setRowsState] = useState([]);

    const getOrderInfo = async () => {
        if (valueInput !== '') {
            for (let i = 0; i < rowsState.length; i += 1) {
                if (valueInput === rowsState[i].cid) {
                    rowsState.splice(i, 1);
                    setRowsState([...rowsState]);
                    break;
                }
            }

            rowsState.unshift({
                cid: valueInput,
                replicas: [],
                amount: null,
                calculated_at: null,
                expired_at: null,
                file_size: null,
                prepaid: null,
                reported_replica_count: null,
            });
            setRowsState([...rowsState]);

            const wsProvider = new WsProvider('wss://rpc.crust.network');
            const api = await ApiPromise.create({
                provider: wsProvider,
                typesBundle: typesBundleForPolkadot,
            });
            await api.isReadyOrError;
            let maybeFileUsedInfo = null;
            try {
                const rawInfo = await api.query.market.files(valueInput);
                maybeFileUsedInfo = JSON.parse(rawInfo);
                console.log(maybeFileUsedInfo)
                // eslint-disable-next-line no-empty
            } catch (e) {}

            if (maybeFileUsedInfo) {
                for (let i = 0; i < rowsState.length; i += 1) {
                    if (valueInput === rowsState[i].cid) {
                        rowsState.splice(i, 1);
                        setRowsState([...rowsState]);
                        break;
                    }
                }
                rowsState.unshift({ cid: valueInput, ...maybeFileUsedInfo });
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
                    replicas: [],
                    amount: '',
                    calculated_at: '',
                    expired_at: '',
                    file_size: '',
                    prepaid: '',
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

    return (
        <>
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
                                                setValueInput(e.target.value)
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
        </>
    );
}
