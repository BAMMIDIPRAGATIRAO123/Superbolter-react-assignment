import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

function SimpleDialog(props) {
  const { onClose, selectedValue, open, selectedUser } = props;

  const data = selectedUser;

  // on close handler 
  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <>
      {/* ---------------------------------------- */}
      {/* User Details Dialog Box Section */}
      {/* ---------------------------------------- */}
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>USER DETAILS</DialogTitle>

        <img className="proimg" src={data?.picture?.large} />
        <h4>
          &ensp; Name:{" "}
          <i>
            &ensp; {data?.name?.title} {data?.name?.first} {data?.name?.last}
          </i>
        </h4>
        <h4>
          &ensp;  Email: <i> &ensp; {data?.email}</i>
        </h4>
        <h4>
          &ensp; Address:{" "}
          <i>
          &ensp; {data?.location?.street?.number}, {data?.location?.street?.name}, {data?.location?.city}, {data?.location?.state},{" "}
            {data?.location?.postcode}, {data?.location?.country} &ensp;
          </i>
        </h4>
        <h4>
        &ensp; DOB: <i>&ensp;{data?.dob?.date}</i>
        </h4>
        <h4>
        &ensp; Phone:{" "}
          <i>
          &ensp;{data?.phone} / {data?.cell}
          </i>
        </h4>
      </Dialog>
    </>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  selectedUser: PropTypes.object.isRequired,
};

function Userhome() {
  const [user, getUser] = useState("");
  const emails = ["username@gmail.com", "user02@gmail.com"];

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const [selectedUser, setSelectedUser] = useState({});

  // set open dialog handler
  const handleClickOpen = (data) => {
    setOpen(true);
    setSelectedUser(data);
  };

  // set close dialog handler
  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  useEffect(() => {
    getDetails();

    async function getDetails() {
      fetch("https://randomuser.me/api/?results=50")
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          getUser(data);
        });
    }
  }, []);

  return (
    <div>
      {/* ---------------------------------------- */}
      {/* User Details Section */}
      {/* ---------------------------------------- */}
      <div className="card-content">
        {/* ---------------------------------------- */}
        {/* display results from the API */}
        {/* ---------------------------------------- */}
        {user && (
          <div className="results">
            {/* ---------------------------------------- */}
            {/* loop over the results */}
            {/* ---------------------------------------- */}
            {user.results?.map((result, index) => (
              <div key={index} className="card">
                <img className="propic" src={result.picture.large} />
                <span className="info">
                  <h4>
                    Name: &nbsp;{" "}
                    <i>
                      {result.name.title} {result.name.first} {result.name.last}
                    </i>
                  </h4>
                  <h4>
                    Email: &nbsp; <i>{result.email}</i>
                  </h4>
                  <h4>
                    Address: &nbsp;{" "}
                    <i>
                      {result.location.city}, {result.location.state}
                    </i>
                  </h4>
                  <hr></hr>
                  <p>For more details click here ...</p>
                  <Button
                    variant="outlined"
                    onClick={() => handleClickOpen(result)}
                  >
                    Show more
                  </Button>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <SimpleDialog
        selectedValue={selectedValue}
        selectedUser={selectedUser}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}

export default Userhome;
