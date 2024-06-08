import { gql, useQuery } from '@apollo/client';
import Dishes from "./dishes"
import { useContext, useState } from 'react';


import AppContext from "./context"
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Container,
  Row,
  Col
} from "reactstrap";

function RestaurantList(props) {
  const [restaurantID, setRestaurantID] = useState(0)
  const { cart } = useContext(AppContext);
  const [state, setState] = useState(cart)
  const GET_RESTAURANTS = gql`
    query {
      restaurants {
        id
        name
        description
        image {
          url
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_RESTAURANTS)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;
  console.log(`Query Data: ${data.restaurants}`)

  const BE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";


  let searchQuery = data.restaurants.filter((res) => {
    console.log(res);
    return res.name.toLowerCase().includes(props.search.toLowerCase())
  })

  // Define renderer for Dishes
  const renderDishes = () => {
    if (restaurantID) {
      return <Dishes restId={restaurantID} />;
    }
    return null;
  };

  if (searchQuery.length > 0) {
    const restList = searchQuery.map((res) => (
      <Col xs="6" sm="4" key={res.id}>
        <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
          {res.image && res.image.url ? (
            <CardImg
              top={true}
              style={{ height: 200 }}
              src={`${BE_URL}${res.image.url}`}
            />
          ) : (
            <div style={{ height: 200, backgroundColor: '#eaeaea' }}></div>
          )}
          <CardBody>
            <CardTitle><b>{res.name}</b></CardTitle>
            <CardText>{res.description}</CardText>
          </CardBody>
          <div className="card-footer">
            <Button color="info" onClick={() => setRestaurantID(res.id)}>View Dishes</Button>
          </div>
        </Card>
      </Col>
    ))

    return (

      <Container>
        <Row xs='3'>
          {restList}
        </Row>

        <Row xs='3'>
          {renderDishes(restaurantID)}
        </Row>

      </Container>

    )
  } else {
    return <h1> No Restaurants Found</h1>
  }
}
export default RestaurantList