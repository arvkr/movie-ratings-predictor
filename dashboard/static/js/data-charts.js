function dashboard(id, id2, id3, fData){
    var barColor = '#7c83c4';
    function segColor(c){ return {pos:"#4bb065", neg:"#d70a4d",neutral:"#387aca"}[c]; }

    fData.forEach(function(d){d.total=d.freq.pos+d.freq.neg+d.freq.neutral;});

    function histoGram(fD){
        var hG={},    hGDim = {t: 30, r: 0, b: 90, l: 0};
        hGDim.w = 400 - hGDim.l - hGDim.r,
        hGDim.h = 250 - hGDim.t - hGDim.b;

        var hGsvg = d3.select(id).append("svg")
            .attr("width", hGDim.w + hGDim.l + hGDim.r)
            .attr("height", hGDim.h + hGDim.t + hGDim.b).append("g")
            .attr("transform", "translate(" + hGDim.l + "," + hGDim.t + ")");

        var x = d3.scale.ordinal().rangeRoundBands([0, hGDim.w], 0.1)
                .domain(fD.map(function(d) { return d[0]; }));

        hGsvg.append("g").attr("class", "x axis")
            .attr("transform", "translate(0," + hGDim.h + ")")
            .call(d3.svg.axis().scale(x).orient("bottom"))
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "2em")
            .attr("dy", ".2em").style("font-size", "12px")
            .attr("transform", function(d) {
                return "translate(0," + 35 + ")" +  " rotate(-90)"
                });;

        var y = d3.scale.linear().range([hGDim.h, 0])
                .domain([0, d3.max(fD, function(d) { return d[1]; })]);

        var bars = hGsvg.selectAll(".bar").data(fD).enter()
                .append("g").attr("class", "bar");

        bars.append("rect")
            .attr("x", function(d) { return x(d[0]); })
            .attr("y", function(d) { return y(d[1]); })
            .attr("width", x.rangeBand())
            .attr("height", function(d) { return hGDim.h - y(d[1]); })
            .attr('fill',barColor)
            .on("mouseover",mouseover)
            .on("mouseout",mouseout);

        bars.append("text").text(function(d){ return d3.format(",")(d[1])})
            .attr("x", function(d) { return x(d[0])+x.rangeBand()/2; })
            .attr("y", function(d) { return y(d[1])-5; })
            .attr("text-anchor", "middle").style("font-size", "10px");

        bars.append("text").text(function(d){ return d3.format(",")(d[2])})
            .attr("x", function(d) { return x(d[0])+x.rangeBand()/2; })
            .attr("y", function(d) { return hGDim.h-5; })
            .attr("text-anchor", "middle").style("font-size", "10px");

        function mouseover(d){
            var st = fData.filter(function(s){ return s.State == d[0];})[0],
                nD = d3.keys(st.freq).map(function(s){ return {type:s, freq:st.freq[s]};});

            pC.update(nD);
            leg.update(nD);
        }

        function mouseout(d){
            pC.update(tF);
            leg.update(tF);
        }

        hG.update = function(nD, color){
            y.domain([0, d3.max(nD, function(d) { return d[1]; })]);

            var bars = hGsvg.selectAll(".bar").data(nD);

            bars.select("rect").transition().duration(500)
                .attr("y", function(d) {return y(d[1]); })
                .attr("height", function(d) { return hGDim.h - y(d[1]); })
                .attr("fill", color);

            bars.select("text").transition().duration(500)
                .text(function(d){ return d3.format(",")(d[1])})
                .attr("y", function(d) {return y(d[1])-5; });
        }
        return hG;
    }

    function pieChart(pD){
        var pC ={},    pieDim ={w:150, h: 150};
        pieDim.r = Math.min(pieDim.w, pieDim.h) / 2;

        var piesvg = d3.select(id2).append("svg")
            .attr("width", pieDim.w).attr("height", pieDim.h).append("g")
            .attr("transform", "translate("+pieDim.w/2+","+pieDim.h/2+")");

        var arc = d3.svg.arc().outerRadius(pieDim.r - 10).innerRadius(0);

        var pie = d3.layout.pie().sort(null).value(function(d) { return d.freq; });

        piesvg.selectAll("path").data(pie(pD)).enter().append("path").attr("d", arc)
            .each(function(d) { this._current = d; })
            .style("fill", function(d) { return segColor(d.data.type); })
            .on("mouseover",mouseover).on("mouseout",mouseout);

        pC.update = function(nD){
            piesvg.selectAll("path").data(pie(nD)).transition().duration(500)
                .attrTween("d", arcTween);
        }
        function mouseover(d){
            hG.update(fData.map(function(v){
                return [v.State,Math.round(v.freq[d.data.type]/(v.freq["pos"]+v.freq["neg"]+v.freq["neutral"])*Math.pow(10,2))/Math.pow(10,2)]}),segColor(d.data.type));
        }
        function mouseout(d){
            hG.update(fData.map(function(v){
                return [v.State,v.total];}), barColor);
        }
        function arcTween(a) {
            var i = d3.interpolate(this._current, a);
            this._current = i(0);
            return function(t) { return arc(i(t));    };
        }
        return pC;
    }

    function legend(lD){
        var leg = {};

        var legend = d3.select(id3).append("table").attr('class','legend');

        var tr = legend.append("tbody").selectAll("tr").data(lD).enter().append("tr");

        tr.append("td").append("svg").attr("width", '16').attr("height", '16').append("rect")
            .attr("width", '16').attr("height", '16')
			.attr("fill",function(d){ return segColor(d.type); });

        tr.append("td").text(function(d){ return d.type;});

        tr.append("td").attr("class",'legendFreq')
            .text(function(d){ return d3.format(",")(d.freq);});

        tr.append("td").attr("class",'legendPerc')
            .text(function(d){ return getLegend(d,lD);});

        leg.update = function(nD){
            var l = legend.select("tbody").selectAll("tr").data(nD);

            l.select(".legendFreq").text(function(d){ return d3.format(",")(d.freq);});

            l.select(".legendPerc").text(function(d){ return getLegend(d,nD);});
        }

        function getLegend(d,aD){
            return d3.format("%")(d.freq/d3.sum(aD.map(function(v){ return v.freq; })));
        }

        return leg;
    }

    var tF = ['pos','neg','neutral'].map(function(d){
        return {type:d, freq: d3.sum(fData.map(function(t){ return t.freq[d];}))};
    });

    var sF = fData.map(function(d){return [d.State,d.total,Math.round(d.avgrating*Math.pow(10,2))/Math.pow(10,2)];});

    var hG = histoGram(sF),
        pC = pieChart(tF),
        leg= legend(tF);
}
