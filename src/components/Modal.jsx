import { XCircleIcon } from '@heroicons/react/24/outline';

const Modal = ({ title = 'title', children, onOpen, open }) => {
  if (!open) return null;

  return (
    <div>
      <div onClick={() => onOpen(false)} className="backdrop"></div>
      <div className="modal">
        <div className="modal__header">
          <h2 className="title">{title}</h2>
          <button onClick={() => onOpen(false)}>
            <XCircleIcon className="icon close" />
          </button>
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
