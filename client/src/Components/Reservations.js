import { useState, useEffect } from "react";
import Form from './reservations/Form'
import Table from './reservations/Table'

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

  const destroyReservation = (id) => {
    fetch(`http://localhost:81/reservations/${id}`, { method: 'DELETE' })
    .then(
      (result) => {
        console.log('destroyReservation: ', result)
        fetchReservations()
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

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <>
        <Form
          setCreateStatus={setCreateStatus}
          users={users}
          desks={desks}
          createStatus={createStatus}
        />

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

        <Table
          reservations={reservations}
          users={users}
          desks={desks}
          destroyReservation={destroyReservation}
        />
      </>
    );
  }
}

export default Reservations;
