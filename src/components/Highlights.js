import { Row, Col, Card } from "react-bootstrap";
import "./css/Highlights.css";
export default function Highlights() {
  return (
    <>
      <div className="highlights container-fluid ">
        <div className="container">
          <div className="row justify-content-center">
            <div>
              <h1 className="fs-1">
                <i className="fa fa-mobile m-1"></i>moPhie Offers
              </h1>
              <hr />
            </div>
            <Row className="mt-3 mb-3">
              <Col xs={12} md={4}>
                <Card className="cardHighlight text-white p-3">
                  <Card.Body>
                    <Card.Title>
                      <h2 className="text-white">
                        Shop From Home with Mophie!
                      </h2>
                    </Card.Title>
                    <p>🏡 Stay Safe, Shop Smart</p>
                    <Card.Text className="text-white">
                      🛍️ Discover a world of convenience right from your
                      doorstep. Mophie brings the shopping experience to your
                      home, ensuring safety without compromising style. 🌟
                    </Card.Text>
                    <Card.Text className="text-white">
                      ✨ Why Shop From Home? Comfort: Shop in your pajamas from
                      the comfort of your home. Safety: Avoid crowded spaces and
                      shop with peace of mind. Convenience: Browse through a
                      wide range of products at your fingertips.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={4}>
                <Card className="cardHighlight text-white p-3">
                  <Card.Body>
                    <Card.Title>
                      <h2 className="text-white">
                        Buy Now, Pay Later with Mophie!
                      </h2>
                    </Card.Title>
                    <p className="text-white">
                      ⏰ Time to Shop, Pay on Your Terms 💳
                    </p>
                    <Card.Text className="text-white">
                      Ready to get what you want now? Mophie introduces our "Buy
                      Now, Pay Later" option, giving you the flexibility to shop
                      today and pay over time. 🌟
                    </Card.Text>
                    <Card.Text className="text-white">
                      ✨ Why Choose Buy Now, Pay Later? Instant Gratification:
                      Get your favorite items right away. No Upfront Payment:
                      Shop without the pressure of immediate payment. Flexible
                      Payment Plans: Pay in installments that suit your budget.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={4}>
                <Card className="cardHighlight text-white p-3">
                  <Card.Body>
                    <Card.Title>
                      <h2 className="text-white">
                        🌟 Be Our VIP Customer at Mophie!
                      </h2>
                    </Card.Title>
                    <p className="text-white">
                      ✨ Elevate Your Shopping Experience ✨
                    </p>
                    <Card.Text className="text-white">
                      Become a VIP at Mophie and unlock a world of exclusive
                      benefits, personalized offers, and priority access to the
                      latest trends! 🛍️
                    </Card.Text>
                    <Card.Text className="text-white">
                      👑 Why Be a VIP at Mophie? Exclusive Discounts: Enjoy
                      special discounts reserved for our VIPs. Early Access: Be
                      the first to explore new arrivals and limited editions.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}
