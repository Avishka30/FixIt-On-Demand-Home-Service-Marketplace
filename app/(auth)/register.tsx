import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 

// 1. Firebase Imports
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../service/firebaseConfig'; // Check this path matches your folder structure

// Import global CSS
import "../../global.css";

export default function RegisterScreen() {
  const router = useRouter();
  
  // Form State
  const [role, setRole] = useState<'customer' | 'provider'>('customer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // To show spinner while saving

  // 2. The Registration Logic
  const handleRegister = async () => {
    // A. Basic Validation
    if (!email || !password || !name) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      // B. Create User in Firebase Authentication (Email/Pass)
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // C. Save User Details (Name, Role) to Firestore Database
      // We use the 'uid' from Auth as the document ID in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        role: role, // Critical: This saves 'customer' or 'provider'
        createdAt: new Date().toISOString(),
      });

      // D. Success! Navigate to the correct home screen
      Alert.alert("Success", "Account created successfully!");
      
      if (role === 'provider') {
        router.replace('/(provider)/(tabs)/dashboard'); 
      } else {
        router.replace('/(customer)/(tabs)'); 
      }

    } catch (error: any) {
      // Handle Errors (e.g., Email already in use)
      let errorMessage = error.message;
      if (errorMessage.includes("email-already-in-use")) {
        errorMessage = "This email is already registered.";
      }
      Alert.alert("Registration Failed", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-[#000000]">
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Custom Back Button Header */}
      <View className="pt-12 px-6 pb-4">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-[#1A1A1A] justify-center items-center border border-[#333]"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 pb-10">
        
        {/* Title Section */}
        <View className="mb-8">
          <Text className="text-white text-4xl font-extrabold tracking-tight">
            Create Account
          </Text>
          <Text className="text-neutral-400 text-lg mt-2">
            Join the future of home services.
          </Text>
        </View>

        {/* Role Selector */}
        <View className="flex-row bg-[#1A1A1A] p-1 rounded-2xl mb-8 border border-[#333]">
          <TouchableOpacity 
            onPress={() => setRole('customer')}
            className={`flex-1 py-3 rounded-xl justify-center items-center ${role === 'customer' ? 'bg-[#C2E803]' : 'bg-transparent'}`}
          >
            <Text className={`font-bold text-base ${role === 'customer' ? 'text-black' : 'text-gray-400'}`}>
              Homeowner
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setRole('provider')}
            className={`flex-1 py-3 rounded-xl justify-center items-center ${role === 'provider' ? 'bg-[#C2E803]' : 'bg-transparent'}`}
          >
            <Text className={`font-bold text-base ${role === 'provider' ? 'text-black' : 'text-gray-400'}`}>
              Service Provider
            </Text>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View className="space-y-5">
            {/* Full Name */}
            <View>
                <Text className="text-neutral-400 mb-2 ml-1 text-sm font-medium">Full Name</Text>
                <TextInput 
                    className="bg-[#1A1A1A] text-white p-4 rounded-xl border border-[#333] focus:border-[#C2E803]"
                    placeholder="John Doe" 
                    placeholderTextColor="#555"
                    value={name}
                    onChangeText={setName}
                />
            </View>

            {/* Email */}
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

            {/* Password */}
            <View>
                <Text className="text-neutral-400 mb-2 ml-1 text-sm font-medium">Password</Text>
                <TextInput 
                    className="bg-[#1A1A1A] text-white p-4 rounded-xl border border-[#333] focus:border-[#C2E803]"
                    placeholder="Create a password" 
                    placeholderTextColor="#555"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity 
          onPress={handleRegister} // <--- Connected here
          disabled={loading} // Prevent double clicks
          activeOpacity={0.8}
          className="bg-[#C2E803] py-4 rounded-xl items-center shadow-lg shadow-lime-900/20 mt-10 mb-6"
        >
          {loading ? (
             <ActivityIndicator color="black" />
          ) : (
             <Text className="text-black font-bold text-lg uppercase tracking-wider">
               {role === 'customer' ? 'Join as Homeowner' : 'Join as Pro'}
             </Text>
          )}
        </TouchableOpacity>

        {/* Footer */}
        <View className="flex-row justify-center">
            <Text className="text-neutral-400">Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
                <Text className="text-[#C2E803] font-bold">Log In</Text>
            </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}