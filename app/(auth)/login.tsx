import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
// Import your global CSS
import "../../global.css";
// Using Ionicons for the Google Icon (standard in Expo)
import { Ionicons } from '@expo/vector-icons'; 

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    console.log("Sign In Pressed with:", email, password);
    // Future: Add Firebase Login Logic here
  };

  const handleGoogleLogin = () => {
    console.log("Google Login Pressed");
    // Future: Add Google Auth Logic here
  };

  return (
    <View className="flex-1 bg-[#000000]">
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* ScrollView ensures the screen is scrollable on small devices when keyboard opens */}
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} className="px-6">
        
        {/* 1. Header Section */}
        <View className="mb-10 mt-6">
            {/* Logo Icon */}
            <View className="w-12 h-12 rounded-full border border-[#C2E803] justify-center items-center mb-6">
               <Text className="text-[#C2E803] text-xl font-bold">F</Text>
            </View>

            <Text className="text-white text-4xl font-extrabold tracking-tight">
                Let's Sign you in.
            </Text>
            <Text className="text-neutral-400 text-lg mt-3 leading-6">
                Welcome back. 
                <Text className="text-[#C2E803]"> You've been missed!</Text>
            </Text>
        </View>

        {/* 2. Form Section */}
        <View className="space-y-6">
            {/* Email Input */}
            <View>
                <Text className="text-neutral-400 mb-2 ml-1 text-sm font-medium">Email Address</Text>
                <TextInput 
                    className="bg-[#1A1A1A] text-white p-4 rounded-xl border border-[#333] focus:border-[#C2E803]"
                    placeholder="name@example.com" 
                    placeholderTextColor="#555"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>

            {/* Password Input */}
            <View>
                <Text className="text-neutral-400 mb-2 ml-1 text-sm font-medium">Password</Text>
                <TextInput 
                    className="bg-[#1A1A1A] text-white p-4 rounded-xl border border-[#333] focus:border-[#C2E803]"
                    placeholder="Enter your password" 
                    placeholderTextColor="#555"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                {/* Forgot Password Link */}
                <TouchableOpacity className="self-end mt-2">
                    <Text className="text-neutral-500 text-sm">Forgot Password?</Text>
                </TouchableOpacity>
            </View>
        </View>

        {/* 3. Action Buttons */}
        <View className="mt-8">
            {/* Primary Login Button */}
            <TouchableOpacity 
                onPress={handleSignIn}
                activeOpacity={0.8}
                className="bg-[#C2E803] py-4 rounded-xl items-center shadow-lg shadow-lime-900/20 mb-4"
            >
                <Text className="text-black font-bold text-lg uppercase tracking-wider">
                    Sign In
                </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center my-6">
                <View className="flex-1 h-[1px] bg-[#333]" />
                <Text className="text-neutral-500 mx-4 text-sm">Or continue with</Text>
                <View className="flex-1 h-[1px] bg-[#333]" />
            </View>

            {/* Google Login Button */}
            <TouchableOpacity 
                onPress={handleGoogleLogin}
                activeOpacity={0.8}
                className="bg-white py-4 rounded-xl flex-row justify-center items-center space-x-3"
            >
                <Ionicons name="logo-google" size={20} color="black" />
                <Text className="text-black font-bold text-lg ml-2">Google</Text>
            </TouchableOpacity>
        </View>

        {/* 4. Footer */}
        <View className="flex-row justify-center mt-10 mb-6">
            <Text className="text-neutral-400">Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                <Text className="text-[#C2E803] font-bold">Register</Text>
            </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}