import React from "react";
import { useStore } from "../../store";
import { dateDiff } from "../../utils/dates";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Bar, HorizontalBar } from "react-chartjs-2";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons components

// core components
import Header from "components/Headers/Header.js";

import {
  chartOptions,
  parseOptions,
} from "variables/charts.js";

import componentStyles from "assets/theme/views/admin/dashboard.js";

const useStyles = makeStyles(componentStyles);

function Dashboard() {
  const {
    groups,
    hark,
    metadata,
  } = useStore();
  const sortedGroups = Object.keys(groups).sort(
    (a, b) => groups[b].members.length - groups[a].members.length
  );
  // length == 4 selects for chat channels (those whose path doesn't include a numerical index). A cludge, but it will do.
  const unreadChats = hark["all-stats"].filter((notes) => notes.place.path.split("/").length === 4 && notes.stats.count > 0);
 
  const classes = useStyles();
  const theme = useTheme();

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }


  const chartHeight = "450px";
  const groupsChart = {
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              callback: function (value) {
                if (!(value % 10)) {
                  //return '$' + value + 'k'
                  return value;
                }
              },
            },
          },
        ],
      },
      tooltips: {
        callbacks: {
          label: function (item, data) {
            var label = data.datasets[item.datasetIndex].label || "";
            var content = "";
            if (data.datasets.length > 1) {
              content += label;
            }
            content += item.xLabel;
            return content;
          },
        },
      },
    },
    data: {
      labels: sortedGroups.map((group) => {
      const meta = Object.keys(metadata).find((resource) => resource.includes(`/groups${group}`));
      const groupMeta = metadata[meta];
      if (groupMeta) return metadata[meta].metadata.title;
      else return group.replace("/ship/", "");
      }),
      datasets: [
        {
          label: "Unread",
          data: sortedGroups.map((group) => groups[group].members.length),
          maxBarThickness: 30,
        },
      ],
    },
  };
  const unreadChart = {
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              callback: function (value) {
                if (!(value % 10)) {
                  //return '$' + value + 'k'
                  return value;
                }
              },
            },
          },
        ],
      },
      tooltips: {
        callbacks: {
          label: function (item, data) {
            var label = data.datasets[item.datasetIndex].label || "";
            var yLabel = item.yLabel;
            var content = "";
            if (data.datasets.length > 1) {
              content += label;
            }
            content += yLabel;
            return content;
          },
        },
      },
    },
    data: {
      labels: unreadChats.map((unread) => {
        const channel = unread.place.path.replace("/graph/", "");
        const data = Object.keys(metadata).find(key => key.includes(channel));
        if (data) return metadata[data].metadata.title;
        else return channel
      }),
      datasets: [
        {
          label: "Unread",
          data: unreadChats.map((unread) => unread.stats.count),
          maxBarThickness: 30,
        },
      ],
    },
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container
        maxWidth={false}
        component={Box}
        marginTop="-6rem"
        classes={{ root: classes.containerRoot }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            xl={8}
            component={Box}
            marginBottom="3rem!important"
            classes={{ root: classes.gridItemRoot }}
          >
            <Card
              classes={{
                root: classes.cardRoot + " " + classes.cardRootBgGradient,
              }}
            >
              <CardHeader
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
                        variant="h6"
                        letterSpacing=".0625rem"
                        marginBottom=".25rem!important"
                        className={classes.textUppercase}
                      >
                        <Box component="span" color={theme.palette.gray[400]}>
                          Membership
                        </Box>
                      </Box>
                      <Box
                        component={Typography}
                        variant="h2"
                        marginBottom="0!important"
                      >
                        <Box component="span" color={theme.palette.white.main}>
                          Most Popular Groups
                        </Box>
                      </Box>
                    </Grid>
                    {/* <Grid item xs="auto">
                      <Box
                        justifyContent="flex-end"
                        display="flex"
                        flexWrap="wrap"
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          component={Box}
                          marginRight="1rem!important"
                          onClick={() => toggleNavs(1)}
                          classes={{
                            root:
                              activeNav === 1
                                ? ""
                                : classes.buttonRootUnselected,
                          }}
                        >
                          Month
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => toggleNavs(2)}
                          classes={{
                            root:
                              activeNav === 2
                                ? ""
                                : classes.buttonRootUnselected,
                          }}
                        >
                          Week
                        </Button>
                      </Box>
                    </Grid> */}
                  </Grid>
                }
                classes={{ root: classes.cardHeaderRoot }}
              ></CardHeader>
              <CardContent>
                <Box position="relative" height={chartHeight}>
                  <HorizontalBar
                    data={groupsChart.data}
                    options={groupsChart.options}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} xl={4}>
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
                title={
                  <Box component="span" color={theme.palette.gray[600]}>
                    Notifications
                  </Box>
                }
                subheader="Unread Messages"
                classes={{ root: classes.cardHeaderRoot }}
                titleTypographyProps={{
                  component: Box,
                  variant: "h6",
                  letterSpacing: ".0625rem",
                  marginBottom: ".25rem!important",
                  classes: {
                    root: classes.textUppercase,
                  },
                }}
                subheaderTypographyProps={{
                  component: Box,
                  variant: "h2",
                  marginBottom: "0!important",
                  color: "initial",
                }}
              ></CardHeader>
              <CardContent>
                <Box position="relative" height={chartHeight}>
                  <Bar data={unreadChart.data} options={unreadChart.options} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid container component={Box} marginTop="3rem">
          <Grid
            item
            xs={12}
            xl={7}
            component={Box}
            marginBottom="3rem!important"
            classes={{ root: classes.gridItemRoot }}
          >
            <Card
              classes={{
                root: classes.cardRoot,
              }}
            >
              <CardHeader
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
                        Most Popular Groups (Detailed)
                      </Box>
                    </Grid>
                    {/* <Grid item xs="auto">
                      <Box
                        justifyContent="flex-end"
                        display="flex"
                        flexWrap="wrap"
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                        >
                          See all
                        </Button>
                      </Box>
                    </Grid> */}
                  </Grid>
                }
                classes={{ root: classes.cardHeaderRoot }}
              ></CardHeader>
              <TableContainer>
                <Box
                  component={Table}
                  alignItems="center"
                  marginBottom="0!important"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            " " +
                            classes.tableCellRootHead,
                        }}
                      >
                        Group Name
                      </TableCell>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            " " +
                            classes.tableCellRootHead,
                        }}
                      >
                        Channels
                      </TableCell>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            " " +
                            classes.tableCellRootHead,
                        }}
                      >
                        Members
                      </TableCell>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            " " +
                            classes.tableCellRootHead,
                        }}
                      >
                        Visibility
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedGroups.map((group, index) => {
                      return (
                        <TableRow key={`group-${index}`}>
                          <TableCell
                            classes={{
                              root:
                                classes.tableCellRoot +
                                " " +
                                classes.tableCellRootBodyHead,
                            }}
                            component="th"
                            variant="head"
                            scope="row"
                          >
                            {group.replace("/ship/", "")}
                          </TableCell>
                          <TableCell classes={{ root: classes.tableCellRoot }}>
                            {
                              Object.keys(metadata).filter((resource) =>
                                resource.includes(group)
                              ).length
                            }
                          </TableCell>
                          <TableCell classes={{ root: classes.tableCellRoot }}>
                            {groups[group].members.length}
                          </TableCell>
                          <Box
                            component={TableCell}
                            className={classes.tableCellRoot}
                            marginBottom="-2px"
                          >
                            {/* <Box
                            component={ArrowUpward}
                            width="1rem!important"
                            height="1rem!important"
                            marginRight="1rem"
                            color={theme.palette.success.main}
                          /> */}
                            {groups[group].policy.open ? "Public" : "Private"}
                          </Box>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Box>
              </TableContainer>
            </Card>
          </Grid>
          <Grid item xs={12} xl={5}>
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
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
                        Unread Messages (Detailed)
                      </Box>
                    </Grid>
                    {/* <Grid item xs="auto">
                      <Box
                        justifyContent="flex-end"
                        display="flex"
                        flexWrap="wrap"
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                        >
                          See all
                        </Button>
                      </Box>
                    </Grid> */}
                  </Grid>
                }
                classes={{ root: classes.cardHeaderRoot }}
              ></CardHeader>
              <TableContainer>
                <Box
                  component={Table}
                  alignItems="center"
                  marginBottom="0!important"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            " " +
                            classes.tableCellRootHead,
                        }}
                      >
                        Channel
                      </TableCell>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            " " +
                            classes.tableCellRootHead,
                        }}
                      >
                        Count
                      </TableCell>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            " " +
                            classes.tableCellRootHead,
                        }}
                      >
                        Last
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {unreadChats.map((unread, index) => {
                      return (
                        <TableRow key={`unread-channel-${index}`}>
                          <TableCell
                            classes={{
                              root:
                                classes.tableCellRoot +
                                " " +
                                classes.tableCellRootBodyHead,
                            }}
                            component="th"
                            variant="head"
                            scope="row"
                          >
                            {unread.place.path.replace("/graph/", "")}
                          </TableCell>
                          <TableCell classes={{ root: classes.tableCellRoot }}>
                            {unread.stats.count}
                          </TableCell>
                          <TableCell classes={{ root: classes.tableCellRoot }}>
                            <Box display="flex" alignItems="center">
                              <Box component="span" marginRight=".5rem">
                                {dateDiff(unread.stats.last)}
                              </Box>
                              {/* <Box width="100%">
                              <LinearProgress
                                variant="determinate"
                                value={60}
                                classes={{
                                  root: classes.linearProgressRoot,
                                  bar: classes.bgGradientError,
                                }}
                              />
                            </Box> */}
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Box>
              </TableContainer>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Dashboard;
