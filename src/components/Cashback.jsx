import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Cashback({ onSave, onClose }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    ticketPrice: '0.00',
    startDate: '',
    endDate: '',
    totalTickets: '',
    announcementDate: ''
  });

  const billRanges = {
    T1: { min: '100', max: '2500' },
    T2: { min: '2500', max: '5000' },
    T3: { min: '5000', max: '7500' },
    T4: { min: '7500', max: '10000' }
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    let ticketPrice = '0.00';
    
    if (category === 'T1') ticketPrice = '15.00';
    else if (category === 'T2') ticketPrice = '25.00';
    else if (category === 'T3') ticketPrice = '35.00';
    else if (category === 'T4') ticketPrice = '45.00';
    
    setFormData({
      ...formData,
      category,
      ticketPrice
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  const handleSave = () => {
    if (!formData.category || !formData.title || !formData.description || 
        !formData.totalTickets || !formData.startDate || !formData.endDate) {
      alert('Please fill all required fields!');
      return;
    }

    const cashbackData = {
      category: formData.category,
      title: formData.title,
      description: formData.description,
      ticketPrice: `₹${formData.ticketPrice}`,
      totalTickets: parseInt(formData.totalTickets),
      startDate: formData.startDate,
      endDate: formData.endDate,
      announcementDate: formData.announcementDate,
      billRange: billRanges[formData.category]
    };

    if (onSave) {
      onSave(cashbackData);
    } else {
      console.log('Form data saved:', cashbackData);
      navigate(-1);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        width: '90%',
        maxWidth: '650px',
        padding: '30px',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '20px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#666',
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ×
        </button>

        {/* Header */}
        <h1 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          margin: '0 0 15px 0',
          color: '#bf1f2f',
          paddingRight: '40px'
        }}>
          Add Cashback
        </h1>

        {/* Divider after heading */}
        <hr style={{ 
          border: 'none', 
          borderTop: '1px solid #e0e0e0', 
          margin: '0 0 25px 0' 
        }} />

        {/* Category and Title - Side by Side */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '25px',
          marginBottom: '20px'
        }}>
          {/* Category */}
          <div>
            <div style={{ 
              display: 'block', 
              marginBottom: '8px',
              color: '#000',
              fontSize: '14px'
            }}>
              Category *
            </div>
            <select 
              value={formData.category}
              onChange={handleCategoryChange}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ccc',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
            >
              <option value="">Select Category</option>
              <option value="T1">T1</option>
              <option value="T2">T2</option>
              <option value="T3">T3</option>
              <option value="T4">T4</option>
            </select>
          </div>

          {/* Title */}
          <div>
            <div style={{ 
              display: 'block', 
              marginBottom: '8px',
              color: '#000',
              fontSize: '14px'
            }}>
              Title *
            </div>
            <input
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              name="title"
              placeholder="Enter cashback title"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ccc',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Description - Full Width */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ 
            display: 'block', 
            marginBottom: '8px',
            color: '#000',
            fontSize: '14px'
          }}>
            Description *
          </div>
          <textarea
            value={formData.description}
            onChange={handleInputChange}
            name="description"
            placeholder="Enter cashback description"
            rows="3"
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ccc',
              borderRadius: '6px',
              fontSize: '14px',
              resize: 'vertical',
              outline: 'none',
              fontFamily: 'Arial, sans-serif'
            }}
          />
        </div>

        {/* Ticket Price and Total Tickets - Side by Side */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '25px',
          marginBottom: '25px'
        }}>
          {/* Ticket Price */}
          <div>
            <div style={{ 
              display: 'block', 
              marginBottom: '8px',
              color: '#000',
              fontSize: '12px'
            }}>
              Ticket Price (₹) *
            </div>
            <input
              type="text"
              value={`₹${formData.ticketPrice}`}
              readOnly
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '6px',
                fontSize: '12px',
                backgroundColor: '#f8f9fa',
                outline: 'none'
              }}
            />
          </div>

          {/* Total Tickets */}
          <div>
            <div style={{ 
              display: 'block', 
              marginBottom: '8px',
              color: '#000',
              fontSize: '12px'
            }}>
              Total Tickets *
            </div>
            <input
              type="number"
              value={formData.totalTickets}
              onChange={handleInputChange}
              name="totalTickets"
              placeholder="Enter total tickets"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '6px',
                fontSize: '12px',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Start Date, End Date, Announcement Date - Three columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '25px',
          marginBottom: '25px'
        }}>
          {/* Start Date */}
          <div>
            <div style={{ 
              display: 'block', 
              marginBottom: '8px',
              color: '#000',
              fontSize: '12px'
            }}>
              Start Date *
            </div>
            <input
              type="date"
              value={formData.startDate}
              onChange={handleInputChange}
              name="startDate"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '6px',
                fontSize: '12px',
                outline: 'none'
              }}
            />
          </div>

          {/* End Date */}
          <div>
            <div style={{ 
              display: 'block', 
              marginBottom: '8px',
              color: '#000',
              fontSize: '12px'
            }}>
              End Date *
            </div>
            <input
              type="date"
              value={formData.endDate}
              onChange={handleInputChange}
              name="endDate"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '6px',
                fontSize: '12px',
                outline: 'none'
              }}
            />
          </div>

          {/* Announcement Date */}
          <div>
            <div style={{ 
              display: 'block', 
              marginBottom: '8px',
              color: '#000',
              fontSize: '12px'
            }}>
              Announcement Date *
            </div>
            <input
              type="date"
              value={formData.announcementDate}
              onChange={handleInputChange}
              name="announcementDate"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '6px',
                fontSize: '12px',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Bill Range Section - Text Box Style */}
        {formData.category && (
          <div style={{
            marginBottom: '25px'
          }}>
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '15px',
              color: '#000'
            }}>
              Bill Range for {formData.category}
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '25px'
            }}>
              {/* Bill Range Min */}
              <div>
                <div style={{ 
                  display: 'block', 
                  marginBottom: '8px',
                  color: '#000',
                  fontSize: '12px'
                }}>
                  Min (₹) *
                </div>
                <input
                  type="text"
                  value={`₹${billRanges[formData.category]?.min}`}
                  readOnly
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '6px',
                    fontSize: '12px',
                    backgroundColor: '#f8f9fa',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Bill Range Max */}
              <div>
                <div style={{ 
                  display: 'block', 
                  marginBottom: '8px',
                  color: '#000',
                  fontSize: '12px'
                }}>
                  Max (₹) *
                </div>
                <input
                  type="text"
                  value={`₹${billRanges[formData.category]?.max}`}
                  readOnly
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '6px',
                    fontSize: '12px',
                    backgroundColor: '#f8f9fa',
                    outline: 'none'
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '15px',
          marginTop: '10px'
        }}>
          <button
            onClick={handleCancel}
            style={{
              padding: '10px 25px',
              border: '1px solid #ccc',
              borderRadius: '6px',
              backgroundColor: 'white',
              color: '#333',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '600'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              padding: '10px 25px',
              border: '1px solid #ffcc00',
              borderRadius: '6px',
              backgroundColor: '#ffcc00',
              color: '#000',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 'bold'
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cashback;