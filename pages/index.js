import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Cart from "../components/cart"
import {ApolloProvider,ApolloClient,HttpLink, InMemoryCache} from '@apollo/client';
import RestaurantList from '../components/restaurantList';
import { InputGroup, InputGroupAddon,Input} from "reactstrap";
import AppContext from "../components/context";
import Cookies from "js-cookie";


function Home() {
    const router = useRouter();
    const appContext = useContext(AppContext);

    const token = Cookies.get('token');
  
    useEffect(() => {
      if(!token) {
        router.push('/login');
      }
    }, [token])

    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
    const [query, setQuery] = useState("");
    const link = new HttpLink({ uri: `${API_URL}/graphql`})
    const cache = new InMemoryCache()
    const client = new ApolloClient({link,cache});
    
  
    return (
        <ApolloProvider client={client}>
          <div className="search">
              <h2> Local Restaurants</h2>
                <InputGroup >
                <InputGroupAddon addonType="append"> Search </InputGroupAddon>
                <Input
                    onChange={(e) =>
                    setQuery(e.target.value.toLocaleLowerCase())
                    }
                    value={query}
                />
                </InputGroup><br></br>
            </div>
            <RestaurantList search={query} />
            <Cart isCheckoutPage={false} />
        </ApolloProvider>
    );
  }
  export default Home;
  