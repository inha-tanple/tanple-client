/* eslint-disable no-plusplus */

// Confirm.tsx

import { Stack, router } from 'expo-router'

import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import { useEffect, useState } from 'react'
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
import { Portal, Button, Dialog } from 'react-native-paper'

import MyButton from '#components/MyButton/MyButton'
import SubmitModal from '#components/SubmitModal/SubmitModal'
import { shadowStyle } from '#constants/styles'
import { ProductType } from '#constants/types'
import { useProgressDataStore } from '#store/client/useCreditStore'
import { useSelectedProduct } from '#store/client/useProductStore'
import useUploadImages from '#store/server/useImagesQueries'
import { getFormatDate, getFormatTime } from '#utils/getDate'

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
  const { colors } = useTheme()

  const { selectedProducts, resetProduct } = useSelectedProduct()
  const { mutate, isPending, isError, isSuccess, reset } = useUploadImages()
  const { progressData, addProgressData } = useProgressDataStore()

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
        style={{
          height: 1,
          backgroundColor: colors.lightGray,
          marginVertical: 2,
        }}
      />
    </>
  )

  useEffect(() => {
    if (isError) {
      setSubmitModal(false)
      router.push('/request/fail')
    }
    if (isSuccess) {
      setSubmitModal(false)
      router.push('/request/success')

      let nextId = (progressData[0]?.id ?? 0) + 1
      selectedProducts.map((it: ProductType) => {
        console.log(progressData)
        addProgressData({
          id: nextId++,
          credit: it.price,
          date: getFormatDate(),
          time: getFormatTime(),
          detail: it.productName,
          productBarcode: it.productBarcode,
          creditType: '적립',
        })
      })

      resetProduct()
    }
    reset()
  }, [isError, isSuccess])

  return (
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
          <Text style={{ color: colors.darkGray }}>
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
      <MyButton
        onPress={() => setSubmitModal(true)}
        text="제출하기"
        disabled={Object.keys(images).length <= 0}
        style={{
          width: 250,
          borderRadius: 20,
        }}
      />

      <SubmitModal
        open={submitModal}
        setOpen={setSubmitModal}
        content={isPending ? '제출 중' : '제출하시겠습니까?'}
        submitText="제출"
        onPress={() => mutate({ selectedProducts, images })}
      />

      <Portal>
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
