import React, {useEffect, useState} from 'react'
// import Modal from '../components/Modal';
import NavigationBar from '../components/NavigationBar';
import "../styles/Vacations.css";
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import cookies from '../misc/cookies';
import { verifyToken } from '../misc/loginUtils';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { FiDelete, FiEdit, FiHeart, FiTrash } from 'react-icons/fi';
import {AiFillHeart} from 'react-icons/ai'
import Swal from 'sweetalert2';
var first = true;

function VacationsPage() {

    const url = "http://localhost:3001";

    const navigate = useNavigate();

    const [vacations, setVacations] = useState([]);

    const [warnings, setWarnings] = useState({});

    const [modal, setModal] = useState(false);

    const [tokenData, setTokenData] = useState();
    const [favorites, setFavorites] = useState();
    const [editId, setEditId] = useState();

    useEffect(() => { 
            
            let token = cookies.getCookie('token');
            if(!token)
            {
                console.log("Not logged");
                navigate("/login")
                return;
            }
            else
            {
                
                setTokenData(jwtDecode(token).tokenData);
            }
            let vacs = structuredClone(vacations);
            vacs.sort((a, b) => {
                return a.startDate.getTime() - b.startDate.getTime();
            })
            getVacations();
            setVacations(vacs);
            getFavorites();

    }, [])

    useEffect(() => {
        if(editId)
        {
            let vacName = document.getElementById("vacName");
            let vacDescription = document.getElementById("vacDescription");
            let vacStartDate = document.getElementById("vacStartDate");
            let vacEndDate = document.getElementById("vacEndDate");
            let vacPrice = document.getElementById("vacPrice");
            let preview = document.getElementById("imagePreview");
            let vacation = vacations.find(e => e.vacID == editId);

            vacName.value = vacation.name;
            vacDescription.value = vacation.description;
            vacStartDate.valueAsDate = vacation.startDate;
            vacEndDate.valueAsDate = vacation.endDate;
            vacPrice.value = vacation.price;
            preview.src = url + "/images/" + vacation.imageName;
        }
        
    }, [editId])



    async function getVacations()
    {
        let vacations = await axios.get(url + '/getvacations');
        vacations = vacations.data;
        // console.log(vacations);
        let formattedVacs = [];
        for(let i = 0; i < vacations.length; i++)
        {
            formattedVacs[i] = {
                ...vacations[i],
                startDate: new Date(vacations[i].startDate),
                endDate: new Date(vacations[i].endDate)
            }
        }
        console.log("Vacations: ", formattedVacs);
        // console.log(formattedVacs);
        setVacations(formattedVacs);
    }

   

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

        let vacation = vacations.find(vac => vac.vacID == editId);

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
                    token: cookies.getCookie('token'),
                    image: e.target[5].files[0]

                };
            let res;

            if(editId)
            {
                
                json = {vacId: editId, imageName: vacation.imageName, ...json};
                console.log("Json sent: ", json);
                res = await axios.post(url + "/editVacation", json, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }
            else
            {
                res = await axios.post(url + "/addVacation", json, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }
            
            res = res.data;
            if(res.ok)
            {
                Swal.fire({title: "Added vacation", icon: "success"}).then(() => {
                    closeModal();
                    getVacations();

                }
                );
            }
            else
            {
                Swal.fire({title: "Error adding vacation", icon: "error"});
                getVacations();

            }
            setEditId(null);

        }

        
        
        
    }

    function closeModal()
    {
        setWarnings({});
        setModal(false);
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
        if(!editId && !fields.image.value )
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
        return flag;
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

    async function toggleVacation(vacID)
    {

        let token = cookies.getCookie('token');
        let a = await axios.post(url + "/toggleVacation", {vacID, token});
        getFavorites();
    }

    async function getFavorites()
    {
        let token = cookies.getCookie('token');
        let res = await axios.post(url + "/getFavorites", {token});
        setFavorites(res.data);
    }

    async function deleteVacation(vacID)
    {
        let token = cookies.getCookie('token');
        let vacation = vacations.find(vac => vac.vacID == vacID);

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(async (result) => {
            if (result.isConfirmed) {
                let res = await axios.post(url + "/deleteVacation", {token, vacID, imageName: vacation.imageName});
                console.log("delete: ", res.data);
                getVacations();
                if(res.data.ok)
                {
                    Swal.fire(
                        'Deleted!',
                        'Vacation has been deleted.',
                        'success'
                      )
                }
                else
                {
                    let message = "Unknown error";
                    if(res.data.code == 401)
                        message = "Invalid or expired token";
                    
                    Swal.fire(
                        'Error deleting vacation!',
                        message,
                        'error'
                      )
                }
            }
          })

    }

    function editVacation(vacId)
    {

        setModal(true);
        setEditId(vacId);
        //Fields getting set in useEffect

    }

    function editPreview(e)
    {
        let file = e.target.files[0];
        let preview = document.getElementById("imagePreview");
        if(file)
            preview.src = URL.createObjectURL(e.target.files[0]);
        else
            preview.src = url + "/images/blank.png"; 
    }

  return (
    <>

    <div className='center vacpage'>

        <Modal id="modal" show={modal} onHide={() => {closeModal(); setEditId(null);}}>
            <div className='container'>
                <Modal.Header bsPrefix='modalHeader' closeButton>
                    
                    <Modal.Title>
                        {editId ? "Edit vacation" : "Add vacation"}
                    </Modal.Title>
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
                            <input type="number" id="vacPrice" placeholder='Price' className='form-control'/> 
                            {warnings.priceWarning && <label id="vacPriceWarning" htmlFor="vacPrice" className='text-danger text-bold '>{warnings.priceWarning} </label>}

                        </div>
                        <div className='form-group my-2'>
                            <label htmlFor="vacImage"> Vacation image</label>
                            <input onChange={editPreview} type="file" name="image" accept="image/*" id="vacImage" placeholder='Vacation name' className='form-control '/> 
                            {warnings.imageWarning && <label id="vacImageWarning" htmlFor="vacImage" className='text-danger text-bold '>{warnings.imageWarning} </label>}
                        </div>
                        <img id="imagePreview"  className="my-2 col-12 border" src={url + "/images/blank.png"}/> 
                        <div className="modal-buttons">
                            <button type="submit" className='btn btn-primary'> {editId ? "Edit vacation" : "Add vacation"}</button>
                            <button onClick={() => {closeModal()}} type="button" className='btn btn-secondary'> Cancel</button>
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
                </div>
            </div>
            
            
            <div className='mx-auto container text-left'>
                <div className='vacation-nav container'>
                    <div className='d-flex row '> {/**ms-2 */}
                        <label htmlFor="sortSelect justify-content-start  "> Sort by:</label>
                    </div>
                    <div className='row d-flex justify-content-between gy-2'>
                        <div className='col-lg-4 col-md-4'>
                            <select onChange={sortChange} id="sortSelect" className='form-select ' placeholder='select'>
                                <option value={1}> Start date </option>
                                <option value={2}> Name </option>
                                <option value={3}> Price</option>
                            </select>
                        </div>
                        {(tokenData && tokenData.role) ?
                        <div id="addcont" className='col-lg-2 p-0 text-nowrap col-sm-4 add-vac-cont d-flex '>
                            <button id="addbtn" type='button' className='d-flex col-12 add-vac-button btn' onClick={addVacationButton} data-toggle="modal" data-target="#examplemodal"> 
                                <div id="text" className=''> Add vacation </div>
                                <div id="addplus" className='add-plus col-2 mx-2 d-flex align-items-center justify-content-center pb-1'> + </div>

                            </button>

                        </div> : null
                        }
                        
                    </div>
                    
                    
                </div>
                <div className='row '>
                    {
                    vacations.map((vac, index) => 
                    {
                        return (
                            <div key={"vac" + index}  className="col-md-4 col-lg-3  g-4" >
                                <div className="card ">
                                    <div>
                                        <div className=' '>
                                            {
                                                (tokenData && 
                                                tokenData.role) ?
                                                <>
                                                    <div className="edit" onClick={() => editVacation(vac.vacID)}> Edit <FiEdit className='col-3'></FiEdit>  </div>
                                                    <div className="delete" onClick={() => deleteVacation(vac.vacID)}> <FiTrash></FiTrash> </div>
                                                </>
                                                :
                                                <button onClick={() => {toggleVacation(vac.vacID)}} type="button" className='heart'>
                                                    {(favorites && favorites.includes(vac.vacID)) ?
                                                     <AiFillHeart className='heartIcon red'> </AiFillHeart>
                                                     :
                                                     <FiHeart id={"heart" + index} className='heartIcon'></FiHeart> 

                                                    }
                                                </button>
                                            }
                                            

                                            <img className=' vacimage' src={"http://localhost:3001/images/" + vac.imageName}/> 
                                        </div>
                                        <div className='rounded-top'>
                                            <h4> {vac.name} </h4>
                                            <div className='underTitle rounded-top'>
                                                <div className=' col-12 date'>{vac.startDate.toLocaleDateString("he-IL")} - {vac.endDate.toLocaleDateString("he-IL")} </div>
                                                <div className="underDate rounded-top container">
                                                    <div className='description-box'>
                                                        <p className='description'> {vac.description} </p>

                                                    </div>

                                                    <div className="card-footer">
                                                    <h4 className='bold vac-pric '> {vac.price}$ </h4>

                                                        <button type="button" className="btn order-button"> Order </button>
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