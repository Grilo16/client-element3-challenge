import { EditUserForm } from "../formCards";
import { ModalComponent } from "../layout";
import { useMyAccount } from "../../hooks";

export const UserDetails = () => {
  const { myAccount, handleLogout, handleDeleteMyAccount } = useMyAccount();

  const [Modal, OpenModalButton] = ModalComponent({
    id: "edit-user-modal",
    label: "edit-user-modal-label",
    headerTitle: "Edit my details",
  });

  const [ModalAlert, OpenModalAlertButton] = ModalComponent({
    id: "delete-user-modal",
    label: "delete-user-modal-label",
    headerTitle: "You are about to delete your account",
  });

  return (
    <div className="container-fluid py-3">
      <div className="card text-center h-100">
        <div className="card-body d-grid mt-5">
          <img
            src="https://picsum.photos/200"
            className="rounded-circle mx-auto d-block mb-5"
            alt="user profile picture"
          />

          <h3 className="card-title">
            {myAccount?.firstName} {myAccount?.lastName}
          </h3>
          <h4 className="card-subtitle text-muted">{myAccount?.email}</h4>
          <h5 className="card-subtitle text-muted">
            Date of birth: {myAccount?.dateOfBirth}
          </h5>
        </div>

        <div className="row justify-content-center card-footer py-4">
          <div className="col text-center">
            <OpenModalButton className="btn btn-primary w-75">
              {" "}
              Edit my details
            </OpenModalButton>
          </div>
          <div className="col text-center">
            <button
              onClick={handleLogout}
              className="btn btn-primary w-75 h-100"
            >
              {" "}
              Logout{" "}
            </button>
          </div>
          <div className="col text-center">
            <OpenModalAlertButton
              className="btn btn-danger w-75"
              onClick={() => setToggleAlert(true)}
            >
              Delete account
            </OpenModalAlertButton>
          </div>
        </div>
      </div>

      <Modal>
        <EditUserForm />
      </Modal>

      <ModalAlert>
        <div className="row">
          <h2>
            Are you sure you want to <strong>delete</strong> your account?
          </h2>
          <h4> This action cannot be reversed.</h4>
        </div>
        <div className="row row-cols-2 ">
          <div className="col text-center">
            <button
              onClick={handleDeleteMyAccount}
              className="btn btn-danger w-100"
              data-bs-dismiss="modal"
            >
              Yes! Delete my account
            </button>
          </div>
          <div className="col text-center">
            <button
              className="btn btn-primary w-100"
              data-bs-toggle="modal"
              data-bs-target={`#delete-user-modal`}
            >
              Cancel
            </button>
          </div>
        </div>
      </ModalAlert>
    </div>
  );
};
