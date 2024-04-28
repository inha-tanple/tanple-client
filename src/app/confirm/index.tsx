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
} from 'react-native'
import { Modal, Portal, Button, PaperProvider } from 'react-native-paper'

import { shadowStyle } from '#constants/styles'

interface ImageInfo {
  uri: string
  name: string
  size: number
}

export default function Confirm() {
  const [images, setImages] = useState<ImageInfo[]>([])

  const [visible, setVisible] = useState(false)
  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)

  const pickImage = async () => {
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
      }))
      setImages([...images, ...newImages])
    }
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

  function handleSubmit() {
    console.log(images)
  }

  return (
    <PaperProvider>
      <View style={{ flex: 1, alignItems: 'center', top: 130 }}>
        <Stack.Screen
          options={{
            headerShown: true,
            // eslint-disable-next-line react/no-unstable-nested-components
            headerTitle: () => (
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginRight: 220,
                    marginTop: 10,
                  }}
                >
                  사진 제출하기
                </Text>
                <Text style={{ color: '#808080', marginTop: 6 }}>
                  영수증 사진을 업로드 해주세요
                </Text>
              </View>
            ),
            headerTransparent: true,
          }}
        />
        <View
          style={{
            ...shadowStyle,
            width: 360,
            height: 480,
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
            />
          )}
          <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>업로드하기</Text>
          </TouchableOpacity>
        </View>
        <Button
          onPress={showModal}
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
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={{
              alignSelf: 'center',
              width: 300,
              height: 200,
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
            }}
          >
            <Text style={{ bottom: 10, textAlign: 'center' }}>
              제출하시겠습니까?
            </Text>
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                height: 40,
                width: 300,
                flexDirection: 'row',
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setVisible(false)
                }}
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
    width: 320,
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
    width: 360,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#EAEAEA',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    marginTop: 20,
  },
  uploadButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
})
