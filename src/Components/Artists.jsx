import React, { useEffect, useState } from "react";

const Artists= () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch("http://localhost:5000/artists/artist");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonData = await response.json();
        console.log("Data fetched successfully:", jsonData);

        
        const formattedData = jsonData.map((artist) => ({
          name: artist.artist_name,
          image: artist.artist_image,
        }));

        setArtists(formattedData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchArtists();
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Tattoo Artists</h1>
        <p>Explore our talented tattoo artists and their exceptional work.</p>
      </header>
      <div className="artist-grid">
        {artists.map((artist, index) => (
          <div className="artist-card" key={index}>
            <img src={artist.image} alt={artist.name} style={{ width: '100%', height: 'auto' }} />
            <h3>{artist.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artists;
