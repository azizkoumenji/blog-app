import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Menu({ cat, postId }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/posts/?cat=${cat}`)
      .then((response) => {
        const result = response.data;
        const filtredList = result.filter((item) => {
          return item.id !== postId;
        });

        filtredList.length > 2
          ? setPosts(filtredList.slice(0, 2))
          : setPosts(filtredList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cat, postId]);

  return (
    <div className="menu">
      {posts.length > 0 && <h1>Other posts you may like</h1>}
      {posts.map((post) => {
        return (
          <div className="post" key={post.id}>
            <img src={post.img} alt="Image" />
            <h2>{post.title}</h2>
            <Link to={`/post/${post.id}`}>
              <button>Read More</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
Menu.propTypes = {
  cat: PropTypes.string,
  postId: PropTypes.number,
};
