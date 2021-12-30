var width = 300,
    height = 250;

// Config for the Radar chart
var colorscale = d3.scale.category10();
var config = {
    w: width,
    h: height,
   
    levels: 5,
    ExtraWidthX: 200,
    ExtraWidthY: 100,
    format: d3.format('.0f'),
    unit: '$',
    colors: colorscale,
    color:colorscale
    /*color: function(i) {
      c = ['red', 'yellow', 'pink', 'green', 'blue', 'olive', 'aqua', 'cadetblue', 'crimson'];
      return c[i];
    }*/
}

var LegendOptions = ['Big Data Engineer', 'Data Analyst', 'Data Engineer',
'Data Scientist', 'Machine Learning Engineer'];