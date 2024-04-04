import { Modal } from "flowbite-react";

const DriverModal = ({ show, close, driverData }) => {
  return (
    <Modal dismissible show={show} onClose={close}>
      {driverData && (
        <Modal.Body>
          <div>
            <h2>{driverData.forename} {driverData.surname}</h2>
            <p>Date of birth: {driverData.dob}</p>
          </div>
        </Modal.Body>
      )}
    </Modal>
  )
}

export default DriverModal;