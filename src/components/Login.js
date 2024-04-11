import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';
import loginimage from '../assets/login.png';
import google from '../assets/images.png';
import { UserAuth } from '../context/AuthContext';

function Login() {
    const { googleSignIn, user } = UserAuth();
    const handleGoogleSignIn =  async () =>{
        try {
            await googleSignIn();
            console.log(user);
            if (user.email) {
                // return `/dashboard/${user.email}`;
                window.location.href = `/dashboard/${user.email}`;
            }
        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <Container>
            <Row>
                <Col sm='6'>
                    <div className='mt-5'>
                        <h3 className='text-dark'>LOGIN</h3>
                        <p className='mt-3'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the
                            1500s, when an unknown printer took a galley of type and scrambled
                            it to make a type specimen book.
                        </p>
                        <Button className='primary' onClick={handleGoogleSignIn} style={{ position: 'relative' }}>
                            <img
                                src={google}
                                alt='Google Logo'
                                className='me-1'
                                style={{ width: '25px', height: '25px', position: 'absolute', left: '5px', top: '50%', transform: 'translateY(-50%)' }}
                            /> &nbsp;&nbsp;&nbsp;&nbsp;
                            Sign in using Google
                        </Button>
                    </div>
                </Col>
                <Col sm='6'>
                    <img src={loginimage} alt='LoginImage' height={360} width={300} />
                </Col>
            </Row>
        </Container>
    )
}

export default Login
