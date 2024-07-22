// import React from 'react'
import { Link } from 'react-router-dom'
import "bootstrap-icons/font/bootstrap-icons.css";
function Dashboard() {
  return (
    <div className='container-fluid'>
    <div className='row flex-nowrap'>
        <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark'>
            <div className='d-flex flex-column align-items-center align-item-sm-start px-3 pt-2 text-white min-vh-100'>
                <Link to="/dashboard" className='d-flex align-item-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none'>
                <span className='fs-5 fw-bolder d-none d-sm-inline'>Subhasis Dashboard</span>
                </Link>
                <ul className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-item' id='menu'>
                    <li className='w-100'>                    
                    <Link to="/dashboard" className='nav-link text-white px-0 align-middle'>
                    <span className='ms-2  d-none d-sm-inline'>Dashboard</span>
                    </Link>
                    </li>

                    <li className='w-100'>                    
                    <Link to="/dashboard" className='nav-link text-white px-0 align-middle'>
                    <span className='ms-2  d-none d-sm-inline'>Create Employee</span>
                    </Link>
                    </li>

                     <li className='w-100'>                    
                    <Link to="/dashboard" className='nav-link text-white px-0 align-middle'>
                    <span className='ms-2  d-none d-sm-inline'>EmployeeList</span>
                    </Link>
                    </li>   

                    <li className='w-100'>                    
                    <Link to="/dashboard" className='nav-link text-white px-0 align-middle'>
                    <span className='ms-2  d-none d-sm-inline'>Profile</span>
                    </Link>
                    </li>                      
                    
                    <li className='w-100'>                    
                    <Link to="/dashboard" className='nav-link text-white px-0 align-middle'>
                    <span className='ms-2  d-none d-sm-inline'>Logout</span>
                    </Link>
                    </li>

                </ul>
            </div>
        </div>
    </div>
      
    </div>
  )
}

export default Dashboard
