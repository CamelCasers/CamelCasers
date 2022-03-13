import { Carousel } from "react-bootstrap";

export default function ImagesCarrousel({ artist }) {
  const { images } = artist;

  return (
    <Carousel>
      <Carousel.Item>
        {artist.images.map((img) => (
          <img src={img} alt="pic" width={300} />
        ))}

        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
