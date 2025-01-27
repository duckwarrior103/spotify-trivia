import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = ({ accessToken }) => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        const response = await axios.get("http://localhost:5001/top-tracks", {
          params: { accessToken },
        });
        setTracks(response.data);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch tracks");
      } finally {
        setLoading(false);
      }
    };

    fetchTopTracks();
  }, [accessToken]);

  if (loading) return <div className="text-white text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <h1 className="text-3xl text-white mb-6">Your Top 5 Tracks</h1>
      <div className="space-y-4">
        {tracks.map((track) => (
          <div
            key={track.id}
            className="flex items-center bg-gray-800 p-4 rounded-lg"
          >
            <img
              src={track.album.images[0].url}
              alt={track.name}
              className="w-16 h-16 rounded"
            />
            <div className="ml-4">
              <p className="text-white font-bold">{track.name}</p>
              <p className="text-gray-400">{track.artists[0].name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
