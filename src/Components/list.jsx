import { useState } from 'react';
import { useEffect } from "react";


const list = ({value, searchText}) => {

    const [result, setResult] = useState([]);  
    
    const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    useEffect(() => {
        fetchAPI();
    }, []);
  
    const fetchAPI = () => {
  
      console.log('API KEY: ' + ACCESS_KEY);
      var query = '';
  
      const offset = getRandomInt(75) * 20;
  
      query = `https://gateway.marvel.com/v1/public/characters?offset=${offset}&apikey=${ACCESS_KEY}`;
  
      callAPI(query).catch((error) => {
          console.error(error);
          alert("Failed to retrieve information. Trying again! Please wait..");
      });
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
        // setResponseObj({
        //     name: sol,//rover.name,
        //     imgUrl: photo[0].img_src
        // }) 

    // const [responseObj, setResponseObj] = useState({
    //     name: '',
    //     thumbnail: '',
    //     comics:0,
    //     link: '',
    // });
  
        //getImagesUsed((images, names) => {[...images, photo[0].img_src], [...names, rover.name]});
        // const newContent = [{name: results[0].name, thumbnail: results[0].thumbnail.path, comics: results[0].comics.available, link: results[0].urls[1].url}];
        // setResult((obj) => [...obj, ...newContent]);

        setResult((obj) => [
            ...obj,
            ...results.map((item) => ({
              name: item.name,
              thumbnail: item.thumbnail.path + "/portrait_small" + "." + item.thumbnail.extension,
              comics: item.comics.available,
              link: item.urls[1].url
            })),
          ]);
  
        //setShowImage(true);
        //setScreenshot(json.url);
        //setPrevImages((images) => [...images, json.url]);
      } else {
        alert("Failed to retrieve information. Trying again! Please wait...");
        //discoverFunc();
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
              <td>{item.name}</td>
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