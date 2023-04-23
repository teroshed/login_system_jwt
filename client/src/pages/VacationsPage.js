import React, {useEffect, useState} from 'react'
// import Modal from '../components/Modal';
import NavigationBar from '../components/NavigationBar';
import "../styles/Vacations.css";
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';


var first = true;

function VacationsPage() {

    const url = "http://localhost:3001";

    const [vacations, setVacations] = useState([
        {
            title: "Rome",
            description: "Lorem ipsum dolor sit amet, consectetur adip",
            startDate: new Date(2023, 4, 15),
            endDate: new Date(2023, 6, 15),
            price: 100,
            image: "rome.jpg"
        },
        {
            title: "Italy",
            description: "Lorem ipsum dolor sit amet, consectetur adip",
            startDate: new Date(2023, 2, 15),
            endDate: new Date(2023, 6, 15),
            price: 200,
            image: "italy.jpeg"
        },
        {
            title: "not italy",
            description: "Lorem ipsum dolor sit amet, consectetur adip",
            startDate: new Date(2023, 5, 15),
            endDate: new Date(2023, 6, 15),
            price: 300,
            image: "italy.jpeg"
        },
        {
            title: "Italy",
            description: "Lorem ipsum dolor sit amet, consectetur adip",
            startDate: new Date(2023, 5, 15),
            endDate: new Date(2023, 6, 15),
            price: 50,
            image: "italy.jpeg"
        },
        {
            title: "Italy",
            description: "Lorem ipsum dolor sit amet, consectetur adip",
            startDate: new Date(2023, 5, 15),
            endDate: new Date(2023, 6, 15),
            price: 200,
            image: "italy.jpeg"
        },
        {
            title: "Italy",
            description: "Lorem ipsum dolor sit amet, consectetur adip",
            startDate: new Date(2023, 5, 15),
            endDate: new Date(2023, 6, 15),
            price: 200,
            image: "italy.jpeg"
        },
        {
            title: "Italy",
            description: "Lorem ipsum dolor sit amet, consectetur adip",
            startDate: new Date(2023, 5, 15),
            endDate: new Date(2023, 6, 15),
            price: 200,
            image: "italy.jpeg"
        },
        {
            title: "Italy",
            description: "Lorem  ipsum dolor sit amet, consectetur adip",
            startDate: new Date(2023, 5, 15),
            endDate: new Date(2023, 6, 15),
            price: 200,
            image: "italy.jpeg"
        },
        {
            title: "Italy",
            description: "Lorem ipsum dolor sit amet, consectetur adip",
            startDate: new Date(2023, 5, 15),
            endDate: new Date(2023, 6, 15),
            price: 200,
            image: "italy.jpeg"
        },
        {
            title: "Italy",
            description: "Lorem ipsum dolor sit amet, consectetur adip",
            startDate: new Date(2023, 5, 15),
            endDate: new Date(2023, 6, 15),
            price: 200,
            image: "italy.jpeg"
        },
        {
            title: "Italy",
            description: "Lorem ipsum dolor sit amet, consectetur adip",
            startDate: new Date(2023, 5, 15),
            endDate: new Date(2023, 6, 15),
            price: 30,
            image: "italy.jpeg"
        }
    ])

    const [warnings, setWarnings] = useState({});

    const [modal, setModal] = useState(false);

    useEffect(() => { 
        if(first)
        {
            let vacs = structuredClone(vacations);
            vacs.sort((a, b) => {
                return a.startDate.getTime() - b.startDate.getTime();
            })
            setVacations(vacs);
            first = false;
        }
    }, [])

    // useEffect(() => {
    //     console.log("test2")
    // })

    function addVacationButton(e) { 
        console.log("Hey")
        setModal(true);
    }
    
    async function submitVacationForm(e)
    {
        e.preventDefault();

        let fields = {};
        fields.name = e.target[0];
        fields.description = e.target[1];
        fields.startDate = e.target[2];
        fields.endDate = e.target[3];
        fields.price = e.target[4];
        fields.image = e.target[5];

        
        // setWarnings(() => {});
        // console.log("Set warnings: ", warnings)
        for(const field of e.target)
        {
            field.classList.remove("red-input");

        }
        if(validateForm(fields))
        {
            console.log(fields)
            console.log("Submit: ", e);
            let json = {
                    name: fields.name.value,
                    description: e.target[1].value,
                    startDate: e.target[2].value,
                    endDate: e.target[3].value,
                    price: e.target[4].value,
                    image: e.target[5].files[0]
                };
            console.log("JSOn: ", json);
        }
        
        // let a = await axios.post(url + "/addVacation", json, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // });
        // console.log(a)
        
    }

    function validateForm(fields)
    {
        // console.log("Validate form:", fields);
        let flag = true;
        let tempWarnings = {};
        if(fields.name.value.length > 15 || fields.name.value.replaceAll(" ", "").length < 3)
        {
            tempWarnings = {...tempWarnings, nameWarning: "Name must be between 3 and 15 characters"};
            fields.name.classList.add("red-input");
            flag = false;
        }
        if(!fields.description.value.replaceAll(" ", ""))
        {
            tempWarnings = {...tempWarnings, descriptionWarning: "Description can't be empty"};
            fields.description.classList.add("red-input");
            flag = false;
        }
        if(!fields.startDate.value)
        {
            tempWarnings = {...tempWarnings, startDateWarning: "Start date cant be empty"};
            fields.startDate.classList.add("red-input");
            flag = false;
        }
        if(!fields.endDate.value)
        {
            tempWarnings = {...tempWarnings, endDateWarning: "End date cant be empty"};
            fields.endDate.classList.add("red-input");
            flag = false;
        }
        if(!fields.price.value)
        {
            tempWarnings = {...tempWarnings, priceWarning: "Please enter a price"};
            fields.price.classList.add("red-input");
            flag = false;
        }
        if(!fields.image.value)
        {
            tempWarnings = {...tempWarnings, imageWarning: "Please upload an image"};
            fields.image.classList.add("red-input");
            flag = false;
        }
        
        let pickedStartDate = new Date(fields.startDate.value); 
        let pickedEndDate = new Date(fields.endDate.value);
        let today = new Date();
        today.setHours(0, 0, 0, 0); 
        if(pickedStartDate < today)
        {
            tempWarnings = {...tempWarnings, startDateWarning: "Start date can't be in the past"};
            fields.startDate.classList.add("red-input");
            flag = false;
        }
        if(pickedEndDate < pickedStartDate) 
        {
            tempWarnings = {...tempWarnings, endDateWarning: "End date can't be before start date"};
            fields.endDate.classList.add("red-input");
            flag = false;
        }
        if(fields.endDate.value && !fields.startDate.value)      
        {
            tempWarnings = {...tempWarnings, endDateWarning: "Please choose a start date"};
            fields.endDate.classList.add("red-input");
            flag = false;
        }
        setWarnings(tempWarnings);
        console.log("Warnings at end: ", warnings)
        // console.log("start date: ", new Date(fields.startDate.value));
        return false;
    }
    
    function sortChange(e)
    {
        let sortValue = e.target.value;
        console.log("AA: '" +sortValue + "'")

        let vacs = structuredClone(vacations);
        vacs.sort((a, b) => {
            if(sortValue == 1)
                return a.startDate.getTime() - b.startDate.getTime();
            if(sortValue == 2)
                return a.name - b.name;
            if(sortValue == 3)
                return a.price - b.price;
        });
        setVacations(vacs);
    }

  return (
    <>

    <div className='center vacpage'>
        {/* <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                123
            </div>
        </div> */}
        <Modal id="modal" show={modal} onHide={() => setModal(false)}>
            <div className='container'>
                <Modal.Header bsPrefix='modalHeader' closeButton>
                    <Modal.Title>Add vacation</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form onSubmit={submitVacationForm}>
                        <div className='form-group my-2'>
                            <label htmlFor="vacName"> Vacation name</label>
                            <input type="text" id="vacName" placeholder='Vacation name' className='form-control ' /> 
                            {warnings.nameWarning && <label id="vacNameWarning" htmlFor="vacName" className='text-danger text-bold '>{warnings.nameWarning}</label>}
                        </div>
                        <div className='form-group my-2'>
                            <label htmlFor="vacDescription"> Description</label>
                            <input type="text" id="vacDescription" placeholder='Description' className='form-control'/>
                            {warnings.descriptionWarning && <label id="vacDescriptionWarning" htmlFor="vacDescription" className='text-danger text-bold '>{warnings.descriptionWarning} </label>}

                        </div>
                        <div className='form-group my-2'>
                            <label htmlFor="vacStartDate"> Start date</label>
                            <input type="date" id="vacStartDate"  className='form-control '/> 
                            {warnings.startDateWarning && <label id="vacStartDateWarning" htmlFor="vacStartDate" className='text-danger text-bold '>{warnings.startDateWarning} </label>}


                        </div>
                        <div className='form-group my-2'>
                            <label htmlFor="vacEndDate"> End date</label>
                            <input type="date" id="vacEndDate" placeholder='Vacation name' className='form-control '/> 
                            {warnings.endDateWarning && <label id="vacEndDateWarning" htmlFor="vacEndDate" className='text-danger text-bold '>{warnings.endDateWarning} </label>}

                        </div>
                        <div className='form-group my-2'>
                            <label htmlFor="vacPrice"> Price</label>
                            <input type="text" id="vacPrice" placeholder='Price' className='form-control'/> 
                            {warnings.priceWarning && <label id="vacPriceWarning" htmlFor="vacPrice" className='text-danger text-bold '>{warnings.priceWarning} </label>}

                        </div>
                        <div className='form-group my-2'>
                            <label htmlFor="vacImage"> Vacation image</label>
                            <input type="file" accept="image/*" id="vacImage" placeholder='Vacation name' className='form-control '/> 
                            {warnings.imageWarning && <label id="vacImageWarning" htmlFor="vacImage" className='text-danger text-bold '>{warnings.imageWarning} </label>}

                        </div>
                        <div className="modal-buttons">
                            <button type="submit" className='btn btn-primary'> Add</button>
                            <button onClick={() => {setModal(false)}} type="button" className='btn btn-secondary'> Cancel</button>
                            
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
            
            
            <div className='vacations-cont mx-auto p-2 container '>
                <div className='col-4 '>
                    <div className='d-flex ms-2'>
                        <label htmlFor="sortSelect justify-content-start"> Sort by:</label>
                    </div>
                    <div className='row col-5'>
                        <select onChange={sortChange} id="sortSelect" className='form-select mx-3 ' placeholder='select'>
                            <option value={1}> Start date </option>
                            <option value={2}> Name </option>
                            <option value={3}> Price</option>
                        </select>
                    </div>
                    
                </div>
                <div className='row p-2'>
                    {
                    vacations.map((vac, index) => 
                    {
                        return (
                        <div key={"vac" + index}  className="col-3 g-4">
                            <div className="card ">
                                <div>
                                    <div className=' '>
                                        <img className='col-12 vacimage' src={"http://localhost:3001/images/" + vac.image}/> 
                                    </div>
                                    <div className='rounded-top'>
                                        <h4> {vac.title} </h4>
                                        <div className='underTitle rounded-top'>
                                            <div className=' col-12 date'>{vac.startDate.toDateString()} - {vac.endDate.toDateString()} </div>
                                            <div className="underDate rounded-top">
                                                <p> {vac.description} </p>
                                                <div className='row d-flex justify-content-between px-1 mx-auto col-10'> 
                                                    
                                                    <div className='col-6'>
                                                        <button type="button" className="btn btn-primary shadow mb-2 order-"> Order</button>

                                                    </div>
                                                    <div className='col-6 '>
                                                        <p className="bold">Price: ${vac.price}</p>

                                                    </div>

                                                </div>
                                            </div>
                                            
                                        </div>
                                        
                                        
                                    </div>
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