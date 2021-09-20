import { useState, useEffect } from "react";

const Reservations = () => {
  const [error, setError] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [desks, setDesks] = useState([]);
  const [users, setUsers] = useState([]);
  const [createStatus, setCreateStatus] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);

  const fetchReservations = () => {
    const url = new URL("http://localhost:81/reservations")
    if (currentDate) {
      const params = { dateScope: currentDate }
      url.search = new URLSearchParams(params).toString()
    }

    fetch(url)
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
  }

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
    fetchReservations()
    fetchDesks()
    fetchUsers()
  }, [])

  useEffect(() => {
    fetchReservations()
  }, [createStatus])

  useEffect(() => {
    console.log('currentDate changed! ', currentDate)
    fetchReservations()
  }, [currentDate])

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = {
      userId: event.target.elements.userId.value,
      deskId: event.target.elements.deskId.value,
      startAt: event.target.elements.startAt.value,
      finishAt: event.target.elements.finishAt.value
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
      .then((res) => {
        setCreateStatus(res.status)
      })
  }

  const findUser = (id) => {
    return users.find(user => user.id === id)
  }

  const findDesk = (id) => {
    return desks.find(desk => desk.id === id)
  }

  const removeById = (id) => {
    setReservations(
      reservations.filter(reservation => reservation.id !== id)
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
                Add reservation
              </button>
            </h2>
            <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label for="userId" className="form-label">User</label>
                  <select className="custom-select form-control" id="userId">
                    {users.map(user =>
                      <option value={user.id}>{user.email}</option>
                    )}
                  </select>
                </div>
                <div className="form-group">
                  <label for="deskId" className="form-label">Desk</label>
                  <select className="custom-select form-control" id="deskId">
                    {desks.map(desk =>
                      <option value={desk.id}>{desk.name}</option>
                    )}
                  </select>
                </div>
                <div className="form-group">
                  <label for="startAt" className="form-label">Start at</label>
                  <input type="datetime-local" className="form-control" id="startAt"></input>
                </div>
                <div className="form-group">
                  <label for="finishAt" className="form-label">Finish at</label>
                  <input type="datetime-local" className="form-control" id="finishAt"></input>
                </div>

                { createStatus === "ok" && <div className="alert alert-success mt-2" role="alert">
                  Reservation created successfully
                </div> }

                { createStatus === "reserved" && <div className="alert alert-danger mt-2" role="alert">
                  The chosen date is already taken!
                </div> }

                <div className="form-group">
                  <button type="submit" className="btn btn-primary mt-3">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="row g-3 float-end">
          <div className="col-auto">
            <label for="dateField" className="col-form-label">Date</label>
          </div>
          <div className="col-auto">
            <input
              type="date"
              id="dateField"
              className="form-control"
              onChange={e => setCurrentDate(e.target.value)}
              ></input>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">User</th>
              <th scope="col">Desk</th>
              <th scope="col">Start</th>
              <th scope="col">End</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(reservation => (
              <tr key={reservation.id}>
                <th scope="row">{reservation.id}</th>
                <td>{findUser(reservation.user_id) && findUser(reservation.user_id).email}</td>
                <td>{findDesk(reservation.desk_id) && findDesk(reservation.desk_id).name}</td>
                <td>{reservation.start.slice(0, 19).replace('T', ' ')}</td>
                <td>{reservation.end.slice(0, 19).replace('T', ' ')}</td>
                <td><i className="bi-trash" onClick={() => removeById(reservation.id)}></i></td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default Reservations;
