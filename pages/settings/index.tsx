import React, {useEffect, useState} from 'react';

import {useRouter} from 'next/router'

// import Account from '../../components/Account';
import Billing from '../../components/Billing';
import Appearance from '../../components/Appearance';

import type { NextPage } from 'next'
const  Account = dynamic(() => import('../../components/Account'), { ssr: false })

import {
    Button,
    Tabs,
    TabList,
    Tab,
    TabPanel,
    TabPanels,
    Center,
    useColorModeValue,
    useColorMode, useDisclosure
} from '@chakra-ui/react'
import {BsFillPersonFill} from 'react-icons/all'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../config/store";
import {getProfilePicture, getUserData} from "../../config/appwrite";
import {setUserState} from "../../slices/authUserSlice";
import dynamic from "next/dynamic";


const Settings = () => {
    const router = useRouter()

    const [profilePicture, setProfilePicture] = useState('');
    const [hasPfp, setHasPfp] = useState(false);

    // Global state
    const userData = useSelector((state: RootState) => state.authUser.userDetails)

    const dispatch = useDispatch()
    const {isOpen, onOpen, onClose} = useDisclosure()

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
    }, []);

    useEffect(() => {
        if(!mounted) return;
        getUserData()
            .then((account) => dispatch(setUserState(account)))
            .catch((err) => {
                // @ts-ignore
                dispatch(setUserState(null))
            })

        if (!userData) {
            router.push("/login")
        }
    });

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
        <>
            <Center>
                <Tabs width="75vw" align="start" mt={10} isFitted colorScheme={useColorModeValue("blue", "red")}>
                    <TabList>
                        <Tab>Profile</Tab>
                        <Tab>Security</Tab>
                        <Tab>Billing</Tab>
                        <Tab>Appearance</Tab>
                        <Tab>Language</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <Account userData={userData} profilePicture={profilePicture}/>
                        </TabPanel>
                        <TabPanel>
                            Security
                        </TabPanel>
                        <TabPanel>
                            <Billing userData={userData}/>
                        </TabPanel>
                        <TabPanel>
                            <Appearance userData={userData}/>
                        </TabPanel>
                        <TabPanel>
                            Language
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Center>
        </>
    );
};

export default Settings;
