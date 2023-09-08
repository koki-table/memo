import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  FormControl,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react'
import { FC } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

import { Button } from '@/components/Elements'

type EditModalProps = {
  isOpen: boolean
  submitHandler: (event: React.FormEvent<HTMLFormElement>) => void
  onClose: () => void
  reset: () => void
  fields: string[]
  errors: FieldValues
  isSubmitting: boolean
  register: UseFormRegister<FieldValues>
  title: string
  buttonText: string
  inputName: string[]
}

export const EditModal: FC<EditModalProps> = ({
  isOpen,
  submitHandler,
  onClose,
  reset,
  fields,
  errors,
  isSubmitting,
  register,
  title,
  buttonText,
  inputName,
}) => {
  return (
    <Modal
      preserveScrollBarGap
      size={{ base: 'sm', md: 'md' }}
      isCentered
      isOpen={isOpen}
      onClose={() => {
        onClose()
        reset()
      }}
    >
      <ModalOverlay />
      <ModalContent mx={4} py={16} alignItems="center">
        <ModalHeader pt={0} pb={9}>
          {title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody w="100%">
          <form onSubmit={submitHandler}>
            <Stack spacing={6}>
              {fields.map((field, index) => {
                return (
                  <FormControl key={index} isInvalid={Boolean(errors?.[inputName[index]])}>
                    <VStack w="100%" alignItems={'flex-start'}>
                      <Input
                        {...register(inputName[index])}
                        name={inputName[index]}
                        placeholder={field}
                        isDisabled={isSubmitting}
                      />
                      {errors?.[inputName[index]] && (
                        <Text fontSize={'xs'} pl={2}>
                          {errors?.[inputName[index]].message}
                        </Text>
                      )}
                    </VStack>
                  </FormControl>
                )
              })}
              <Button type="submit" isLoading={isSubmitting}>
                {buttonText}
              </Button>
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
