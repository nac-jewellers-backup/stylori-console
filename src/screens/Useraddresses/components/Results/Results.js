import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  colors
} from '@material-ui/core';
import data from "./../data.json"

import { Label } from '../../../../components'


const useStyles = makeStyles(() => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
  //  minWidth: 1150
  },
  tableWrapper: {
    // overflowX: 'auto',
    // overflowY: 'auto',
    // width: '100%',
    // maxHeight: '100vh'
  },
}));

const Invoices = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchInvoices = () => {
      // axios.get('/api/management/customers/1/invoices').then(response => {
      //   if (mounted) {
           setInvoices([
            {
           //   id: uuid(),
              type: 'paid',
              value: 10.0
            },
            {
           //   id: uuid(),
              type: 'paid',
              value: 15.0
            },
            {
            //  id: uuid(),
              type: 'due',
              value: 5
            },
            {
             /// id: uuid(),
              type: 'income',
              value: 10.0
            }
          ]);
      //   }
      // });
    };

    fetchInvoices();

    return () => {
      mounted = false;
    };
  }, []);

  const statusColors = {
    pending: colors.orange[600],
    paid: colors.green[600],
    rejected: colors.red[600]
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Card>
        <CardHeader
         // action={<GenericMoreButton />}
          title={props.title}
        />
        <Divider />
        <CardContent className={classes.content}>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                  {props.columns.map(column => (
                    <TableCell>{column.label}</TableCell>
                  ))
                  }                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.masters.map(invoice => (
                    <TableRow key={invoice.id}>
                      {/* <TableCell>#{invoice.id}</TableCell>
                      <TableCell>
                        {moment(invoice.date).format('DD/MM/YYYY | HH:MM')}
                      </TableCell>
                      <TableCell>{invoice.description}</TableCell>
                      <TableCell>{invoice.paymentMethod}</TableCell>
                      <TableCell>
                        {invoice.currency}
                        {invoice.value}
                      </TableCell>
                      <TableCell>
                        <Label
                          color={statusColors[invoice.status]}
                          variant="outlined"
                        >
                          {invoice.status}
                        </Label>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          color="primary"
                          component={RouterLink}
                          size="small"
                          to={'/management/invoices/1'}
                          variant="outlined"
                        >
                          View
                        </Button>
                  </TableCell> */}
                   {props.columns.map(column => (
                     <>
                     {column.type === 2 ?  <TableCell>
                      {moment(invoice.date).format('DD/MM/YYYY | HH:MM a')}
                    </TableCell> : 
                     <TableCell>
                     {invoice[column.key]}
                   </TableCell>
                    }
                    </>
                     
                   ))}
                    </TableRow> 


                  ))}
                </TableBody>
              </Table>
            </div>
        </CardContent>
      </Card>
    </div>
  );
};

Invoices.propTypes = {
  className: PropTypes.string
};

export default Invoices;
