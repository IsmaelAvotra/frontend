import { useEffect, useState } from 'react'
import { BsPersonAdd } from 'react-icons/bs'

function App() {
  const [students, setStudents] = useState<Student[]>([])

  interface Student {
    id: string
    firstname: string
    lastname: string
    birthDate: string
    email: string
  }

  const getAllStudents = async () => {
    try {
      const response = await fetch('http://localhost:3000/students')
      const data = await response.json()
      console.log(data)
      if (data) {
        setStudents(data)
      } else {
        setStudents([])
      }
    } catch (error) {
      console.log(error)
    }

    useEffect(() => {
      getAllStudents()
    }, [])
  }
  return (
    <div className='home'>
      <div className='header'>
        <div className='seach'>
          <input type='text' placeholder='Search...' />
        </div>
        <div className='add'>
          <BsPersonAdd />
        </div>
      </div>
      <main>
        <table>
          <thead>
            <tr>
              <th>Full name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{`${student.lastname} ${student.firstname}`}</td>
                <td>{student.birthDate}</td>
                <td>{student.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <div className='pagination'></div>
    </div>
  )
}

export default App
