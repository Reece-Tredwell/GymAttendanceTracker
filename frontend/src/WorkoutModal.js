import React from 'react';
import './WorkoutModal.css';

const workoutTypes = [
  { value: 'arms', label: 'Arms', icon: '💪' },
  { value: 'chest', label: 'Chest', icon: '🏋️' },
  { value: 'back', label: 'Back', icon: '🔙' },
  { value: 'shoulders', label: 'Shoulders', icon: '🏋️‍♂️' },
  { value: 'legs', label: 'Legs', icon: '🦵' }
];

function WorkoutModal({ isOpen, onClose, onSave }) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const workoutType = e.target.workoutType.value;
    onSave(workoutType);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Select Workout Type</h2>
        <form onSubmit={handleSubmit}>
          <select name="workoutType" className="workout-select">
            <option value="">Select a workout type...</option>
            {workoutTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.icon} {type.label}
              </option>
            ))}
          </select>
          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="save-button">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WorkoutModal;
