import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles/';

import Grid from '@material-ui/core/Grid';
import InfoIcon from '@material-ui/icons/Info';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import axios from 'axios';

import style from '../../assets/jss/components/globalAnnounce';

const useStyle = makeStyles(style);
export default function GlobalAnnounce() {
    const classes = useStyle();
    const [cidCruScan, setCidCruScan] = React.useState('');
    const [cruScanLink, setCruScanLink] = React.useState('');

    useEffect(() => {
        axios
            .get(
                'https://raw.githubusercontent.com/cruscan/cruscan-dapp/main/release/v2.2.0.json'
            )
            .then((res) => {
                setCidCruScan(res.data.cid);
                setCruScanLink(`https://ipfs.io/ipfs/${res.data.cid}`);
            });
    }, []);

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
                <Paper
                    elevation={0}
                    classes={{ root: classes.customColorProjectInfo }}
                    className={classes.paper}
                >
                    <Grid container xs={12} spacing={1}>
                        <Grid item xs={3}>
                            <InfoIcon style={{ fontSize: 50, color: '#fff' }} />
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
                                        This website is build on IPFS and pinned
                                        on Crust Network
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
                                        The maintaining fee for the website is
                                        zero.
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}
