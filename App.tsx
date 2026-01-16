
import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Animated,
  PanResponder,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { Card } from './components/Card';
import { INITIAL_CARDS } from './constants';

const { width, height } = Dimensions.get('window');
const CARD_ASPECT_RATIO = 1.586; // Standard credit card aspect ratio
const CARD_WIDTH = width * 0.8;
const CARD_HEIGHT = CARD_WIDTH / CARD_ASPECT_RATIO;
const STACK_CARD_SEPARATION = 50; // Vertical separation for stacked cards

const App: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const cardAnimations = useRef(
    INITIAL_CARDS.map(() => ({
      position: new Animated.ValueXY({ x: 0, y: 0 }),
      scale: new Animated.Value(1),
    }))
  ).current;

  const animateCards = (activeIndex: number | null) => {
    const isCardSelected = activeIndex !== null;
    
    INITIAL_CARDS.forEach((_, i) => {
      const scale = 1 - (INITIAL_CARDS.length - 1 - i) * 0.04;
      
      let toValueY, toValueScale;

      if (isCardSelected) {
        if (i === activeIndex) {
          // Focused card
          toValueY = -CARD_HEIGHT * 0.5;
          toValueScale = 1.1;
        } else {
          // Other cards stack at the bottom
          const position = i < activeIndex ? i : i - 1;
          toValueY = height * 0.35 + position * 15;
          toValueScale = 0.9;
        }
      } else {
        // Initial stack position
        toValueY = -i * STACK_CARD_SEPARATION;
        toValueScale = scale;
      }
      
      Animated.spring(cardAnimations[i].position, {
        toValue: { x: 0, y: toValueY },
        useNativeDriver: false, // position does not support native driver well
      }).start();

      Animated.spring(cardAnimations[i].scale, {
        toValue: toValueScale,
        useNativeDriver: true,
      }).start();
    });
  };

  useEffect(() => {
    animateCards(null); // Initial animation
  }, []);
  
  const handlePress = (index: number) => {
    const newSelectedIndex = selectedIndex === index ? null : index;
    setSelectedIndex(newSelectedIndex);
    animateCards(newSelectedIndex);
  };
  
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => selectedIndex !== null,
      onPanResponderMove: (_, gestureState) => {
          if (selectedIndex !== null) {
            cardAnimations[selectedIndex].position.setValue({ x: gestureState.dx, y: cardAnimations[selectedIndex].position.y._value });
          }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (selectedIndex === null) return;
        
        if (Math.abs(gestureState.dx) > width / 4) {
          const direction = gestureState.dx > 0 ? 1 : -1;
          let nextIndex = selectedIndex - direction; // Inverted because top of stack is end of array
          
          if (nextIndex >= 0 && nextIndex < INITIAL_CARDS.length) {
             handlePress(nextIndex); // This will handle setting state and animating
          } else {
             handlePress(selectedIndex); // Swipe out of bounds, snap back
          }
        } else {
            handlePress(selectedIndex); // Not a strong enough swipe, snap back
        }
      },
    })
  ).current;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardArea} {...panResponder.panHandlers}>
        {INITIAL_CARDS.map((card, index) => {
          const isSelected = selectedIndex === index;
          
          const animatedStyle = {
            transform: [
              { translateX: cardAnimations[index].position.x },
              { translateY: cardAnimations[index].position.y },
              { scale: cardAnimations[index].scale },
            ],
            zIndex: isSelected ? 100 : INITIAL_CARDS.length - index,
          };

          return (
            <TouchableOpacity
              key={card.id}
              activeOpacity={0.9}
              onPress={() => handlePress(index)}
            >
              <Card card={card} style={animatedStyle} />
            </TouchableOpacity>
          );
        }).reverse()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E', // Dark background like Apple Wallet
  },
  cardArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50, // Give some space from the top
    position: 'relative',
  },
});

export default App;
