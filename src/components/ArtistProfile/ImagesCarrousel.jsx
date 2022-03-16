
import { Carousel } from "react-bootstrap";

export default function ImagesCarrousel({ artist }) {
  const { images } = artist;
  

  return (

    <Carousel width={100}>
    {images.map(item => (
    <Carousel.Item >
      <img
        className="d-block w-100"
        src={item}
        alt={item}
      />
      <Carousel.Caption>
        <h3>{item.captionTitle}</h3>
        <p>{item.caption}</p>
      </Carousel.Caption>
    </Carousel.Item>
    ))}
  </Carousel>
    

  );
}
