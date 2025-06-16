import { useState } from "react";

function AddPlanetModal({ onPlanetCreated }) {
  const [formData, setFormData] = useState({
    name: "",
    population: "",
    terrain: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/planets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Planet added:", data);
        onPlanetCreated(); // refresca la lista
        setFormData({ name: "", population: "", terrain: "", description: "" });
        document.getElementById("closePlanetModal").click(); // cierra el modal
      } else {
        console.error("Error adding planet");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="modal fade" id="addPlanetModal" tabIndex="-1" aria-labelledby="addPlanetModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content bg-dark text-white">
          <div className="modal-header">
            <h5 className="modal-title" id="addPlanetModalLabel">Add Planet</h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" id="closePlanetModal"></button>
          </div>
          <div className="modal-body">
            <input name="name" value={formData.name} onChange={handleChange} className="form-control mb-2" placeholder="Name" />
            <input name="population" value={formData.population} onChange={handleChange} className="form-control mb-2" placeholder="Population" />
            <input name="terrain" value={formData.terrain} onChange={handleChange} className="form-control mb-2" placeholder="Terrain" />
            <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" placeholder="Description"></textarea>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPlanetModal;
