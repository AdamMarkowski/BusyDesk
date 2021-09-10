import { useState, useEffect } from "react";

const Spaces = () => {
  const [error, setError] = useState(null);
  const [spaces, setSpaces] = useState([]);

  const fetchSpaces = () => fetch("http://localhost:81/spaces")
    .then(res => res.json())
    .then(
      (result) => {
        console.log('fetchSpaces: ', result)
        setSpaces(result);
      },
      (error) => {
        setError(error);
      }
    )

  useEffect(() => {
    fetchSpaces()
  }, [])

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

    fetch("http://localhost:81/spaces/create",
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(function (res) { return res.json(); })
      .then(function (data) { console.log('---------', JSON.stringify(data)) })
      .then(fetchSpaces())
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
                Add space
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
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Capacity</th>
            </tr>
          </thead>
          <tbody>
            {spaces.map(space => (
              <tr key={space.id}>
                <th scope="row">{space.id}</th>
                <td>{space.name}</td>
                <td>{space.capacity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default Spaces;
