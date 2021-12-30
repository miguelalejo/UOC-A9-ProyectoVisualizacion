function crearRadares(){
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

var svg = d3.select('body')
	.selectAll('svg')
	.append('svg')
	.attr("width", width)
	.attr("height", height);

function updateConfig(cfg) {
	// adjust config parameters
	cfg.maxValue =300;
	cfg.w *= cfg.levelScale;
	cfg.h *= cfg.levelScale;
	cfg.paddingX = cfg.w * cfg.levelScale;
	cfg.paddingY = cfg.h * cfg.levelScale;
}

  // build main vis components
  function buildVisComponents(cfg,id) {		
	//Initiate Legend	
	var svg = d3.select(id)
    .append('svg')
	.attr("width", cfg.w + cfg.paddingX)
	.attr("height", cfg.paddingY)
	var legend = svg.append("g")
	  .attr("class", "legend")
	  .attr("transform", "translate(" + cfg.translateX + "," + cfg.translateY + ")")
	  ;
	  //Create colour squares
	  legend.selectAll('rect')
		.data(LegendOptions)
		.enter()
		.append("rect")
		.attr("x", cfg.w - cfg.paddingX / 2)
		.attr("y", function(d, i) { return i * 2 * cfg.legendBoxSize; })
		.attr("width", cfg.legendBoxSize)
		.attr("height", cfg.legendBoxSize)
		.style("fill", function(d, i){ return cfg.colors(i);})
		;
	  //Create text next to squares
	  legend.selectAll('text')
		.data(LegendOptions)
		.enter()
		.append("text")
		.attr("x", cfg.w - cfg.paddingX / 2 + (1.5 * cfg.legendBoxSize))
		.attr("y", function(d, i) { return i * 2 * cfg.legendBoxSize; })
		.attr("dy", 0.07 * cfg.legendBoxSize + "em")
		.attr("font-size", "11px")
		.attr("fill", "#737373")
		.text(function(d) { return d; })
		;	

  }

var RadarChartC = {
  draw: function(id, d, options){
  var w = 300;
  var h = 300;
  var cfg = {
	 radius: 5,
	 w: w,
	 h: h,
	 factor: 1,
	 factorLegend: .85,
	 levelScale: 0.65,
	 levels: 3,
	 maxValue: 0,
	 radians: 2 * Math.PI,
	 legendBoxSize: 10,
	 opacityArea: 0.5,
	 ToRight: 5,
	 TranslateX: 80,
	 TranslateY: 30,
	 translateX: 10,
	 translateY: 10,
	 ExtraWidthX: 100,
	 ExtraWidthY: 100,
	 format:d3.format(''),
	 color: d3.scale.category10(),
	 colors: d3.scale.category10(),
	};
	
	if('undefined' !== typeof options){
	  for(var i in options){
		if('undefined' !== typeof options[i]){
		  cfg[i] = options[i];
		}
	  }
	}
	cfg.maxValue = Math.max(cfg.maxValue, d3.max(d, function(i){return d3.max(i.map(function(o){return o.value;}))}));
	var allAxis = (d[0].map(function(i, j){return i.axis}));
	var total = allAxis.length;
	var radius = cfg.factor*Math.min(cfg.w/2, cfg.h/2);
	var Format = cfg.format;
	d3.select(id).select("svg").remove();
	
	var g = d3.select(id)
			.append("svg")
			.attr("width", cfg.w+cfg.ExtraWidthX)
			.attr("height", cfg.h+cfg.ExtraWidthY)
			.append("g")
			.attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");
			;

	var tooltip;
	
	//Circular segments
	for(var j=0; j<cfg.levels-1; j++){
	  var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
	  g.selectAll(".levels")
	   .data(allAxis)
	   .enter()
	   .append("svg:line")
	   .attr("x1", function(d, i){return levelFactor*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
	   .attr("y1", function(d, i){return levelFactor*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
	   .attr("x2", function(d, i){return levelFactor*(1-cfg.factor*Math.sin((i+1)*cfg.radians/total));})
	   .attr("y2", function(d, i){return levelFactor*(1-cfg.factor*Math.cos((i+1)*cfg.radians/total));})
	   .attr("class", "line")
	   .style("stroke", "grey")
	   .style("stroke-opacity", "0.75")
	   .style("stroke-width", "0.3px")
	   .attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");
	}

	//Text indicating at what % each level is
	for(var j=0; j<cfg.levels; j++){
	  var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
	  g.selectAll(".levels")
	   .data([1]) //dummy data
	   .enter()
	   .append("svg:text")
	   .attr("x", function(d){return levelFactor*(1-cfg.factor*Math.sin(0));})
	   .attr("y", function(d){return levelFactor*(1-cfg.factor*Math.cos(0));})
	   .attr("class", "legend")
	   .style("font-family", "sans-serif")
	   .style("font-size", "10px")
	   .attr("transform", "translate(" + (cfg.w/2-levelFactor + cfg.ToRight) + ", " + (cfg.h/2-levelFactor) + ")")
	   .attr("fill", "#737373")
	   .text(Format((j+1)*cfg.maxValue/cfg.levels));
	}
	
	series = 0;

	var axis = g.selectAll(".axis")
			.data(allAxis)
			.enter()
			.append("g")
			.attr("class", "axis");

	axis.append("line")
		.attr("x1", cfg.w/2)
		.attr("y1", cfg.h/2)
		.attr("x2", function(d, i){return cfg.w/2*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
		.attr("y2", function(d, i){return cfg.h/2*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
		.attr("class", "line")
		.style("stroke", "grey")
		.style("stroke-width", "1px");

	axis.append("text")
		.attr("class", "legend")
		.text(function(d){return d})
		.style("font-family", "sans-serif")
		.style("font-size", "11px")
		.attr("text-anchor", "middle")
		.attr("dy", "1.5em")
		.attr("transform", function(d, i){return "translate(0, -10)"})
		.attr("x", function(d, i){return cfg.w/2*(1-cfg.factorLegend*Math.sin(i*cfg.radians/total))-60*Math.sin(i*cfg.radians/total);})
		.attr("y", function(d, i){return cfg.h/2*(1-Math.cos(i*cfg.radians/total))-20*Math.cos(i*cfg.radians/total);});

 
	d.forEach(function(y, x){
	  dataValues = [];
	  g.selectAll(".nodes")
		.data(y, function(j, i){
		  dataValues.push([
			cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)), 
			cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
		  ]);
		});
	  dataValues.push(dataValues[0]);
	  g.selectAll(".area")
					 .data([dataValues])
					 .enter()
					 .append("polygon")
					 .attr("class", "radar-chart-serie"+series)
					 .style("stroke-width", "2px")
					 .style("stroke", cfg.color(series))
					 .attr("points",function(d) {
						 var str="";
						 for(var pti=0;pti<d.length;pti++){
							 str=str+d[pti][0]+","+d[pti][1]+" ";
						 }
						 return str;
					  })
					 .style("fill", function(j, i){return cfg.color(series)})
					 .style("fill-opacity", cfg.opacityArea)
					 .on('mouseover', function (d){
										z = "polygon."+d3.select(this).attr("class");
										g.selectAll("polygon")
										 .transition(200)
										 .style("fill-opacity", 0.1); 
										g.selectAll(z)
										 .transition(200)
										 .style("fill-opacity", .7);
									  })
					 .on('mouseout', function(){
										g.selectAll("polygon")
										 .transition(200)
										 .style("fill-opacity", cfg.opacityArea);
					 });
	  series++;
	});
	series=0;


	d.forEach(function(y, x){
	  g.selectAll(".nodes")
		.data(y).enter()
		.append("svg:circle")
		.attr("class", "radar-chart-serie"+series)
		.attr('r', cfg.radius)
		.attr("alt", function(j){return Math.max(j.value, 0)})
		.attr("cx", function(j, i){
		  dataValues.push([
			cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)), 
			cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
		]);
		return cfg.w/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total));
		})
		.attr("cy", function(j, i){
		  return cfg.h/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total));
		})
		.attr("data-id", function(j){return j.axis})
		.style("fill", cfg.color(series)).style("fill-opacity", .9)
		.on('mouseover', function (d){
					newX =  parseFloat(d3.select(this).attr('cx')) - 10;
					newY =  parseFloat(d3.select(this).attr('cy')) - 5;
					
					tooltip
						.attr('x', newX)
						.attr('y', newY)
						.text(Format(d.value))
						.transition(200)
						.style('opacity', 1);
						
					z = "polygon."+d3.select(this).attr("class");
					g.selectAll("polygon")
						.transition(200)
						.style("fill-opacity", 0.1); 
					g.selectAll(z)
						.transition(200)
						.style("fill-opacity", .7);
				  })
		.on('mouseout', function(){
					tooltip
						.transition(200)
						.style('opacity', 0);
					g.selectAll("polygon")
						.transition(200)
						.style("fill-opacity", cfg.opacityArea);
				  })
		.append("svg:title")
		.text(function(j){return Math.max(j.value, 0)});

	  series++;
	});
	//Tooltip
	tooltip = g.append('text')
			   .style('opacity', 0)
			   .style('font-family', 'sans-serif')
			   .style('font-size', '13px');
	updateConfig(cfg);
	buildVisComponents(cfg,id);
  }
  //Legend
 
};

function crearLeyendas(data){
 var LegendOptions = [];
  for (var key in data) {    
    var value = data[key]["key"];
	LegendOptions.push(value);
	}
	return LegendOptions;
}

d3.json( "https://raw.githubusercontent.com/miguelalejo/CodeSandboxD3Example/main/data/radar-salario.json", function(data) {
	LegendOptions = crearLeyendas(data);  
	data = data.map(function(d) { return d.values });
	RadarChartC.draw("#chart-1", data, config);
});

d3.json( "https://raw.githubusercontent.com/miguelalejo/CodeSandboxD3Example/main/data/radar-owner.json", function(data) {
	LegendOptions = crearLeyendas(data); 
	data = data.map(function(d) { return d.values });
  RadarChartC.draw("#chart-2", data, config);
 
});

d3.json( "https://raw.githubusercontent.com/miguelalejo/CodeSandboxD3Example/main/data/radar-industry.json", function(data) {
	LegendOptions = crearLeyendas(data); 
	data = data.map(function(d) { return d.values });
  RadarChartC.draw("#chart-3", data, config); 

});

d3.json( "https://raw.githubusercontent.com/miguelalejo/CodeSandboxD3Example/main/data/radar-size-company.json", function(data) {
	LegendOptions = crearLeyendas(data); 
	data = data.map(function(d) { return d.values });
  RadarChartC.draw("#chart-4", data, config);
});

}

crearRadares();