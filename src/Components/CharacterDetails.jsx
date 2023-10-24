import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CharacterChart from "./CharacterChart";
const API_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

const CharacterDetails = () => {

    let params = useParams();
    const [fullDetails, setFullDetails] = useState(null);

    useEffect(() => {

        const getCharacterDetail = async () => {
          console.log(params.characterID);
          const details = await fetch(
            'https://gateway.marvel.com/v1/public/characters/' + params.characterID +'?apikey=' + API_KEY,
            { mode: 'cors' }
          );

          console.log('details');// An object with all the coin details as the name as key
          console.log(details);// An object with all the coin details as the name as key
      
          const detailsJson = await details.json();
          const data = detailsJson.data;
          const result = data.results;
          const item = result[0];

          console.log('detailsJson');// An object with all the coin details as the name as key
          console.log(item);// An object with all the coin details as the name as key
      
          setFullDetails(item);
        };
        
        getCharacterDetail().catch(console.error);

      }, []);
      

    return (
        <div>    
            {fullDetails ? ( // rendering only if API call actually returned us data
              <><h1>{fullDetails.name}</h1><img
            className="images"
            src={fullDetails.thumbnail.path + "/detail" + "." + fullDetails.thumbnail.extension}
            alt={`Large icon for ${fullDetails.name} crypto coin`} />
            <div id='description'> {fullDetails.description}</div><br></br>
             <CharacterChart comicsNum={fullDetails.comics.available} 
             eventsNum={fullDetails.events.available}
             seriesNum={fullDetails.series.available}
             storiesNum={fullDetails.stories.available} />
          </>
          ) : 
          null
          }
        </div>
    );

  };
  
  export default CharacterDetails;