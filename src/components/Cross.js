import React from "react"
import { View, StyleSheet } from "react-native"


const Cross = () => {
  return (
    <View style={styles.crossLine}>
      <View style={[styles.crossLine, styles.crossLineReverse]}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  crossLine: {
    left: 70,
    top: 10,
    backgroundColor: "red",
    width: 20,
    height: 85,
    backgroundColor: "red",
    borderRadius: 10,
    transform: [{ rotate: "50deg" }],
  },
  crossLineReverse: {
    left: 5,
    transform: [{ rotate: "-90deg" }],
  },
})

export default Cross
