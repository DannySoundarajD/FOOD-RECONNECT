import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Image,
  ScrollView,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

const queries = [
  { text: "How to donate food?", emoji: "🥫" },
  { text: "What food is accepted?", emoji: "🍎" },
  { text: "Find a nearby donation center?", emoji: "📍" },
  { text: "How to volunteer?", emoji: "🤝" },
  { text: "What are the operational hours?", emoji: "⏰" },
];

const QuerySuggestions = ({ onQueryPress }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.queryContainer}
      contentContainerStyle={styles.queryContent}
    >
      {queries.map((query, index) => (
        <TouchableOpacity
          key={index}
          style={styles.queryButton}
          onPress={() => onQueryPress(query.text)}
        >
          <Text style={styles.queryEmoji}>{query.emoji}</Text>
          <Text style={styles.queryText}>{query.text}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const ChatbotAssistant = () => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello! How can I assist you with food donations today?', sender: 'bot' },
  ]);
  const [inputText, setInputText] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const flatListRef = useRef();

  const sendMessage = () => {
    if (!inputText.trim()) return;
    
    // Add user's message
    const inputMessage = inputText.trim();
    const newMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
    };
    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    Keyboard.dismiss(); // Dismiss the keyboard after sending the message
    
    // Show thinking animation
    setIsBotTyping(true);
    
    // Simulate a bot response
    setTimeout(() => {
      let botResponse = 'I am an assistant to help you with the app. You can ask me about donating food, exploring nearby options, or your donation history.';
      if (inputMessage.toLowerCase().includes('donate')) {
        botResponse = 'To donate food, please tap on the "Donate Food" button on the home page. It will guide you through the process.';
      } else if (inputMessage.toLowerCase().includes('history')) {
        botResponse = 'You can check your past donations and track your impact in the "My History" section.';
      } else if (inputMessage.toLowerCase().includes('hello') || inputMessage.toLowerCase().includes('hi')) {
        botResponse = 'Hello there! How can I assist you?';
      } else if (inputMessage.toLowerCase().includes('nearby')) {
        botResponse = 'To find nearby food donation opportunities, please use the "Explore Nearby" feature on the home page.';
      } else if (inputMessage.toLowerCase().includes('volunteer')) {
        botResponse = 'We appreciate your interest in volunteering! Please visit the "Volunteer" section to see available opportunities.';
      } else if (inputMessage.toLowerCase().includes('hours') || inputMessage.toLowerCase().includes('time')) {
        botResponse = 'Our donation centers are typically open from 9 AM to 6 PM, Monday through Saturday. Please check specific locations for exact hours.';
      } else if (inputMessage.toLowerCase().includes('accepted') || inputMessage.toLowerCase().includes('accept')) {
        botResponse = 'We accept non-perishable food items like canned goods, rice, pasta, and sealed packaged foods. We cannot accept expired items or homemade food.';
      }

      const botReply = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        liked: false,
        disliked: false,
      };
      
      // Hide thinking animation and add bot response
      setIsBotTyping(false);
      setMessages(prev => [...prev, botReply]);
    }, 1500);
  };

  const handleFeedback = (messageId, type) => {
    setMessages(prevMessages =>
      prevMessages.map(msg => {
        if (msg.id === messageId) {
          if (type === 'like') {
            return { ...msg, liked: !msg.liked, disliked: false };
          } else if (type === 'dislike') {
            return { ...msg, disliked: !msg.disliked, liked: false };
          }
        }
        return msg;
      })
    );
  };

  const handleQueryPress = (query) => {
    setInputText(query);
    sendMessage();
  };

  useEffect(() => {
    // Scroll to bottom when messages change
    if (messages.length > 0 && flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const renderMessageItem = ({ item }) => {
    const isUser = item.sender === 'user';
    return (
      <View style={[styles.messageRow, isUser ? styles.userMessageRow : styles.botMessageRow]}>
        {!isUser && (
          <View style={styles.botIconContainer}>
           <Icon name="eco" size={24} color="#2E7D32" />
          </View>
        )}
        <View style={[styles.messageContainer, isUser ? styles.userMessage : styles.botMessage]}>
          <Text style={[styles.messageText, isUser ? styles.userText : styles.botText]}>
            {item.text}
          </Text>
          {item.sender === 'bot' && (
            <View style={styles.feedbackContainer}>
              <TouchableOpacity
                style={styles.feedbackButton}
                onPress={() => handleFeedback(item.id, 'like')}
              >
                <IconCommunity
                  name="thumb-up"
                  size={18}
                  color={item.liked ? 'blue' : 'black'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.feedbackButton}
                onPress={() => handleFeedback(item.id, 'dislike')}
              >
                <IconCommunity
                  name="thumb-down"
                  size={18}
                  color={item.disliked ? 'red' : 'black'}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
        {isUser && (
          <View style={styles.userIconContainer}>
            <Icon name="person" size={24} color="#1B5E20" />
          </View>
        )}
      </View>
    );
  };

  const renderTypingIndicator = () => {
    if (!isBotTyping) return null;
    
    return (
      <View style={[styles.messageRow, styles.botMessageRow]}>
        <View style={styles.botIconContainer}>
          <Icon name="eco" size={24} color="#2E7D32" />
        </View>
        <View style={[styles.messageContainer, styles.botMessage]}>
          <View style={styles.typingContainer}>
            <ActivityIndicator size="small" color="black" />
            <Text style={[styles.messageText, styles.botText, styles.typingText]}>
              Thinking...
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={['#A5D6A7', '#C8E6C9', '#A5D6A7']} style={styles.background}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          {/* Logo & Title Section */}
          <View style={styles.headerSection}>
            <Image
              source={require("./images/logo.png")}
              style={styles.iconImage}
            />
            <Text style={styles.appTitle}>FoodConnect</Text>
            <Text style={styles.appSubtitle}>Clear your Queries with chat Assistant</Text>
          </View>

          <FlatList
            data={messages}
            renderItem={renderMessageItem}
            keyExtractor={item => item.id}
            ref={flatListRef}
            contentContainerStyle={styles.chatContainer}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={renderTypingIndicator}
          />
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type your message..."
              value={inputText}
              onChangeText={setInputText}
              multiline
              placeholderTextColor="#555"
              returnKeyType="send"
              onSubmitEditing={sendMessage}
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Icon name="send" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.querySection}>
            <QuerySuggestions onQueryPress={handleQueryPress} />
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  headerSection: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 15,
  },
  logo: {
    marginBottom: 10,
  },
  appTitle: {
    fontSize: 32,
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
  chatContainer: {
    paddingVertical: 10,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 6,
  },
  userMessageRow: {
    justifyContent: 'flex-end',
  },
  botMessageRow: {
    justifyContent: 'flex-start',
  },
  botIconContainer: {
    marginRight: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  userIconContainer: {
    marginLeft: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#81C784',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  messageContainer: {
    maxWidth: '75%',
    borderRadius: 15,
    padding: 12,
  },
  userMessage: {
    backgroundColor: '#81C784',
    borderBottomRightRadius: 0,
  },
  botMessage: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
  },
  userText: {
    color: '#1B5E20',
  },
  botText: {
    color: 'black',
  },
  querySection: {
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  queryContainer: {
    paddingHorizontal: 5,
  },
  queryContent: {
    paddingVertical: 5,
  },
  queryButton: {
    backgroundColor: '#C8E6C9',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  queryText: {
    fontSize: 14,
    color: '#2E7D32',
    fontWeight: 'bold',
  },
  queryEmoji: {
    fontSize: 16,
    marginRight: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: '#A5D6A7',
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    maxHeight: 100,
    fontSize: 16,
    color: '#1B5E20',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#C8E6C9',
    borderRadius: 20,
  },
  sendButton: {
    backgroundColor: '#2E7D32',
    padding: 10,
    borderRadius: 25,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: 100,
    height: 100,
    marginTop: 25,
  },
  feedbackContainer: {
    flexDirection: 'row',
    marginTop: 8,
    alignSelf: 'flex-end',
  },
  feedbackButton: {
    marginLeft: 10,
    padding: 4,
    borderRadius: 12,
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typingText: {
    marginLeft: 8,
    fontStyle: 'italic',
  },
});

export default ChatbotAssistant;