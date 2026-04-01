import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export default function ProgressScreen() {
  const [progress, setProgress] = useState(0);

  const progressAnim = useSharedValue(0);

  const handleNext = () => {
    let newValue = progress >= 100 ? 0 : progress + 25;

    setProgress(newValue);
    progressAnim.value = withTiming(newValue, { duration: 500 });
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: `${progressAnim.value}%`,
      backgroundColor: interpolateColor(
        progressAnim.value,
        [0, 25, 50, 75, 100],
        ['green', 'green', 'blue', 'yellow', 'red']
      ),
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.progressContainer}>
        <Animated.View style={[styles.progressFill, animatedStyles]}>
          <Text style={styles.progressText}>{progress}%</Text>
        </Animated.View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  progressContainer: {
    height: 30,
    backgroundColor: '#eee',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressFill: {
    height: '100%',
    justifyContent: 'center',
  },
  progressText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3b82f6',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
