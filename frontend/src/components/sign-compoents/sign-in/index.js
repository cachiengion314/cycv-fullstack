import React from 'react'
// import './style.css'
const index = () => {
    return (
        <div>
            <form action="action_page.php" method="post">
                <div className="imgcontainer">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQouM5RfdyCSG5bmYSurGZBzgT5HjvKOxpEUg&usqp=CAU" alt="Avatar" className="avatar" />
                </div>

                <div className="container">
                    <label className="username" for="uname">
                        <p>Username</p>
                    </label>
                    <input type="text" placeholder="Enter Username" name="uname" required />

                    <label className="password" for="psw">
                        <b>Password</b>
                    </label>
                    <input type="password" placeholder="Enter Password" name="psw" required />

                    <button type="submit">Login</button>
                    <label>
                        <input type="checkbox" checked="checked" name="remember" /> Remember me
                 </label>
                </div>

                <div className="container" style={{ backgroundColor: `#f1f1f1` }}>
                    <button type="button" className="cancelbtn">Cancel</button>
                    <span className="psw">Forgot <a href="#">password?</a></span>
                </div>
            </form>

        </div>
    )
}

export default index