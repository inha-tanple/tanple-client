// Table.tsx

import { router } from 'expo-router'
import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from 'react-native'

interface Props {
  tableHeaders?: string[][]
  tableData: (string | number)[][][]
  isLeftHead?: boolean
  colorColumn?: number[]
  headerStyle?: StyleProp<ViewStyle>
  dataStyle?: StyleProp<ViewStyle>
}

export default function Table({
  tableHeaders = [],
  tableData,
  colorColumn = [],
  isLeftHead = true,
  ...props
}: Props) {
  const getColorStyle = (value: any) => {
    const numericValue = parseFloat(value)
    if (numericValue > 0) {
      return { color: '#FB4330' }
    } else if (numericValue < 0) {
      return { color: '#3082FB' }
    }
    return null
  }

  const renderHeader = () => (
    <View style={styles.headerRow}>
      {tableHeaders.map((header, headerIndex) => (
        <View key={headerIndex} style={[styles.headerCell, props.headerStyle]}>
          {header.map((item, itemIndex) => (
            <Text
              key={itemIndex}
              style={{
                ...styles.headerText,
                paddingTop: itemIndex > 0 ? 7 : 0,
              }}
            >
              {item}
            </Text>
          ))}
        </View>
      ))}
    </View>
  )

  const renderRow = ({ item }: { item: (string | number)[][] }) => (
    <TouchableOpacity
      // temp onPress handler
      onPress={() =>
        router.push({
          pathname: 'finance/stock/detail/[stockName]',
          params: { stockName: (item[0][0] as string).toLowerCase() },
        })
      }
      style={styles.dataRow}
    >
      {isLeftHead && (
        <Text
          style={{
            ...styles.dataCell,
            ...styles.headerText,
            backgroundColor: '#D6D6D6',
          }}
        >
          {item[0]}
        </Text>
      )}
      {item.slice(isLeftHead ? 1 : 0).map((cellData, cellIndex) => (
        <View key={cellIndex} style={[styles.dataCell, props.dataStyle]}>
          {cellData.map((item, itemIndex) => (
            <Text
              key={itemIndex}
              style={{
                textAlign: 'center',
                paddingTop: itemIndex > 0 ? 7 : 0,
                ...(colorColumn.includes(cellIndex + (isLeftHead ? 1 : 0))
                  ? getColorStyle(cellData[0])
                  : null),
              }}
            >
              {item}
            </Text>
          ))}
        </View>
      ))}
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      {tableHeaders.length > 0 && renderHeader()}
      <FlatList
        data={tableData}
        renderItem={renderRow}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f5f5f5',
  },
  headerCell: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dataRow: {
    flexDirection: 'row',
  },
  dataCell: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },
})
