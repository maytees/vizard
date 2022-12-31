import React, {useEffect, useState} from 'react'
import {
    HStack,
    Stack,
    VStack,
    Avatar,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverCloseButton,
    PopoverBody,
    PopoverArrow,
    LinkOverlay,
    Text,
    Button,
    Flex,
    useColorMode,
    useColorModeValue,
    Divider, FormControl, FormLabel, Input, Select, Center, Heading
} from '@chakra-ui/react'

interface AccountProps {
    userData: any;
    profilePicture: string;
}

const Account = (props: AccountProps) => {
    const [avatarHover, setAvatarHover] = useState(false);

    const [newUsername, setNewUsername] = useState('');
    const [hasChangedUsername, setHasChangedUsername] = useState(false);

    const [newFirst, setNewFirst] = useState('');
    const [hasChangedFirst, setHasChangedFirst] = useState(false);

    const [newLast, setNewLast] = useState('');
    const [hasChangedLast, setHasChangedLast] = useState(false);

    const [newRole, setNewRole] = useState('');
    const [hasChangedRole, setHasChangedRole] = useState(false);

    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        if (props.userData) {
            setFirstName(props.userData.prefs.firstName)
            setLastName(props.userData.prefs.lastName)
            setRole(props.userData.prefs.role)
            setUsername(props.userData.name)
        }
    }, []);

    const updateInfo = (e: any) => {
        e.preventDefault()
    }

    return (
        <>
            <Flex alignItems="start" direction="column" mt={5}>
                <Heading mb="10">Basic info</Heading>

                <Flex direction="row" alignItems="center" gap={6}>
                    <Avatar size="2xl" src={props.profilePicture}
                            cursor="pointer"
                    />
                    <Flex direction="column" gap={3}>
                        <Button variant="solid" colorScheme={useColorModeValue("blue", "red")}>Update
                            Avatar</Button>
                        <Button variant="outline" colorScheme={useColorModeValue("red", "purple")}>Remove
                            Avatar</Button>
                    </Flex>
                </Flex>

                <Divider my={5}/>

                <form onSubmit={updateInfo}>
                    <Flex direction="row" gap={32} alignItems="center">
                        <FormControl>
                            <FormLabel>Username</FormLabel>
                            <Input borderColor="gray.200"
                                   _focus={{bordercolor: "blue.400"}}
                                   value={newUsername || hasChangedUsername ? newUsername : username}
                                   onChange={(e) => {
                                       setNewUsername(e.target.value);
                                       setHasChangedUsername(true)
                                   }}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>First Name</FormLabel>
                            <Input borderColor="gray.200"
                                   _focus={{bordercolor: "blue.400"}}
                                   value={newFirst || hasChangedFirst ? newFirst : firstName}
                                   onChange={(e) => {
                                       setNewFirst(e.target.value);
                                       setHasChangedFirst(true)
                                   }}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Last Name</FormLabel>
                            <Input borderColor="gray.200"
                                   _focus={{bordercolor: "blue.400"}}
                                   value={newLast || hasChangedLast ? newLast : lastName}
                                   onChange={(e) => {
                                       setNewLast(e.target.value);
                                       setHasChangedLast(true)
                                   }}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Role</FormLabel>
                            <Select variant='outline' borderColor="gray.200"
                                    _focus={{bordercolor: "blue.400"}}
                                    placeholder='Select role' value={role}
                                    onChange={(e) => {
                                        setRole(e.target.value);
                                        setHasChangedRole(true);
                                    }}>
                                <option value="Parent">Parent</option>
                                <option value="Child">Child</option>
                                <option value="None">Nothing for now</option>
                            </Select>
                        </FormControl>
                    </Flex>

                    <Button colorScheme={useColorModeValue("blue", "red")} type="submit" mt="10">Change info</Button>
                </form>

                <Divider my={12}/>
            </Flex>
        </>
    )
}

export default Account;
