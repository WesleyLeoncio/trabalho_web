//falta implementar a exibição de estados de validação, como nos outros campos,
//trocando a cor da borda e adicionando o ícone check ou exclamação

const FormOptions = ({ field, label, options, onChange, value, error }) => {
    return (
        <>
            <fieldset className="border mt-3 p-2 pt-3 rounded position-relative is-invalid">
                <span className="position-absolute bg-white px-1 w-auto" style={{ top: "-12px" }}>
                    {label}
                </span>
                {options.map((option, index) => (
                    <div className="form-check" key={`${field}-${index}`}>
                        <input className="form-check-input" type="radio" name={field} id={`${field}-${index}`} value={option.value} onChange={onChange} checked={value === option.value} />
                        <label className="form-check-label" htmlFor={`${field}-${index}`}>
                            {option.label}
                        </label>
                    </div>
                ))}
            </fieldset>
            {error && <p className="m-0 small text-danger">{error}</p>}
        </>
    );
};

export default FormOptions;
