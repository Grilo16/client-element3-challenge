import { UploadFileForm, UserDetails, UserFiles } from "..";

export const UserDashboard = () => {
  return (
    <main className="container-fluid row bg-secondary p-5 g-0">
      <div className="row">
        <div className="col col-8">
          <UserFiles />
        </div>

        <div className="col col-4 d-grid">
          <UserDetails />
          <UploadFileForm />
        </div>
      </div>
    </main>
  );
};
