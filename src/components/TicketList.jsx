import React, { useEffect, useState } from "react";
import '../styles/TicketList.css'


const TicketList = () => {
    const [tickets, setTickets] = useState([])

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await fetch('http://localhost:3000/tickets')
                if (!response.ok) {
                    throw new Error('Failed to fetch')
                }

                const data = await response.json()
                setTickets(data)
            } catch (error) {
                console.error('Error ', error)
            }

        }
        fetchTickets()
    }, [])



    return (
        <>
        
            <h3>Current Tickets</h3>
            <div className="table-container">

                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Priority</th>
                            <th>Description</th>
                            <th>Resolved</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map(ticket => (
                            <tr key={ticket.id}>
                                <td>{ticket.title}</td>
                                <td>{ticket.priority}</td>
                                <td>{ticket.description}</td>
                                <td>{ticket.resolved ? 'Yes' : 'No'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </>

    )
}

export { TicketList }
