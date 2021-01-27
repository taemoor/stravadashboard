import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Center,
  Button,
  CircularProgress} from '@chakra-ui/react'


const ChModal = (props) => {
  const {showProgress, onClickDialogOpen, onClickDialogClose, isOpen, onClickBegin} = props
  return (
    <>
      <Button onClick={onClickDialogOpen}>Import Activities from Strava</Button>
      <Modal closeOnOverlayClick={false} isCentered isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Importing Activities from Strava</ModalHeader>
          <ModalBody>
            <Center>
              {showProgress
                ? <CircularProgress isIndeterminate color="orange.400" />
                : <Button onClick={onClickBegin}>Begin Import</Button>
              }
            </Center>
          </ModalBody>
          <ModalFooter>
            <Button disabled={showProgress} colorScheme="orange" mr={3} onClick={onClickDialogClose}>
              Done
            </Button>
        </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ChModal
