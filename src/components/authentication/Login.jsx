import React, {useRef, useState} from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'
import CenteredContainer from './CenteredContainer'

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [error,setError] = useState('')
    const [loading, setLoading] = useState(false)
    const {login} = useAuth()
    const history = useHistory()

    async function handleSubmit(e){
        e.preventDefault()

        try{
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        } catch(e){
            setError('Failed to log in')
        }
        setLoading(false)
       

    }

    return (
        <CenteredContainer>
            <Card>
                 <Card.Body>
                     <h2 className="text-center mb-4">Log In</h2>
                     {error && <Alert variant="danger">{error}</Alert>}
                     <Form onSubmit={handleSubmit}>
                         <Form.Group id="email">
                             <Form.Label>Email</Form.Label>
                             <Form.Control type="email" ref={emailRef} required></Form.Control>
                         </Form.Group>
                         <Form.Group id="password">
                             <Form.Label>Password</Form.Label>
                             <Form.Control type="password" ref={passwordRef} required></Form.Control>
                         </Form.Group>
                         <Button disabled={loading} className="w-100" type="Submit">
                             Log In
                        </Button>
                     </Form>
                     <div className="w-100 text-center mt-3">
                         <Link to="/forgot-password">Forgot password?</Link>
                     </div>
                 </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to='/signup'>Sign up</Link>
            </div>
        </CenteredContainer>
    )
}