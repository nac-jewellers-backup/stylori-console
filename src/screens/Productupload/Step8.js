import React from 'react';
import Grid from '@material-ui/core/Grid';
import ReactDOM from 'react-dom';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css'
import Typography from '@material-ui/core/Typography';
import { ProductContext } from '../../context';
import TableRenderers from 'react-pivottable/TableRenderers';
import createPlotlyComponent from 'react-plotly.js/factory';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';

// create Plotly React component via dependency injection
const Plot = createPlotlyComponent(window.Plotly);

// create Plotly renderers via dependency injection
const PlotlyRenderers = createPlotlyRenderers(Plot);

// see documentation for supported input formats
const data = [{
'id':'1',
'productid':'SE30002',
'productname':'Gold Ring', 
'purity':'18K',
'material':'Gold',
'diamondcolor':'EF',
'diamondclarity':'VVS',
'gemstone':'Navrathna',
'size':'18',
'costprice':30000,
'sellingprice':38000,
'margin':8000
}, 
{
  'id':'2',
  'productid':'SE30002',
  'productname':'Diamond Ring', 
  'purity':'18K',
  'material':'Diamond',
  'diamondcolor':'EF',
  'diamondclarity':'VVS',
  'gemstone':'Navrathna',
  'size':'12',
  'costprice':70000,
  'sellingprice':98000,
  'margin':28000
  }
];

  
  const dimensions = [
    {value: 'firstName', title: 'First Name'}
  ]

  const reduce = function(row, memo) {
    memo.amountTotal = (memo.amountTotal || 0) + parseFloat(row.transaction.amount)
    return memo
  }

  const calculations = [
    {
      title: 'Amount', value: 'amountTotal',
      template: function(val, row) {
        return '$' + val.toFixed(2)
      },
      sortBy: function(row) {
        return isNaN(row.amountTotal) ? 0 : row.amountTotal
      }
    }
  ]
  
  
  
export default function Pivot(props) {
  const { productCtx, setProductCtx, masterData } = React.useContext(ProductContext);
  function setcurrentstate(s)
  {
    setProductCtx({ ...productCtx, s })

  }
  return (
    <React.Fragment>
    <Grid container xs={12} spacing={2}>
    <Grid item xs={12} >
    <PivotTableUI
                data={data}
                onChange={s => setcurrentstate(s)}
                renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
                {...productCtx.s}

          />
    </Grid>
    
        </Grid>
 </React.Fragment>
  );
}