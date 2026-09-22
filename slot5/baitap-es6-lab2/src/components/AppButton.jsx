import Button from 'react-bootstrap/Button';

// Gom các props còn lại (onClick, disabled, size, type, className,...) vào biến rest
const AppButton = ({ variant = 'primary', children, ...rest }) => {
  return (
    <Button variant={variant} {...rest}>
      {children}
    </Button>
  );
};

export default AppButton;