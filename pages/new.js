import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Loader, Form, Button } from 'semantic-ui-react'
import Axios from 'axios'

const NewNote = () => {
    const [form, setForm] = useState({ title: '', description: ''})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState({})
    const router = useRouter()

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                createNote()
            }
            else {
                setIsSubmitting(false)
            }
        }
    }, [errors])

    const handleSubmit = (e) => {
        e.preventDefault()
        let err = validate()
        setErrors(err)
        setIsSubmitting(true)
    }

    const createNote = async () => {
        try {

            const res = await Axios.post('/api/notes', form)

            router.push("/")
            
        } catch (error) {
            console.log(error)
        }
    }
    

    const validate = () => {
        let err = {}

        if (!form.title) {
            err.title = 'Title is required'
        }

        if (!form.description) {
            err.description = 'Description is required'
        }

        return err
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const renderForm = () => (
        <Form onSubmit={handleSubmit}>
            <Form.Input 
                error={errors.title ? {content: errors.title, pointing: 'below'} : null}
                label='Title'
                placeholder='Title'
                name='title'
                onChange={handleChange} 
            />

            <Form.TextArea 
                error={errors.description ? {content: errors.description, pointing: 'below'} : null}
                label='Description'
                placeholder='Description'
                name='description'
                onChange={handleChange} 
            />

            <Button type='submit'>Create</Button>
            
        </Form>
    )

    return (
        <div className="form-container">
            <h1>Create Note</h1>
            <div>
                {
                    isSubmitting
                        ? <Loader active inline='centered'/>
                        : renderForm()
                }
            </div>
        </div>
    )
}

export default NewNote