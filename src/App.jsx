import { useState } from 'react'
import axios from 'axios'
import { TextField, Button, Snackbar, Alert } from '@mui/material'


function App() {
  const [name, setName] = useState('')
  const [checkedName, setCheckedName] = useState('')
  const [notNepo, setNotNepo] = useState(false)
  const [nepo, setNepo] = useState(false)

  const handleSubmit = () => {
    axios.get('/check', { params: { name } })
      .then(({ data }) => {
        setCheckedName(name)
        setName('')

        if (data) {
          setNepo(data)
          setTimeout(() => setNepo(false), 3000)
        } else {
          setNotNepo(true)
          setTimeout(() => setNotNepo(false), 3000)
        }
      })
      .catch(() => {
        setNotNepo(true)
        setTimeout(() => setNotNepo(false), 3000)
      })
  }

  const handleKeyPress = (e) => {
    if (event.key == 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className="App">
      <div className='title'>
        <h1>NepoBby</h1>
        <p>Check to see if your favorite celiberty worked to get there or Mommy and Daddy got them there.</p>
      </div>
      <div className='input-field'>
        <TextField
          onChange={e => setName(e.target.value)}
          id="outlined-basic"
          label="Celebrity Name"
          variant="outlined"
          value={name}
          onKeyDown={handleKeyPress}
        />
        <Button
          onClick={handleSubmit}
          variant="contained" color="success"
        >Submit</Button>
      </div>
      <Snackbar open={nepo} autoHideDuration={3000} >
        <Alert severity="success" sx={{ width: '100%' }}>
          Yeah {checkedName} a product of Nepotism!
        </Alert>
      </Snackbar>
      <Snackbar open={notNepo} autoHideDuration={3000} >
        <Alert severity="error" sx={{ width: '100%' }}>
          I couldn't find anything but that doesn't mean they aren't!
        </Alert>
      </Snackbar>
    </div >
  )
}

export default App
