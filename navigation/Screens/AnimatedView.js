import {React,useState,useEffect,useRef} from 'react';
import { Animated } from 'react-native';

export default function AnimatedView({navigation})
{
    const animatedOpacity = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(animatedOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver:true,
        }).start();
      }, 
      navigation.navigate("signup"),
      []);

    return( 
        <Animated.View
        
        style={{
          height: 100,
          widht: 100,
          opacity: animatedOpacity,
          backgroundColor: 'yellow',
        
        }}
      />
    );
}