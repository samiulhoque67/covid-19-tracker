import React,{useState,useEffect} from 'react';

import './App.css';
import {MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
}from "@material-ui/core";
import InfoBox from './InfoBox';
import Map from './Map';

function App() {
  const [countries,setCountries]=useState([]);
  const[country,setCountry]=useState('worldwide');
  const [countryInfo,setCountryInfo]=useState()
useEffect(() =>{


  const getCountriesData = async()=>{



    await fetch("https://disease.sh/v3/covid-19/countries")
    .then((response)=> response.json())
    .then((data)=>{
 
const countries=data.map((country)=>({

 name:country.country,
 value:country.countryInfo.iso2

}))
setCountries(countries)

    })
  };
getCountriesData();
},[]);


const onCountryChange=async (event)=>{
  const countryCode =event.target.value;
  setCountry(countryCode);

const url= countryCode ==='worldwide'?'https://disease.sh/v3/covid-19/all':
  `https://disease.sh/v3/covid-19/countries/${countryCode}`;
await fetch(url)
.then(response =>response.json())
.then(data =>{
  setCountry(countryCode);
  setCountryInfo(data);

})
};
console.log("countryInfo...",countryInfo);
  return (
    <div className="app">
    <div className="app__left">
    <div className="app__header">
    <h1>Covid 19 tracker</h1>
    <FormControl className="app__dropdown">
    <Select 
    variant="outlined"
    value={country}
    onChange={onCountryChange}
    >
    <MenuItem value="worldwide">Worldwide</MenuItem>
    

{countries.map(country => (
<MenuItem value={country.value}>{country.name}</MenuItem>
))}

    
     
    </Select>
    </FormControl>

    </div>
    
<div className="app__states">

<InfoBox title="CoronaVirus Cases"cases={123} total={2000}/>
<InfoBox title="Recovered" cases={123} total={3000}/>
<InfoBox title="Deaths"cases={123} total={4000}/>
</div>

< Map />
</div>
<Card className="app__right">
<CardContent>
     {/* Table */}
     <h3>Live Cases by Country</h3>
{/* Graph */}

<h3>WorldWide new cases</h3>
</CardContent>
    </Card>



    </div>
    
  );
}

export default App;
