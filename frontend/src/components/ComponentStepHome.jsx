import { useNavigate } from "react-router-dom";
import mapSvg from "../assets/MapPin.svg"

const style = { backgroundColor: "rgb(30,58,138,0.6"}

function ComponentStepHome() {
  const navigate = useNavigate();

  const handleSelect = (operation) => {
    if (operation === "acquista") {
      navigate("/cerca"); 
    } else if (operation === "vendi") {
      navigate("/valuta"); 
    }
  };

  return (
    <div className="configurator" style={style}>
      <h3 className="section-title">Cosa stai cercando?</h3>
      <p className="section-subtitle">Seleziona il tipo di operazione</p>

      <div className="card-container">
        <div className="card"  onClick={() => handleSelect("acquista")}>
          <div className="icon"><img src={mapSvg} alt="" /></div>
          <h4>Acquista</h4>
          <p>Trova la casa dei tuoi sogni</p>
        </div>
        
        <div className="card" onClick={() => handleSelect("vendi")}>
          <div className="icon"><img src={mapSvg} alt="" /></div>
          <h4>Vendi</h4>
          <p>Vendi il tuo immobile</p>
        </div>
      </div>
    </div>
  );
};

export default ComponentStepHome;
