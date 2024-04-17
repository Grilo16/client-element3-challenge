import { LoginForm, ModalComponent, SignUpForm } from "../components"

export const Login = () => {
  

    const [Modal, Button] = ModalComponent({id:"create-account-modal", label :"create-account-modal-label", headerTitle: "Create new account"})

  return (
        <main className="container-fluid row bg-primary bg-gradient h-100 g-0">
            <section className="container m-auto col-md-6 p-4">
                <div className="row mb-5 px-5">
                    <div className="row mb-5">

                    <h1 className="text-white text-center">Welcome to Element3 dev challenge</h1>
                    </div>
                <div className="row mb-3">
                <h1 className="text-white text-center ">User log in</h1>
                </div>
                    <LoginForm/>
                </div>  
                <div className="col text-center">
                    <h4 className="mb-3">Or</h4>
                    <Button type="submit" className="btn btn-dark text-white w-75">
                        <strong>Create account</strong> 
                    </Button>
                </div>
                    <Modal>
                        <SignUpForm/>
                    </Modal>
            </section>
        </main>
    )
}