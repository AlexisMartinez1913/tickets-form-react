import React, { useState } from 'react'
import '../styles/FormTicket.css'

const FormTicket = () => {
    const [form, setForm] = useState({
        title: '',
        priority: '',
        description: '',
        resolved: false
    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value
        setForm(prevState => ({
            ...prevState,
            [name]: newValue
        }))
    }

    const handleSubmit = async (e) => {

        e.preventDefault()
        if (form.title.length < 6 || form.title.length > 18) {
            alert('The title must be between 6 and 8 characters')
            return
        }

        if (!form.priority || isNaN(parseInt(form.priority))) {
            alert('the priority should be numeric')
            return
        }

        try {
            const response = await fetch('http://localhost:3000/tickets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form)
            })
            if (!response.ok) {
                throw new Error('Failed to create ticket')
            }

            const data = await response.json()
            console.log('Your ticket has been created:', data)
            setForm({
                title: '',
                priority: '',
                description: '',
                resolved: false
            })
        } catch (error) {
            console.error('Error creating ticket:', error)
        }



    }




    return (
        <div className='container'>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <h3>Add Ticket</h3>
                        <label htmlFor="">Title</label>
                        <input
                            type="text"
                            name='title'
                            placeholder='Add the ticket title'
                            value={form.title}
                            onChange={handleChange}
                            required
                            minLength={6}
                            maxLength={18}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="">Priority</label>
                        <select
                            name='priority'
                            value={form.priority}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select...</option>
                            <option value="1">1</option>
                            <option value="1">2</option>
                            <option value="1">3</option>
                        </select>
                    </div>

                    <div className='form-group'>
                        <label htmlFor="">Description: </label>
                        <textarea
                            name='description'
                            placeholder='Add the ticket description'
                            value={form.description}
                            onChange={handleChange}
                            maxLength={30}
                        >
                        </textarea>

                    </div>
                    <div className='form-group label-checkbox'>
                        <label htmlFor="">
                            <input
                                type="checkbox"
                                name='resolved'
                                checked={form.resolved}
                                onChange={handleChange}
                            />
                            Mark As Resolved

                        </label>

                    </div>
                    <button type='submit'>Submit</button>

                </form>

            </div>

        </div>
    )
}

export { FormTicket }
