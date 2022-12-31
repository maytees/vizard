import React, {useEffect, useState} from 'react';
import {
    Flex,
    Heading,
    Input,
    Button,
    useColorMode,
    useColorModeValue,
    FormControl,
    FormLabel,
    FormHelperText,
    FormErrorMessage,
    Stack,
    Center,
    Checkbox,
    Link,
    Divider,
    useToast,
} from "@chakra-ui/react";

import {account, getProfilePicture, getUserData} from '../config/appwrite'
import NextLink from 'next/link'
import Head from "next/head";
import {useRouter} from "next/router";

import {useSelector, useDispatch} from "react-redux";
import {setUserState} from '../slices/authUserSlice'
import type {RootState} from "../config/store";

// From stackoverflow, thank you, Enve
const validateEmail = (email: string) => {
    return email
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
const Login = () => {
    const formBackground = useColorModeValue("gray.100", "gray.700")
    const router = useRouter()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);

    const toast = useToast()

    const dispatch = useDispatch()
    
    useEffect(() => {
        getUserData()
            // @ts-ignore
            .then((acc) => {
                router.push('/')
            })
            .catch((err) => {
            })

    }, []);

    const login = (e: any) => {
        e.preventDefault()

        if (validateEmail(email)) {
            setEmailValid(true)
        } else {
            setEmailValid(false)
        }

        if (password.length <= 7) {
            //Invalid
            setPasswordValid(false)
            return
        } else {
            setPasswordValid(true)
            if (!emailValid) return;
        }

        account.createEmailSession(email, password).then((res) => {
            getUserData()
                // @ts-ignore
                .then((acc) => {
                    dispatch(setUserState(acc));
                    router.push('/')
                })
                .catch((err) => {
                    console.log("err")
                })
        }, (err) => {
            switch (err.code) {
                case 401: {
                    toast({
                        title: "Invalid email or password",
                        description: "Are you sure you put in the correct account information?",
                        status: "error",
                        duration: 6000,
                        isClosable: true,
                        position: "bottom-right",
                        variant: "left-accent"
                    })
                }
            }
            console.log(err + "joe mama")
        })
    };

    !emailValid && !toast.isActive("invalid-email") ? (
        toast({
            title: "Invalid Email",
            description: "Please use a valid email! e.g: jhondoe@gmail.com",
            status: "error",
            duration: 4000,
            isClosable: true,
            id: "invalid-email",
            position: "bottom-right",
            variant: "left-accent"
        })
    ) : null

    !passwordValid && !toast.isActive("invalid-password") ? (
        toast({
            title: "Invalid Password",
            description: "Password must be greater than 8 characters!",
            status: "error",
            duration: 6000,
            isClosable: true,
            id: "invalid-password",
            position: "bottom-right",
            variant: "left-accent"
        })
    ) : null

    // @ts-ignore
    return (
        <>
            <Head>
                <title>Vizard - Sign in</title>
                <meta name="description" content="Vizard login page"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Flex height="100%" alignItems="center" justifyContent="center" mt={20}>
                <Stack>
                    <Center>
                        <Heading mb={6}>Sign in to use Vizard</Heading>
                    </Center>
                    <form onSubmit={login} noValidate={true}>
                        <Flex direction="column" width="30vw" background={formBackground} p={12} rounded={6}>
                            <FormControl isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input borderColor="gray.200"
                                       _focus={{borderColor: 'blue.400'}} value={email}
                                       onChange={(e: any) => {
                                           setEmail(e.target.value);
                                           setEmailValid(true);
                                           setPasswordValid(true);
                                       }} minLength={8}
                                       placeholder="youremail@gmail.com" variant="filled" type="email"/>
                                {}
                            </FormControl>

                            <Divider marginY="5"/>
                            
                            <FormControl isRequired>
                                <FormLabel>Password</FormLabel>
                                <Input borderColor="gray.200"
                                       _focus={{borderColor: 'blue.400'}}
                                       value={password} onChange={(e: any) => {
                                    setPassword(e.target.value);
                                    setEmailValid(true);
                                    setPasswordValid(true);
                                }}
                                       placeholder="****************" variant="filled" type="password"/>
                            </FormControl>

                            <Divider marginY="2"/>

                            <Flex direction="row" mb={6} justifyContent="space-between">
                                <Checkbox colorScheme={useColorModeValue("blue", "red")}>Remember me</Checkbox>
                                <Link as={NextLink} href="/reset-password"
                                      color={useColorModeValue("blue.700", "blue.200")}>Forgot
                                    Password?</Link>
                            </Flex>

                            <Button colorScheme={useColorModeValue("blue", "red")} type="submit">Log in</Button>
                        </Flex>
                    </form>
                </Stack>
            </Flex>
        </>
    );
};

export default Login;
