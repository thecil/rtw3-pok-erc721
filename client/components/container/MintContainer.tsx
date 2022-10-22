import { Container, Row, Col, Image } from "react-bootstrap";
import { SocialMedia } from "../social/SocialMedia";
import { MintConnectBtn } from "../mint/MintConnectBtn";
export default function MintContainer({ children }) {

  return (
    <div>
      <Row>
        <div className="flex justify-end pt-2 pr-2">
          <MintConnectBtn />
        </div>
      </Row>
      <Container>
        <Row className="flex pt-5">
          {/* LEFT SIDE */}
          <Col md={6} className="text-center">
            <Image
              src="/img/logo/alchemy-logo-blue-gradient.png"
              className="w-48 m-4"
              alt="Alchemy Logo"
            />
            <video autoPlay loop muted className="w-72 m-4 rounded">
              <source src="/video/au_video.mp4" />
            </video>
            <SocialMedia />
          </Col>
          {/* RIGHT SIDE */}
          <Col md={6} className="px-24 py-5 text-left">
            <>{children}</>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
