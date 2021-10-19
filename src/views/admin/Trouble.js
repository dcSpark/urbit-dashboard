import React from "react";
import { useState, useLayoutEffect, useEffect, useRef, useCallback } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { urbitVisor } from "uv-core";


import Typography from "@material-ui/core/Typography";
// @material-ui/icons components

// core components
import UserHeader from "components/Headers/UserHeader.js";

import componentStyles from "assets/theme/views/admin/profile.js";
import { useStore } from "../../store";

const useStyles = makeStyles(componentStyles);


function Trouble() {
  const [terminalInteraction, setTerminalInteraction] = useState("");
  const {
    isConnected,
    hash,
  } = useStore();

  useEffect(() => {
    let number = 0;
    if (isConnected) {
      urbitVisor.subscribe({ app: "herm", path: "/session/" })
        .then(res => {
          number = res.response;
          setTerminalInteraction("Idle")
        });
    }
    return () => {
      window.removeEventListener("message", handleHerm);
      urbitVisor.unsubscribe(number).then(res => console.log(""));
      setTerminalInteraction("");
    }
  }, [isConnected])

  const scrollable = useRef(null);
  const randomStars = ["~marzod", "~litzod", "~wanzod"];
  const randomStar = () =>
    randomStars[Math.floor(Math.random() * randomStars.length)];
  const [lines, setLines] = useState([]);

  function pad(string) {
    if (string.length < 5) return `0${string}`;
    else return string;
  }

  function startTerminal() {
    window.removeEventListener("message", handleHerm);
    window.addEventListener("message", handleHerm);
    setTerminalInteraction("Loading...")
  }
  const handleHerm = useCallback((message) => {
    if (
      message.data.app == "urbitVisorEvent" &&
      message.data.event.data &&
      message.data.event.data.lin
    ) {
      const dojoLine = message.data.event.data.lin.join("");
      if (!(dojoLine.includes("dojo>") || dojoLine[0] === ";" || dojoLine[0] === ">"))
        setLines((previousState) => [...previousState, dojoLine]);
      setTerminalInteraction("Idle");
    }
  }, []);

  useLayoutEffect(() => {
    if (scrollable.current.scrollTop > -1)
      scrollable.current.scrollTop = scrollable.current.scrollHeight;
  }, [lines]);


  async function handleTrouble() {
    setLines((previousState) => ["> +trouble"]);
    startTerminal();
    await urbitVisor.poke({
      app: "herm",
      mark: "belt",
      json: { txt: ["+trouble"] },
    });
    await urbitVisor.poke({
      app: "herm",
      mark: "belt",
      json: { ret: null },
    });
  }

  async function handleGoad() {
    setLines((previousState) => ["> Resetting ship..."]);
    startTerminal();
    await urbitVisor.poke({
      app: "herm",
      mark: "belt",
      json: { txt: [":goad %force"] },
    });
    await urbitVisor.poke({
      app: "herm",
      mark: "belt",
      json: { ret: null },
    });
  }
  async function handleGlob() {
    setLines((previousState) => ["> Resetting Landscape JavaScript..."]);
    startTerminal();
    await urbitVisor.poke({
      app: "herm",
      mark: "belt",
      json: { txt: [":glob [%kick /'~landscape'/js/bundle]"] },
    });
    await urbitVisor.poke({
      app: "herm",
      mark: "belt",
      json: { ret: null },
    });
  }
  async function handleSpider() {
    setLines((previousState) => ["> Killing idle threads"]);
    startTerminal();
    await urbitVisor.poke({
      app: "herm",
      mark: "belt",
      json: { txt: [":spider|kill"] },
    });
    await urbitVisor.poke({
      app: "herm",
      mark: "belt",
      json: { ret: null },
    });
  }
  async function handleHash() {
    setLines((previousState) => ["> Print latest Urbit OS hash"]);
    startTerminal();
    await urbitVisor.poke({
      app: "herm",
      mark: "belt",
      json: { txt: ["-read %z ~zod %kids da+now /"] },
    });
    await urbitVisor.poke({
      app: "herm",
      mark: "belt",
      json: { ret: null },
    });
  }
  async function handleOTA() {
    setLines((previousState) => ["> Updating Urbit OS..."]);
    startTerminal();
    await urbitVisor.poke({
      app: "herm",
      mark: "belt",
      json: { txt: [`|install ${randomStar()} %base`] },
    });
    await urbitVisor.poke({
      app: "herm",
      mark: "belt",
      json: { ret: null },
    });
    await urbitVisor.poke({
      app: "herm",
      mark: "belt",
      json: { txt: [`|install ${randomStar()} %garden`] },
    });
    await urbitVisor.poke({
      app: "herm",
      mark: "belt",
      json: { ret: null },
    });
  }
  async function handleParent() {
    setLines((previousState) => ["> Printing Ship Parent"]);
    startTerminal();
    await urbitVisor.poke({
      app: "herm",
      mark: "belt",
      json: { txt: ["(sein:title our now our)"] },
    });
    await urbitVisor.poke({
      app: "herm",
      mark: "belt",
      json: { ret: null },
    });
  }
  async function handleGrandparent() {
    setLines((previousState) => ["> Printing Ship Grandparent"]);
    startTerminal();
    await urbitVisor.poke({
      app: "herm",
      mark: "belt",
      json: { txt: ["(sein:title our now (sein:title our now our))"] },
    });
    await urbitVisor.poke({
      app: "herm",
      mark: "belt",
      json: { ret: null },
    });
  }

  const classes = useStyles();
  const theme = useTheme();
  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container
        maxWidth={false}
        component={Box}
        marginTop="-30rem"
        classes={{ root: classes.containerRoot }}
      >
        <Grid container component={Box} marginBottom="4rem">
          <Grid item xl={3} lg={6} xs={12}>
            <Card raised>
              <ButtonBase onClick={handleTrouble}>
                <CardContent>
                  <Box
                    position="relative"
                    component={Typography}
                    variant="h2"
                    marginBottom="0!important"
                  >
                    +trouble
                  </Box>
                </CardContent>
              </ButtonBase>
            </Card>
          </Grid>
          <Grid item xl={3} lg={6} xs={12}>
            <Card raised>
              <ButtonBase onClick={handleGoad}>
                <CardContent>
                  <Box
                    position="relative"
                    component={Typography}
                    variant="h2"
                    marginBottom="0!important"
                  >
                    Reset Ship
                  </Box>
                </CardContent>
              </ButtonBase>
            </Card>
          </Grid>
          <Grid item xl={3} lg={6} xs={12}>
            <Card raised>
              <ButtonBase onClick={handleGlob}>
                <CardContent>
                  <Box
                    position="relative"
                    component={Typography}
                    variant="h2"
                    marginBottom="0!important"
                  >
                    Reset Landscape
                  </Box>
                </CardContent>
              </ButtonBase>
            </Card>
          </Grid>
          <Grid item xl={3} lg={6} xs={12}>
            <Card raised>
              <ButtonBase onClick={handleSpider}>
                <CardContent>
                  <Box
                    position="relative"
                    component={Typography}
                    variant="h2"
                    marginBottom="0!important"
                  >
                    Kill Idle Threads
                  </Box>
                </CardContent>
              </ButtonBase>
            </Card>
          </Grid>
        </Grid>
        <Grid container component={Box} marginBottom="4rem">
          <Grid item xl={3} lg={6} xs={12}>
            <Card raised>
              <ButtonBase onClick={handleHash}>
                <CardContent>
                  <Box
                    position="relative"
                    component={Typography}
                    variant="h2"
                    marginBottom="0!important"
                  >
                    Check Latest Hash
                  </Box>
                </CardContent>
              </ButtonBase>
            </Card>
          </Grid>
          <Grid item xl={3} lg={6} xs={12}>
            <Card raised>
              <ButtonBase onClick={handleOTA}>
                <CardContent>
                  <Box
                    position="relative"
                    component={Typography}
                    variant="h2"
                    marginBottom="0!important"
                  >
                    Update Urbit OS
                  </Box>
                </CardContent>
              </ButtonBase>
            </Card>
          </Grid>
          <Grid item xl={3} lg={6} xs={12}>
            <Card raised>
              <ButtonBase onClick={handleParent}>
                <CardContent>
                  <Box
                    position="relative"
                    component={Typography}
                    variant="h2"
                    marginBottom="0!important"
                  >
                    Print Parent
                  </Box>
                </CardContent>
              </ButtonBase>
            </Card>
          </Grid>
          <Grid item xl={3} lg={6} xs={12}>
            <Card raised>
              <ButtonBase onClick={handleGrandparent}>
                <CardContent>
                  <Box
                    position="relative"
                    component={Typography}
                    variant="h2"
                    marginBottom="0!important"
                  >
                    Print Grandparent
                  </Box>
                </CardContent>
              </ButtonBase>
            </Card>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xl={12} lg={12} xs={12}>
            <Card height="100px">
              <CardHeader
                title={`Your current base hash is ${pad(hash.slice(60))}`}
                subheader={
                  <Grid
                    container
                    component={Box}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Grid item xs="auto">
                      <Box
                        component={Typography}
                        variant="h3"
                        marginBottom="0!important"
                      >
                        Terminal Output
                      </Box>
                    </Grid>
                    <Grid item xs="auto">
                      <Box
                        justifyContent="flex-end"
                        display="flex"
                        flexWrap="wrap"
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          size="medium"
                          classes={{ root: "terminal-button" }}
                        >
                          {terminalInteraction}
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                }
              />
              <CardContent>
                <div ref={scrollable} className="feed-container terminal-feed">
                  {lines.map((line, index) => {
                    return <p key={`line-${index}`}>{line}</p>;
                  })}
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Trouble;
