import { useState } from 'react';
import { useEffect } from "react";
import { Link } from "react-router-dom";


const list = ({value, searchText}) => {

    const [result, setResult] = useState([]); 
    
    const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    useEffect(() => {
      if (result.length == 0) {
        fetchAPI();
      } 
    }, []);
  
    const fetchAPI = () => {
  
      console.log('API KEY: ' + ACCESS_KEY);
      var query = '';
  
      const offset = getRandomInt(75) * 20;

      const controller = new AbortController();
  
      query = `https://gateway.marvel.com/v1/public/characters?offset=${offset}&apikey=${ACCESS_KEY}`,
      { signal: controller.signal };
  
      callAPI(query).catch((error) => {
          console.error(error);
          alert("Failed to retrieve information. Trying again! Please wait..");
      });

      return () => controller.abort();
    }
  
    const callAPI = async (query) => {
      const response = await fetch(query);
      const json = await response.json();
      console.log(json);
  
      const data = json.data;
      const results = data.results;
      console.log(data);
      console.log(results);
      console.log('results.length: ' + results.length);

      setResult([]);

      if (results.length > 0) {

        setResult((obj) => [
            ...obj,
            ...results.map((item) => ({
              id: item.id,
              name: item.name,
              thumbnail: item.thumbnail.path + "/portrait_small" + "." + item.thumbnail.extension,
              comics: item.comics.available,
              link: item.urls[1].url
            })),
          ]);
  
      } else {
        alert("Failed to retrieve information. Trying again! Please wait...");
      }
    }

    return(
        <div id="list" className='section'>
            <table>
        <thead>
          <tr>
            <th>Number</th>
            <th>Name</th>
            <th>Thumbnail</th>
            <th>Comic #</th>
            <th>Link to Comics</th>
          </tr>
        </thead>
        <tbody>
          {result.slice(0, Math.ceil(value)).filter((obj) => obj.name.toLowerCase().includes(searchText.toLowerCase())).map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <Link
                to={`/CharacterDetails/${item.id}`}
                key={item.id}
              >
                <td>{item.name}</td>
              </Link>
              <td><img src={item.thumbnail} alt="Thumbnail" /></td>
              <td>{item.comics}</td>
              <td><a href={item.link}>See More</a></td>
            </tr>
        ))}
        </tbody>
      </table>
        <button id="btnFetch" onClick={fetchAPI}>Fetch More API</button>
    </div>
    )
}

export default list;