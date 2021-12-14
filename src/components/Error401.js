import imagen from "./imagenes/libreria1.jpeg";

const Error401 = () => {
  return (
    <div>
      <center>
        <img style={{ width: "400px" }} src={imagen} alt="" />
        <h1>Autorización Requerida</h1>
        <p>
          No tiene permiso para ver esta página con las credenciales que
          proporcionó
        </p>
      </center>
    </div>
  );
};

export default Error401;
