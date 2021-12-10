import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import React from "react";
import Columns from "./columns";
import "./table.css";

const useStyles = makeStyles((theme) => ({
  button: {
    color: "#06847B",
    border: "1px solid #7bbcb7",
    "&:hover": {
      backgroundColor: "rgba(6, 132, 123, 0.1)",
      border: "1px solid #06847B",
    },
  },
}));

function SortHeader(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [options, setOptions] = React.useState(props.columnnames);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(false);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Grid container lg={12} md={12} sm={12} xs={12} style={{ display: "flex", justifyContent: "space-between" }}>
      <Grid xl={8} lg={9} md={8} sm={7} xs={12}>
        <h4 className="products">{props.title ? props.title : "Variants Table"} </h4>
      </Grid>
      <Grid container xl={4} lg={3} md={4} sm={5} xs={12} style={{ display: "flex", justifyContent: "flex-end" }}>
        <Grid className="column-btn" lg={5} md={5} sm={5} xs={5} style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            className="product"
            size="small"
            id="one"
            color="primary"
            backgroundColor="secondary"
            onClick={handleClick}
            variant="outlined"
            color="primary"
            style={{ fontSize: "15px", padding: "6px 6px" }}
          >
            COLUMNS
            <ArrowDownwardIcon fontSize="inherit" />
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Columns
              columns={options}
              selectcolumnfilter={props.getColumnnames}
              displytype={props.displytype}
              columnclose={handleClose}
            />
          </Popover>
        </Grid>
        {/* <Grid className="column-btn" lg={7} md={7} sm={7} xs={7}>
                        <Button id="create"  className="product" variant="contained" size="large" color="primary" backgroundColor="secondary">
                        CREATE PRODUCT
                        </Button>
                    </Grid> */}
      </Grid>
    </Grid>
  );
}
export default SortHeader;
