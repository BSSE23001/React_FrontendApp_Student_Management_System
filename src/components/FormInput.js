function FormInput({ label, type = 'text', name, value, onChange, error, ...props }) {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">{label}</label>
      <input
        type={type}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        {...props}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

export default FormInput;