// src/components/LuckyDrawPrizes.jsx
import React, { useState } from "react";
import "./LuckyDrawPrizes.css";
import { FaPlus, FaEdit, FaTimes, FaTrophy } from "react-icons/fa";

const LuckyDrawPrizes = ({ onClose }) => {
  const [prizes, setPrizes] = useState([
    {
      id: 17,
      luckyDrawId: 5,
      type: "cash",
      value: 6655.5,
      winnerId: "-",
      winnerName: "-",
      winnerPhone: "-",
      winningPosition: 1,
      winnerTicket: "-",
      status: "Feature",
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newPrize, setNewPrize] = useState({
    type: "cash",
    value: "",
    winningPosition: "",
    status: "Feature",
  });

  const handleAddPrize = (e) => {
    e.preventDefault();
    const prize = {
      id: prizes.length + 1,
      luckyDrawId: 5,
      type: newPrize.type,
      value: parseFloat(newPrize.value),
      winnerId: "-",
      winnerName: "-",
      winnerPhone: "-",
      winningPosition: parseInt(newPrize.winningPosition),
      winnerTicket: "-",
      status: newPrize.status,
    };

    setPrizes([...prizes, prize]);
    setShowAddForm(false);
    setNewPrize({
      type: "cash",
      value: "",
      winningPosition: "",
      status: "Feature",
    });
  };

  const handleDeletePrize = (id) => {
    setPrizes(prizes.filter((prize) => prize.id !== id));
  };

  return (
    <div className="prizes-overlay">
      <div className="prizes-modal">
        {/* Header */}
        <div className="prizes-header">
          <h2>
            <FaTrophy className="trophy-icon" />
            Lucky Draw Prizes
          </h2>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {/* Table */}
        <div className="prizes-table-container">
          <table className="prizes-table">
            <thead>
              <tr>
                <th>Prize ID</th>
                <th>Lucky Draw ID</th>
                <th>Type</th>
                <th>Value</th>
                <th>Winner ID</th>
                <th>Winner Name</th>
                <th>Winner Phone</th>
                <th>Position</th>
                <th>Ticket</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {prizes.map((prize) => (
                <tr key={prize.id}>
                  <td>{prize.id}</td>
                  <td>{prize.luckyDrawId}</td>
                  <td>
                    <span className={`type-badge ${prize.type}`}>
                      {prize.type}
                    </span>
                  </td>
                  <td>
                    {prize.type === "cash" ? "₹" : ""}
                    {prize.value.toLocaleString()}
                  </td>
                  <td>{prize.winnerId}</td>
                  <td>{prize.winnerName}</td>
                  <td>{prize.winnerPhone}</td>
                  <td>
                    <span className="position-badge">
                      {prize.winningPosition}
                    </span>
                  </td>
                  <td>{prize.winnerTicket}</td>
                  <td>
                    <span className="status-feature">{prize.status}</span>
                  </td>
                  <td>
                    <div className="prize-actions">
                      <button className="icon-btn edit-prize">
                        <FaEdit />
                      </button>
                      <button
                        className="icon-btn delete-prize"
                        onClick={() => handleDeletePrize(prize.id)}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Prize Button */}
        <div className="add-prize-section">
          <button
            className="add-prize-btn"
            onClick={() => setShowAddForm(true)}
          >
            <FaPlus /> Add Prize
          </button>
        </div>

        {/* Add Prize Form Modal */}
        {showAddForm && (
          <div className="prize-form-overlay">
            <div className="prize-form-modal">
              <h3>Add New Prize</h3>
              <form onSubmit={handleAddPrize}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Type:</label>
                    <select
                      value={newPrize.type}
                      onChange={(e) =>
                        setNewPrize({ ...newPrize, type: e.target.value })
                      }
                    >
                      <option value="cash">Cash</option>
                      <option value="product">Product</option>
                      <option value="voucher">Voucher</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Value:</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Enter value"
                      value={newPrize.value}
                      onChange={(e) =>
                        setNewPrize({ ...newPrize, value: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Winning Position:</label>
                    <input
                      type="number"
                      placeholder="Position number"
                      value={newPrize.winningPosition}
                      onChange={(e) =>
                        setNewPrize({
                          ...newPrize,
                          winningPosition: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Status:</label>
                    <select
                      value={newPrize.status}
                      onChange={(e) =>
                        setNewPrize({ ...newPrize, status: e.target.value })
                      }
                    >
                      <option value="Feature">Feature</option>
                      <option value="Active">Active</option>
                      <option value="Awarded">Awarded</option>
                    </select>
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    Add Prize
                  </button>
                </div>
              </form>

              {/* Close Button inside form modal */}
              <button className="close-btn" onClick={() => setShowAddForm(false)}>
                <FaTimes />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LuckyDrawPrizes;
