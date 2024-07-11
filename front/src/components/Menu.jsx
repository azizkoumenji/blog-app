export default function Menu() {
  const posts = [
    {
      id: 1,
      title: "Jxlcd Kds",
      desc: "Ksjdsfdskhfsjkdhfsjkdfhskdfhjdsfgdsjf.",
      img: "https://google.com",
    },
  ];

  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {posts.map((post) => {
        return (
          <div className="post" key={post.id}>
            <img src={post.img} alt="Image" />
            <h2>{post.title}</h2>
            <button>Read More</button>
          </div>
        );
      })}
    </div>
  );
}
