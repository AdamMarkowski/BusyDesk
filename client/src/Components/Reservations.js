import { useState, useEffect } from "react";

const Reservations = () => {
  const [error, setError] = useState(null);
  const [reservations, setReservations] = useState([]);

  const fetchReservations = () => fetch("http://localhost:81/reservations")
    .then(res => res.json())
    .then(
      (result) => {
        console.log('fetchReservations: ', result)
        setReservations(result);
      },
      (error) => {
        setError(error);
      }
    )

  useEffect(() => {
    fetchReservations()
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

    fetch("http://localhost:81/reservations/create",
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
      .then(fetchReservations())
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
                Add reservation
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
              <th scope="col">user_id</th>
              <th scope="col">desk_id</th>
              <th scope="col">start</th>
              <th scope="col">end</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(reservation => (
              <tr key={reservation.id}>
                <th scope="row">{reservation.id}</th>
                <td>{reservation.user_id}</td>
                <td>{reservation.desk_id}</td>
                <td>{reservation.start}</td>
                <td>{reservation.end}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default Reservations;
