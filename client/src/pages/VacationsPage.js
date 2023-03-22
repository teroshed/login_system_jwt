import React, {useEffect, useState} from 'react'

function VacationsPage() {

    const [vacations, setVacations] = useState([
        {
            title: "Rome",
            description: "Lorem ipsum dolor sit amet, consectetur adip",
            startDate: new Date(2023, 5, 15),
            endDate: new Date(2023, 6, 15),
            price: 100,
            image: "romeimage.png"
        },
        {
            title: "Italy",
            description: "Lorem ipsum dolor sit amet, consectetur adip",
            startDate: new Date(2023, 5, 15),
            endDate: new Date(2023, 6, 15),
            price: 200,
            image: "italyimage.png"
        },
        {
            title: "Italy",
            description: "Lorem ipsum dolor sit amet, consectetur adip",
            startDate: new Date(2023, 5, 15),
            endDate: new Date(2023, 6, 15),
            price: 200,
            image: "italyimage.png"
        },
        {
            title: "Italy",
            description: "Lorem ipsum dolor sit amet, consectetur adip",
            startDate: new Date(2023, 5, 15),
            endDate: new Date(2023, 6, 15),
            price: 200,
            image: "italyimage.png"
        },
        {
            title: "Italy",
            description: "Lorem ipsum dolor sit amet, consectetur adip",
            startDate: new Date(2023, 5, 15),
            endDate: new Date(2023, 6, 15),
            price: 200,
            image: "italyimage.png"
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
    <div className='center'>
        <h3> Vacations </h3>
        <div className='row col-10 mx-auto container p-2 bg-light '>
            <div className='row '>
                {vacations.map(vac => 
                    <div className="card col-3  ">
                        <h4> {vac.title} </h4>
                    </div>
                )}
            </div>
            
        </div>
        
    </div>
  )
}

export default VacationsPage