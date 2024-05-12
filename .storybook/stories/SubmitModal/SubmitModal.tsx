import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Modal, Portal } from 'react-native-paper'

export type SubmitModalProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  content: string
  submitText: string
  onPress?: () => void
}

export default function SubmitModal({
  open,
  setOpen,
  content,
  submitText,
  ...props
}: SubmitModalProps) {
  return (
    <Portal>
      <Modal
        visible={open}
        onDismiss={() => setOpen(false)}
        contentContainerStyle={{
          alignSelf: 'center',
          width: '75%',
          height: 200,
          backgroundColor: 'white',
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            bottom: 10,
            fontSize: 16,
            fontWeight: '500',
            textAlign: 'center',
          }}
        >
          {content}
        </Text>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            height: 45,
            width: '100%',
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            onPress={() => setOpen(false)}
            style={{
              flexGrow: 1,
              alignItems: 'center',
              borderBottomLeftRadius: 10,
              justifyContent: 'center',
              backgroundColor: '#EAEAEA',
            }}
          >
            <Text>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={props.onPress}
            style={{
              flexGrow: 1,
              alignItems: 'center',
              borderBottomRightRadius: 10,
              justifyContent: 'center',
              backgroundColor: '#49A66D',
            }}
          >
            <Text style={{ color: 'white' }}>{submitText}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </Portal>
  )
}
