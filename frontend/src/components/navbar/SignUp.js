import React from 'react'
import styled from "styled-components";
import Input from '../../custom-components/Input';
import Vars from '../other-stuffs/Vars';
import Text from '../../custom-components/Text';
import Button from '../../custom-components/Button';
import { connect } from "react-redux";

const Form = styled.form`
    width: ${props => props.width || "100%"};
`;

const SignUp = ({ width, isModalShow, dispatch, className }) => {
    const [userName, setUserName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    

    React.useEffect(() => {
        if (isModalShow) {
            setUserName("")
            setEmail("")
            setPassword("")
        }
    }, [isModalShow])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!Vars.authenticateUserInput(dispatch, email, password)) {
            return;
        }
        Vars.showLoading(dispatch, `Please wait...!`, async () => {
            const name = userName;
            const newUser = {
                name, email, password
            }
            const rawData = await Vars.fetchApi(Vars.urlCreateUser(), {
                method: "POST",
                data: (newUser)
            })
            console.log(`signup.handleSubmit.rawData`, rawData)
            if (rawData && rawData.messenger === "successfully!") {
                const token = rawData.token
                Vars.closeModal(dispatch)
                Vars.signIn(dispatch, token, name, password)
                Vars.showNotify(dispatch, `Created account ${rawData.messenger}`)
                // redirect route
            
                return;
            }
            Vars.showNotify(dispatch, `Some thing went wrong!`);
        }, 500)
    }
    return (
        <Form width={width} onSubmit={handleSubmit} className={className}>
            <Text fontSize={Vars.FONT_SIZE_SM}>Name</Text>
            <Input onChange={e => setUserName(e.target.value)} value={userName}
                width="100%" height="2.4rem" name="username" type="text" fontSize={Vars.FONT_SIZE_SM} placeholder="your name here" className="" />

            <Text fontSize={Vars.FONT_SIZE_SM}>Email address</Text>
            <Input onChange={e => setEmail(e.target.value)} value={email}
                width="100%" height="2.4rem" name="email" type="email" fontSize={Vars.FONT_SIZE_SM} placeholder="name@example.com" className="" />

            <Text fontSize={Vars.FONT_SIZE_SM}>Password</Text>
            <Input onChange={e => setPassword(e.target.value)} value={password}
                width="100%" height="2.4rem" name="password" type="password" fontSize={Vars.FONT_SIZE_SM} placeholder="your password here" className="mb-3" />
            <Button width="100%" height="2.4rem" fontSize={Vars.FONT_SIZE_SM} className="" >Sign Up</Button>
        </Form>
    )
}

const mapStoreToProps = (currentStore) => {
    return { isModalShow: currentStore.modal.custom.isModalShow }
}

export default connect(mapStoreToProps)(SignUp);