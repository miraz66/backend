import React, { useEffect, useState } from "react";


function Team() {
  const [customers, setCustomers] = useState()

  useEffect(() => {
    fetch("http://localhost:8000/api/customers/") 
    .then(response => response.json())
    .then(data => {
      setCustomers(data.customers)
    })

  },[]) 


  return (
    <div className="w-9/12 pb-10 mt-5 mx-auto">
        <h1>Here are your customer</h1>
        {customers ?
          customers.map((customer) => {
            return <p key={customer.id}>{customer.name}</p>
          }) : null
        }
    </div>
  )
  
}

export default Team;
