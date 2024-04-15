export const Form = ({children, className}) => {
    return (
        <form className={`container bg-dark text-white py-3 rounded ${className}`}>
            {children}
        </form>
    )
}