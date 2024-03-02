import { useState } from 'react'
import { FormTicket } from './components/FormTicket'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <FormTicket></FormTicket>
    </>
  )
}

export default App
