import React, { useEffect, useContext, useState } from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import PropTypes from "prop-types";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableCell from "@material-ui/core/TableCell";

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
 
  console.log(props.columns,"column objs")
  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
            />
          </TableCell> */}

        {/* {props.columns.map((headCell) => (
          <TableCell
            key={headCell.id}
            width={headCell.type == 9 ? 300 : null}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "desc"}
              onClick={createSortHandler(headCell.id)}
            >
              
              {headCell.name}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "" : ""}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))} */}
        {props.columns.map((item,index)=>(
    <TableCell
    key={index}
    width={item.type == 9 ? 300 : null}
    align={item.numeric ? "right" : "left"}
    padding={item.disablePadding ? "none" : "default"}
    sortDirection={orderBy === item.id ? order : false}
    >
      <TableSortLabel
       active={orderBy === item.id}
       direction={orderBy === item.id ? order : "desc"}
       onClick={createSortHandler(item.id)}
      >
      {item.name}
      {orderBy === item.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "" : ""}
                </span>
              ) : null}
      </TableSortLabel>
    </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default EnhancedTableHead;
