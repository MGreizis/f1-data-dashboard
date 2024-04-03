import { Button, Modal } from "flowbite-react";
import { useState } from "react";

export const DriverModal = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Toggle modal</Button>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Body>
        {/* Placeholder text */}
          Adipisicing nostrud adipisicing minim exercitation fugiat in irure anim tempor exercitation commodo. Enim irure adipisicing velit et. Sint nulla veniam reprehenderit et ea irure cupidatat esse cillum. Mollit consectetur minim velit id occaecat. Eiusmod nostrud ut dolor mollit dolore nisi ex anim sit cupidatat non veniam sunt. Nisi ipsum eu ex qui eiusmod est. Tempor elit aute esse proident.
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>I accept</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default DriverModal;