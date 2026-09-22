import Form from 'react-bootstrap/Form';

// Tách riêng id, label, helpText, các thuộc tính còn lại (type, placeholder, required,...) được gom vào inputProps
const InputField = ({ id, label, helpText, ...inputProps }) => {
  return (
    <Form.Group className="mb-3" controlId={id}>
      {label && (
        <Form.Label>
          {label}
          {/* Hiện dấu * đỏ nếu có thuộc tính required */}
          {inputProps.required && <span className="text-danger"> *</span>}
        </Form.Label>
      )}
      <Form.Control {...inputProps} />
      {helpText && <Form.Text className="text-muted">{helpText}</Form.Text>}
    </Form.Group>
  );
};

export default InputField;