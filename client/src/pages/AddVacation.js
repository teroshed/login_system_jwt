import React from 'react'

function AddVacation() {
  return (
    <div className="container bg-light center">
        <div className="border shadow mt-4">
            <form className='p-2 container col-10'>
                <div className="form-group">
                    <input type="text" className="form-control " placeholder="Vacation name"/>

                </div>
            </form>
        </div>
    </div>
  )
}

export default AddVacation