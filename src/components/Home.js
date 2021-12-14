import {
  Container,
  Card,
  CardImg,
} from "reactstrap";
import fondo from './imagenes/fondo.png';

const Home = () => {
  return (
    <Container className="px-0 py-0">
      <center>
        <Card className="px-0 py-0">
          <CardImg
            className="principal"
            src={fondo}
            top
          />
        </Card>
      </center>
    </Container>
  );
};

export default Home;
