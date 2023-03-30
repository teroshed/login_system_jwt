import React, {useEffect, useState} from 'react'
// import Modal from '../components/Modal';
import NavigationBar from '../components/NavigationBar';
import "../styles/Vacations.css";
import Modal from 'react-bootstrap/Modal';

function VacationsPage() {

    const [vacations, setVacations] = useState([
        {
            title: "Rome",
            description: "Lorem ipsum dolor sit amet, consectetur adip",
            startDate: new Date(2023, 5, 15),
            endDate: new Date(2023, 6, 15),
            price: 100,
            image: "rome.jpg"
        },
        {
            title: "Italy",
            description: "Lorem ipsum dolor sit amet, consectetur adip",
            startDate: new Date(2023, 5, 15),
            endDate: new Date(2023, 6, 15),
            price: 200,
            image: "italy.jpg"
        },
        {
            title: "Italy",
            description: "Lorem ipsum dolor sit amet, consectetur adip",
            startDate: new Date(2023, 5, 15),
            endDate: new Date(2023, 6, 15),
            price: 200,
            image: "italy.jpg"
        },
        {
            title: "Italy",
            description: "Lorem ipsum dolor sit amet, consectetur adip",
            startDate: new Date(2023, 5, 15),
            endDate: new Date(2023, 6, 15),
            price: 200,
            image: "italy.jpg"
        },
        {
            title: "Italy",
            description: "Lorem ipsum dolor sit amet, consectetur adip",
            startDate: new Date(2023, 5, 15),
            endDate: new Date(2023, 6, 15),
            price: 200,
            image: "italy.jpg"
        },
        {
            title: "Italy",
            description: "Lorem ipsum dolor sit amet, consectetur adip",
            startDate: new Date(2023, 5, 15),
            endDate: new Date(2023, 6, 15),
            price: 200,
            image: "italy.jpg"
        },
        {
            title: "Italy",
            description: "Lorem ipsum dolor sit amet, consectetur adip",
            startDate: new Date(2023, 5, 15),
            endDate: new Date(2023, 6, 15),
            price: 200,
            image: "italy.jpg"
        },
        {
            title: "Italy",
            description: "Lorem ipsum dolor sit amet, consectetur adip",
            startDate: new Date(2023, 5, 15),
            endDate: new Date(2023, 6, 15),
            price: 200,
            image: "italy.jpg"
        },
        {
            title: "Italy",
            description: "Lorem ipsum dolor sit amet, consectetur adip",
            startDate: new Date(2023, 5, 15),
            endDate: new Date(2023, 6, 15),
            price: 200,
            image: "italy.jpg"
        },
        {
            title: "Italy",
            description: "Lorem ipsum dolor sit amet, consectetur adip",
            startDate: new Date(2023, 5, 15),
            endDate: new Date(2023, 6, 15),
            price: 200,
            image: "italy.jpg"
        },
        {
            title: "Italy",
            description: "Lorem ipsum dolor sit amet, consectetur adip",
            startDate: new Date(2023, 5, 15),
            endDate: new Date(2023, 6, 15),
            price: 200,
            image: "italy.jpg"
        }
    ])

    const [modal, setModal] = useState(false);

    var first = true;
    useEffect(() => { 
        if(first)
        {
            
        }
    }, [])

    // useEffect(() => {
    //     console.log("test2")
    // })

    function addVacationButton(e) { 
        console.log("Hey")
        setModal(true);

    }
    
  return (
    <>

    <div className='center vacpage'>
        {/* <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                123
            </div>
        </div> */}
        <Modal  show={modal} onHide={() => setModal(false)}>
            <div className='container'>
                <Modal.Header bsPrefix='modalHeader' closeButton>
                    <Modal.Title>Add vacation</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form>
                        <div className='form-group my-2'>
                            <label htmlFor="vacName"> Vacation name</label>
                            <input type="text" id="vacName" placeholder='Vacation name' className='form-control '/> 
                        </div>
                        <div className='form-group my-2'>
                            <label htmlFor="vacDescription"> Description</label>
                            <input type="text" id="vacDescription" placeholder='Description' className='form-control'/> 
                        </div>
                        <div className='form-group my-2'>
                            <label htmlFor="vacStartDate"> Start date</label>
                            <input type="date" id="vacStartDate"  className='form-control '/> 
                        </div>
                        <div className='form-group my-2'>
                            <label htmlFor="vacEndDate"> End date</label>
                            <input type="date" id="vacEndDate" placeholder='Vacation name' className='form-control '/> 
                        </div>
                        <div className='form-group my-2'>
                            <label htmlFor="vacImage"> Vacation image</label>
                            <input type="file" accept="image/*" id="vacImage" placeholder='Vacation name' className='form-control '/> 
                        </div>
                        <div className="modal-buttons">
                            <button type="submit" className='btn btn-primary'> Add</button>
                            <button type="submit" className='btn btn-secondary'> Cancel</button>
                            
                        </div>
                    </form>
                    
                </Modal.Body>

            </div>
            
            
        </Modal>
        
        <div className='vacbody'>   
        <div className='vacheader'>
            <h3> Vacations </h3>

        </div>
        <div className='vacation-bar'>
            <div className='right'>
                <button type='button' className='navbutton' onClick={addVacationButton} data-toggle="modal" data-target="#examplemodal"> Add vacation </button>
            </div>
        </div>
            <div className='vacations-cont mx-auto p-2 '>
                <div className='row p-2'>
                    {
                    vacations.map((vac, index) => 
                    {
                        return (
                        <div key={"vac" + index}  className="col-3 g-4">
                            <div className="card ">
                                <h4> {vac.title} </h4>
                                <div>
                                    <div className='container '>
                                        <img className='col-12 vacimage' src={"http://localhost:3001/images/" + vac.image}/> 

                                    </div>
                                    <p> {vac.description} </p>
                                </div>
                            </div>
                        </div>
                    );
                    }
                    
                    )
                    }
                </div>
                
            </div>
        </div>
        
        
    </div>
    </>

  )
}

export default VacationsPage