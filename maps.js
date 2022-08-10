const airQualityApiUrl = 'https://api.openaq.org/v2/countries?limit=200&page=1&offset=0&sort=asc&order_by=country';

async function getAirQuality() {
    const response = await fetch(airQualityApiUrl);
    const airDataJSON = await response.json();

    const countryCount = [];
    for( let i=0; i<airDataJSON.results.length; i++ ) { 
        countryCount.push({
            country: airDataJSON.results[i].name,
            count: airDataJSON.results[i].count
        })    
    }
    const sortedArray = countryCount.sort();
    console.log(countryCount); 
    console.log(sortedArray);     
// *************************** Map *************************************//
const svg = d3.select('svg');

// instances of geoPath and geoMercator for prjections
const mapProjection = d3.geoNaturalEarth1();
const mapPathGenerator = d3.geoPath().projection(mapProjection);
const JSONdatUrl = 'https://unpkg.com/world-atlas@1.1.4/world/110m.json';
const tvsUrl = 'https://unpkg.com/world-atlas@1.1.4/world/110m.tsv';


Promise.all([
// tsv used for country names(name) and id (iso_n3)
    d3.tsv(tvsUrl),
    d3.json(JSONdatUrl)
]).then(([tsvData, topoJSONData]) => { 
    const countryName = {};
    tsvData.forEach(d => {
        // Logic used from freeCodeCamp.org  
        const name1 = countryName[d.iso_n3] = d.name;
        console.log(name1);
    });

    // using topojson.feature to convert topoJSON to geoJSON
    const countries = topojson.feature(topoJSONData, topoJSONData.objects.countries);
    
    // make svg paths for each country
    const paths = svg
      .selectAll('path')
      .data(countries.features);  
    paths
      .enter()
      .append('path') 
      .attr('d', d => mapPathGenerator(d))

      .style("fill", (d) => {
        if(d > 3) {
            return "black";
        }else {
            return "pink";
        }
    })
    //tooltip 
      .append('title')
      .text(d => countryName[d.id] + " " + countryCount[1].count);
    
});

}
getAirQuality();




