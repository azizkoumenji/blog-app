import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const category = useLocation().search; // Lets us pick to category query from the link.

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`/api/posts/${category}`);
        setPosts(result.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [category]);

  const parseText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => {
          return (
            <div className="post" key={post.id}>
              <div className="img">
                <img src={post.img} alt="Image" />
              </div>
              <div className="content">
                <Link className="link" to={`/post/${post.id}`}>
                  <h1>{post.title}</h1>
                </Link>
                <p>{parseText(post.description)}</p>
                <Link to={`/post/${post.id}`}>
                  <button>Read More</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
