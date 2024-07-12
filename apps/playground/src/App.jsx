import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { UserManagement } from "@crayond_dev/user-management-test";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Vite + React</h1>

      <UserManagement
        apiUrl={"https://dev-idm-api.crayond.com/api/v1"}
        apiToken={"ASC4PK0UVE5OOCO8NK"}
        title={"Role Management"}
      />
    </>
  )
}

export default App
