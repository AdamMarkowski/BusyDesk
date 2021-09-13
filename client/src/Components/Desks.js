import { useState, useEffect } from "react";

const Desks = () => {
  const [error, setError] = useState(null);
  const [desks, setDesks] = useState([]);
  const [spaces, setSpaces] = useState([]);
  const [createStatus, setCreateStatus] = useState(null);

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
    fetchDesks()
    fetchSpaces()
  }, [])

  useEffect(() => {
    fetchDesks()
  }, [createStatus])

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = {
      name: event.target.elements.name.value,
      spaceId: event.target.elements.spaceId.value,
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
      .then((res) => {
        setCreateStatus(res.status)
      })
  }

  const findSpace = (id) => {
    return spaces.find(space => space.id === id)
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
                  <label for="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name"></input>
                </div>

                <div className="form-group">
                  <label for="userId" className="form-label">Space</label>
                  <select className="custom-select form-control" id="spaceId">
                    {spaces.map(space =>
                      <option value={space.id}>{space.name}</option>
                    )}
                  </select>
                </div>

                { createStatus === "ok" && <div class="alert alert-success mt-2" role="alert">
                  Desk created successfully
                </div> }

                <div className="form-group">
                <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Space</th>
            </tr>
          </thead>
          <tbody>
            {desks.map(desk => (
              <tr key={desk.id}>
                <th scope="row">{desk.id}</th>
                <td>{desk.name}</td>
                <td>{findSpace(desk.space_id) && findSpace(desk.space_id).name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default Desks;
