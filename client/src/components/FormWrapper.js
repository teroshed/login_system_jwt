import React from 'react'
import FormNavigation from './FormNavigation';

function FormWrapper (props) {
  return (
    <div className="window border col-8 mx-auto mt-4  bg-light center">
        <FormNavigation/>
        {props.children}
    </div>
  )
}

export default  FormWrapper;