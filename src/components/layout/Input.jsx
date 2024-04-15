export const Input = ({id, type, value, onChange, label, className, inputStyle, ...props}) => {
    return (
        <div className={className? className : "mb-3"} >
            <label htmlFor={id} className="form-label">
                {label}
            </label>
            <input
            type={type}
            className="form-control"
            style={inputStyle}
            id={id}
            value={value ? value : ""}
            onChange={(e) => onChange(e.target.value)}
            {...props}
            />
      </div>
    )
}