import React from "react";
import { useState, useRef, useLayoutEffect, useEffect, useCallback } from "react";
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
import Typography from "@material-ui/core/Typography";
// @material-ui/icons components
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import { urbitVisor } from "@dcspark/uv-core";

// core components
import componentStyles from "assets/theme/components/header.js";
import {
  scryEndpoints,
  subscribeEndpoints,
  threadEndpoints,
  pokeEndpoints,
} from "../../urbit/endpoints";

async function scry(scryInterface) {
  return urbitVisor.scry(scryInterface);
}

export default function Debug() {
  const useStyles = makeStyles(componentStyles);
  const classes = useStyles();
  const theme = useTheme();
  const [scryApp, setScryApp] = useState("graph-store");
  const [scryPath, setScryPath] = useState("graph-store");
  const [scryError, setScryError] = useState("");
  //
  const [threadInputMark, setThreadInputMark] = useState("graph-store");
  const [threadOutputMark, setThreadOutputMark] = useState("graph-store");
  const [threadName, setThreadName] = useState("graph-store");
  const [threadBody, setThreadBody] = useState("graph-store");
  const [threadError, setThreadError] = useState("");
  //
  const [pokeApp, setPokeApp] = useState("graph-store");
  const [pokeMark, setPokeMark] = useState("graph-store");
  const [pokeJSON, setPokeJSON] = useState("graph-store");
  const [pokeError, setPokeError] = useState("");
  //
  const [subscribeApp, setSubscribeApp] = useState("graph-store");
  const [subscribePath, setSubscribePath] = useState("graph-store");
  const [subscriptionError, setSubscriptionError] = useState("");

  const [request, setRequest] = useState("");
  const [subscriptions, setSubscriptions] = useState([]);
  const [scryResults, setScryResults] = useState("");
  const [events, setEvents] = useState([]);

  const scrollable = useRef(null);
  useLayoutEffect(() => {
    if (scrollable.current.scrollTop > -1) scrollable.current.scrollTop = scrollable.current.scrollHeight;
  }, [events])

  useEffect(() => {
    window.addEventListener("message", sseHandler, false);
    return () => window.removeEventListener("message", sseHandler);
  }, [events]);

  function sseHandler(message) {
    if (message.data.app == "urbitVisorEvent") {
      setEvents((prevState) => [...prevState, message.data.event]);
    }
  }

  function handleScry() {
    
    scry({ app: scryApp, path: scryPath }).then((res) => {
      console.log(res, "Res")
      if (res.status == "ok") {
        setScryError("");
        setRequest(`Scrying: ${scryApp}${scryPath}`);
        setScryResults(res.response || "error");
      } else setScryError(`Scry on ${scryApp}${scryPath} failed`);
    });
  }
  function handleThread() {
    urbitVisor
      .thread({
        threadName: threadName,
        inputMark: threadInputMark,
        outputMark: threadOutputMark,
        body: threadBody,
      })
      .then((res) => {
        if (res.status == "ok") {
          setThreadError("");
          setSubscriptions([
            ...subscriptions,
            `Posted ${threadBody} to thread: ${threadName}${threadInputMark}${threadOutputMark}`,
          ]);
        } else
          setThreadError(
            `Post to thread ${threadName}${threadInputMark}${threadOutputMark} failed`
          );
      });
  }
  function handlePoke() {
    const pokeString = `${pokeApp}${pokeMark} with ${JSON.stringify(
      pokeJSON
    )}\n`;
    const trouble = { txt: ["+trouble"] };
    urbitVisor
      .poke({ app: pokeApp, mark: pokeMark, json: JSON.parse(pokeJSON) })
      .then((res) => {
        if (res.status == "ok") {
          setPokeError("");
          setSubscriptions([...subscriptions, `Poked: ${pokeString}`]);
        } else setPokeError(`Poke to ${pokeString} failed`);
      });
  }
  function handleSubscribe() {
    urbitVisor
      .subscribe({ app: subscribeApp, path: subscribePath })
      .then((res) => {
        if (res.status == "ok") {
          setSubscriptionError("");
          setSubscriptions([
            ...subscriptions,
            `Subscription ${res.response}:  ${subscribeApp}${subscribePath}`,
          ]);
        } else
          setSubscriptionError(
            `Subscription to ${subscribeApp}${subscribePath} failed`
          );
      });
  }
  const scryApps = Object.keys(scryEndpoints);
  const availableScryPaths = () => scryEndpoints[scryApp] || [];
  const subscribeApps = Object.keys(subscribeEndpoints);
  const availableSubscribePaths = () => subscribeEndpoints[subscribeApp] || [];
  const threads = Object.keys(threadEndpoints);
  const pokes = Object.keys(pokeEndpoints);
  const availablePokeMarks = () => pokeEndpoints[pokeApp] || [];
  const availablePokeJsons = () => availablePokeMarks()[pokeMark] || [];
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
                    <Box component="div" fontSize=".875rem" marginBottom="1rem">
                      <Autocomplete
                        freeSolo
                        inputValue={scryApp}
                        onInputChange={(event, newInputValue) => {
                          setScryApp(newInputValue);
                        }}
                        id="scry-app"
                        options={scryApps}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="gall app"
                            variant="outlined"
                          />
                        )}
                      />
                    </Box>
                    <Box component="div" fontSize=".875rem" marginBottom="1rem">
                      <Autocomplete
                        freeSolo
                        id="scry-path"
                        options={availableScryPaths()}
                        inputValue={scryPath}
                        onInputChange={(event, newInputValue) => {
                          setScryPath(newInputValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="scry path"
                            variant="outlined"
                          />
                        )}
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
                        size="medium"
                        className={"admin-panel-submit"}
                      >
                        Submit
                      </Button>
                      <p className="error-message">{scryError}</p>
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
                    <Box component="div" fontSize=".875rem" marginBottom="1rem">
                      <Autocomplete
                        freeSolo
                        inputValue={threadName}
                        onInputChange={(event, newInputValue) => {
                          setThreadName(newInputValue);
                        }}
                        // id="scry-app"
                        options={[]}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="thread name"
                            variant="outlined"
                          />
                        )}
                      />
                    </Box>
                    <Box component="div" fontSize=".875rem" marginBottom="1rem">
                      <Autocomplete
                        freeSolo
                        // id="scry-path"
                        options={[]}
                        inputValue={threadInputMark}
                        onInputChange={(event, newInputValue) => {
                          setThreadInputMark(newInputValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="input mark"
                            variant="outlined"
                          />
                        )}
                      />
                    </Box>
                    <Box component="div" fontSize=".875rem" marginBottom="1rem">
                      <Autocomplete
                        freeSolo
                        // id="scry-path"
                        options={[]}
                        inputValue={threadOutputMark}
                        onInputChange={(event, newInputValue) => {
                          setThreadOutputMark(newInputValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="output mark"
                            variant="outlined"
                          />
                        )}
                      />
                    </Box>
                    <Box component="div" fontSize=".875rem" marginBottom="1rem">
                      <Autocomplete
                        freeSolo
                        // id="scry-path"
                        options={[]}
                        inputValue={threadBody}
                        onInputChange={(event, newInputValue) => {
                          setThreadBody(newInputValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="thread body"
                            variant="outlined"
                          />
                        )}
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
                        size="medium"
                        className={"admin-panel-submit"}
                      >
                        Submit
                      </Button>
                      <p className="error-message">{threadError}</p>
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
                    <Box component="div" fontSize=".875rem" marginBottom="1rem">
                      <Autocomplete
                        freeSolo
                        inputValue={pokeApp}
                        onInputChange={(event, newInputValue) => {
                          setPokeApp(newInputValue);
                        }}
                        // id="scry-app"
                        options={pokes}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="gall app"
                            variant="outlined"
                          />
                        )}
                      />
                    </Box>
                    <Box component="div" fontSize=".875rem" marginBottom="1rem">
                      <Autocomplete
                        freeSolo
                        inputValue={pokeMark}
                        onInputChange={(event, newInputValue) => {
                          setPokeMark(newInputValue);
                        }}
                        // id="scry-app"
                        options={availablePokeMarks()}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="mark"
                            variant="outlined"
                          />
                        )}
                      />
                    </Box>
                    <Box component="div" fontSize=".875rem" marginBottom="1rem">
                      <Autocomplete
                        freeSolo
                        inputValue={pokeJSON}
                        onInputChange={(event, newInputValue) => {
                          setPokeJSON(newInputValue);
                        }}
                        // id="scry-app"
                        options={availablePokeJsons()}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="json"
                            variant="outlined"
                          />
                        )}
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
                        size="medium"
                        className={"admin-panel-submit"}
                      >
                        Submit
                      </Button>
                      <p className="error-message">{pokeError}</p>
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
                    <Box component="div" fontSize=".875rem" marginBottom="1rem">
                      <Autocomplete
                        freeSolo
                        inputValue={subscribeApp}
                        onInputChange={(event, newInputValue) => {
                          setSubscribeApp(newInputValue);
                        }}
                        // id="scry-app"
                        options={subscribeApps}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="gall app"
                            variant="outlined"
                          />
                        )}
                      />
                    </Box>
                    <Box component="div" fontSize=".875rem" marginBottom="1rem">
                      <Autocomplete
                        freeSolo
                        // id="scry-path"
                        options={availableSubscribePaths()}
                        inputValue={subscribePath}
                        onInputChange={(event, newInputValue) => {
                          setSubscribePath(newInputValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="subscribe path"
                            variant="outlined"
                          />
                        )}
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
                        size="medium"
                        className={"admin-panel-submit"}
                      >
                        Submit
                      </Button>
                      <p className="error-message">{subscriptionError}</p>
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
              <CardContent
             classes={{ root: "mb-1rem" }}
              >
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
              <CardContent ref={scrollable}
              classes={{root: "subscription-feed-container"}}
              >
                {subscriptions.map((sub, index) => {
                  return <p key={index}>{sub}</p>;
                })}
                <p></p>
                {events.map((message, index) => {
                  return <p key={index}>{JSON.stringify(message)}</p>;
                })}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
