import React from 'react';
import { withRouter } from "react-router-dom";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import AddContact from '../../components/AddContact'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { MaterialProvider } from '../../context';
import { useQuery } from 'react-apollo';
import { materialMaster } from '../../services/mapper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MaterialContext } from '../../context';
import Content from './Content';

const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2)
    },
  }));

export const Materiallist = withRouter(props => {
    const classes = useStyles();

    const { data, loading, error } = useQuery(materialMaster.query);

    if(loading) return <div><CircularProgress className={classes.progress} />
    </div>
    if(error) return <div>error</div>
    return (
        
        <MaterialProvider value={{ data, mapper: materialMaster.mapper, mappertype:  "materialMaster" }} >
             <Content  />
        </MaterialProvider>
  )
});

export default Materiallist;