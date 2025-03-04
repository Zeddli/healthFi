import * as React from 'react';
import { Container, Carousel } from 'react-bootstrap';

function HomePage() {
  return (
    <Container className="mt-4">
      <h1 className="mb-4">Decentralized Healthcare Platform</h1>
      <Carousel>
        <Carousel.Item>
          <div style={{ height: '300px', backgroundColor: '#ccc' }}>
            {/* Replace with your own <img> or background image */}
            <h2 className="text-center pt-5">Image 1</h2>
          </div>
          <Carousel.Caption>
            <h3>Secure & Private</h3>
            <p>Consent-based data sharing with full encryption.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div style={{ height: '300px', backgroundColor: '#aaa' }}>
            <h2 className="text-center pt-5">Image 2</h2>
          </div>
          <Carousel.Caption>
            <h3>Self-Sovereign Identity</h3>
            <p>Manage your identity on-chain, under your control.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div style={{ height: '300px', backgroundColor: '#777' }}>
            <h2 className="text-center pt-5">Image 3</h2>
          </div>
          <Carousel.Caption>
            <h3>Healthcare Records</h3>
            <p>Encrypted and stored off-chain, accessible only to authorized providers.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}

export default HomePage;
