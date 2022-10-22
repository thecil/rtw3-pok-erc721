import { Container, Row, Col, Image } from "react-bootstrap";
import { SocialMedia } from "../social/SocialMedia";
import { MintConnectBtn } from "../mint/MintConnectBtn";
export default function MintContainer({ children }) {
  return (
    <div className="m-8 container absolute">
      <Container>
        <Row>
          <div className="flex justify-end pt-2">
            <MintConnectBtn />
          </div>
        </Row>
        <Row className="flex pt-8 justify-center">
          {/* LEFT SIDE */}
          <Col md={6} className="grid space-y-2">
            <Image
              src="/img/logo/alchemy-logo-blue-gradient.png"
              className="w-48 self-center"
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
