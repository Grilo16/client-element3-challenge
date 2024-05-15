export const Form = ({children, className, ...props}) => {
    return (
        <form className={`container bg-dark text-white py-3 rounded ${className}`} {...props}>
            {children}
        </form>
    )
}