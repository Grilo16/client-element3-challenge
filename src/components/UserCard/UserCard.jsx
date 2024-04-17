
export const UserCard = ({firstName, lastName, email}) => {

    return (
        <div className="col col-2 mb-4 ">
            <div className="card h-100 bg-dark text-light text-center">
                <img src="https://picsum.photos/200" className="card-img-top m-auto mt-3 w-50 rounded-circle" alt="..."/>
                <div className="card-body ">
                    <h5 className="card-title">{firstName} {lastName}</h5>
                    <p className="card-text">{email}</p>
                </div>
            </div>
        </div>
    )
};
