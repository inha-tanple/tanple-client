// index.tsx

import { Redirect, router } from 'expo-router'

import { Ionicons } from '@expo/vector-icons'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import GradientView from '#components/GradientView/GradientView'
import MyCarousel from '#components/MyCarousel/MyCarousel'
import { defaultContainer } from '#constants/styles'
import { useAuthStore, useInitStore } from '#store/client/useAuthStore'
import { useProgressDataStore } from '#store/client/useCreditStore'

export default function Home() {
  const { userInfo, personInfo, setUserInfo, setPersonInfo } = useAuthStore()
  const { progressData } = useProgressDataStore()
  const { isInit } = useInitStore()

  const isPendingData = Object.keys(progressData).length > 0

  // dev temp Error
  if (isInit === true && Object.keys(userInfo || {}).length > 0) {
    setUserInfo(null)
    setPersonInfo(false)
  }

  if (isInit === true) {
    return <Redirect href="/onboard/1" />
  }

  if (Object.keys(userInfo || {}).length === 0)
    return <Redirect href="/login/" />

  // 로직 구현 필요
  if (personInfo === false) return <Redirect href="/login/person" />

  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <MyCarousel
        data={[
          {
            imageUrl: 'https://www.gihoo.or.kr/netzero/img/layout/gnb1.jpg',
            contentUrl: 'https://www.gihoo.or.kr/menu.es?mid=a30101020000',
            title: '탄소중립 정책 포털 바로가기',
            content: '탄소중립의 정의와 현행 제도에 대해서 알아보아요.',
          },
          {
            imageUrl:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqLkzgmmmorYbGvp7i69XGMhkjfllivAZd_g&s',
            contentUrl:
              'https://me.go.kr/search/totalSearch/search_new.jsp?q=%ED%83%84%EC%86%8C%EC%A4%91%EB%A6%BD&searchField=ALL&targetSiteId=main',
            title: '환경부의 탄소중립 최신 소식 바로가기',
            content: '정부의 새로운 친환경 정책을 확인해보세요.',
          },
          {
            imageUrl:
              'https://cdn.electimes.com/news/photo/202406/338632_541197_5335.jpg',
            contentUrl:
              'https://www.electimes.com/news/articleView.html?idxno=338632',
            title: '탄소중립 속 도시가스 역할은?',
            content: '도시가스 산업의 변화와 미래 전망을 살펴보세요.',
          },
          {
            imageUrl:
              'https://image.newsis.com/2024/06/10/NISI20240610_0001571603_web.jpg?rnd=20240610104049',
            contentUrl:
              'https://www.newsis.com/view/?id=NISX20240610_0002766300&cID=10807&pID=10800',
            title: '계룡시, 올해도 탄소중립포인트제 상시 접수',
            content: '시민들의 적극적인 참여를 기다립니다.',
          },
          {
            imageUrl:
              'https://img2.yna.co.kr/etc/inner/KR/2024/06/12/AKR20240612122900002_01_i_P4.jpg',
            contentUrl:
              'https://www.yna.co.kr/view/AKR20240612122900002?input=1195m',
            title: '기업은행·에너지공단, 중기 탄소중립 지원 협약',
            content: '중소기업을 위한 다양한 지원 프로그램을 확인하세요.',
          },
          {
            imageUrl:
              'https://menu.mtn.co.kr/upload/article/2024/06/12/2024061216331812492_00_576.png',
            contentUrl:
              'https://news.mtn.co.kr/news-detail/2024061216331812492',
            title: '카자흐스탄 탄소배출권 시장 개척, MOU 체결',
            content: '국제 협력을 통해 탄소중립을 실현합니다.',
          },
        ]}
        style={{ marginTop: 15 }}
      />
      <View
        style={{
          height: '45%',
          marginTop: 15,
        }}
      >
        <TouchableOpacity
          onPress={() => router.push('/credit/history')}
          style={{ ...styles.container, height: '26%', width: '90%' }}
          activeOpacity={1}
        >
          <Text style={{ fontSize: 17, fontWeight: '700' }}>크레딧 현황</Text>
          <Ionicons size={20} name="chevron-forward" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/finance/hold')}
          style={{ ...styles.container, height: '26%', width: '90%' }}
          activeOpacity={1}
        >
          <Text style={{ fontSize: 17, fontWeight: '700' }}>배출권 현황</Text>
          <Ionicons size={20} name="chevron-forward" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (isPendingData) {
              router.push('/credit/progress')
            }
          }}
          style={{
            height: '26%',
            minWidth: '90%',
            ...styles.container,
            justifyContent: isPendingData ? 'space-between' : 'center',
          }}
          activeOpacity={1}
        >
          {isPendingData ? (
            <>
              <Text style={{ fontSize: 17, fontWeight: '700' }}>
                {progressData[0].detail}
              </Text>
              <Text
                style={{ fontSize: 15, fontWeight: '500', color: '#808080' }}
              >
                산정중
              </Text>
            </>
          ) : (
            <Text style={{ fontSize: 15, fontWeight: '500', color: '#808080' }}>
              물품을 구매하고 크레딧을 적립해 볼 수 있어요
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <View
        style={{
          ...styles.container,
          height: '15%',
          width: '90%',
          padding: 0,
          overflow: 'hidden',
        }}
      >
        <GradientView
          style={{ width: '100%', height: '100%', flexDirection: 'row' }}
        >
          <TouchableOpacity
            onPress={() => router.push('/product/')}
            style={{
              width: 180,
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            activeOpacity={1}
          >
            <Text style={{ fontSize: 18, fontWeight: '700', color: 'white' }}>
              물품 목록
            </Text>
          </TouchableOpacity>
          <View
            style={{
              width: 1,
              height: '70%',
              backgroundColor: 'white',
              alignSelf: 'center',
            }}
          />
          <TouchableOpacity
            onPress={() => router.push('/confirm/')}
            style={{
              width: 180,
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            activeOpacity={1}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                color: 'white',
              }}
            >
              인증하기
            </Text>
          </TouchableOpacity>
        </GradientView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...defaultContainer,
    marginBottom: 15,
  },
})
