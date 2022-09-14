import React from "react";
import {
  Dialog,
  DialogTitle,
  Slide,
  Typography,
  IconButton,
  makeStyles,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Button,
  Switch,
  Grid,
  TextField,
  FormControl,
  DialogContent,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import moment, { now } from "moment";
import { useApolloClient, useQuery } from "react-apollo";
import {
  CREATE_ATTRIBUTE,
  UPDATE_ATTRIBUTE_BY_ID,
} from "../../graphql/mutation";
import { AlertContext } from "../../context";
import { attributesByMasterID } from "../../graphql/query";
import { Skeleton } from "@material-ui/lab";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  container: {
    maxHeight: 500,
  },
  searchBox: {
    position: "absolute",
    right: theme.spacing(18),
    top: theme.spacing(2),
  },
  createButton: {
    position: "absolute",
    right: theme.spacing(8),
    top: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  formGrid: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
}));

const columns = {
  ID: {
    value: "id",
    type: Number,
  },
  Name: {
    value: "name",
    type: String,
  },
  "Filter Position": {
    value: "filterPosition",
    type: Number,
  },
  Active: {
    value: "isActive",
    type: Boolean,
  },
  Search: {
    value: "isSearch",
    type: Boolean,
  },
  Filter: {
    value: "isFilter",
    type: Boolean,
  },
  "Short Code": {
    value: "shortCode",
    type: String,
  },
  Alias: {
    value: "alias",
    type: String,
  },
  "Alias Id": {
    value: "aliasId",
    type: String,
  },
  "Last Updated On": {
    value: "last_updated_at",
    type: Date,
  },
  "": {
    type: "Edit",
  },
};

export const FilterAttributeSettings = (props) => {
  const classes = useStyles();

  const [editMode, setEditMode] = React.useState(false);
  const [attributes, setAttributes] = React.useState({});
  const [search, setSearch] = React.useState("");

  const client = useApolloClient();
  const snack = React.useContext(AlertContext);

  const handleEditChange = (item) => {
    setAttributes(item);
    setEditMode(true);
  };
  const handleSave = () => {
    let { id, last_updated_at, __typename, ...rest } = attributes;
    let payload = {
      attribute: rest,
    };
    if (id) {
      payload.id = id;
      payload.attribute = {
        ...payload.attribute,
        updatedAt: new Date(),
      };
    } else {
      payload.attribute = {
        ...payload.attribute,
        isActive: true,
        isSearch: true,
        isFilter: true,
        masterId: props?.masterData?.id,
        aliasId: payload?.attribute?.filterPosition,
      };
    }
    saveChanges(payload);
    setEditMode(false);
  };

  const handleInputChange = (event) => {
    let { name, value } = event.target;
    if (name == `filterPosition`) {
      value = Number(value);
    }
    setAttributes({ ...attributes, [name]: value });
  };

  const saveChanges = (payload) => {
    let mutationQuery = CREATE_ATTRIBUTE;
    if (payload?.id) {
      mutationQuery = UPDATE_ATTRIBUTE_BY_ID;
    }
    client
      .mutate({
        mutation: mutationQuery,
        variables: payload,
      })
      .then(() => {
        snack.setSnack({
          open: true,
          msg: `Successfully ${!payload?.id ? `Created` : `Updated`}!`,
        });
        refetch();
      })
      .catch((err) => {
        console.log(err);
        snack.setSnack({
          open: true,
          severity: "error",
          msg: "Some error occured!",
        });
      });
  };

  const handleSwitchChange = (event, attributes) => {
    let { name } = event.target;
    attributes = { ...attributes, [name]: !attributes[name] };
    let { id, last_updated_at, __typename, ...rest } = attributes;
    let payload = {
      attribute: rest,
    };
    if (id) {
      payload.id = id;
      payload.attribute = {
        ...payload.attribute,
        updatedAt: new Date(),
      };
    }
    saveChanges(payload);
  };

  const { loading, error, data, refetch } = useQuery(attributesByMasterID, {
    variables: { masterId: props?.masterData?.id, search },
  });

  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition}
      onClose={props.onClose}
      maxWidth="lg"
    >
      <DialogTitle className={classes.root}>
        <Typography variant="h2">{props?.masterData?.name}</Typography>
        <TextField
          label="Search"
          name="search"
          className={classes.searchBox}
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          variant="outlined"
          size="small"
        />
        <Button
          className={classes.createButton}
          variant="contained"
          color="primary"
          onClick={() => {
            if (!editMode) {
              handleEditChange({});
            } else {
              handleSave();
            }
          }}
        >
          {!editMode ? `Create` : `Save`}
        </Button>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={props.onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={!editMode ? 0 : 10}>
            <TableContainer component={Paper} className={classes.container}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {Object.keys(columns).map((item, index) => (
                      <TableCell variant="head" align="center" key={index}>
                        {item}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading && (
                    <TableRow>
                      <TableCell colSpan={Object.keys(columns).length}>
                        <Skeleton variant="rect" />
                      </TableCell>
                    </TableRow>
                  )}
                  {data?.attributes &&
                    data?.attributes?.nodes?.map((item, index) => (
                      <TableRow key={index}>
                        {Object.keys(columns).map((element) => (
                          <TableCell
                            align="center"
                            key={`@${element}_${element?.id}`}
                          >
                            {columns[element].type == Date &&
                              moment(item[columns[element].value]).format(
                                "DD-MM-YYYY"
                              )}
                            {!["Edit", Date, Boolean].includes(
                              columns[element].type
                            ) && item[columns[element].value]}
                            {columns[element].type == Boolean && (
                              <Switch
                                checked={item[columns[element].value]}
                                inputProps={{ name: columns[element].value }}
                                onChange={(event) => {
                                  handleSwitchChange(event, item);
                                }}
                                color="primary"
                              />
                            )}
                            {columns[element].type == "Edit" && (
                              <IconButton
                                onClick={() => {
                                  handleEditChange(item);
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          {editMode && (
            <Grid item className={classes.formGrid} xs={2}>
              <FormControl>
                <TextField
                  label="Name"
                  name="name"
                  value={attributes?.name}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  label="Filter Position"
                  name="filterPosition"
                  value={attributes?.filterPosition}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  label="Short Code"
                  name="shortCode"
                  value={attributes?.shortCode}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  label="Alias"
                  name="alias"
                  value={attributes?.alias}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                />
                <Button
                  color="primary"
                  variant="contained"
                  style={{ position: "absolute", right: 1, bottom: -30 }}
                  onClick={() => {
                    setAttributes({});
                    setEditMode(false);
                  }}
                >
                  Cancel
                </Button>
              </FormControl>
            </Grid>
          )}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
