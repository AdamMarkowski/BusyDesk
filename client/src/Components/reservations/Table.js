const Table = ({ reservations, users, desks, destroyReservation }) => {
  const findUser = (id) => {
    return users.find(user => user.id === id)
  }

  const findDesk = (id) => {
    return desks.find(desk => desk.id === id)
  }

  return (
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
          <td><i className="bi-trash" onClick={() => destroyReservation(reservation.id)}></i></td>
        </tr>
      ))}
    </tbody>
  </table>
  )
}

export default Table
