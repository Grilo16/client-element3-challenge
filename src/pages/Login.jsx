import { LoginForm } from "../components"

export const Login = () => {
  
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
            </section>
        </main>
    )
}