import React from "react";
import {
  Grid,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import { NetworkStatus } from "apollo-client";
import { GETALLERRORLOGS } from "../../graphql/query";
import { useQuery } from "react-apollo";

const ErrorLogs = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { loading, data, error, refetch, networkStatus } =
    useQuery(GETALLERRORLOGS);

  return (
    <Grid container spacing={3}>
      <Grid
        container
        item
        xs={12}
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        <Typography variant="h4">Error Logs</Typography>
      </Grid>
      <Grid container item xs={12} sm={12} spacing={2}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align={"center"}>Page</TableCell>
                <TableCell align={"center"}>Error</TableCell>
                <TableCell align={"center"}>Message</TableCell>
                <TableCell align={"center"}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(loading || NetworkStatus.refetch === networkStatus) && (
                <TableRow>
                  <TableCell colSpan={5} align={"center"} padding="none">
                    <LinearProgress />
                  </TableCell>
                </TableRow>
              )}
              {error && (
                <TableRow>
                  <TableCell colSpan={5} align={"center"}>
                    <Typography>
                      Some Error occured please try again!
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              {data && data?.allUiErrorLogs?.nodes.length == 0 && (
                <TableRow>
                  <TableCell colSpan={5} align={"center"}>
                    <Typography>No Error found!</Typography>
                  </TableCell>
                </TableRow>
              )}
              {data &&
                data?.allUiErrorLogs?.nodes.length > 0 &&
                data?.allUiErrorLogs?.nodes.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell align={"center"} padding="none">
                      {item?.page}
                    </TableCell>
                    <TableCell align={"center"} padding="none">
                      {item?.error}
                    </TableCell>{" "}
                    <TableCell align={"center"} padding="none">
                      {item?.message}
                    </TableCell>
                    <TableCell align={"center"} padding="none">
                      {moment(item?.createdAt, "YYYY-MM-DD").format(
                        "MMM DD,YYYY"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={5}
                  align={"right"}
                  rowsPerPageOptions={[10, 25, 100]}
                  count={data?.allUiErrorLogs?.totalCount}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};
export default ErrorLogs;
