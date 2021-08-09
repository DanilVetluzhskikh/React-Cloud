import React, { useState } from 'react'
import {Card, Button, Alert} from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'
import CenteredContainer from './CenteredContainer'
import Navbar from '../google-drive/Navbar'

export default function Profile() {
    const [error, setError] = useState('')
    const {currentUser, logout} = useAuth()
    const history = useHistory()

    async function handleLogout(){
        setError('')
        try{
            await logout()
            history.push('/login')
        }catch(e){
            setError('Something wrong')
        }
    }
    return (
        <>
        <Navbar />
        <CenteredContainer>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4"><br />  Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email:</strong>{currentUser.email}
                    <Link to='update-profile' className="btn btn-primary w-100 mt-3">Update Profile</Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>Log Out</Button>
            </div>
        </CenteredContainer>
        </>
    )
}
