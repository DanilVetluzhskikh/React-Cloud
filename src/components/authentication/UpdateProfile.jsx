import React, {useRef, useState} from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'
import CenteredContainer from './CenteredContainer'

export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {currentUser, updatePassword, updateEmail} = useAuth()
    const [error,setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    function handleSubmit(e){
        e.preventDefault()

        if(passwordConfirmRef.current.value !== passwordRef.current.value){
             return setError('Passwords do not match')
        }

        setError('')
        setLoading(true)

        const promises = []
        if(emailRef.current.value !== currentUser.email){
            promises.push(updateEmail(emailRef.current.value))
        }
        if(passwordRef.current.value){
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            history.push('/user')
        }).catch(() => {
            setError('Failed to update')
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <CenteredContainer>
            <Card>
                 <Card.Body>
                     <h2 className="text-center mb-4">Update Profile</h2>
                     {error && <Alert variant="danger">{error}</Alert>}
                     <Form onSubmit={handleSubmit}>
                         <Form.Group id="email">
                             <Form.Label>Email</Form.Label>
                             <Form.Control defaultValue={currentUser.email} type="email" ref={emailRef} required></Form.Control>
                         </Form.Group>
                         <Form.Group id="password">
                             <Form.Label>Password</Form.Label>
                             <Form.Control placeholder="leave the blank to keep the same" type="password" ref={passwordRef}></Form.Control>
                         </Form.Group>
                         <Form.Group id="password-confirm">
                             <Form.Label>Password Confirmation</Form.Label>
                             <Form.Control placeholder="leave the blank to keep the same" type="password" ref={passwordConfirmRef}></Form.Control>
                         </Form.Group>
                         <Button disabled={loading} className="w-100" type="Submit">
                             Update
                        </Button>
                     </Form>
                 </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to='/'>Cancel</Link>
            </div>
        </CenteredContainer>
    )
}
