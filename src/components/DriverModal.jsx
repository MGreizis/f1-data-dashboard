import { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";
import { Button, Modal } from "flowbite-react";

const DriverModal = ({ driver }) => {
  const [driverDetails, setDriverDetails] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
  const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

  useEffect(() => {
    const fetchDriverDetails = async () => {
      if (supabaseUrl && supabaseAnonKey) {
        const supabase = createClient(supabaseUrl, supabaseAnonKey);
        try {
          const { data, error } = await supabase
            .from('drivers')
            .select('forename, surname, dob, nationality, url')
            .eq('driverRef', driver.driverRef)
            .single();

          if (error) {
            console.error('Error fetching driver details:', error.message);
          } else {
            setDriverDetails(data);
          }
        } catch (error) {
          console.error('Error fetching driver details:', error.message);
        }
      }
    };

    fetchDriverDetails();
  }, [driver.driverRef, supabaseUrl, supabaseAnonKey]);

  return (
    <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>
        <Modal.Title>Driver Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {driverDetails ? (
          <>
            <p>Forename: {driverDetails.forename}</p>
            <p>Surname: {driverDetails.surname}</p>
            <p>Date of Birth: {driverDetails.dob}</p>
            <p>Nationality: {driverDetails.nationality}</p>
            <p>URL: {driverDetails.url}</p>
            <Button onClick={() => setOpenModal(false)}>Add to Favorites</Button>
            <img src={`https://placehold.co/200x200`} alt="Driver" />
          </>
        ) : (
          <p>Loading driver details...</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default DriverModal;
