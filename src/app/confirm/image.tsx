/* eslint-disable react/no-unstable-nested-components */
// Confirm.tsx

import { Stack } from 'expo-router'

import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import {
  Text,
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  Alert,
  Platform,
} from 'react-native'
import {
  Modal,
  Portal,
  Button,
  PaperProvider,
  Dialog,
} from 'react-native-paper'

import { shadowStyle } from '#constants/styles'
import sendData from '#utils/SendData'

import useProductStore from '#store/useProductStore'

interface ImageInfo {
  uri: string
  name: string
  size: number
  mimeType: string
}

interface CustomImagePickerAsset extends ImagePicker.ImagePickerAsset {
  filesize?: number
}

export default function ConfirmImage() {
  const [images, setImages] = useState<ImageInfo[]>([])
  const [submitModal, setSubmitModal] = useState(false)
  const [alertModal, setAlertModal] = useState(false)

  const { selectedProducts, resetProduct } = useProductStore()

  const pickImage = async () => {
    if (Platform.OS === 'ios') {
      Alert.alert(
        '업로드 방법 선택',
        '카메라로 사진을 찍거나 갤러리에서 이미지를 선택해 주세요.',
        [
          {
            text: '카메라',
            onPress: async () => {
              const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
              })

              if (!result.canceled) {
                const newImage = {
                  uri: result.assets[0].uri,
                  name: result.assets[0].fileName || '',
                  size: result.assets[0].fileSize || 0,
                  mimeType: result.assets[0].mimeType || '',
                }
                setImages([...images, newImage])
              }
            },
          },
          {
            text: '갤러리',
            onPress: async () => {
              const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsMultipleSelection: true,
                quality: 1,
              })

              if (!result.canceled) {
                console.log(result.assets)
                const newImages = result.assets.map((asset) => ({
                  uri: asset.uri,
                  name: asset.fileName || '',
                  size: asset.fileSize || 0,
                  mimeType: result.assets[0].mimeType || '',
                }))
                setImages([...images, ...newImages])
              }
            },
          },
          {
            text: '취소',
            style: 'cancel',
          },
        ],
      )
    } else {
      setAlertModal(true)
    }
  }

  const handleCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      const asset = result.assets[0] as CustomImagePickerAsset
      const newImage = {
        uri: asset.uri,
        name: asset.fileName || `카메라 ${images.length + 1}`,
        size: asset.filesize || 0,
        mimeType: result.assets[0].mimeType || '',
      }
      setImages([...images, newImage])
    }

    setAlertModal(false)
  }

  const handleGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    })

    if (!result.canceled) {
      const newImages = result.assets.map((asset: CustomImagePickerAsset) => ({
        uri: asset.uri,
        name: asset.fileName || '',
        size: asset.filesize || 0,
        mimeType: result.assets[0].mimeType || '',
      }))
      setImages([...images, ...newImages])
    }

    setAlertModal(false)
  }

  const removeImage = (uri: string) => {
    setImages(images.filter((image) => image.uri !== uri))
  }

  const renderImageItem = ({ item }: { item: ImageInfo }) => (
    <>
      <View style={styles.imageItem}>
        <Image source={{ uri: item.uri }} style={styles.image} />
        <Text style={styles.imageName}>{item.name}</Text>
        <Text style={styles.imageSize}>
          {(item.size / 1024 / 1024).toFixed(2)} MB
        </Text>
        <TouchableOpacity
          onPress={() => removeImage(item.uri)}
          style={styles.removeButton}
        >
          <Ionicons size={18} name="close" />
        </TouchableOpacity>
      </View>
      <View
        style={{ height: 1, backgroundColor: '#EAEAEA', marginVertical: 2 }}
      />
    </>
  )

  const handleSubmit = async () => {
    if ((await sendData(selectedProducts, images)) > 0) resetProduct()
    setSubmitModal(false)
  }

  return (
    <PaperProvider>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          top: '13%',
        }}
      >
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: () => (
              <View>
                <Text
                  style={{ fontSize: 20, fontWeight: 'bold', marginRight: 220 }}
                >
                  사진 제출하기
                </Text>
              </View>
            ),
            headerTransparent: true,
          }}
        />
        <View
          style={{
            ...shadowStyle,
            width: '90%',
            height: '60%',
            backgroundColor: 'white',
            borderRadius: 20,
            marginBottom: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {images.length <= 0 && (
            <Text style={{ color: '#808080' }}>
              아래의 업로드하기 버튼을 클릭해 주세요
            </Text>
          )}
          {images.length > 0 && (
            <FlatList
              data={images}
              renderItem={renderImageItem}
              keyExtractor={(item) => item.uri}
              contentContainerStyle={styles.imageList}
              style={{ width: '100%', paddingHorizontal: 10 }}
            />
          )}
          <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>업로드하기</Text>
          </TouchableOpacity>
        </View>
        <Button
          onPress={() => setSubmitModal(true)}
          mode="contained"
          buttonColor="#5DB476"
          disabled={Object.keys(images).length <= 0}
          style={{
            height: 45,
            width: 250,
            borderWidth: 0.2,
            borderColor: '#49A66D',
            borderRadius: 20,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          제출하기
        </Button>
        <Portal>
          <Modal
            visible={submitModal}
            onDismiss={() => setSubmitModal(false)}
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
              제출하시겠습니까?
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
                onPress={() => setSubmitModal(false)}
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
                onPress={handleSubmit}
                style={{
                  flexGrow: 1,
                  alignItems: 'center',
                  borderBottomRightRadius: 10,
                  justifyContent: 'center',
                  backgroundColor: '#49A66D',
                }}
              >
                <Text style={{ color: 'white' }}>제출</Text>
              </TouchableOpacity>
            </View>
          </Modal>
          <Dialog
            visible={Platform.OS === 'android' && alertModal}
            onDismiss={() => setAlertModal(false)}
            style={{ backgroundColor: 'white' }}
          >
            <Dialog.Title>업로드 방법 선택</Dialog.Title>
            <Dialog.Content>
              <Text>
                카메라로 사진을 찍거나 갤러리에서 이미지를 선택해 주세요.
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={handleCamera} labelStyle={{ color: '#2A7CFF' }}>
                카메라
              </Button>
              <Button onPress={handleGallery} labelStyle={{ color: '#2A7CFF' }}>
                갤러리
              </Button>
              <Button
                onPress={() => setAlertModal(false)}
                labelStyle={{ color: 'black' }}
              >
                취소
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  imageList: {
    flexGrow: 1,
    padding: 10,
  },
  imageItem: {
    height: 50,
    marginVertical: 25,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 10,
  },
  imageName: {
    fontSize: 13,
    fontWeight: '600',
    width: 100,
  },
  imageSize: {
    fontSize: 14,
    color: '#808080',
  },
  removeButton: {
    paddingHorizontal: 2,
    paddingVertical: 2,
    backgroundColor: '#EAEAEA',
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  uploadButton: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#D9D9D9',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    marginTop: 20,
  },
  uploadButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
})
