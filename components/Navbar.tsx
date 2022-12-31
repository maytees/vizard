import React, {useEffect, useState} from 'react';
import {
    Button,
    Center,
    Flex,
    Heading,
    useDisclosure,
    useColorModeValue,
    useColorMode,
    MenuButton,
    Avatar,
    Menu,
    MenuDivider,
    MenuList,
    MenuItem,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody, ModalFooter, Text, HStack, VStack, Box
} from "@chakra-ui/react";

import {EmailIcon, MoonIcon, SunIcon, CloseIcon, HamburgerIcon} from '@chakra-ui/icons'

import Link from 'next/link'
import {useRouter} from "next/router";
import {getUserData, getProfilePicture, logoutSession, account} from "../config/appwrite";

import {useSelector, useDispatch} from "react-redux";
import {setUserState} from '../slices/authUserSlice'
import type {RootState} from "../config/store";
import {FiChevronDown} from 'react-icons/fi';

const Navbar = () => {
    const router = useRouter()
    const {colorMode, toggleColorMode} = useColorMode()
    const [profilePicture, setProfilePicture] = useState('');
    const [hasPfp, setHasPfp] = useState(false);

    // Global state
    const userData = useSelector((state: RootState) => state.authUser.userDetails)

    const dispatch = useDispatch()
    const {isOpen, onOpen, onClose} = useDisclosure()

    useEffect(() => {
        getUserData()
            .then((account) => dispatch(setUserState(account)))
            // @ts-ignore
            .catch((err) => dispatch(setUserState(null)))
    }, []);

    if (userData && !hasPfp) {
        setHasPfp(true)
        // @ts-ignore
        getProfilePicture(userData.$id)
            .then((image) => {
                // @ts-ignore
                setProfilePicture(image);
            })
            .catch((err) => {
                // @ts-ignore
                setProfilePicture(process.env.DEFAULT_PROFILE_PIC_URL)
            })
    }

    return (
        <Center>
            <Flex direction="row" height="7vh" alignItems="center" justifyContent="space-between" mt="5"
                  width="75vw">
                <Flex gap={10} alignItems="center">
                    <Heading size="2xl" color={useColorModeValue("blue.400", "red.400")}><Link
                        href="/">Vizard</Link></Heading>
                    <Button size="lg" variant="link" color={useColorModeValue("gray.800", "gray.200")}
                            ml={20}><Link href="/pricing">Pricing</Link></Button>
                    {userData ? (
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        <Button size="lg" variant="link" color={useColorModeValue("gray.800", "gray.200")}
                                ml={20}><Link href="/dashboard/family">Family</Link></Button>
                    ) : null}
                </Flex>
                <Flex gap={10} alignItems="center">
                    <Button onClick={toggleColorMode} variant="ghost" size="lg">
                        {colorMode === 'light' ? <MoonIcon color="blue.400"/> : <SunIcon color="red.400"/>}
                    </Button>
                    {userData ? (
                        <Menu closeOnBlur closeOnSelect>
                            <MenuButton>
                                <HStack>
                                    <Avatar
                                        size={'lg'}
                                        src={profilePicture}
                                    />
                                    <VStack
                                        display={{base: 'none', md: 'flex'}}
                                        alignItems="flex-start"
                                        spacing="1px"
                                        ml="2">
                                        <Text fontSize="sm">
                                            {
                                                // @ts-ignore
                                                userData.name
                                            }
                                        </Text>
                                        <Text fontSize="xs" color="gray.600">
                                            {
                                                // @ts-ignore
                                                userData.prefs.role === "None" ? null : userData.prefs.role
                                            }
                                        </Text>
                                    </VStack>
                                    <Box display={{base: 'none', md: 'flex'}}>
                                        <FiChevronDown/>
                                    </Box>
                                </HStack>
                            </MenuButton>
                            <MenuList alignItems="center">
                                <br/>
                                <Center>
                                    <Avatar
                                        size={'2xl'}
                                        src={profilePicture}
                                    />
                                </Center>
                                <br/>
                                <Center>
                                    <p>{
                                        // @ts-ignore
                                        userData.name
                                    }</p>
                                </Center>
                                <br/>
                                <MenuDivider/>
                                <MenuItem onClick={(e) => {
                                    router.push('/dashboard')
                                }}>Dashboard</MenuItem>
                                <MenuItem onClick={(e) => {
                                    router.push('/dashboard/family')
                                }}>Family</MenuItem>
                                <MenuItem onClick={(e) => {
                                    router.push('/settings/billing')
                                }}>Billing</MenuItem>
                                <MenuItem onClick={(e) => {
                                    router.push('/settings/appearance')
                                }}>Appearance</MenuItem>
                                <MenuDivider/>
                                <MenuItem onClick={(e) => {
                                    router.push('/settings')
                                }}>Settings</MenuItem>
                                <MenuItem onClick={(e) => {
                                    onOpen()
                                }}>Logout</MenuItem>
                            </MenuList>
                            <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered motionPreset="scale">
                                <ModalOverlay/>
                                <ModalContent>
                                    <ModalHeader>Logout</ModalHeader>
                                    <ModalCloseButton/>
                                    <ModalBody>
                                        <Text fontSize="lg">Are you sure you want to logout?</Text>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Flex direction="row" gap="5" alignItems="center">
                                            <Button onClick={(e) => {
                                                onClose()
                                                logoutSession().then(r => {
                                                    console.log("Logged out successfully")
                                                })
                                                    .catch((err) => {
                                                        console.log("Could not log out!\n" + err)
                                                    });
                                                // @ts-ignore
                                                dispatch(setUserState(null))
                                            }}
                                                    colorScheme="red"
                                            >Logout</Button>
                                            <Button onClick={onClose} colorScheme="blue" variant="outline">Take me
                                                back!</Button>
                                        </Flex>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </Menu>


                    ) : (
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        <><Button variant="ghost" colorScheme={useColorModeValue("blue", "red")}
                                  onClick={(e) => router.push("/login")}>Sign in</Button>
                            {/* eslint-disable react-hooks/rules-of-hooks */}
                            <Button variant={useColorModeValue("solid", "outline")}
                                    colorScheme={useColorModeValue("blue", "red")}
                                    mr={10}
                                    onClick={(e) => router.push("/signup")}>Sign up</Button>
                        </>
                    )
                    }
                </Flex>
            </Flex>
        </Center>
    );
};

export default Navbar;
