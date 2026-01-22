import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
// Import your global CSS for NativeWind
import "../global.css";

const WelcomeScreen = () => {
  const router = useRouter();

  const handleLogin = () => {
    // Navigate to the login page (create app/login.tsx later)
   // router.push('/login'); 
  };

  const handleSignUp = () => {
    // Navigate to the register page (create app/register.tsx later)
  //  router.push('/register');
  };

  return (
    <View className="flex-1 bg-[#000000]">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Background Image with Overlay */}
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1581578731117-104f2a41272c?q=80&w=2070&auto=format&fit=crop' }} 
        className="flex-1 justify-between"
        resizeMode="cover"
      >
        {/* Dark Overlay for text readability */}
        <View className="flex-1 bg-black/70 justify-between px-6 py-12">
          
          {/* 1. Header & Logo */}
          <View className="items-center mt-20">
            {/* Logo Circle */}
            <View className="w-24 h-24 rounded-full border-2 border-[#C2E803] justify-center items-center mb-4 bg-black/50">
               <Text className="text-[#C2E803] text-4xl font-bold">F</Text>
            </View>

            {/* App Name */}
            <Text className="text-white text-5xl font-extrabold tracking-tighter">
              FixIt<Text className="text-[#C2E803]">.</Text>
            </Text>

            <Text className="text-gray-300 text-center text-lg mt-2 tracking-wide">
              The Uber for Home Services
            </Text>
          </View>

          {/* 2. Action Buttons */}
          {/* Removed space-y-4, handled spacing via button margin below */}
          <View className="w-full mb-8">
            
            {/* Get Started (Sign Up) */}
            {/* Added 'mb-4' here to create space between this and the next button */}
            <TouchableOpacity 
              onPress={handleSignUp}
              activeOpacity={0.8}
              className="bg-[#C2E803] py-4 rounded-xl items-center shadow-lg shadow-lime-900/20 mb-4"
            >
              <Text className="text-black font-bold text-lg uppercase tracking-wider">
                Get Started
              </Text>
            </TouchableOpacity>

            {/* Login */}
            <TouchableOpacity 
              onPress={handleLogin}
              activeOpacity={0.7}
              className="bg-[#222222] border border-[#333333] py-4 rounded-xl items-center"
            >
              <Text className="text-white font-semibold text-lg">
                I already have an account
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </ImageBackground>
    </View>
  );
};

export default WelcomeScreen;