import React from 'react';
import Modal from 'react-modal';

const BookingDetailsModal = (
  { isOpen, closeModal, cinema, movie, selectedSeats, schedule, showDate, price }
) => {

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
      contentLabel="Booking Details Modal"
      className="modal-dialog modal-dialog-centered mt-5"
    >
      <div className="modal-content">
        <div className="modal-header bg-info text-white">
          <h4 className="modal-title">Booking Summary</h4>
          <button type="button" className="close" onClick={closeModal}>
            <span>&#x2716;</span>
          </button>
        </div>
        <div className="modal-body">
          <table className="table table-bordered table-striped">
            <tbody>
              <tr>
                <th>Cinema</th>
                <td>{cinema.name}</td>
              </tr>

              <tr>
                <th>Movie</th>
                <td>{movie.title}</td>
              </tr>

              <tr>
                <th>Tickets</th>
                <td>{selectedSeats.length}</td>
              </tr>

              <tr>
                <th>Seats</th>
                <td>{selectedSeats.join(', ')}</td>
              </tr>

              <tr>
                <th>Ticket Price</th>
                <td>{price}</td>
              </tr>

              <tr>
                <th>Total</th>
                <td>{selectedSeats.length * price}</td>
              </tr>
            </tbody>
          </table>

          <div className="card-footer border">
            <div className="row">
              <div className="col-7">
                <p className='font-weight-bold m-0'>Date:
                  <span className='font-weight-normal'> {showDate}</span>
                </p>
              </div>
              <div className="col-5">
                <p className='font-weight-bold m-0'>
                  Time:
                  <span className='font-weight-normal'> {schedule}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            type='button'
            className="btn btn-danger"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default BookingDetailsModal;
