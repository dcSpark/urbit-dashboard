import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// core components
import componentStyles from "assets/theme/components/admin-footer.js";

const useStyles = makeStyles(componentStyles);

const Footer = () => {
  const classes = useStyles();
  return (
    <Box component="footer" width="100%" padding="2.5rem 0">
      <Grid container classes={{ root: classes.justifyContentCenter }}>
        <Box
          item
          xs={12}
          xl={6}
          component={Grid}
          display="flex"
          alignItems="center"
          className={classes.justifyContentCenter}
        >
          <div className={classes.copyrightWrapper}>
            © {new Date().getFullYear()}{" "}
            <a
              className={classes.copyrightLink}
              href="https://dcspark.io"
              rel="noopener noreferrer"
              target="_blank"
            >
              dcSpark
            </a>
          </div>
        </Box>
      </Grid>
    </Box>
  );
};

export default Footer;
