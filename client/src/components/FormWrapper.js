import React from 'react'
import FormNavigation from './FormNavigation';

function FormWrapper (props) {
  return (
    <div className="window border col-lg-2 col-md-5   mx-auto mt-4  bg-light center">
        <FormNavigation/>
        {props.children}
    </div>
  )
}

export default  FormWrapper;