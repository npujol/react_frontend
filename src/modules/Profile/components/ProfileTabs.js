import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import StoryList from "../../Home/components/StoryList";

function TabPanel(props) {
  const { children, value, index, stories, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      <StoryList stories={props.stories} loading={false} />;
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function TabsWrappedLabel(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(() => "one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
          centered
        >
          <Tab value="one" label="Yours" wrapped {...a11yProps("one")} />
          <Tab value="two" label="Favorites" {...a11yProps("two")} />
        </Tabs>
      </AppBar>
      <TabPanel
        value={value}
        index="one"
        stories={props.yoursStories}
      ></TabPanel>
      <TabPanel
        value={value}
        index="two"
        stories={props.favoritesStories}
      ></TabPanel>
    </div>
  );
}
