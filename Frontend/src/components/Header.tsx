import { Alert, Col, Container, Image, Row } from 'react-bootstrap'

const Header = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Image src="clearPointLogo.png" fluid rounded />
        </Col>
      </Row>
      <Row>
        <Col>
          <Alert variant="success">
            <Alert.Heading>Todo List App</Alert.Heading>
            Welcome to the ClearPoint frontend technical test. We like to keep things simple, yet clean so your task(s)
            are as follows:
            <br />
            <br />
            <ol className="list-left">
              <li>Add the ability to add (POST) a Todo Item by calling the backend API</li>
              <li>Display (GET) all the current Todo Items in the below grid and display them in any order you wish</li>
              <li>
                Bonus points for completing the 'Mark as completed' button code for allowing users to update and mark a
                specific Todo Item as completed and for displaying any relevant validation errors/ messages from the API
                in the UI
              </li>
              <li>Feel free to add unit tests and refactor the component(s) as best you see fit</li>
            </ol>
          </Alert>
        </Col>
      </Row>
    </Container>
  )
}

export default Header
