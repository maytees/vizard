import React from 'react';
import {Flex, Spinner, useColorModeValue} from "@chakra-ui/react";

const Loading = () => {
    return (
        <Flex height="80vh" width="100vw" justifyContent="center" pb={12} alignItems="center">
            <Spinner
                color={useColorModeValue("blue.400", "red.400")}
                size="xl"
                speed="1s"
                thickness="5px"
                emptyColor={useColorModeValue("red.400", "blue.400")}
            />
        </Flex>
    );
};

export default Loading;
