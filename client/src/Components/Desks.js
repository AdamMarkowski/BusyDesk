import { useState, useEffect } from "react";

const Desks = () => {
  const [error, setError] = useState(null);
  const [desks, setDesks] = useState([]);

  const fetchDesks = () => fetch("http://localhost:81/desks")
    .then(res => res.json())
    .then(
      (result) => {
        console.log('fetchDesks: ', result)
        setDesks(result);
      },
      (error) => {
        setError(error);
      }
    )

  useEffect(() => {
    fetchDesks()
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

    fetch("http://localhost:81/desks/create",
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
      .then(fetchDesks())
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
                Add desk
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
              <th scope="col">Id</th>
              <th scope="col">Space</th>
            </tr>
          </thead>
          <tbody>
            {desks.map(desk => (
              <tr key={desk.id}>
                <th scope="row">{desk.id}</th>
                <td>{desk.id}</td>
                <td>{desk.space_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default Desks;
