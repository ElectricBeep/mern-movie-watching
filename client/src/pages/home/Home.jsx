import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../components/footer/Footer";
import Spinner from "../../components/spinner/Spinner";

export default function Home({ type }) {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getRandomLists = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`);
        setLists(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {loading ? (
        <Spinner message="Loading..." />
      ) : (
        <>
          {!lists.length && (
            <div className="homeNoCotent">
              Unfortunately we don't have any content for selected genre.
              Try selecting sci-fi, action or comedy.
            </div>
          )}
          {lists.map((list) => (
            <List key={list._id} list={list} />
          ))}
          <Footer />
        </>
      )}
    </div>
  )
}
