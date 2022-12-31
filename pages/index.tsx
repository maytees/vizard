import Head from 'next/head'
import {useRouter} from 'next/router'
import Navbar from "../components/Navbar";
import {Box, Container, Flex, Heading, Stack, Text, Image, Button, Center, useColorModeValue} from "@chakra-ui/react";
import React from "react";

export default function Home() {
    const router = useRouter()

    return (
        <>
            <Head>
                <title>Vizard - Homepage</title>
                <meta name="description" content="Vizard homepage"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Flex justifyContent="center" alignItems="center" position="absolute" mt={100} ml="12vw">
                <Flex direction="row" alignItems="center" width="80vw" gap={40}>
                    <Flex direction="column" justifyContent="space-between" gap={2}>
                        <Heading fontWeight={600} fontSize={{base: '3xl', sm: '4xl', lg: '5xl'}}>
                            Chore management for{' '}
                            <Text as={'span'}
                                  position={'relative'}
                                  _after={{
                                      content: "''",
                                      width: 'full',
                                      margin: '0 0  0',
                                      height: '20%',
                                      position: 'absolute',
                                      bottom: 1,
                                      left: 0,
                                      bg: useColorModeValue("blue.400", "red.400"),
                                      zIndex: -1,
                                  }}>
                                families</Text>.
                        </Heading>
                        <Text ml={1} fontSize={{base: 'sm', sm: 'lg', lg: 'xl'}} maxWidth="40vw">
                            This family chore app makes it easy for parents to assign and track household chores
                            for their kids. Customizable roles and responsibilities allow families to work together
                            to keep their home clean and organized.</Text>

                        <Button ml={1} colorScheme={useColorModeValue("blue", "red")} width="40"
                                variant={useColorModeValue("solid", "outline")}
                                size="lg" mt={5}
                                onClick={(e) => router.push("/signup")
                                }>Get Started</Button>
                    </Flex>

                    <Box boxSize="xl">
                        <Image src='/familia.png' alt='Dan Abramov' mt="10%"/>
                    </Box>
                </Flex>
            </Flex>
        </>
    )
}
