import { useState, useEffect } from "react";

const Users = () => {
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [createStatus, setCreateStatus] = useState(null);

  const fetchUsers = () => fetch("http://localhost:81/users")
    .then(res => res.json())
    .then(
      (result) => {
        console.log('fetchUsers: ', result)
        setUsers(result);
      },
      (error) => {
        setError(error);
      }
    )

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [createStatus])

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('-------', event.target.elements.email.value)
    const formData = {
      email: event.target.elements.email.value,
      firstName: event.target.elements.firstName.value,
      lastName: event.target.elements.lastName.value,
      password: event.target.elements.password.value
    }

    console.log('formData: ', formData)

    fetch("http://localhost:81/users/create",
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(function (res) { return res.json(); })
      .then((res) => {
        setCreateStatus(res.status)
      })
  }

  const removeById = (id) => {
    setUsers(
      users.filter(user => user.id !== id)
    )
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <>
        <div className="accordion accordion-flush" id="accordionFlushExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingOne">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                Add user
              </button>
            </h2>
            <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="email" aria-describedby="emailHelp"></input>
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">First name</label>
                  <input type="text" className="form-control" id="firstName" aria-describedby="emailHelp"></input>
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">Last name</label>
                  <input type="text" className="form-control" id="lastName" aria-describedby="emailHelp"></input>
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password"></input>
                </div>

                {createStatus === "ok" && <div class="alert alert-success mt-2" role="alert">
                  User created successfully
                </div>}

                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Email</th>
              <th scope="col">Admin?</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>{user.lastName}</td>
                <td>{user.firstName}</td>
                <td>{user.email}</td>
                <td>{user.admin ? 'True' : 'False'}</td>
                <td><i className="bi-trash" onClick={() => removeById(user.id)}></i></td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}
export default Users;
