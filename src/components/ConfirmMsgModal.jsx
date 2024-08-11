import React from "react";
import tickIcon from "../assets/Tick Square.png";

const ConfirmMsgModal = ({ close, setConfirmation }) => {
  
  // Function to handle closing the modal and resetting the confirmation state
  function closeMsg() {
    close();           // Closes the modal
    setConfirmation(false);  // Resets the confirmation state
  }

  return (
    <div className="confirm_msg">
      {/* Success Icon */}
      <img src={tickIcon} alt="Success Icon" />
      
      {/* Success Message */}
      <p>New task has been created successfully</p>
      
      {/* Back Button to close the modal */}
      <button onClick={closeMsg}>Back</button>
    </div>
  );
};

export default ConfirmMsgModal;
