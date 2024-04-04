import { Modal } from "flowbite-react";

const ConstructorModal = ({ show, close, constructorData }) => {
  return (
    <Modal dismissible show={show} onClose={close}>
      {constructorData && (
        <Modal.Body>
          <div>
            <h2>{constructorData.name}</h2>
            <p>Nationality: {constructorData.nationality}</p>
          </div>
        </Modal.Body>
      )}
    </Modal>
  )
}

export default ConstructorModal;