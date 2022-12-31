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
    Select
} from "@chakra-ui/react";

import {useChakraSelectProps} from "chakra-react-select";

import NextLink from 'next/link'
import Head from "next/head";
import {useRouter} from 'next/router'

import {useDispatch} from "react-redux";
import {setUserState} from '../slices/authUserSlice'

import {account, getUserData} from '../config/appwrite'

// @ts-ignore
import {v4 as uuid} from 'uuid'

// From stackoverflow, thank you, Enve
const validateEmail = (email: string) => {
    return email
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
const Signup = () => {
    const formBackground = useColorModeValue("gray.100", "gray.700")

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');

    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [nameValid, setNameValid] = useState(true);
    const [surnameValid, setSurnameValid] = useState(true);
    const [usernameValid, setUsernameValid] = useState(true);

    const dispatch = useDispatch()
    const toast = useToast()

    // For form
    const emailNotValid = !validateEmail(email)
    const passwordNotValid = !password
    const nameNotValid = !firstName
    const surnameNotValid = !lastName

    const router = useRouter()

    useEffect(() => {
        getUserData()
            // @ts-ignore
            .then((acc) => router.push('/'))
            .catch((err) => {
            })
    }, []);

    const signup = (e: any) => {
        e.preventDefault()

        if (validateEmail(email)) {
            setEmailValid(true)
        } else {
            setEmailValid(false);
        }

        if (password.length <= 7) {
            setPasswordValid(false)
        } else {
            setPasswordValid(true);
        }

        if (firstName) {
            setNameValid(true)
        } else {
            setNameValid(false)
        }

        if (lastName) {
            setSurnameValid(true)
        } else {
            setSurnameValid(false);
            return
        }

        if (username) {
            setUsernameValid(true)
            if (!emailValid || !passwordValid || !nameValid || !surnameValid) return;
        } else {
            setUsernameValid(false)
            return
        }

        account.create(uuid(), email, password, username)
            .then((res) => {
                    account.createEmailSession(email, password)
                        .then((res) => {
                            getUserData()
                                // @ts-ignore
                                .then((acc) => {
                                    account.updatePrefs({
                                        ...account.getPrefs(),
                                        firstName: firstName,
                                        lastName: lastName,
                                        role: role
                                    }).then(() => dispatch(setUserState(acc)))

                                    router.push('/')
                                })
                                .catch((err) => {
                                    console.log("err")
                                })
                        }, (err) => {
                            console.log(err)
                        })
                }, (err) => {
                    switch (err.code) {
                        case 409: {
                            toast({
                                title: "Email taken",
                                description: "A user with the email " + email + " already exists!",
                                status: "error",
                                duration: 6000,
                                isClosable: true,
                                position: "bottom-right",
                                variant: "left-accent"
                            })
                            break;
                        }
                    }
                    console.log(err.message, "joe mama")
                }
            );
    }

    !surnameValid && !toast.isActive("invalid-surname") ? (
        toast({
            title: "Invalid last name",
            description: "Please enter a value for Last Name",
            status: "error",
            duration: 6000,
            isClosable: true,
            id: "invalid-surname",
            position: "bottom-right",
            variant: "left-accent"
        })
    ) : null

    !nameValid && !toast.isActive("invalid-name") ? (
        toast({
            title: "Invalid first name",
            description: "Please enter a value for First Name",
            status: "error",
            duration: 6000,
            isClosable: true,
            id: "invalid-name",
            position: "bottom-right",
            variant: "left-accent"
        })
    ) : null

    !emailValid && !toast.isActive("invalid-email") ? (
        toast({
            title: "Invalid email",
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
            title: "Invalid password",
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
                <title>Vizard - Sign up</title>
                <meta name="description" content="Vizard signup page"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Flex height="100%" alignItems="center" justifyContent="center" mt={20}>
                <Stack>
                    <Center>
                        <Heading mb={6}>Sign up to use Vizard</Heading>
                    </Center>
                    <form onSubmit={signup} noValidate={true}>
                        <Flex direction="column" width="30vw" background={formBackground} p={12} rounded={6}>
                            <Flex direction="row" mb={2} gap={5}>
                                <FormControl isRequired>
                                    <FormLabel>First Name</FormLabel>
                                    <Input _focus={{borderColor: 'blue.400'}} _invalid={{borderColor: 'red.300'}}
                                           value={firstName} borderColor="gray.200"
                                           onChange={(e: any) => {
                                               setFirstName(e.target.value);
                                               setNameValid(true)
                                               setSurnameValid(true)
                                               setPasswordValid(true)
                                               setEmailValid(true)
                                               setUsernameValid(true)
                                           }}
                                           minLength={8}
                                           placeholder="Jhon" variant="filled" type="text"/>
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>Last Name</FormLabel>
                                    <Input _focus={{borderColor: 'blue.400'}} _invalid={{borderColor: 'red.300'}}
                                           borderColor="gray.200" value={lastName}
                                           onChange={(e: any) => {
                                               setLastName(e.target.value)
                                               setNameValid(true)
                                               setSurnameValid(true)
                                               setPasswordValid(true)
                                               setEmailValid(true)
                                               setUsernameValid(true)
                                           }}
                                           placeholder="Doe" variant="filled" type="text"/>
                                </FormControl>
                            </Flex>

                            <Divider marginY="2"/>

                            <FormControl isRequired>
                                <FormLabel>Username</FormLabel>
                                <Input _focus={{borderColor: 'blue.400'}} _invalid={{borderColor: 'red.300'}}
                                       borderColor="gray.200" value={username}
                                       onChange={(e: any) => {
                                           setUsername(e.target.value)
                                           setNameValid(true)
                                           setSurnameValid(true)
                                           setPasswordValid(true)
                                           setEmailValid(true)
                                           setUsernameValid(true)
                                       }}
                                       minLength={8}
                                       placeholder="jhondoe123" variant="filled" type="text"/>
                            </FormControl>

                            <Divider marginY="2"/>
                            <FormControl isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input _focus={{borderColor: 'blue.400'}} _invalid={{borderColor: 'red.300'}}
                                       borderColor="gray.200" value={email}
                                       onChange={(e: any) => {
                                           setEmail(e.target.value)
                                           setNameValid(true)
                                           setSurnameValid(true)
                                           setPasswordValid(true)
                                           setEmailValid(true)
                                           setUsernameValid(true)
                                       }}
                                       minLength={8}
                                       placeholder="youremail@gmail.com" variant="filled" type="email"/>
                            </FormControl>

                            <Divider marginY="5"/>

                            <FormControl isRequired>
                                <FormLabel>Password</FormLabel>
                                <Input _focus={{borderColor: 'blue.400'}} _invalid={{borderColor: 'red.300'}}
                                       borderColor="gray.200"
                                       value={password} onChange={(e: any) => {
                                    setPassword(e.target.value)
                                    setNameValid(true)
                                    setSurnameValid(true)
                                    setPasswordValid(true)
                                    setEmailValid(true)
                                    setUsernameValid(true)
                                }}
                                       placeholder="****************" variant="filled" type="password"/>
                            </FormControl>

                            <Divider marginY="5"/>

                            <Select variant='outline' placeholder='Select role' value={role}
                                    onChange={(e) => setRole(e.target.value)}>
                                <option value="Parent">Parent</option>
                                <option value="Child">Child</option>
                                <option value="None">Nothing for now</option>
                            </Select>

                            <Divider marginY="5"/>

                            <Flex direction="row" mb={6} justifyContent="space-between">
                                <Checkbox colorScheme={useColorModeValue("blue", "red")}>Accept Terms of
                                    Service</Checkbox>
                                <Link as={NextLink} href="/login"
                                      color={useColorModeValue("blue.700", "blue.200")}>Have an account? Log
                                    in.</Link>
                            </Flex>

                            <Button colorScheme={useColorModeValue("blue", "red")} type="submit">Sign up</Button>
                        </Flex>
                    </form>
                </Stack>
            </Flex>
        </>
    );
};

export default Signup;