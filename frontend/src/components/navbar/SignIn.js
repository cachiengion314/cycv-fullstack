import React from 'react';
import styled from "styled-components";
import Input from '../../custom-components/Input';
import Vars from '../other-stuffs/Vars';
import Text from '../../custom-components/Text';
import Button from '../../custom-components/Button';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import useRoute from "../authenticate/useRoute";

const Form = styled.form`
    width: ${props => props.width || "100%"};
`;

const SignIn = ({ width, isModalShow, dispatch, className }) => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const route = useRoute();

    React.useEffect(() => {
        if (isModalShow) {
            setEmail("")
            setPassword("")
        }
    }, [isModalShow])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!Vars.authenticateUserInput(dispatch, email, password)) {
            return
        }
        Vars.showLoading(dispatch, `Please wait...!`, async () => {
            let currentUser = {
                email, password
            }
            console.log(`currentUser`, currentUser)
            const rawData = await Vars.fetchApi(Vars.urlLogin(), {
                method: "POST",
                data: (currentUser)
            })
            if (rawData && rawData.messenger === "successfully!") {
                const token = rawData.token
                const name = rawData.name
                console.log(`signin.handleSubmit.rawData`, rawData)

                Vars.closeModal(dispatch)
                Vars.signIn(dispatch, token, name, password)
                Vars.showNotify(dispatch, `Sign in with account ${rawData.messenger}`)
                // redirect route
                if (Vars.getUserInLocal().current_saveDataId) {
                    route.push(Vars.url_username_saveid(name, Vars.Vars.getUserInLocal().current_saveDataId))
                    return
                }
                route.push(Vars.url_username(name))
                return
            }
            Vars.closeModal(dispatch);
            Vars.showNotify(dispatch, `Some thing went wrong!`)
        }, 500)
    }
    return (
        <Form width={width} onSubmit={handleSubmit} className={className}>
            <Text fontSize={Vars.FONT_SIZE_SM}>Email address</Text>
            <Input onChange={e => setEmail(e.target.value)} value={email}
                width="100%" height="2.4rem" name="email" type="email" fontSize={Vars.FONT_SIZE_SM} placeholder="name@example.com" className="" />

            <Text fontSize={Vars.FONT_SIZE_SM}>Password</Text>
            <Input onChange={e => setPassword(e.target.value)} value={password}
                width="100%" height="2.4rem" name="password" type="password" fontSize={Vars.FONT_SIZE_SM} placeholder="your password here" className="mb-3" />
            <Button width="100%" height="2.4rem" fontSize={Vars.FONT_SIZE_SM} className="" >
                Sign In
            </Button>
        </Form>
    )
}

SignIn.propTypes = {
    isModalShow: PropTypes.bool,
    className: PropTypes.string,
}

const mapStoreToProps = (currentStore) => {
    return { isModalShow: currentStore.modal.custom.isModalShow }
}

export default connect(mapStoreToProps)(SignIn);