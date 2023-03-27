import React, {useEffect, useState} from 'react'
import NavigationBar from '../components/NavigationBar';
import "../styles/Vacations.css";

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
        }
    ])
    var first = true;
    useEffect(() => { 
        if(first)
        {
            
        }
    }, [])

    // useEffect(() => {
    //     console.log("test2")
    // })
    
  return (
    <>

    <div className='center my-4'>
      
        
        <h3> Vacations </h3>
        <div className=' mx-auto container p-2 bg-light '>
            <div className='row p-2'>
                {
                vacations.map((vac, index) => 
                {
                    return (
                    <div key={"vac" + index}  className="col-3 g-2">
                        <div className="card ">
                            <h4> {vac.title} </h4>
                            <div>
                                <div className='containe '>
                                    <img className='col-12 vacimage' src={"http://localhost:3001/images/" + vac.image}/> 

                                </div>
                                <p> {vac.description} </p>
                            </div>
                        </div>
                    </div>
                );
                }
                   
                )}
            </div>
            
        </div>
        
    </div>
    </>

  )
}

export default VacationsPage