import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function ProductsListing(props) {
  const classes = useStyles();
  const [productdata, setProductdata] = React.useState([]);

  const handleDelete = chipToDelete => () => {
   // setChipData(chips => chips.filter(chip => chip.key !== chipToDelete.key));
  };

  return (
    <Paper className={classes.root}>
      {props.products.map(data => {
        let icon;

        // if (data.label === 'React') {
        //   icon = <TagFacesIcon />;
        // }

        return (
          <Chip
            key={data}
            icon={icon}
            label={data}
             onDelete={handleDelete(data)}
            className={classes.chip}
          />
        );
      })}
    </Paper>
  );
}