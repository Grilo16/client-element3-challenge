export const Row = ({children, rowCols}) => {
    
    return (
        <div className={`row ${rowCols}`}>
            {children}
        </div>
    )
};