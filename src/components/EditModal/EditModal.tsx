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
  Button,
  Text,
  VStack,
} from '@chakra-ui/react'
import { FC } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

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
                  <FormControl key={index} isInvalid={Boolean(errors?.[field])}>
                    <VStack w="100%" alignItems={'flex-start'}>
                      <Input
                        {...register(field)}
                        name={field}
                        placeholder={field}
                        isDisabled={isSubmitting}
                      />
                      {errors?.[field] && (
                        <Text fontSize={'xs'} pl={2}>
                          {errors?.[field].message}
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
