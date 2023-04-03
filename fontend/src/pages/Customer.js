import { useParams, Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../Components/Shared";

function Customer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState();
  const [notFound, setNotFound] = useState();

  useEffect(() => {
    const url = baseUrl + "api/customers/" + id;

    fetch(url)
      .then((response) => {
        if (response.status === 404) {
          setNotFound(true);
        }
        return response.json();
      })
      .then((data) => {
        setCustomer(data.customer);
      });
  }, [id]);

  return (
    <div className="p-20">
      {notFound ? <p>The Customer with id {id} was not found</p> : null}
      {customer ? (
        <div className="    ">
          <p>{customer.id}</p>
          <p>{customer.name}</p>
          <p>{customer.industry}</p>
        </div>
      ) : null}

      <button
        className="bg-red-400 px-4 py-1"
        onClick={(e) => {
          const url = baseUrl + "api/customers/" + id;
          fetch(url, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Something went worng...");
              }
              navigate("/customers");
            })
            .catch((e) => {
              console.log(e);
            });
        }}
      >
        Delete
      </button>
      <br />

      <Link to="/customers">Go back.</Link>
      <p> </p>
    </div>
  );
}

export default Customer;
