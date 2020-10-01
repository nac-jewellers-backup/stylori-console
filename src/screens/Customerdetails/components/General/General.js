import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider,
  Table,
  TableBody,
  TableRow,
  TableCell,
  colors
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined';
import PersonIcon from '@material-ui/icons/PersonOutline';

import { Label } from '../../../../components';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  actions: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    '& > * + *': {
      marginLeft: 0
    }
  },
  buttonIcon: {
    marginRight: theme.spacing(1)
  }
}));

const General = props => {
  const { customer, className, ...rest } = props;

  const classes = useStyles();

  const [openEdit, setOpenEdit] = useState(false);

  const handleEditOpen = () => {
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="Customer info" />
      <Divider />
      <CardContent className={classes.content}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>{customer.first_name} {customer.last_name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>
                {customer ? customer.email : ""}
                {customer.isemailverified && <div>
                  <Label
                    color={
                         customer.isemailverified ? colors.green[600] : colors.orange[600]
                    }
                  >
                    
                  {customer.isemailverified
                      ? 'Email verified'
                      : 'Email not verified'} 
                  </Label>
                </div>}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Phone</TableCell>
               <TableCell>{customer.mobile}
               {customer.isemailverified && <div>
                  <Label
                    color={
                         customer.ismobileverified ? colors.green[600] : colors.orange[600]
                    }
                  >
                    
                  {customer.ismobileverified
                      ? 'Mobile verified'
                      : 'Mobile not verified'} 
                  </Label>
                </div>}
                </TableCell>
            </TableRow>
            
          </TableBody>
        </Table>
      </CardContent>
      {/* <CardActions className={classes.actions}>
        <Button onClick={handleEditOpen}>
          <EditIcon className={classes.buttonIcon} />
          Edit
        </Button>
        <Button>
          <LockOpenIcon className={classes.buttonIcon} />
          Reset &amp; Send Password
        </Button>
        <Button>
          <PersonIcon className={classes.buttonIcon} />
          Login as Customer
        </Button>
      </CardActions> */}
      {/* <CustomerEdit
        customer={customer}
        onClose={handleEditClose}
        open={openEdit}
      /> */}
    </Card>
  );
};

General.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.object.isRequired
};

export default General;
