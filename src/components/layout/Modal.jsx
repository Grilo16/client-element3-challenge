
export const ModalComponent = ({id, label, headerTitle}) => {
    const Modal = ({children}) => {
        return (
            <div className="modal fade" id={id} tabIndex="-1" aria-labelledby={label} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-black" id={label}>{headerTitle}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                
                </div>
            </div>
        </div>
        )

    }

    const Button = ({className, children}) => {
        return (
            <button type="button" className={className ? className : "btn btn-primary"} data-bs-toggle="modal" data-bs-target={`#${id}`}>
            {children ? children : "Open"}
        </button>
        )
    }

        return [Modal, Button]
}
