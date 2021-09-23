import React from "react";
import { useState, useEffect } from "react";
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
import Divider from "@material-ui/core/Divider";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import CardStats from "components/Cards/CardStats.js";

import Typography from "@material-ui/core/Typography";
// @material-ui/icons components
import LocationOn from "@material-ui/icons/LocationOn";
import School from "@material-ui/icons/School";
import Group from "@material-ui/icons/Group";

// core components
import UserHeader from "components/Headers/UserHeader.js";

import componentStyles from "assets/theme/views/admin/profile.js";
import boxShadows from "assets/theme/box-shadow.js";

import Sigil from "../../components/Urbit/Sigil.js";
import { useStore } from "../../store";

const useStyles = makeStyles(componentStyles);

function Trouble() {
  const {
    activeShip,
    hash,
    activeSubscriptions,
    groups,
    channels,
    contacts,
    hark,
  } = useStore();
  const [running, setRunning] = useState(false);
  const terminalInteraction = running ? "Stop Watching" : "Start Watching";
  const randomStars = ["~marzod", "~litzod", "~wanzod"];
  const randomStar = () =>
    randomStars[Math.floor(Math.random() * randomStars.length)];
  const [lines, setLines] = useState([]);
  console.log(lines, "lines");

  function pad(string) {
    if (string.length < 5) return `0${string}`;
    else return string;
  }

  function runTerminal() {
    if (running) stopTerminal();
    else startTerminal();
  }

  function startTerminal() {
    window.urbitVisor
      .subscribe({ app: "herm", path: "/session/" })
      .then((res) => {
        console.log(res, "herm subscription");
        setRunning(true);
        window.addEventListener("message", handleHerm);
      });
  }
  function handleHerm(message) {
    if (
      message.data.app == "urbitVisorEvent" &&
      message.data.event.data &&
      message.data.event.data.lin
    ) {
      const dojoLine = message.data.event.data.lin.join("");
      if (!(dojoLine.includes("dojo>") || dojoLine[0] === ";"))
        setLines((previousState) => [...previousState, dojoLine]);
    }
  }
  function stopTerminal() {
    setRunning(false);
  }

  async function handleGoad() {
    console.log("goading");
    await window.urbitVisor.poke({
      app: "herm",
      mark: "belt",
      json: { txt: [":goad %force"] },
    });
    await window.urbitVisor.poke({
      app: "herm",
      mark: "belt",
      json: { ret: null },
    });
  }
  async function handleGlob() {
    console.log("globbing");
    await window.urbitVisor.poke({
      app: "herm",
      mark: "belt",
      json: { txt: [":glob [%kick /'~landscape'/js/bundle]"] },
    });
    await window.urbitVisor.poke({
      app: "herm",
      mark: "belt",
      json: { ret: null },
    });
  }
  async function handleSpider() {
    console.log("spidering");
    await window.urbitVisor.poke({
      app: "herm",
      mark: "belt",
      json: { txt: [":spider|kill"] },
    });
    await window.urbitVisor.poke({
      app: "herm",
      mark: "belt",
      json: { ret: null },
    });
  }
  async function handleOTA() {
    console.log("otaing");
    await window.urbitVisor.poke({
      app: "herm",
      mark: "belt",
      json: { txt: [`|ota ${randomStar()} %kids`] },
    });
    await window.urbitVisor.poke({
      app: "herm",
      mark: "belt",
      json: { ret: null },
    });
  }
  async function handleTrouble() {
    console.log("troubling");
    await window.urbitVisor.poke({
      app: "herm",
      mark: "belt",
      json: { txt: ["+trouble"] },
    });
    await window.urbitVisor.poke({
      app: "herm",
      mark: "belt",
      json: { ret: null },
    });
  }
  async function handleHash() {
    console.log("hashing");
    await window.urbitVisor.poke({
      app: "herm",
      mark: "belt",
      json: { txt: ["-read %z ~zod %kids da+now /"] },
    });
    await window.urbitVisor.poke({
      app: "herm",
      mark: "belt",
      json: { ret: null },
    });
  }
  async function handleParent() {
    console.log("parenting");
    await window.urbitVisor.poke({
      app: "herm",
      mark: "belt",
      json: { txt: ["(sein:title our now our)"] },
    });
    await window.urbitVisor.poke({
      app: "herm",
      mark: "belt",
      json: { ret: null },
    });
  }
  async function handleGrandparent() {
    console.log("grandpaing");
    await window.urbitVisor.poke({
      app: "herm",
      mark: "belt",
      json: { txt: ["(sein:title our now (sein:title our now our))"] },
    });
    await window.urbitVisor.poke({
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
                    Spider Kill
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
                    Update OTA
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
          <Grid item xl={12} lg={12} xs={2}>
            <Card height="100px">
              <CardHeader
                title={`Your current base hash is ${pad(hash)}`}
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
                          onClick={runTerminal}
                        >
                          {terminalInteraction}
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                }
              />
              <CardContent>
                <div className="feed-container terminal-feed">
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
