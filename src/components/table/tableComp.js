import {
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Link,
    Button,
    Table,
    Typography,
} from "@material-ui/core";
import React from "react";
import { useStyles } from "./styles";
import TableBodyRow from "./tableBodyRow";
import TableHeaderComp from "./tableHead";

const TableComp = ({
    name,
    noAddNew = false,
    header = [],
    tableData = [],
    data = [],
    handleViewStores = () => null,
    handleDelete = () => null,
    handleEdit = () => null,
    handleAddNew = () => null
}) => {
    const classes = useStyles();
    return (
        <>
            <TableHeaderComp name={name} noAddNew={noAddNew} handleAddNew={handleAddNew}
            />
            <div className={classes.tableWrapper}>
                <Table
                    className={classes.table}
                    border={1}
                    borderColor={"#ddd"}
                    size="small"
                    stickyHeader
                >
                    <TableHead>
                        <TableRow>
                            {header?.map((val) => (
                                <TableCell>{val}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    {data.length > 0 ?
                        <TableBody>
                            {data.map((val, index) => (
                                <TableBodyRow
                                    tableData={tableData}
                                    rowData={val}
                                    rowIndex={index}
                                    handleViewStores={handleViewStores}
                                    handleDelete={handleDelete}
                                    handleEdit={handleEdit}
                                />
                            ))}
                        </TableBody> :
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                padding: "10px 0px",
                            }}
                        >
                            <Typography variant="body1"> No data Found </Typography>
                        </div>}
                </Table>
            </div>
        </>
    );
};

export default TableComp;
