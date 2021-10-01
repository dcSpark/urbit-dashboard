import React from "react";
import { useRef, useLayoutEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
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
import UserHeader from "components/Headers/UserHeader.js";

import componentStyles from "assets/theme/views/admin/profile.js";
import { useStore } from "../../store";

const useStyles = makeStyles(componentStyles);

function ChatFeed() {
    const {  chatFeed } = useStore();
    function extractText(content) {
        return content.reduce((acc, el) => {
            const type = Object.keys(el)[0];
            const message = el[type];
            if (type != "reference") return acc + " " + message
            else return acc + " " + refToPermalink(message)
        }, "")
    }
    const scrollable = useRef(null);
    
    useLayoutEffect(()=>{
        if(scrollable.current.scrollTop > -1) scrollable.current.scrollTop = scrollable.current.scrollHeight;
    }, [chatFeed])

    function refToPermalink(reference){
        if (reference.graph) return `web+urbitgraph://group/${reference.graph.group.replace("/ship/", "")}/graph/${reference.graph.graph.replace("/ship/", "")}${reference.graph.index}`
        else return `${reference.group.replace("/ship/", "")}`
    }
    
    function processName(shipName){
        if(shipName.length > 30){
            return `${shipName.substring(0,6)}_${shipName.slice(-6)}`
        } else{
            return shipName
        }
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
                <Grid container>
                    <Grid
                        item
                        xs={12}
                        xl={12}
                        component={Box}
                        marginBottom="1rem!important"
                        classes={{ root: classes.gridItemRoot }}
                    >
                        <Card>
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
                                                Chat Live Feed
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
                            <div className="feed-container chat-feed">
                                <TableContainer
                                >
                                    <Box
                                        component={Table}
                                        alignItems="center"
                                        marginBottom="0!important"
                                    >
                                        <TableHead>
                                            <TableRow
                                            >
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
                                                    // text-align="center"
                                                    classes={{
                                                        root:
                                                            classes.tableCellRoot +
                                                            " " +
                                                            classes.tableCellRootHead,
                                                    }}
                                                >
                                                    Ship
                                                </TableCell>
                                                <TableCell
                                                    // text-align="center"
                                                    classes={{
                                                        root:
                                                            classes.tableCellRoot +
                                                            " " +
                                                            classes.tableCellRootHead,
                                                    }}
                                                >
                                                    Time
                                                </TableCell>
                                                <TableCell
                                                    classes={{
                                                        root:
                                                            classes.tableCellRoot +
                                                            " " +
                                                            classes.tableCellRootHead,
                                                    }}
                                                >
                                                    Message
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody ref={scrollable}>
                                            {chatFeed.map((node) => {
                                                return (
                                                    <TableRow
                                                        key={Object.keys(node.nodes)[0]}
                                                    >
                                                        <TableCell
                                                            classes={{
                                                                root:
                                                                    classes.tableCellRoot +
                                                                    " " +
                                                                    classes.tableCellRootBodyHead,
                                                            }}
                                                            width="100px"
                                                            component="th"
                                                            variant="head"
                                                            scope="row"
                                                        >
                                                            {node.resource.name}
                                                        </TableCell>
                                                        <TableCell
                                                            classes={{ root: classes.tableCellRoot }}
                                                            width="120px"

                                                        >
                                                            ~{
                                                                processName(node.nodes[Object.keys(node.nodes)[0]].post.author)
                                                            }
                                                        </TableCell>
                                                        <TableCell
                                                            classes={{ root: classes.tableCellRoot }}
                                                            width="120px"

                                                        >
                                                            {
                                                                new Date(node.nodes[Object.keys(node.nodes)[0]].post["time-sent"]).toTimeString().slice(0, 8)
                                                            }
                                                        </TableCell>
                                                        <TableCell classes={{ root: classes.tableCellRoot }}>
                                                            {
                                                                extractText(node.nodes[Object.keys(node.nodes)[0]].post.contents)

                                                            }
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Box>
                                </TableContainer>
                            </div>
                      </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default ChatFeed;
