import React from 'react';
import { withRouter } from "react-router-dom";
import { MaterialProvider } from '../../context';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { useQuery } from 'react-apollo';
import { materialMaster } from '../../services/mapper';
import Component from './Producttypecontent';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2)
    },
  }));
export const MaterialList = withRouter(props => {
    const classes = useStyles();

    const { data, loading, error } = useQuery(materialMaster.query);

    if(loading) return <div><CircularProgress className={classes.progress} />
    </div>
    if(error) return <div>error</div>
    return (
        
        <MaterialProvider value={{ data, mapper: materialMaster.mapper, mappertype:  "materialMaster" }} >
            
    <Component {...props} />
    </MaterialProvider>

)});
export default MaterialList;