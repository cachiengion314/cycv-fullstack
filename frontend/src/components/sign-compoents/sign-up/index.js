import React from 'react'
 import './style.css'
const index = () => {
    return (
        <div>
            <form action="action_page.php" method="post">
            <div className="imgcontainer">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQouM5RfdyCSG5bmYSurGZBzgT5HjvKOxpEUg&usqp=CAU" alt="Avatar" className="avatar" />
                </div>
                <div className="container">
                    <label className="email" for="email">
                        <p>Email</p>
                    </label>
                    <input type="text" placeholder="Enter email" name="email" required />



                    <label className="password" for="uname">
                        <p>Password</p>
                    </label>
                    <input type="password" placeholder="Enter Password" name="psw" required />

                    <label className="repeatpassword" for="uname">
                        <p>RepeatPassword</p>
                    </label>
                    <input type="text" placeholder="Repeat Password" name="uname" required />

                    <label>
                        <input type="checkbox" checked="checked" name="remember" /> Remember me
                 </label>
                    <div class="clearfix">
                        <button type="button" class="cancelbtn">Cancel</button>
                        <button type="submit" class="signupbtn">Sign Up</button>
                    </div>


                </div>
            </form>
        </div>
    )
}

export default index