import {
  Link
} from "react-router-dom";

import { useEffect } from "react";

const Layout = ({ children }) => {
  const getCookie = (key) => {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }

  useEffect(() => {
    console.log('------ currentUser: ', getCookie('currentUser'))
    console.log('------ currentUser: ', decodeURIComponent(getCookie('currentUser')))

    // console.log('------ currentUser: ', JSON.parse(getCookie('currentUser')))
  }, [])

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="http://onet.pl">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li class="nav-item">
                <Link className="nav-link" to="/users">Users</Link>
              </li>
              <li class="nav-item">
                <Link className="nav-link" to="/spaces">Spaces</Link>
              </li>
              <li class="nav-item">
                <Link className="nav-link" to="/desks">Desks</Link>
              </li>
              <li class="nav-item">
                <Link className="nav-link" to="/reservations">Reservations</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {children}
    </>
  )
}

export default Layout
