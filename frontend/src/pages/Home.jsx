import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div className="bg-[url('https://images.unsplash.com/photo-1658825831108-93088006330d?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJhZmZpYyUyMGxpZ2h0cyUyMGFuaW1hdGVkfGVufDB8fDB8fHww')]
      h-screen w-full flex flex-col justify-between bg-cover bg-center">

      <img src="https://media.ffycdn.net/us/postmates/eyJwYXRoIjoicG9zdG1hdGVzXC9hY2NvdW50c1wvODRcLzQwMDA1MTRcL3Byb2plY3RzXC8yN1wvYXNzZXRzXC8xN1wvNTUxMFwvMmM3MTkyZDM1NGQ0YjA2YWFhZTgzZDc5Yzc2MzYwNWMtMTYyMDM3Nzc0OC5haSJ9:postmates:cvkkT2vHrzRiGiujqpqbVFn9z8dn773yTgVOCePXowk?width=2400" alt="" 
      className='w-50'/>

        <div className='bg-white py-5 px-4 pb-7 flex flex-col items-center'>
          <h2 className='text-3xl font-bold '>Get Started with Uber</h2>
          <Link to='/login'  className='flex items-center justify-center w-2/3 bg-black text-white py-3 rounded-lg mt-5 text-xl'>Continue</Link>
        </div>

      </div>
    </div>
  )
}

export default Home