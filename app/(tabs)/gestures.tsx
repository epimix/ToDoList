import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

const cardsArray = [
  { id: 1, image: 'https://i.pinimg.com/736x/ef/aa/85/efaa85262c2979c0bce49d0dc643d49e.jpg' },
  { id: 2, image: 'https://i.pinimg.com/736x/cc/24/94/cc24944e6c1858d4e57dd64692cc7f7f.jpg' },
  { id: 3, image: 'https://i.pinimg.com/736x/f8/6d/bb/f86dbb14ac8a476fe691ef6a5bb3de6e.jpg' },
  { id: 4, image: 'https://i.pinimg.com/736x/51/d8/58/51d858464b610fb89486104274086dff.jpg' },
  { id: 5, image: 'https://i.pinimg.com/736x/62/71/21/627121c616927469a5afe87589f779bf.jpg' },
  { id: 6, image: 'https://i.pinimg.com/736x/aa/f1/68/aaf1686166174fbeb29bc226f78b1d6c.jpg' },
  { id: 7, image: 'https://i.pinimg.com/736x/9a/8a/15/9a8a1596d92d7db9bc96a6b7b870df9c.jpg' },
  { id: 8, image: 'https://i.pinimg.com/736x/ed/98/ab/ed98ab22e8eb7acb28a444fe11978a96.jpg' },
  { id: 9, image: 'https://i.pinimg.com/1200x/c9/14/78/c9147839a76c6ec8abb24578bfff67a9.jpg' },
  { id: 10, image: 'https://i.pinimg.com/736x/bc/87/cf/bc87cf937da31729dfef27896b0bf07a.jpg' },
];

function Card({ item, isTopCard, onSwipe }: { item: any, isTopCard: boolean, onSwipe: () => void }) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .enabled(isTopCard)
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      if (Math.abs(event.translationX) > 100) {
        translateX.value = withTiming(event.translationX > 0 ? 500 : -500, { duration: 300 }, () => {
          runOnJS(onSwipe)();
        });
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value }
      ],
      position: 'absolute'
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <Image style={styles.image} source={{ uri: item.image }} />
      </Animated.View>
    </GestureDetector>
  );
}

export default function GesturesScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = () => {
    setCurrentIndex(prev => prev + 1);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      {currentIndex >= cardsArray.length ? (
        <View style={styles.doneContainer}>
          <Text style={styles.doneText}>No more pictures!</Text>
          <TouchableOpacity onPress={() => setCurrentIndex(0)} style={styles.reloadButton}>
            <Text style={styles.reloadText}>Reload</Text>
          </TouchableOpacity>
        </View>
      ) : (
        cardsArray.map((item, index) => {
          if (index < currentIndex) return null;
          
          return (
            <Card
              key={item.id}
              item={item}
              isTopCard={index === currentIndex}
              onSwipe={handleSwipe}
            />
          );
        }).reverse()
      )}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  card: {
    width: 320,
    height: 480,
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  doneContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  doneText: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20
  },
  reloadButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10
  },
  reloadText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold'
  }
});
