import React from "react";
import { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons components
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import CardHeader from "@material-ui/core/CardHeader";
import EmojiEvents from "@material-ui/icons/EmojiEvents";
import GroupAdd from "@material-ui/icons/GroupAdd";
import InsertChartOutlined from "@material-ui/icons/InsertChartOutlined";
import PieChart from "@material-ui/icons/PieChart";
import Button from '@material-ui/core/Button';

// core components
import CardStats from "components/Cards/CardStats.js";
import componentStyles from "assets/theme/components/header.js";
import { useStore } from "../../store";
import { scryEndpoints, subscribeEndpoints, threadEndpoints, pokeEndpoints } from "../../urbit/endpoints";


async function scry(scryInterface) {
    return window.urbitVisor.scry(scryInterface)
}




export default function Debug() {
    const useStyles = makeStyles(componentStyles);
    const classes = useStyles();
    const theme = useTheme();
    const [scryApp, setScryApp] = useState("graph-store");
    const [scryPath, setScryPath] = useState("graph-store");
    //
    const [threadInputMark, setThreadInputMark] = useState("graph-store");
    const [threadOutputMark, setThreadOutputMark] = useState("graph-store");
    const [threadName, setThreadName] = useState("graph-store");
    const [threadBody, setThreadBody] = useState("graph-store");
    //
    const [pokeApp, setPokeApp] = useState("graph-store");
    const [pokeMark, setPokeMark] = useState("graph-store");
    const [pokeJSON, setPokeJSON] = useState("graph-store");
    //
    const [subscribeApp, setSubscribeApp] = useState("graph-store");
    const [subscribePath, setSubscribePath] = useState("graph-store");


    const [request, setRequest] = useState("");
    const [subscriptions, setSubscriptions] = useState([]);
    const [scryResults, setScryResults] = useState("");
    const [events, setEvents] = useState([]);

    useEffect(() => {
        window.addEventListener("message", sseHandler, false);
        return () => window.removeEventListener("message", sseHandler);
    }, [events])

    function sseHandler(message){
        if (message.data.app == "urbitVisorEvent") {
            console.log(message.data.event, "message!")
            console.log(events, "events")
            setEvents([...events, message.data.event])
        }
    }

    function handleScry() {
        scry({ app: scryApp, path: scryPath })
            .then(res => {
                console.log(res)
                setRequest(`Scrying: ${scryApp}${scryPath}`)
                setScryResults(res.response || "error")
            })
    }
    function handleThread() {
        window.urbitVisor.thread({ threadName: threadName, inputMark: threadInputMark, outputMark: threadOutputMark, body: threadBody })
            .then(res => {
                console.log(res)
                setRequest(`Posted ${threadBody} to thread: ${threadName}${threadInputMark}${threadOutputMark}`)
                // setResults(res.response)
            })
    }
    function handlePoke() {
        window.urbitVisor.poke({ app: pokeApp, mark: pokeMark, json: pokeJSON })
            .then(res => {
                console.log(res)
                setRequest(`Poked: ${pokeApp}${pokeMark} with ${JSON.stringify(pokeJSON)}\n`)
                // setResults(res.response)
            })
    }
    function handleSubscribe() {
        window.urbitVisor.subscribe({ app: subscribeApp, path: subscribePath })
            .then(res => {
                console.log(res)
                setSubscriptions([...subscriptions, `${subscribeApp}${subscribePath}`])
                // setResults(res.response)
            })
    }
    const scryApps = Object.keys(scryEndpoints);
    const availableScryPaths = () => scryEndpoints[scryApp] || [];
    const subscribeApps = Object.keys(subscribeEndpoints);
    const availableSubscribePaths = () => subscribeEndpoints[subscribeApp] || [];
    const threads = Object.keys(threadEndpoints);
    const pokes = Object.keys(pokeEndpoints);



    return (
        <>
            <div className={classes.header}>
                <Container
                    maxWidth={false}
                    component={Box}
                    classes={{ root: classes.containerRoot }}
                >
                    <div>
                        <Grid container>
                            <Grid item xl={3} lg={6} xs={12}>
                                <Card classes={{ root: classes.cardRoot }} elevation={6}>
                                    <CardContent classes={{ root: classes.cardContentRoot }}>
                                        <Box
                                            component={Typography}
                                            variant="h5"
                                            color={theme.palette.gray[600] + "!important"}
                                            marginBottom="1rem!important"
                                            marginTop="0!important"
                                            className={classes.textUppercase}
                                        >
                                            SCRY
                                        </Box>
                                        <Box
                                            component="div"
                                            fontSize=".875rem"
                                            marginBottom="1rem"
                                        >
                                            <Autocomplete
                                                freeSolo
                                                inputValue={scryApp}
                                                onInputChange={(event, newInputValue) => {
                                                    setScryApp(newInputValue);
                                                }}
                                                id="scry-app"
                                                options={scryApps}
                                                renderInput={(params) => <TextField {...params} label="gall app" variant="outlined" />}
                                            />
                                        </Box>
                                        <Box
                                            component="div"
                                            fontSize=".875rem"
                                            marginBottom="1rem"
                                        >
                                            <Autocomplete
                                                freeSolo
                                                id="scry-path"
                                                options={availableScryPaths()}
                                                inputValue={scryPath}
                                                onInputChange={(event, newInputValue) => {
                                                    setScryPath(newInputValue);
                                                }}
                                                renderInput={(params) => <TextField {...params} label="scry path" variant="outlined" />}
                                            />
                                        </Box>
                                        <Box
                                            component="div"
                                            fontSize=".875rem"
                                            color={theme.palette.gray[600]}
                                            display="flex"
                                            alignItems="center"
                                            flexWrap="wrap"
                                        >
                                            <Button
                                                onClick={handleScry}
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                            >
                                                Submit
                                            </Button>
                                        </Box>

                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xl={3} lg={6} xs={12}>
                                <Card classes={{ root: classes.cardRoot }} elevation={6}>
                                    <CardContent classes={{ root: classes.cardContentRoot }}>
                                        <Box
                                            component={Typography}
                                            variant="h5"
                                            color={theme.palette.gray[600] + "!important"}
                                            marginBottom="1rem!important"
                                            marginTop="0!important"
                                            className={classes.textUppercase}
                                        >
                                            THREAD
                                        </Box>
                                        <Box
                                            component="div"
                                            fontSize=".875rem"
                                            marginBottom="1rem"
                                        >
                                            <Autocomplete
                                                freeSolo
                                                inputValue={threadName}
                                                onInputChange={(event, newInputValue) => {
                                                    setThreadName(newInputValue);
                                                }}
                                                // id="scry-app"
                                                options={[]}
                                                renderInput={(params) => <TextField {...params} label="thread name" variant="outlined" />}
                                            />
                                        </Box>
                                        <Box
                                            component="div"
                                            fontSize=".875rem"
                                            marginBottom="1rem"
                                        >
                                            <Autocomplete
                                                freeSolo
                                                // id="scry-path"
                                                options={[]}
                                                inputValue={threadInputMark}
                                                onInputChange={(event, newInputValue) => {
                                                    setThreadInputMark(newInputValue);
                                                }}
                                                renderInput={(params) => <TextField {...params} label="input mark" variant="outlined" />}
                                            />
                                        </Box>
                                        <Box
                                            component="div"
                                            fontSize=".875rem"
                                            marginBottom="1rem"
                                        >
                                            <Autocomplete
                                                freeSolo
                                                // id="scry-path"
                                                options={[]}
                                                inputValue={threadOutputMark}
                                                onInputChange={(event, newInputValue) => {
                                                    setThreadOutputMark(newInputValue);
                                                }}
                                                renderInput={(params) => <TextField {...params} label="output mark" variant="outlined" />}
                                            />
                                        </Box>
                                        <Box
                                            component="div"
                                            fontSize=".875rem"
                                            marginBottom="1rem"
                                        >
                                            <Autocomplete
                                                freeSolo
                                                // id="scry-path"
                                                options={[]}
                                                inputValue={threadBody}
                                                onInputChange={(event, newInputValue) => {
                                                    setThreadBody(newInputValue);
                                                }}
                                                renderInput={(params) => <TextField {...params} label="thread body" variant="outlined" />}
                                            />
                                        </Box>
                                        <Box
                                            component="div"
                                            fontSize=".875rem"
                                            color={theme.palette.gray[600]}
                                            display="flex"
                                            alignItems="center"
                                            flexWrap="wrap"
                                        >
                                            <Button
                                                onClick={handleThread}
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                            >
                                                Submit
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xl={3} lg={6} xs={12}>
                                <Card classes={{ root: classes.cardRoot }} elevation={6}>
                                    <CardContent classes={{ root: classes.cardContentRoot }}>
                                        <Box
                                            component={Typography}
                                            variant="h5"
                                            color={theme.palette.gray[600] + "!important"}
                                            marginBottom="1rem!important"
                                            marginTop="0!important"
                                            className={classes.textUppercase}
                                        >
                                            POKE
                                        </Box>
                                        <Box
                                            component="div"
                                            fontSize=".875rem"
                                            marginBottom="1rem"
                                        >
                                            <Autocomplete
                                                freeSolo
                                                inputValue={pokeApp}
                                                onInputChange={(event, newInputValue) => {
                                                    setPokeApp(newInputValue);
                                                }}
                                                // id="scry-app"
                                                options={pokes}
                                                renderInput={(params) => <TextField {...params} label="gall app" variant="outlined" />}
                                            />
                                        </Box>
                                        <Box
                                            component="div"
                                            fontSize=".875rem"
                                            marginBottom="1rem"
                                        >
                                            <Autocomplete
                                                freeSolo
                                                inputValue={pokeMark}
                                                onInputChange={(event, newInputValue) => {
                                                    setPokeMark(newInputValue);
                                                }}
                                                // id="scry-app"
                                                options={[]}
                                                renderInput={(params) => <TextField {...params} label="mark" variant="outlined" />}
                                            />
                                        </Box>
                                        <Box
                                            component="div"
                                            fontSize=".875rem"
                                            marginBottom="1rem"
                                        >
                                            <Autocomplete
                                                freeSolo
                                                inputValue={pokeJSON}
                                                onInputChange={(event, newInputValue) => {
                                                    setPokeJSON(newInputValue);
                                                }}
                                                // id="scry-app"
                                                options={[]}
                                                renderInput={(params) => <TextField {...params} label="json" variant="outlined" />}
                                            />
                                        </Box>
                                        <Box
                                            component="div"
                                            fontSize=".875rem"
                                            color={theme.palette.gray[600]}
                                            display="flex"
                                            alignItems="center"
                                            flexWrap="wrap"
                                        >
                                            <Button
                                                onClick={handlePoke}
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                            >
                                                Submit
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xl={3} lg={6} xs={12}>
                                <Card classes={{ root: classes.cardRoot }} elevation={6}>
                                    <CardContent classes={{ root: classes.cardContentRoot }}>
                                        <Box
                                            component={Typography}
                                            variant="h5"
                                            color={theme.palette.gray[600] + "!important"}
                                            marginBottom="1rem!important"
                                            marginTop="0!important"
                                            className={classes.textUppercase}
                                        >
                                            SUBSCRIBE
                                        </Box>
                                        <Box
                                            component="div"
                                            fontSize=".875rem"
                                            marginBottom="1rem"
                                        >
                                            <Autocomplete
                                                freeSolo
                                                inputValue={subscribeApp}
                                                onInputChange={(event, newInputValue) => {
                                                    setSubscribeApp(newInputValue);
                                                }}
                                                // id="scry-app"
                                                options={subscribeApps}
                                                renderInput={(params) => <TextField {...params} label="gall app" variant="outlined" />}
                                            />
                                        </Box>
                                        <Box
                                            component="div"
                                            fontSize=".875rem"
                                            marginBottom="1rem"
                                        >
                                            <Autocomplete
                                                freeSolo
                                                // id="scry-path"
                                                options={availableSubscribePaths()}
                                                inputValue={subscribePath}
                                                onInputChange={(event, newInputValue) => {
                                                    setSubscribePath(newInputValue);
                                                }}
                                                renderInput={(params) => <TextField {...params} label="scry path" variant="outlined" />}
                                            />
                                        </Box>
                                        <Box
                                            component="div"
                                            fontSize=".875rem"
                                            color={theme.palette.gray[600]}
                                            display="flex"
                                            alignItems="center"
                                            flexWrap="wrap"
                                        >
                                            <Button
                                                onClick={handleSubscribe}
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                            >
                                                Submit
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </div>
            <Container
                maxWidth={false}
                component={Box}
                marginTop="-6rem"
                classes={{ root: classes.containerRoot }}
            >
                {/* Table */}
                <Grid container component={Box} marginBottom="39px">
                    <Grid item xs={12}>
                        <Card classes={{ root: classes.cardRoot }}>
                            <CardHeader
                                className={classes.cardHeader}
                                title="Scried Data"
                                titleTypographyProps={{
                                    component: Box,
                                    marginBottom: "0!important",
                                    variant: "h3",
                                }}
                            ></CardHeader>
                            <CardContent>
                                <p>{request}</p>
                                {JSON.stringify(scryResults)}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid container component={Box} marginBottom="39px">
                    <Grid item xs={12}>
                        <Card classes={{ root: classes.cardRoot }}>
                            <CardHeader
                                className={classes.cardHeader}
                                title="Subscription Data"
                                titleTypographyProps={{
                                    component: Box,
                                    marginBottom: "0!important",
                                    variant: "h3",
                                }}
                            ></CardHeader>
                            <CardContent>
                                {subscriptions.map((sub, index) => {
                                    return <p key={index}>{sub}</p>
                                })}
                                <p>oh hai</p>
                                {events.map((message, index) => {
                                    return <p key={index}>{JSON.stringify(message)}</p>
                                })}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

            </Container>
        </>
    )
}