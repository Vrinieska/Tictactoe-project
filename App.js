import React, { useState } from "react"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, View, ImageBackground, Alert, Text } from "react-native"

import Cell from "./src/components/Cell"

export default function App() {
  const emptyCatArr = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]
  const [catArr, setCatArr] = useState(emptyCatArr)

  const [myTurn, setMyTurn] = useState("x")

  const onPress = (rowIndex, columnIndex) => {
    // console.warn(rowIndex, columnIndex)
    if (catArr[rowIndex][columnIndex] !== "") {
      Alert.alert("position ocupied")
      return // just to make sure the execution ends here
    }

    setCatArr((arrCatExist) => {
      const updatedCatArr = [...arrCatExist]
      console.log("updated array", ...arrCatExist)
      updatedCatArr[rowIndex][columnIndex] = myTurn
      return updatedCatArr
    })

    setMyTurn(myTurn == "x" ? "o" : "x")

    const winner = getWinner()
    if (winner) {
      gameWon(winner)
    } else {
      checkTieState()
    }
  }

  const getWinner = () => {
    //check rows
    for (let i = 0; i < catArr.length; i++) {
      const rowXwin = catArr[i].every((cell) => cell === "x")
      const rowOwin = catArr[i].every((cell) => cell === "o")
      if (rowXwin) {
        return "x"
      }
      if (rowOwin) {
        return "o"
      }
    }
    //check columns
    for (let col = 0; col < catArr.length; col++) {
      const columnXwin = true
      const columnOwin = true
      for (let row = 0; row < catArr.length; row++) {
        if (catArr[row][col] !== "x") {
          columnXwin = false
        }
        if (catArr[row][col] !== "o") {
          columnOwin = false
        }
      }

      if (columnXwin) {
        return "x"
      }
      if (columnOwin) {
        return "o"
      }
    }

    // check diagonals

    let winXdiagonal1 = true
    let winOdiagonal1 = true
    let winXdiagonal2 = true
    let winOdiagonal2 = true

    for (let i = 0; i < catArr.length; i++) {
      if (catArr[i][i] !== "x") {
        winXdiagonal1 = false
      }
      if (catArr[i][i] !== "o") {
        winOdiagonal1 = false
      }

      if (catArr[i][2 - i] !== "x") {
        winXdiagonal2 = false
      }
      if (catArr[i][2 - i] !== "o") {
        winOdiagonal2 = false
      }
    }

    if (winXdiagonal1 || winXdiagonal2) {
      return "x"
    }
    if (winOdiagonal1 || winOdiagonal2) {
      return "o"
    }
  }

  const checkTieState = () => {
    if (!catArr.some((row) => row.some((cell) => cell === ""))) {
      Alert.alert("No one Won ", "it's A tie", [
        {
          text: "start new game",
          onPress: resetGame,
        },
      ])
    }
  }

  //reset the game
  const resetGame = () => {
    setCatArr([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ])
    setMyTurn("x")
  }

  const gameWon = (player) => {
    Alert.alert("yayyy", `Player ${player} won`, [
      {
        text: "Start Again",
        onPress: resetGame,
      },
    ])
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imgBg}
        resizeMode="contain"
        source={require("./assets/tic.png")}
      >
        <Text style={styles.turnText}>
          Current Turn: {myTurn.toUpperCase()}
        </Text>
        <View style={styles.map}>
          {catArr.map((row, rowIndex) => (
            <View style={styles.row} key={rowIndex}>
              {row.map((cell, columnIndex) => (
                <Cell
                  key={`row ${rowIndex} col ${columnIndex}`}
                  onPress={() => onPress(rowIndex, columnIndex)}
                  cell={cell}
                />
              ))}
            </View>
          ))}
        </View>
      </ImageBackground>

      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  imgBg: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    borderWidth: 1,
    borderColor: "green",
    height: "52%",
    aspectRatio: 1,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    // borderBottomColor: "red",
    // borderWidth: 2,
    padding: 5,
  },
  turnText: {
    fontSize: 24,
    fontWeight: "500",
    color: "white",
  },
})
