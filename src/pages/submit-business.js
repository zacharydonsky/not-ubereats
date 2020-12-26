import React, { useState } from 'react';
import { graphql, Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import classnames from 'classnames';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from '../components/footer';

const SubmitBusinessPage = ({ data }) => {
  const [validated, setValidated] = useState(false);
  const [validImage, setValidImage] = useState(true);

  const fileOnChange = (event) => {
    const files = event.currentTarget.files;
    const hasImageFile = /(image\/(png|jpg|jpeg))/;

    // If there is (at least) one file selected
    if (files.length > 0) {
      if (files[0].size > 500 * 1024 || !hasImageFile.test(files[0].type)) {
        // Check the constraint
        event.currentTarget.setCustomValidity(
          'The selected file must not be larger than 500 kB and must be either jpg or png.'
        );
        setValidImage(false);
      }
      else {
        event.currentTarget.setCustomValidity('');
        setValidImage(true);

      }
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    console.log(form);
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <main>
      <Helmet>
        <html lang="en" />
        <title>Submit a Business</title>
        <meta name="description" content={data.site.siteMetadata.description}></meta>
      </Helmet>
      <div className="bg-light">
        <Link className={classnames('mt-2', 'ml-2', 'btn', 'btn-secondary')} to="/">
          Home
        </Link>
        <Container className="pt-4 pb-4">
          <Row>
            <Col>
              <h1 className="font-weight-light">Submit a Business</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form
                validated={validated}
                method="post"
                netlify-honeypot="bot-field"
                data-netlify="true"
                name="business"
                noValidate
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="bot-field" />
                <input type="hidden" name="form-name" value="business" />
                <Form.Group controlId="name">
                  <Form.Label>Restaurant Name</Form.Label>
                  <Form.Control type="text" placeholder="Name" name="name" required />
                  <Form.Control.Feedback type="invalid">Restaurant Name is required</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="description">
                  <Form.Label>Description - 250 character limit</Form.Label>
                  <Form.Control type="textarea" placeholder="Description" name="description" maxLength="250" required />
                  <Form.Control.Feedback type="invalid">Description is required</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="link">
                  <Form.Label>Link to website - (Please use https if possible)</Form.Label>
                  <Form.Control type="URL" placeholder="Link" name="link" required />
                  <Form.Control.Feedback type="invalid">Link is required. Please include https://</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="cuisine">
                  <Form.Label>Cuisine</Form.Label>
                  <Form.Control as="select" rows={3} name="cuisine" required>
                    <option>Breakfast</option>
                    <option>Canadian</option>
                    <option>Carribean</option>
                    <option>Chinese</option>
                    <option>BBQ</option>
                    <option>Desserts</option>
                    <option>Indian</option>
                    <option>Italian</option>
                    <option>Japanese</option>
                    <option>Lebanese</option>
                    <option>Korean</option>
                    <option>Mexican</option>
                    <option>Middle Eastern</option>
                    <option>Pizza</option>
                    <option>Sandwiches</option>
                    <option>Salad</option>
                    <option>Sushi</option>
                    <option>Thai</option>
                    <option>Vegan</option>
                    <option>Vietnamese</option>
                    <option>Wings</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.File
                    isInvalid={true}
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={fileOnChange}
                    id="image"
                    name="image"
                    label="Please upload an image"
                    required
                  />
                  <Form.Text className="text-muted">
                    Please include a high quality image to appear on the site. No logos or images with lots of text.
                  </Form.Text>
                  {!validImage && (
                    <div style={{ display: 'block' }} className="invalid-feedback">
                      Please include an image(jpg/png) 500 kB or less.
                    </div>
                  )}
                </Form.Group>
                <Form.Group controlId="agree">
                  <Form.Check
                    type="checkbox"
                    name="agree"
                    label="I confirm this restaurant offers it's own delivery service (ie. no UberEats, DoorDash, Skip the dishes etc.)"
                    required
                  />
                </Form.Group>
                <Button className="mt-2" variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </main>
  );
};
export default SubmitBusinessPage;

export const pageQuery = graphql`
  query BusinessQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
