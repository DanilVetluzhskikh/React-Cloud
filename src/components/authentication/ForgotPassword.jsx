import React, {useRef, useState} from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'
import CenteredContainer from './CenteredContainer'

export default function ForgotPassword() {
    const emailRef = useRef()
    const [error,setError] = useState('')
    const [loading, setLoading] = useState(false)
    const {resetPassword} = useAuth()
    const [message, setMessage] = useState('')

    async function handleSubmit(e){
        e.preventDefault()

        try{
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for further instructions')
        } catch(e){
            setError('Something wrong')
        }
        setLoading(false)
       

    }

    return (
        <CenteredContainer>
            <Card>
                 <Card.Body>
                     <h2 className="text-center mb-4">Reset password</h2>
                     {message && <Alert variant="success">{message}</Alert>}
                     {error && <Alert variant="danger">{error}</Alert>}
                     <Form onSubmit={handleSubmit}>
                         <Form.Group id="email">
                             <Form.Label>Email</Form.Label>
                             <Form.Control type="email" ref={emailRef} required></Form.Control>
                         </Form.Group>
                         <Button disabled={loading} className="w-100" type="Submit">
                             Reset
                        </Button>
                     </Form>
                 </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to='/signup'>Sign up</Link>
            </div>
        </CenteredContainer>
    )
}
