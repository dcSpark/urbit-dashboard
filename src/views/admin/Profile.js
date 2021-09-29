import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
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
import Typography from "@material-ui/core/Typography";
// @material-ui/icons components
import LocationOn from "@material-ui/icons/LocationOn";
import School from "@material-ui/icons/School";

// core components
import UserHeader from "components/Headers/UserHeader.js";

import componentStyles from "assets/theme/views/admin/profile.js";
import boxShadows from "assets/theme/box-shadow.js";

import Sigil from "../../components/Urbit/Sigil.js";
import { useStore } from "../../store";

const useStyles = makeStyles(componentStyles);

function Profile() {
  const { activeShip, groups, channels, contacts} = useStore();
  let shipKind = "";
    if (activeShip.length > 31) shipKind =  "Comet"
    else if (activeShip.length > 13) shipKind = "Moon"
    else if (activeShip.length > 7) shipKind = "Planet"
    else if (activeShip.length > 4) shipKind = "Star"
    else shipKind = "galaxy"

  const classes = useStyles();
  const theme = useTheme();
  return (
    <>
      <UserHeader />
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
            xs={16}
            xl={5}
            component={Box}
            marginBottom="3rem!important"
            className="profile-grid-box"
          >
            <Card classes={{ root: classes.cardRoot }}>
              <Box component={Grid} container justifyContent="center">
                <Grid item xs={12} lg={3}>
                  <Box position="relative" className="profile-sigil-box">
                    <Box
                      alt="..."
                      maxWidth="180px"
                      borderRadius="50%"
                      position="absolute"
                      left="50%"
                      boxShadow={boxShadows.boxShadow + "!important"}
                      className={classes.profileImage}
                    >
                      <Sigil patp={activeShip} size={180} />
                    </Box>
                  </Box>
                </Grid>
              </Box>
              <Box
                component={CardHeader}
                border="0!important"
                textAlign="center"
                paddingBottom="0!important"
                paddingTop="8rem!important"
                classes={{ root: classes.cardHeaderRootProfile }}
                subheader={
                  <Box display="flex" justifyContent="space-between"></Box>
                }
              ></Box>
              <Box
                component={CardContent}
                classes={{ root: classes.ptMd4 }}
                paddingTop="0!important"
              >
                <Grid container>
                  <Grid item xs={12}>
                    <Box
                      padding="1rem 0"
                      justifyContent="center"
                      display="flex"
                      className={classes.mtMd5}
                    >
                      <Box
                        textAlign="center"
                        marginRight="1rem"
                        padding=".875rem"
                      >
                        <Box
                          component="span"
                          fontSize="1.1rem"
                          fontWeight="700"
                          display="block"
                          letterSpacing=".025em"
                          className={classes.typographyRootH6}
                        >
                          {Object.keys(contacts).length}
                        </Box>
                        <Box
                          component="span"
                          fontSize=".875rem"
                          color={theme.palette.gray[500]}
                        >
                          Contacts
                        </Box>
                      </Box>
                      <Box
                        textAlign="center"
                        marginRight="1rem"
                        padding=".875rem"
                      >
                        <Box
                          component="span"
                          fontSize="1.1rem"
                          fontWeight="700"
                          display="block"
                          letterSpacing=".025em"
                          className={classes.typographyRootH6}
                        >
                         {Object.keys(groups).length}
                        </Box>
                        <Box
                          component="span"
                          fontSize=".875rem"
                          color={theme.palette.gray[500]}
                        >
                          Groups
                        </Box>
                      </Box>
                      <Box textAlign="center" padding=".875rem">
                        <Box
                          component="span"
                          fontSize="1.1rem"
                          fontWeight="700"
                          display="block"
                          letterSpacing=".025em"
                          className={classes.typographyRootH6}
                        >
                          {channels.length}
                        </Box>
                        <Box
                          component="span"
                          fontSize=".875rem"
                          color={theme.palette.gray[500]}
                        >
                          Channels
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
                <Box textAlign="center">
                  <Typography variant="h3">{activeShip}</Typography>
                  <Box
                    component={Typography}
                    variant="h5"
                    fontWeight="300!important"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box
                      component={LocationOn}
                      width="1.25rem!important"
                      height="1.25rem!important"
                    ></Box>
                    Mars
                  </Box>

                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="1rem"
                  ></Box>
                  <Box
                    component={Divider}
                    marginTop="1.5rem!important"
                    marginBottom="1.5rem!important"
                  ></Box>
                  <Box
                    component={Typography}
                    variant="h4"
                    marginTop="1rem!important"
                  >
                    {shipKind}
                  </Box>
                  <Box
                    component="p"
                    fontWeight="300"
                    lineHeight="1.7"
                    marginBottom="1rem"
                    fontSize="1rem"
                  ></Box>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Profile;
