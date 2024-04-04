import { Modal } from "flowbite-react";
import { Typography } from "@mui/material";

const ConstructorModal = ({ show, close, constructorData }) => {
  return (
    <Modal dismissible show={show} onClose={close}>
      {constructorData && (
        <div className="flex bg-taupe rounded-md">
          <div className="w-2/3">
            <Modal.Body>
              <div>
                <Typography variant="h2" component="h2">
                  {constructorData.name}
                </Typography>

                <Typography variant="p" component="p">
                  Nationality: {constructorData.nationality}
                </Typography>

                <Typography variant="p" component="p">
                  <a href={constructorData.url} target="_blank" rel="noreferrer">Wikipedia</a>
                </Typography>

                <img src={`https://placehold.co/300x200`} alt="Constructor" className="my-2" />
              </div>
            </Modal.Body>
          </div>

          <div className="w-1/3 p-4">
            <button 
              className="my-2 py-2 px-8 min-w-full bg-slate-200 hover:bg-coyote text-eggplant font-bold rounded" 
              onClick={close}
            >
              Close
            </button>
            <button 
              className="my-2 py-2 px-8 min-w-full bg-slate-200 hover:bg-coyote text-eggplant font-bold rounded" 
              onClick={close}
            >
              Add to Favorites
            </button>
          </div>
        </div>
      )}
  </Modal>
  )
}

export default ConstructorModal;