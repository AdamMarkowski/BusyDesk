import { useState, useEffect } from "react";
import {
  Link,
  useHistory
} from "react-router-dom";

const Layout = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  let history = useHistory()

  const getCookie = (key) => {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }

  useEffect(() => {
    if(getCookie('currentUser') === '') {
      console.log('Not logged in!')
      history.push("/login")
    } else {
      console.log('------ currentUser: ', getCookie('currentUser'))
      setCurrentUser(JSON.parse(getCookie('currentUser')))
    }
  }, [])

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="http://localhost:80">BusyDesk</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li> */}
              {currentUser && currentUser.admin === 1 && <li className="nav-item">
                <Link className="nav-link" to="/users">Users</Link>
              </li>}
              {currentUser && currentUser.admin === 1 && <li className="nav-item">
                <Link className="nav-link" to="/spaces">Spaces</Link>
              </li>}
              {currentUser && currentUser.admin === 1 && <li className="nav-item">
                <Link className="nav-link" to="/desks">Desks</Link>
              </li>}
              <li className="nav-item">
                <Link className="nav-link" to="/reservations">Reservations</Link>
              </li>
            </ul>

            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {currentUser && currentUser.email}
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a className="dropdown-item" href="#">Action</a>
              <a className="dropdown-item" href="#">Another action</a>
              <a className="dropdown-item" href="#">Something else here</a>
            </div>
          </div>
        </div>
      </nav>
      {children}
    </>
  )
}

export default Layout
