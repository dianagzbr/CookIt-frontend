import { Image, StyleSheet } from "react-native";
import Food from "../../../assets/comida3.jpg"

const ImageForm = () => {
  return (
    <Image style={styles.image} source={Food}/>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 430,
    height: 300,
    borderBottomLeftRadius: 180,
    borderBottomRightRadius: 180,
  }
})

export default ImageForm
