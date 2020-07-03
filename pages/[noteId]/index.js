import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Loader, Form, Button, Confirm } from 'semantic-ui-react'
import Axios from 'axios'

const Note = ({ note }) => {

    const [confirm, setConfirm] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (isDeleting) {
            deleteNote()
        }

    }, [isDeleting])

    const open = () => setConfirm(true)

    const close = () => setConfirm(false)

    const handleDelete = async () => {
        setIsDeleting(true)
        close()
    }

    const deleteNote = async () => {
        const noteId = router.query.noteId

        try {
            
            const deleted = await Axios.delete(`/api/notes/${noteId}`)

            router.push("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <div className="note-container">
            {
                isDeleting
                ? <Loader active />
                : 
                <>
                    <h1>{note.title}</h1>
                    <h1>{note.description}</h1>
                    <Button color='red' onClick={open}>Delete</Button>
                </>
            }

            <Confirm
                open={confirm}
                onCancel={close}
                onConfirm={handleDelete}
            />
        </div>
    )

}

Note.getInitialProps = async ({ query: { noteId } }) => {

    const res = await Axios.get(`/api/notes/${noteId}`)

    return {
        note: res.data.data
    }
}

export default Note