import Head from 'next/head'
import {useRouter} from 'next/router'
import Navbar from "../components/Navbar";
import {ReactNode} from 'react';
import {
    Box,
    Stack,
    HStack,
    Heading,
    Text,
    VStack,
    useColorModeValue,
    List,
    ListItem,
    ListIcon,
    Button, Center, Flex,
} from '@chakra-ui/react';
import {FaCheckCircle} from 'react-icons/fa';
import React from "react";

export default function Home() {
    const router = useRouter()

    return (
        <>
            <Head>
                <title>Vizard - Pricing</title>
                <meta name="description" content="Vizard pricing page"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Center mt={20}>
                <Flex direction="column" justifyContent="center" alignItems="center" gap={2}>
                    <Heading fontSize={{base: '3xl', sm: '4xl', lg: '6xl'}}>
                        The <Text as={'span'}
                                  position={'relative'}
                                  _after={{
                                      content: "''",
                                      width: 'full',
                                      margin: '0 0  0',
                                      height: '20%',
                                      position: 'absolute',
                                      bottom: 1,
                                      left: 0,
                                      bg: useColorModeValue('blue.400', "red.400"),
                                      zIndex: -1,
                                  }}>
                        more</Text>.
                        The <Text as={'span'}
                                  position={'relative'}
                                  _after={{
                                      content: "''",
                                      width: 'full',
                                      margin: '0 0  0',
                                      height: '20%',
                                      position: 'absolute',
                                      bottom: 1,
                                      left: 0,
                                      bg: useColorModeValue('red.400', "blue.400"),
                                      zIndex: -1,
                                  }}>
                        better</Text>.</Heading>
                    <Text fontSize={{base: 'lg', sm: 'xl', lg: '2xl'}} color={useColorModeValue("gray.700", "gray.300")}>
                        Affordable prices for amazing convenience.</Text>

                    <Stack direction={{base: 'column', md: 'row'}}
                           textAlign="center"
                           justify="center"
                           spacing={{base: 4, lg: 10}}
                           gap={{base: 10, lg: 10}}
                           py={10}>
                        <Box
                            mb={4}
                            borderWidth="1px"
                            alignSelf={{base: 'center', lg: 'flex-start'}}
                            borderRadius={'xl'}>
                            <Box py={4} px={12}>
                                <Text fontWeight="500" fontSize="2xl">
                                    Basic
                                </Text>
                                <HStack justifyContent="center">
                                    <Text fontSize="3xl" fontWeight="600">
                                        $
                                    </Text>
                                    <Text fontSize="5xl" fontWeight="900" color={useColorModeValue("purple.400", "purple.200")}>
                                        1.99
                                    </Text>
                                    <Text fontSize="3xl" color="gray.500">
                                        /month
                                    </Text>
                                </HStack>
                            </Box>
                            <VStack
                                bg={useColorModeValue('gray.50', 'gray.700')}
                                py={4}
                                borderBottomRadius={'xl'}>
                                <List spacing={3} textAlign="start" px={12}>
                                    <ListItem>
                                        <ListIcon as={FaCheckCircle} color="green.200"/>
                                        Up to 4 family members
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon as={FaCheckCircle} color="green.200"/>
                                        Up to 10 chores
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon as={FaCheckCircle} color="green.200"/>
                                        Up to 2 roles
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon as={FaCheckCircle} color="green.200"/>
                                        Push notifications
                                    </ListItem>
                                </List>
                                <Box w="80%" pt={7}>
                                    <Button w="full" colorScheme={useColorModeValue("blue", "red")} variant="solid">
                                        Buy
                                    </Button>
                                </Box>
                            </VStack>
                        </Box>
                        <Box
                            borderWidth="1px"
                            alignSelf={{base: 'center', lg: 'flex-start'}}
                            borderRadius={'xl'}>
                            <Box py={4} px={12}>
                                <Text fontWeight="500" fontSize="2xl">
                                    Upper Basic
                                </Text>
                                <HStack justifyContent="center">
                                    <Text fontSize="3xl" fontWeight="600">
                                        $
                                    </Text>
                                    <Text fontSize="5xl" fontWeight="900" color={useColorModeValue("blue.400", "blue.200")}>
                                        2.99
                                    </Text>
                                    <Text fontSize="3xl" color="gray.500">
                                        /month
                                    </Text>
                                </HStack>
                            </Box>
                            <VStack
                                bg={useColorModeValue('gray.50', 'gray.700')}
                                py={4}
                                borderBottomRadius={'xl'}>
                                <List spacing={3} textAlign="start" px={12}>
                                    <ListItem>
                                        <ListIcon as={FaCheckCircle} color="green.200"/>
                                        Up to 8 family members
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon as={FaCheckCircle} color="green.200"/>
                                        Up to 20 chores
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon as={FaCheckCircle} color="green.200"/>
                                        Up to 5 roles
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon as={FaCheckCircle} color="green.200"/>
                                        Push notifications
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon as={FaCheckCircle} color="green.200"/>
                                        Picture Proof
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon as={FaCheckCircle} color="green.200"/>
                                        Rewards
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon as={FaCheckCircle} color="green.200"/>
                                        Schedule
                                    </ListItem>
                                </List>
                                <Box w="80%" pt={7}>
                                    <Button w="full" colorScheme={useColorModeValue("blue", "red")} variant="solid">
                                        Buy
                                    </Button>
                                </Box>
                            </VStack>
                        </Box>
                        <Box
                            borderWidth="1px"
                            alignSelf={{base: 'center', lg: 'flex-start'}}
                            borderRadius={'xl'}>
                            <Box py={4} px={12}>
                                <Text fontWeight="400" fontSize="2xl">
                                    Premium
                                </Text>
                                <HStack justifyContent="center">
                                    <Text fontSize="3xl" fontWeight="600">
                                        $
                                    </Text>
                                    <Text fontSize="5xl" fontWeight="900" color={useColorModeValue("red.400", "red.200")}>
                                        3.99
                                    </Text>
                                    <Text fontSize="3xl" color="gray.500">
                                        /month
                                    </Text>
                                </HStack>
                            </Box>
                            <VStack
                                bg={useColorModeValue('gray.50', 'gray.700')}
                                py={4}
                                borderBottomRadius={'xl'}>
                                <List spacing={3} textAlign="start" px={12}>
                                    <ListItem>
                                        <ListIcon as={FaCheckCircle} color="green.200"/>
                                        Unlimited family members
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon as={FaCheckCircle} color="green.200"/>
                                        Unlimited errands
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon as={FaCheckCircle} color="green.200"/>
                                        Unlimited Roles
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon as={FaCheckCircle} color="green.200"/>
                                        Push notifications
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon as={FaCheckCircle} color="green.200"/>
                                        Picture Proof
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon as={FaCheckCircle} color="green.200"/>
                                        Rewards
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon as={FaCheckCircle} color="green.200"/>
                                        Schedule
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon as={FaCheckCircle} color="green.200"/>
                                        Custom chores
                                    </ListItem>
                                </List>
                                <Box w="80%" pt={7}>
                                    <Button w="full" colorScheme={useColorModeValue("blue", "red")} variant="solid">
                                        Buy
                                    </Button>
                                </Box>
                            </VStack>
                        </Box>
                    </Stack>
                </Flex>
            </Center>
        </>
    )
}
