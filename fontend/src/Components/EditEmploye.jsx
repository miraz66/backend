import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

function EditEmploye(props) {
  const [name, setName] = useState(props.name);
  const [role, setRole] = useState(props.role);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function subHandler(e) {
    e.preventDefault();
    console.log(props.id, name, role);
    console.log("adding");
    props.updateEmployee(props.id, name, role);
  }

  return (
    <div className="">
      <button
        onClick={handleShow}
        className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
      >
        Edit
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Employe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            id="editModal"
            className="w-full max-w-sm"
            onSubmit={(e) => subHandler(e)}
          >
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="role"
                >
                  Full name
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="role"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="role"
                >
                  Role
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="role"
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md active:bg-gray-400"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            form="editModal"
            onClick={handleClose}
            className="bg-purple-600 text-white px-4 py-2 rounded-md active:bg-blue-400"
          >
            Update
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditEmploye;
