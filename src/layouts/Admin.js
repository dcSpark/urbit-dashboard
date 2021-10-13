import React from "react";
import { useEffect } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
// @material-ui/icons components
import Search from "@material-ui/icons/Search";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import NavbarDropdown from "components/Dropdowns/NavbarDropdown.js";

import routes from "routes.js";

import componentStyles from "assets/theme/layouts/admin.js";

import { useStore } from "../store";
import Overlay from "../components/Urbit/Overlay";
import { urbitVisor } from "uv-core";


const useStyles = makeStyles(componentStyles);



const Admin = () => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    // mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  const {
    loaded,
    checkConnection,
    recheckConnection,
    checkPerms,
    isConnected,
    reset,
    setShip,
    hasPerms,
    loadData,
    addToChatFeed,
    addConnectionListener,
    addDisconnectionListener,
    addPermissionGrantingListener,
    addPermissionRevokingListener,
    addChatFeedListener,
    setChatsub
  } = useStore();

  useEffect(() => {
    checkConnection();
    if (loaded) addConnectionListener(urbitVisor.on("connected", [], (message) => recheckConnection()));
    if (isConnected) {
      checkPerms();
      addPermissionRevokingListener(urbitVisor.on("permissions_revoked", [], (data) => checkPerms()));
      addPermissionGrantingListener(urbitVisor.on("permissions_granted", [], (data) => checkPerms()));
      addChatFeedListener(urbitVisor.on("sse", ["graph-update","add-nodes" ], (node) => addToChatFeed(node)));
      addDisconnectionListener(urbitVisor.on("disconnected", [], (message) => {
        const state = useStore.getState();
        state.connectionListener.unsubscribe();
        state.chatFeedListener.unsubscribe();
        state.permissionGrantingListener.unsubscribe();
        state.permissionRevokingListener.unsubscribe();
        state.disconnectionListener.unsubscribe();
        reset();
        recheckConnection()
        // checkPerms();
      }));

    }
  }, [loaded, isConnected]);

  useEffect(() => {
    if (isConnected && hasPerms) {
      setShip();
      loadData();
    }
  }, [isConnected, hasPerms])

  return (
    <>
      <Sidebar
        routes={routes}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../assets/img/brand/argon-react.png").default,
          imgAlt: "...",
        }}
        dropdown={<NavbarDropdown />}
        input={
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-search-responsive">
              Search
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-search-responsive"
              type="text"
              endAdornment={
                <InputAdornment position="end">
                  <Box
                    component={Search}
                    width="1.25rem!important"
                    height="1.25rem!important"
                  />
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
        }
      />
      {!isConnected && <Overlay />}
      {isConnected && !hasPerms && <Overlay />}
      <Box position="relative" className={classes.mainContent}>
        <AdminNavbar brandText={getBrandText(location.pathname)} />
        <Switch>
          {getRoutes(routes)}
          <Redirect from="*" to="/admin/index" />
        </Switch>
        <Container
          maxWidth={false}
          component={Box}
          classes={{ root: classes.containerRoot }}
        >
          <AdminFooter />
        </Container>
      </Box>
    </>
  );
};

export default Admin;




// interface Props{
//   width: string,
//   outerColor: string,
//   innerColor: string
// }
function Spinner(props) {

  return (
    <div className="spinner">
      <svg width={props.width} height={props.width} viewBox="0 0 16 16">
        <path fill={props.innerColor} fillRule="evenodd" clipRule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z"></path>
        <path fill={props.outerColor} d="M12.4446 1.34824C11.129 0.469192 9.58225 0 8 0L8 4C10.2091 4 12 5.79086 12 8C12 10.2091 10.2091 12 8 12C5.79086 12 4 10.2091 4 8L0 8C0 9.58225 0.469191 11.129 1.34824 12.4446C2.22729 13.7602 3.47672 14.7855 4.93853 15.391C6.40034 15.9965 8.00887 16.155 9.56072 15.8463C11.1126 15.5376 12.538 14.7757 13.6569 13.6569C14.7757 12.538 15.5376 11.1126 15.8463 9.56072C16.155 8.00888 15.9965 6.40034 15.391 4.93853C14.7855 3.47672 13.7602 2.2273 12.4446 1.34824Z">
          <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 8 8" to="360 8 8" dur="1.5s" repeatCount="indefinite"></animateTransform>
        </path>
      </svg>
    </div>
  )
}
