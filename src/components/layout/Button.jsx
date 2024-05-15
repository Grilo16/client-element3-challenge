export const Button = ({children, ...props}) => {
    return (
        <button className="btn btn-primary" {...props}>
            {children}
        </button>
    )
};