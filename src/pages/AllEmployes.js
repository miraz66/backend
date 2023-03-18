import Employes from "../Components/Employes";
import Detalis from "../Components/Details.json";
import { useState } from "react";
import AddEmploye from "../Components/AddEmploye ";
import EditEmploye from "../Components/EditEmploye";

const { v4: uuidv4 } = require("uuid");

function AllEmployes() {
  const [details, setDetails] = useState(Detalis.Details);

  function updateEmployee(id, newNeme, newRole) {
    const updateEmployee = details.map((employee) => {
      if (employee.id === id) {
        return { ...employee, name: newNeme, role: newRole };
      }
      return employee;
    });

    setDetails(updateEmployee);
  }

  function newEmployee(name, role, img) {
    const newEmployee = {
      id: uuidv4(),
      name: name,
      role: role,
      img: img,
    };

    setDetails([...details, newEmployee]);
  }

  return (
    <div className=" ">
      <div className="w-9/12 pb-10 mt-5 mx-auto">
        <div className="flex flex-col-3 gap-2 justify-center flex-wrap ">
          {details.map((details) => {
            const editEmploye = (
              <EditEmploye
                id={details.id}
                name={details.name}
                role={details.role}
                img={details.img}
                updateEmployee={updateEmployee}
              />
            );
            return (
              <Employes
                key={uuidv4()}
                id={details.id}
                name={details.name}
                role={details.role}
                img={details.img}
                editEmploye={editEmploye}
              />
            );
          })}
        </div>
        <AddEmploye newEmployee={newEmployee} />
      </div>
    </div>
  );
}

export default AllEmployes;
