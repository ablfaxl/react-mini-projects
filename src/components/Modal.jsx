const Modal = ({ title = 'title' }) => {
  return (
    <div>
      <div className="backdrop"></div>
      <div className="modal">
        <div className="modal__header">
          <h2 className="title">{title}</h2>
        </div>
      </div>
    </div>
  );
};

export default Modal;
