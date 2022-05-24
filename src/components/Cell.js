import React from "react"
import { View, Pressable, StyleSheet } from "react-native"
import Cross from "./Cross"

const Cell = (props) => {
  const { cell, onPress } = props
  return (
    <Pressable onPress={() => onPress()} style={styles.cell}>
      {cell == "o" && <View style={styles.circle} />}
      {cell == "x" && <Cross />}
    </Pressable>
  )
}

export default Cell

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    width: 100,
    height: 100,
  },
  circle: {
    flex: 1,
    width: 80,
    height: 80,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "white",
    borderWidth: 8,
    borderColor: "black",
    borderRadius: 50,
    marginLeft: 40,
    marginTop: 30,
    marginBottom: 20,
  },
})
