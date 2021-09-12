import { useState } from "react";
import { useHistory } from "react-router-dom"

const Desks = () => {
  const [error, setError] = useState(false)
  let history = useHistory()

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = {
      email: event.target.elements.inputEmail.value,
      password: event.target.elements.inputPassword.value
    }

    console.log('formData: ', formData)


    fetch("http://localhost:81/users/login",
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })
      .then(res => res.json())
      .then(data => {console.log('---------', JSON.stringify(data)); return data})
      .then(res => {
        if (res.status === 'error') {
          setError(true)
        } else {
          console.log('redirect!')
          history.push("/reservations")
        }
      })
  }

  return (
    <div className="text-center">
      <form className="form-signin w-25 m-auto" onSubmit={handleSubmit}>
        <img className="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label for="inputEmail" className="sr-only">Email address</label>
        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus></input>
        <label for="inputPassword" className="sr-only">Password</label>
        <input type="password" id="inputPassword" className="form-control" placeholder="Password" required></input>

        { error && <div class="alert alert-danger mt-5" role="alert">User does not exist</div>}

        <button className="btn btn-lg btn-primary btn-block mt-5" type="submit">Sign in</button>
        <p className="mt-5 mb-3 text-muted">&copy; 2021</p>
      </form>
    </div>
  );
}

export default Desks;
