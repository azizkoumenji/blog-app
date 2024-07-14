import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import moment from "moment"; // Used to calculate the diffrence between the post date and the current date.
import { AuthContext } from "../context/authContext";

export default function Single() {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`/api/posts/${id}`);
        setPost(result.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts/${id}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const parseText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  // post?.img we add the question mark so when the image is loading it doesn't give us an error.
  return (
    <div className="single">
      <div className="content">
        <img src={post?.img} alt="Image" />
        <div className="user">
          {currentUser && currentUser.img && (
            <img src={currentUser.img} alt="User Image" />
          )}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser && currentUser.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="Edit" />
              </Link>

              <img onClick={handleDelete} src={Delete} alt="Delete" />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        {parseText(post.description)}
      </div>
      <Menu cat={post.cat} postId={post.id} />
    </div>
  );
}
