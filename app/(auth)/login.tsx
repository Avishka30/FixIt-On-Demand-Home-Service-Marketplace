import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 

// 1. Firebase Imports
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
// Make sure this path matches your folder name ('service' vs 'services')
import { auth, db } from '../../service/firebaseConfig';

// 2. CSS Import
import "../../global.css";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // 3. Login Logic
  const handleSignIn = async () => {
    // A. Validation
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      // B. Authenticate with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // C. Fetch User Role from Firestore Database
      // We need to know if they are a 'customer' or 'provider'
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData.role;

        // D. Route based on Role
        if (role === 'provider') {
           // Go to Provider Dashboard
           router.replace('/(provider)/main');
        } else {
           // Go to Customer Home
           router.replace('/main');
        }
      } else {
        Alert.alert("Error", "User data not found in database.");
      }

    } catch (error: any) {
      // Handle Firebase Errors
      let msg = error.message;
      if (msg.includes("invalid-credential")) msg = "Invalid email or password.";
      Alert.alert("Login Failed", msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google Login Pressed");
    // Google Auth requires extra setup (expo-auth-session), keeping this as placeholder for now
    Alert.alert("Coming Soon", "Google Login is not yet configured.");
  };

  return (
    <View className="flex-1 bg-[#000000]">
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} className="px-6">
        
        {/* Header Section */}
        <View className="mb-10 mt-6">
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

        {/* Form Section */}
        <View className="space-y-6">
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
                <TouchableOpacity className="self-end mt-2">
                    <Text className="text-neutral-500 text-sm">Forgot Password?</Text>
                </TouchableOpacity>
            </View>
        </View>

        {/* Action Buttons */}
        <View className="mt-8">
            <TouchableOpacity 
                onPress={handleSignIn}
                disabled={loading}
                activeOpacity={0.8}
                className="bg-[#C2E803] py-4 rounded-xl items-center shadow-lg shadow-lime-900/20 mb-4"
            >
                {loading ? (
                    <ActivityIndicator color="black" />
                ) : (
                    <Text className="text-black font-bold text-lg uppercase tracking-wider">
                        Sign In
                    </Text>
                )}
            </TouchableOpacity>

            <View className="flex-row items-center my-6">
                <View className="flex-1 h-[1px] bg-[#333]" />
                <Text className="text-neutral-500 mx-4 text-sm">Or continue with</Text>
                <View className="flex-1 h-[1px] bg-[#333]" />
            </View>

            <TouchableOpacity 
                onPress={handleGoogleLogin}
                activeOpacity={0.8}
                className="bg-white py-4 rounded-xl flex-row justify-center items-center space-x-3"
            >
                <Ionicons name="logo-google" size={20} color="black" />
                <Text className="text-black font-bold text-lg ml-2">Google</Text>
            </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="flex-row justify-center mt-10 mb-6">
            <Text className="text-neutral-400">Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/register')}>
                <Text className="text-[#C2E803] font-bold">Register</Text>
            </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}