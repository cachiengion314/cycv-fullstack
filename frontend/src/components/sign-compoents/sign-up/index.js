import React from 'react'
// import './style.css'
const index = () => {
    return (
        <div>
            <form action="action_page.php" method="post">
                <div className="container">
                    <label className="email" for="uname">
                        <p>Email</p>
                    </label>
                    <input type="email" placeholder="Enter email" name="email" required />

                    <label className="password" for="psw">
                        <b>Password</b>
                    </label>
                    <input type="password" placeholder="Enter Password" name="psw" required />

                    <label className="repeatpassword" for="uname">
                        <p>RepeatPassword</p>
                    </label>
                    <input type="text" placeholder="Repeat Password" name="uname" required />

                    <button type="submit">Cancel</button>
                    <button type="submit">SingUp</button>

                    <label>
                        <input type="checkbox" checked="checked" name="remember" /> Remember me
                 </label>
                </div>
            </form>
        </div>
    )
}

export default index