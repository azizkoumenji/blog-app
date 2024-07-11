import { Link } from "react-router-dom";

export default function Home() {
  const posts = [
    {
      id: 1,
      title: "Jxlcd Kds",
      desc: "Ksjdsfdskhfsjkdhfsjkdfhskdfhjdsfgdsjf.",
      img: "https://google.com",
    },
  ];

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
                <p>{post.desc}</p>
                <button>Read More</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
