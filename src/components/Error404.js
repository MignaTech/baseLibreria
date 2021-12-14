import imagen from "./imagenes/libreria1.jpeg";

const Error404 = () => {
  return (
    <div>
      <center>
        <img style={{ width: "400px" }} src={imagen} alt="" />
        <h1>Página no encontrada</h1>
        <p>No se pudo encontrar la página que está buscando.</p>
      </center>
    </div>
  );
};

export default Error404;
