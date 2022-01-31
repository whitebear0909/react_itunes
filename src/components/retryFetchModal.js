import React from "react";

const RetryFetchModal = (props) => {
  const {error, handleFetchRetry} = props;

  return (
    <div className="p-modal" id="modal">
      <section className="p-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description">
        <header className="p-modal__header">
          <h2 className="p-modal__title" id="modal-title">Fetch Error</h2>
        </header>
        <p>{`${error}`}</p>
        <footer className="p-modal__footer">
        <div className="retry-button"><button className="p-button--negative is-dark" onClick={handleFetchRetry}>Retry</button></div>
        </footer>
      </section>
    </div>
  );
};

export default RetryFetchModal;