import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import {Grid, Chip } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
const useStyles = makeStyles(theme => ({
    card: {
      width: '100%',
      padding: theme.spacing(1),
      marginTop : theme.spacing(2)
    },
    buttonPadding: {    
        marginLeft: theme.spacing(2),   
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    chip: {
      color: theme.palette.success.contrastText,
      backgroundColor: theme.palette.success.main,
    },
    pendingchip: {
      color: theme.palette.success.contrastText,
      backgroundColor: theme.palette.secondary,
    }
  }));

export default function Categoryrow(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
  return (
    
    <Card className={classes.card}>

      <Grid container sm={12} xs={12} alignItems='center' spacing={2}>
            <Grid item xs={6} sm={9}>
                    <Typography variant="subtitle2" gutterBottom>
                       mano
                    </Typography>
                    <Typography variant="caption" gutterBottom>
                    mani
                    </Typography>
            </Grid>
            <Grid container item xs={3} spacing={2}   direction="row"
            alignItems="center"
            justify="center"
                >
              <Grid item xs={9}> <Chip  className={props.user.status_id === 1 ? classes.pendingchip : classes.chip }
            label={props.user.status_id === 1 ? 'pending' : 'registered'}
            size="small" /></Grid>
             <Grid item xs={3}>
            {/* <IconButton aria-label="add to favorites" onClick={() => props.handleedit(props.rowid)}>
            <CreateIcon />
            </IconButton> */}
            <IconButton aria-label="add to favorites" onClick={() => props.handledelete(props.rowid)}>
            <DeleteIcon />
            </IconButton>
            </Grid>
            </Grid>

      </Grid>
      
      
    </Card>
  );
}