import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface Props {
  tableHeaders?: string[][]
  tableData: (string | number)[][][]
  isLeftHead?: boolean
}

const Table = ({ tableHeaders = [], tableData, isLeftHead = true }: Props) => {
  const sliceNum = isLeftHead ? 1 : 0
  return (
    <View style={styles.container}>
      {tableHeaders.length > 0 && (
        <View style={styles.row}>
          {tableHeaders.map((header, headerIndex) => (
            <View
              key={headerIndex}
              style={{
                ...styles.cell,
                paddingVertical: 7,
                backgroundColor: '#D6D6D6',
              }}
            >
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
      )}
      {tableData.map((rowData, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {isLeftHead && (
            <Text
              style={{
                ...styles.cell,
                ...styles.headerText,
                backgroundColor: '#D6D6D6',
              }}
            >
              {rowData[0]}
            </Text>
          )}
          {rowData.slice(sliceNum).map((cellData, cellIndex) => (
            <View key={cellIndex} style={{ ...styles.cell }}>
              {cellData.map((item, itemIndex) => (
                <Text
                  key={itemIndex}
                  style={{
                    textAlign: 'center',
                    paddingTop: itemIndex > 0 ? 7 : 0,
                  }}
                >
                  {item}
                </Text>
              ))}
            </View>
          ))}
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 12,
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default Table
