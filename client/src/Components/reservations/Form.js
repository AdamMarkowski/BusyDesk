const Form = ({ setCreateStatus, users, desks, createStatus }) => {
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

  return (
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

            {createStatus === "ok" && <div className="alert alert-success mt-2" role="alert">
              Reservation created successfully
            </div>}

            {createStatus === "reserved" && <div className="alert alert-danger mt-2" role="alert">
              The chosen date is already taken!
            </div>}

            <div className="form-group">
              <button type="submit" className="btn btn-primary mt-3">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Form
