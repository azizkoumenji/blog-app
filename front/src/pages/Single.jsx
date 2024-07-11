import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link } from "react-router-dom";
import Menu from "../components/Menu";

export default function Single() {
  return (
    <div className="single">
      <div className="content">
        <img src="" alt="" />
        <div className="user">
          <img src="" alt="" />
          <div className="info">
            <span>John</span>
            <p>Posted 2 min ago</p>
          </div>
          <div className="edit">
            <Link to={`/write?edit=2`}>
              <img src={Edit} alt="Edit" />
            </Link>

            <img src={Delete} alt="Delete" />
          </div>
        </div>
        <h1>Odjfskjgkdkgdfgdf</h1>
        <p>Pkdkfjsklfhgjgjfkgjfkgjdkgfkjd</p>
      </div>
      <Menu />
    </div>
  );
}
