import { useState, useEffect } from "react";

const Spaces = () => {
  const [error, setError] = useState(null);
  const [spaces, setSpaces] = useState([]);
  const [createStatus, setCreateStatus] = useState(null);

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

  useEffect(() => {
    fetchSpaces()
  }, [createStatus])

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('-------', event.target.elements.name.value)

    const formData = {
      name: event.target.elements.name.value
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
      .then((res) => {
        setCreateStatus(res.status)
      })
  }

  const removeById = (id) => {
    setSpaces(
      spaces.filter(space => space.id !== id)
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
                Add space
              </button>
            </h2>
            <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label for="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name"></input>
                </div>

                {createStatus === "ok" && <div class="alert alert-success mt-2" role="alert">
                  Space created successfully
                </div>}

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
              {/* <th scope="col">Capacity</th> */}
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {spaces.map(space => (
              <tr key={space.id}>
                <th scope="row">{space.id}</th>
                <td>{space.name}</td>
                {/* <td>{space.capacity}</td> */}
                <td><i className="bi-trash" onClick={() => removeById(space.id)}></i></td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default Spaces;
