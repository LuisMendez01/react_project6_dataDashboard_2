import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <nav>
        <ul id="homeBtnArea">
          <li className="home-link" key="home-button">
            <Link  to="/">
              <span className="links">Home</span>
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;