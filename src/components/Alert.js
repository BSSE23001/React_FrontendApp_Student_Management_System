import { useEffect, useState } from 'react';
import { Alert as BootstrapAlert } from 'react-bootstrap';

function Alert({ message, variant = 'danger', onClose }) {
  const [show, setShow] = useState(!!message);

  useEffect(() => {
    setShow(!!message);
  }, [message]);

  if (!show) return null;

  return (
    <BootstrapAlert
      variant={variant}
      onClose={() => {
        setShow(false);
        onClose && onClose();
      }}
      dismissible
    >
      {message}
    </BootstrapAlert>
  );
}

export default Alert;