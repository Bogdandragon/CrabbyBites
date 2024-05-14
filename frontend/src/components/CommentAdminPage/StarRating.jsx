import React from 'react';
import { Flex, Icon } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa"; // Using FontAwesome for star icons

// A component that displays stars based on a rating
function StarRating({ rating, totalStars = 5 }) {
  const stars = [];

  for (let i = 1; i <= totalStars; i++) {
    // If the current index is less than or equal to the rating, make it gold; otherwise, grey.
    const color = i <= rating ? "gold" : "gray.300";
    stars.push(<Icon as={FaStar} key={i} color={color} />);
  }

  return (<Flex>{stars}</Flex>);
}

export default StarRating;