import React from 'react'
// import "./index.css"

const index = () => {
    return (
        <div >
              <div className="bg-img">
  <form action="/action_page.php" class="container">
    <h1>Login</h1>

    <label for="email"><b>Email</b></label>
    <input type="text" placeholder="Enter Email" name="email" required/>

    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" required/>

    <button type="submit" class="btn">Login</button>
  </form>
</div>
        </div>
    )
}

export default index