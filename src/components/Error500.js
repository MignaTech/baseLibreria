import imagen from "./imagenes/libreria3.jpg";

const Error500 = () => {
  return (
    <div>
      <center>
        <img style={{ width: "400px"}} className="pt-3" src={imagen} alt="" />
        <h1>Error del servidor</h1>
        <p>
          Intente actualizar esta página o no dude en contactarnos si el
          problema persiste.
        </p>
        <p>
          <strong>
            Miguel Ángel Sixtega Escribano <em>Tel: 22-92-68-33-67</em>
          </strong>
        </p>
        <p>
          <strong>
            Eduardo Marquéz <em>Tel: 22-93-63-72-48</em>
          </strong>
        </p>
      </center>
    </div>
  );
};

export default Error500;
