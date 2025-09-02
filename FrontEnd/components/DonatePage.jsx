import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Alert,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DonatePage = ({ navigation }) => {
  // Food Details
  const [foodName, setFoodName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiry, setExpiry] = useState('');
  const [description, setDescription] = useState('');

  // Your Details
  const [yourName, setYourName] = useState('');
  const [yourEmail, setYourEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');

  const handleSubmit = () => {
    if (!foodName || !quantity || !yourName || !contactNumber || !pickupAddress) {
      Alert.alert('Error', 'Please fill all mandatory fields');
      return;
    }

    Alert.alert(
      'Thank you!',
      'Your food donation has been submitted successfully. We will contact you soon for pickup.',
      [
        {
          text: 'OK',
          onPress: () => {
            // Reset form fields
            setFoodName('');
            setCategory('');
            setQuantity('');
            setExpiry('');
            setDescription('');
            setYourName('');
            setYourEmail('');
            setContactNumber('');
            setPickupAddress('');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={['#A5D6A7', '#C8E6C9', '#A5D6A7']} style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContainer} 
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Header Section */}
            <View style={styles.headerSection}>
              <TouchableOpacity 
                style={styles.backButton} 
                onPress={() => navigation.goBack()}
              >
                <Icon name="arrow-back" size={24} color="#2E7D32" />
              </TouchableOpacity>             
              <Image
                source={require("./images/logo.png")}
                style={styles.iconImage}
              />              
              <Text style={styles.appTitle}>FoodConnect</Text>
              <Text style={styles.pageTitle}>Donate Food</Text>
              <Text style={styles.pageSubtitle}>Share your surplus food with those in need</Text>
            </View>

            {/* Food Details Section */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Icon name="fastfood" size={24} color="#2E7D32" />
                <Text style={styles.sectionTitle}>Food Details</Text>
              </View>

              <View style={styles.formContainer}>
                {/* Food Name */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Food Name *</Text>
                  <TextInput
                    style={styles.input}
                    value={foodName}
                    onChangeText={setFoodName}
                    placeholder="e.g., Rice & Curry, Sandwiches"
                    placeholderTextColor="#6B8E73"
                  />
                </View>

                {/* Food Category */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Food Category</Text>
                  <TextInput
                    style={styles.input}
                    value={category}
                    onChangeText={setCategory}
                    placeholder="e.g., Vegetarian, Non-Veg, Vegan"
                    placeholderTextColor="#6B8E73"
                  />
                </View>

                {/* Quantity */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Quantity *</Text>
                  <TextInput
                    style={styles.input}
                    value={quantity}
                    onChangeText={setQuantity}
                    placeholder="e.g., 10 plates, 5 kg, 20 servings"
                    placeholderTextColor="#6B8E73"
                  />
                </View>

                {/* Best Before */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Best Before</Text>
                  <TextInput
                    style={styles.input}
                    value={expiry}
                    onChangeText={setExpiry}
                    placeholder="e.g., Today 8 PM, Tomorrow morning"
                    placeholderTextColor="#6B8E73"
                  />
                </View>

                {/* Additional Details */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Additional Details</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Any special notes, ingredients, preparation details..."
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    placeholderTextColor="#6B8E73"
                  />
                </View>
              </View>
            </View>

            {/* Your Details Section */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Icon name="person" size={24} color="#2E7D32" />
                <Text style={styles.sectionTitle}>Your Details</Text>
              </View>

              <View style={styles.formContainer}>
                {/* Your Name */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Your Name *</Text>
                  <TextInput
                    style={styles.input}
                    value={yourName}
                    onChangeText={setYourName}
                    placeholder="Enter your full name"
                    placeholderTextColor="#6B8E73"
                  />
                </View>

                {/* Your Email */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Your Email</Text>
                  <TextInput
                    style={styles.input}
                    value={yourEmail}
                    onChangeText={setYourEmail}
                    placeholder="your.email@example.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#6B8E73"
                  />
                </View>

                {/* Contact Number */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Your Contact Number *</Text>
                  <TextInput
                    style={styles.input}
                    value={contactNumber}
                    onChangeText={setContactNumber}
                    placeholder="Phone number for coordination"
                    keyboardType="phone-pad"
                    placeholderTextColor="#6B8E73"
                  />
                </View>

                {/* Pickup Address */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Pickup Address *</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    value={pickupAddress}
                    onChangeText={setPickupAddress}
                    placeholder="Complete address with landmarks for easy pickup"
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                    placeholderTextColor="#6B8E73"
                  />
                </View>
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity 
              style={styles.submitButton} 
              onPress={handleSubmit} 
              activeOpacity={0.8}
            >
              <LinearGradient 
                colors={['#4CAF50', '#388E3C']} 
                style={styles.submitGradient}
              >
                <Icon name="volunteer-activism" size={24} color="#fff" />
                <Text style={styles.submitText}>Donate Now</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Info Text */}
            <Text style={styles.infoText}>
              By donating, you help reduce food waste and feed those in need. Thank you for making a difference!
            </Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerSection: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 50,
    padding: 8,
  },
  logo: {
    marginBottom: 10,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginTop: -15,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 16,
    color: '#4A7C59',
    textAlign: 'center',
  },
  sectionContainer: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingLeft: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginLeft: 10,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E7D32',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F1F8E9',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#1B5E20',
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 20,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 30,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#4A7C59',
    textAlign: 'center',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  iconImage: {
    width: 100,
    height: 100,
    marginTop: 40,
  },
});

export default DonatePage;
