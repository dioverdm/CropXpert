import { ViewIcon, EditIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Image,
  Input,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import React, {  useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";

const ProfileModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editMode, setEditMode] = useState(false);
  const toast = useToast();
  const [picLoading, setPicLoading] = useState(false);
  const [pic, setPic] = useState();
  const navigate = useNavigate();
  const { user, setUser } = ChatState();

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleDoneClick = async () => {
    setPicLoading(true);

    if (!pic) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post("/api/user/profile", { pic }, config);

      toast({
        title: "Profile picture updated successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      // Update the user context with the new user data
      setUser(data);

      setPicLoading(false);
      navigate("/chats");
    } catch (error) {
      console.error("Error updating profile picture:", error.message);
    }

    setEditMode(false);
    onClose();
  };

  const postDetails = (pics) => {
    setPicLoading(true);

    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "CropXpert");

      fetch(process.env.REACT_APP_CLOUDINARY_URL, {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          icon={<ViewIcon />}
          onClick={onOpen}
        />
      )}
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent height="410px">
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              borderRadius="full"
              boxSize="150px"
              src={user.pic}
              alt={user.name}
            />
            {editMode ? (
              <Input
                type="file"
                padding="1.5"
                accept="image/*"
                onChange={(e) => postDetails(e.target.files[0])}
              />
            ) : (
              <Text
                fontSize={{
                  base: "clamp(16px, 4vw, 28px)",
                  md: "clamp(18px, 5vw, 30px)",
                }}
                fontFamily="Work sans"
                textColor="black"
              >
                Email: {user.email}
              </Text>
            )}
          </ModalBody>
          <ModalFooter>
            {editMode ? (
              <Button onClick={handleDoneClick}>Done</Button>
            ) : (
              <>
                <IconButton
                  icon={<EditIcon />}
                  onClick={handleEditClick}
                  aria-label="Edit"
                  position="absolute"
                  Button="0"
                  left="6"
                  
                />
                <Button onClick={onClose}>Close</Button>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
