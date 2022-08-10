// API access
const airQualityApiUrl = 'https://api.openaq.org/v2/countries?limit=200&page=1&offset=0&sort=asc&order_by=country';
const countryName = [];
const countryCount = [];


async function getCountryData() {
    const response = await fetch(airQualityApiUrl);
    const airJSONData = await response.json();

    for(let i = 0; i < airJSONData.results.length; i++) {
        
        if((airJSONData.results[i].name) == "Kenya") {
            countryName.push(
                airJSONData.results[i].name
            );
    
            countryCount.push(
                airJSONData.results[i].count
            );
        }else if((airJSONData.results[i].name) == "Nigeria") {
            countryName.push(
                airJSONData.results[i].name
            );
    
            countryCount.push(
                airJSONData.results[i].count
            );
        }else if((airJSONData.results[i].name) == "Rwanda") {
            countryName.push(
                airJSONData.results[i].name
            );
    
            countryCount.push(
                airJSONData.results[i].count
            );
        }else if((airJSONData.results[i].name) == "Zimbabwe") {
            countryName.push(
                airJSONData.results[i].name
            );
    
            countryCount.push(
                airJSONData.results[i].count
            );
        }
    }
  

/* ------- svg -------*/
const svg = d3.select('svg').append("g")
svg.append("g").attr("class", "slices");
svg.append("g").attr("class", "labels");
svg.append("g").attr("class", "lines");

const width = 1000;
const height = 500;
const radius = Math.min(width, height) / 2;

const pie = d3.layout.pie()
	.sort(null)
	.value((d) => d.value );

const arc = d3.svg.arc()
	.outerRadius(130)
	.innerRadius(radius);

const outerArc = d3.svg.arc()
	.innerRadius(radius * 0.8)
	.outerRadius(radius * 0.8);

svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

const key = (d) => d.data.label;


const color = d3.scale.ordinal()
	.domain(countryName)
	.range(["hsl(215, 28%, 68%)", "hsl(242, 14%, 59%)", "hsl(276, 13%, 47%)", "hsl(300, 20%, 35%)"]);

function countryData(){
	let labels = color.domain();
	return labels.map((label) => {
		return { label: label, value: Math.random(countryCount[2]) }
	});
}

update(countryData());

d3.select(".update-btn")
	.on("click", function(){
		update(countryData());
	});


function update(data) {

	/* ------- slices -------*/
	const slice = svg.select(".slices").selectAll("path.slice")
		.data(pie(data), key);

	slice.enter()
		.insert("path")
		.style("fill", (d) =>  color(d.data.label))
		.attr("class", "slice");

	slice		
		.transition().duration(1000)
		.attrTween("d", (d) => {
			this._current = this._current || d;
			let interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return (t) => {
				return arc(interpolate(t));
			};
		})

	slice.exit()
		.remove();

	/* ------- Lables -------*/

	const text = svg.select(".labels").selectAll("text")
		.data(pie(data), key);

	text.enter()
		.append("text")
		.attr("dy", ".35em")
		.text((d) => d.data.label);
	
	function middleAngle(d){
		return d.startAngle + (d.endAngle - d.startAngle)/2;
	}
// logical source D3.j Graph Gallery -https://d3-graph-gallery.com/pie.html
	text.transition().duration(1000)
		.attrTween("transform", (d) => {
			this._current = this._current || d;
			let interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return (t) => {
				const d2 = interpolate(t);
				const pos = outerArc.centroid(d2);
				pos[0] = radius * (middleAngle(d2) < Math.PI ? 1 : -1);
				return "translate("+ pos +")";
			};
		})
		.styleTween("text-anchor", (d) => {
			this._current = this._current || d;
			let interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return (t) => {
				let d2 = interpolate(t);
				return middleAngle(d2) < Math.PI ? "start":"end";
			};
		});

	text.exit()
		.remove();

	/* ------- Lines -------*/

	const polyline = svg.select(".lines").selectAll("polyline")
		.data(pie(data), key);
	
	polyline.enter()
		.append("polyline");
    // logical source D3.j Graph Gallery -https://d3-graph-gallery.com/pie.html
	polyline.transition().duration(1000)
		.attrTween("points", (d) => {
			this._current = this._current || d;
			let interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return (t) => {
				let d2 = interpolate(t);
				let pos = outerArc.centroid(d2);
				pos[0] = radius * 0.95 * (middleAngle(d2) < Math.PI ? 1 : -1);
				return [arc.centroid(d2), outerArc.centroid(d2), pos];
			};			
		});
	
	polyline.exit()
		.remove();

    };
} getCountryData();
