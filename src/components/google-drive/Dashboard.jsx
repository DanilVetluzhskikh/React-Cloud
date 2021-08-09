import React from 'react'
import { Container } from 'react-bootstrap'
import { useParams, useLocation } from 'react-router'
import { useFolder } from '../hooks/useFolder'
import AddFileButton from './AddFileButton'
import AddFolderButton from './AddFolderButton'
import File from './File'
import Folder from './Folder'
import FolderBreadcrumbs from './FolderBreadcrumbs'
import Navbar from './Navbar'


export default function Dashboard() {
    const {folderId} = useParams()
    const {state = {} } = useLocation()
    const {folder, childFolders, childFiles} = useFolder(folderId, state.folder)
    return (
       <>
        <Navbar/>
        <Container fluid>
            <div className="d-flex align-items-center">
                <FolderBreadcrumbs currentFolder={folder} />
                <AddFolderButton currentFolder={folder} />
                <AddFileButton currentFolder={folder} />
            </div>
            {childFolders.length > 0 && (
                <div className="d-flex flex-wrap">
                    {childFolders.map(childFolder => {
                        return <div key={childFolder.id} style={{maxWidth: '150px'}} className="p-2"
                        ><Folder folder={childFolder} /></div>
                    })}
                </div>
            )}
            <div className="d-flex flex-wrap">
            {childFolders.length > 0 && childFiles.length > 0 && <hr />}
            {childFiles.length > 0 ? childFiles.map(item => {
                 
                    return <div key={item.id} style={{maxWidth: '150px'}} className="p-2" >
                    <File file={item}/>
                    </div>
            }): ''}
            </div>
        </Container>
       </>

    )
}
