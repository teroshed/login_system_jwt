import React from 'react'
import { useNavigate } from 'react-router-dom';
import {FiArrowLeft, FiHome} from 'react-icons/fi'

function NavigationPanel() {
    const navigate = useNavigate();

  return (
    <div className="col-12 row">
            <div className="d-flex col-10">
                <button onClick={() => {navigate(-1)}} type="button" className="btn btn-default justify-content-end">
                    <FiArrowLeft size={20} />
                </button>
            </div>
            <div className="float-end col-1">
                <button onClick={() => {navigate("/")}}type="button" className="btn btn-default justify-content-end">
                    <FiHome size={20} />
                </button>
            </div>
        </div>  
  )
}

export default NavigationPanel