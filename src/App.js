import './App.css';
import { useState } from 'react';
const api = 'https://jsonplaceholder.typicode.com'

function App() {

  const [photos, setPhotos] = useState([])
  const [albumId, setAlbumId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const getPhotos = (id) => {
    setIsLoading(true)
    fetch(`${api}/albums/${id}/photos`)
      .then((response) => response.json())
      .then((photos) => {
        setPhotos(photos);
        setIsLoading(false);
      });
  }

  const handleGetPhotos = () => {
    getPhotos(albumId);
  }

  return (
    <div className="App">
      <div className="container">
        <div className="d-flex-md flex-center" style={{ paddingBottom: "4px" }}>
          <input type="number" placeholder="Type album ID" className="textbox" onChange={(e) => setAlbumId(e.target.value)}/>
          <button className="btn" onClick={handleGetPhotos}>
            {isLoading ? "Loading...":("Get Album Photos By Id")}
          </button>
        </div>
        <div className="gallery">
          <div className="d-flex-md flex-horizontal flex-wrap flex-center">
            {photos.length ? photos.map(({title, thumbnailUrl}) => {
            return (
              <>
                  <div className="card m-2" style={{ width: "18rem"}}>
                    <div>
                      <img className="image" src={thumbnailUrl} alt={title}/>
                    </div>
                    <div>{title}</div>
                  </div>
              </>
            )
          }) : "No images found."}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
