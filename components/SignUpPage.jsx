import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const SignUpPage = ({ navigation }) => {
  const [userType, setUserType] = useState('donator');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    organization: '',
    address: '',
    registrationNumber: '', // For trusts/NGOs
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const { name, email, phone, password, confirmPassword } = formData;
    
    if (!name || !email || !phone || !password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return false;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }
    
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return false;
    }
    
    if (userType === 'trust' && (!formData.organization || !formData.registrationNumber)) {
      Alert.alert('Error', 'Please fill in organization details');
      return false;
    }
    
    return true;
  };

  const handleSignUp = () => {
    if (validateForm()) {
      console.log('Sign up attempt:', { userType, ...formData });
      // Add your signup logic here
    }
  };

  const UserTypeSelector = () => (
    <View style={styles.userTypeContainer}>
      <TouchableOpacity
        style={[
          styles.userTypeButton,
          userType === 'donator' && styles.activeUserType
        ]}
        onPress={() => setUserType('donator')}
      >
        <Icon 
          name="restaurant" 
          size={24} 
          color={userType === 'donator' ? '#fff' : '#388E3C'} 
        />
        <Text style={[
          styles.userTypeText,
          userType === 'donator' && styles.activeUserTypeText
        ]}>
          Donator
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.userTypeButton,
          userType === 'trust' && styles.activeUserType
        ]}
        onPress={() => setUserType('trust')}
      >
        <Icon
          name="volunteer-activism"
          size={24}
          color={userType === 'trust' ? '#fff' : '#333'}
        />
        <Text style={[
          styles.userTypeText,
          userType === 'trust' && styles.activeUserTypeText
        ]}>
          Trust
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderInput = (field, placeholder, icon, options = {}) => (
    <View style={styles.inputContainer}>
      <Icon name={icon} size={20} color="#666" style={styles.inputIcon} />
      <TextInput
        style={[styles.input, options.password && styles.passwordInput]}
        placeholder={placeholder}
        value={formData[field]}
        onChangeText={(value) => handleInputChange(field, value)}
        placeholderTextColor="#999"
        {...options}
      />
      {options.password && (
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => options.field === 'password' 
            ? setShowPassword(!showPassword) 
            : setShowConfirmPassword(!showConfirmPassword)
          }
        >
          <Icon 
            name={options.showPassword ? "visibility" : "visibility-off"} 
            size={20} 
            color="#666" 
          />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={['#A5D6A7', '#C8E6C9', '#A5D6A7']}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-back" size={24} color="#2E7D32" />
            </TouchableOpacity>
            
            <View style={styles.logoContainer}>
              <Image
                source={require("./images/logo.png")}
                style={styles.iconImage}
              />
              <Text style={styles.appTitle}>Join FoodConnect</Text>
              <Text style={styles.appSubtitle}>Make a difference in your community</Text>
            </View>
          </View>

          {/* Sign Up Form */}
          <View style={styles.formContainer}>
            <Text style={styles.welcomeText}>Create Account</Text>
            <Text style={styles.subtitle}>
              {userType === 'donator' 
                ? 'Help reduce food waste by sharing surplus food'
                : 'Connect with food donors to serve your community'
              }
            </Text>

            <UserTypeSelector />

            {/* Basic Information */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Personal Information</Text>
              
              {renderInput('name', 'Full Name', 'person', { autoCapitalize: 'words' })}
              {renderInput('email', 'Email Address', 'email', { 
                keyboardType: 'email-address', 
                autoCapitalize: 'none' 
              })}
              {renderInput('phone', 'Phone Number', 'phone', { keyboardType: 'phone-pad' })}
            </View>

            {/* Organization Information (for trusts) */}
            {userType === 'trust' && (
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Organization Details</Text>
                
                {renderInput('organization', 'Organization/Trust Name', 'business', { 
                  autoCapitalize: 'words' 
                })}
                {renderInput('registrationNumber', 'Registration Number', 'confirmation-number')}
                {renderInput('address', 'Complete Address', 'location-on', { 
                  multiline: true,
                  numberOfLines: 3
                })}
              </View>
            )}

            {/* Security Information */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Security</Text>
              
              {renderInput('password', 'Password', 'lock', { 
                password: true,
                secureTextEntry: !showPassword,
                showPassword: showPassword,
                field: 'password'
              })}
              
              {renderInput('confirmPassword', 'Confirm Password', 'lock', { 
                password: true,
                secureTextEntry: !showConfirmPassword,
                showPassword: showConfirmPassword,
                field: 'confirmPassword'
              })}
            </View>

            {/* Terms and Conditions */}
            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                By signing up, you agree to our{' '}
                <Text style={styles.termsLink}>Terms of Service</Text>
                {' '}and{' '}
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
              <LinearGradient
                colors={userType === 'donator' ? ['#388E3C', '#2E7D32'] : ['#388E3C', '#2E7D32']}
                style={styles.signUpGradient}
              >
                <Text style={styles.signUpButtonText}>Create Account</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 50,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 10,
    padding: 10,
    zIndex: 1,
  },
  logoContainer: {
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginTop: -17,
  },
  appSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 20,
  },
  userTypeContainer: {
    flexDirection: 'row',
    marginBottom: 25,
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 5,
  },
  userTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  activeUserType: {
    backgroundColor: '#388E3C',
    shadowColor: '#388E3C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  userTypeText: {
    marginLeft: 6,
    fontSize: 15,
    fontWeight: '600',
    color: '#666',
  },
  activeUserTypeText: {
    color: '#fff',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 15,
    paddingLeft: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    minHeight: 55,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 15,
    color: '#333',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    padding: 5,
  },
  termsContainer: {
    marginBottom: 25,
    paddingHorizontal: 5,
  },
  termsText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: '#2E7D32',
    fontWeight: '600',
  },
  signUpButton: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  signUpGradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: '#666',
    fontSize: 14,
  },
  loginLink: {
    color: '#2E7D32',
    fontSize: 14,
    fontWeight: 'bold',
  },
  iconImage: {
    width: 100,
    height:100,
    marginTop:15,
  },
});

export default SignUpPage;