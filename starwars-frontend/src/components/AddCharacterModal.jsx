import { useState } from "react";

function AddCharacterModal({ show, onClose, onCharacterAdded }) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://redesigned-goldfish-x9wj5v997p7h9vw9-8000.app.github.dev/people", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        gender,
        birth_year: birthYear,
        description
      })
    })
      .then(async (res) => {
        if (res.ok) {
          console.log("✅ Character successfully added!");

          // Resetear campos del formulario
          setName("");
          setGender("");
          setBirthYear("");
          setDescription("");

          // Refrescar lista en el componente padre
          onCharacterAdded();

          // Cerrar el modal
          onClose();
        } else {
          const errText = await res.text();
          console.warn("⚠️ Error response:", errText);
          console.error("❌ Failed to create character. Status:", res.status);
        }
      })
      .catch((err) => {
        console.error("❌ Network error:", err);
      });
  };

  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content bg-dark text-white">
          <div className="modal-header">
            <h5 className="modal-title">Add New Character</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Gender</label>
                <input className="form-control" value={gender} onChange={(e) => setGender(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label">Birth Year</label>
                <input className="form-control" value={birthYear} onChange={(e) => setBirthYear(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control" rows="3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-warning">Add Character</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCharacterModal;
