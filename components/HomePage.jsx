import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform,
  Animated,
  SafeAreaView,
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const HomePage = ({ navigation }) => {
  const [pulseAnim] = useState(new Animated.Value(1));
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [scaleAnim] = useState(new Animated.Value(0.8));
  const [actionCardAnims] = useState(
    [...Array(4)].map(() => new Animated.Value(0))
  );
  const [featuresAnim] = useState(new Animated.Value(0));
  const [missionAnim] = useState(new Animated.Value(0));
  const [iconRotations] = useState(
    [...Array(4)].map(() => new Animated.Value(0))
  );

  useEffect(() => {
    // Subtle animations matching login/signup theme
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    // Entrance animations for the header
    const headerEntrance = Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]);

    // Staggered entrance animations for action cards
    const actionCardsEntrance = Animated.stagger(
      150,
      actionCardAnims.map(anim =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        })
      )
    );

    // Entrance animation for the features section
    const featuresEntrance = Animated.timing(featuresAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    });

    // Entrance animation for the mission section
    const missionEntrance = Animated.timing(missionAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    });

    // Run all animations in sequence
    Animated.sequence([
      headerEntrance,
      actionCardsEntrance,
      featuresEntrance,
      missionEntrance,
    ]).start();

    pulseLoop.start();

    // Loop the icon rotation animation for all four icons
    const iconRotateLoop = Animated.loop(
      Animated.parallel(
        iconRotations.map(anim =>
          Animated.timing(anim, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true,
          })
        )
      )
    );
    iconRotateLoop.start();

    return () => {
      pulseLoop.stop();
      iconRotateLoop.stop();
    };
  }, []);

  const handleDonateFood = () => {
    navigation.navigate('donate');
  };

  const handleExploreNearby = () => {
    navigation.navigate('explorenearby');
  };

  const handleDonationHistory = () => {
    navigation.navigate('history');
  };

  const handleChatbot = () => {
    navigation.navigate('chatbot');
  };

  const cardsData = [
    { title: 'Donate Food', subtitle: 'Share your surplus food with those in need', icon: 'restaurant', colors: ['#4CAF50', '#45A049'], onPress: handleDonateFood },
    { title: 'Explore Nearby', subtitle: 'Find food donation opportunities around you', icon: 'explore', colors: ['#FF5722', '#E64A19'], onPress: handleExploreNearby },
    { title: 'My History', subtitle: 'Track your donations and impact', icon: 'history', colors: ['#388E3C', '#2E7D32'], onPress: handleDonationHistory },
    { title: 'Get Help', subtitle: 'Chat with our assistant for support', icon: 'chat', colors: ['#2196F3', '#1976D2'], onPress: handleChatbot },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8F5E8" />
      <LinearGradient
        colors={['#A5D6A7', '#C8E6C9', '#A5D6A7']}
        style={styles.container}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header Section */}
          <Animated.View style={[
            styles.headerContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }, { scale: scaleAnim }]
            }
          ]}>
            <Animated.View style={[
              styles.logoContainer,
              { transform: [{ scale: pulseAnim }] }
            ]}>
              <Image
                source={require("./images/logo.png")}
                style={styles.iconImage}
              />
            </Animated.View>
            <Text style={styles.appTitle}>FoodConnect</Text>
            <Text style={styles.appSubtitle}>Reducing Food Waste, Feeding Hope</Text>
          </Animated.View>

          {/* Main Action Cards */}
          <View style={styles.actionsContainer}>
            <Text style={styles.sectionTitle}>Make a Difference Today</Text>

            <View style={styles.actionCardsGrid}>
              {cardsData.map((card, index) => (
                <Animated.View
                  key={index}
                  style={[
                    styles.actionCard,
                    {
                      opacity: actionCardAnims[index],
                      transform: [
                        {
                          translateY: actionCardAnims[index].interpolate({
                            inputRange: [0, 1],
                            outputRange: [50, 0],
                          }),
                        },
                        {
                          scale: actionCardAnims[index].interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.8, 1],
                          }),
                        },
                      ],
                    }
                  ]}
                >
                  <TouchableOpacity
                    onPress={card.onPress}
                    activeOpacity={0.8}
                  >
                    <View style={styles.cardBackground}>
                      <LinearGradient
                        colors={card.colors}
                        style={styles.cardGradient}
                      >
                        <View style={styles.cardContent}>
                          <Animated.View style={[
                            styles.iconContainer,
                            {
                              transform: [{
                                rotate: iconRotations[index].interpolate({
                                  inputRange: [0, 1],
                                  outputRange: ['0deg', '360deg'],
                                }),
                              }]
                            }
                          ]}>
                            <Icon name={card.icon} size={32} color="#fff" />
                          </Animated.View>
                          <Text style={styles.cardTitle}>{card.title}</Text>
                          <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
                        </View>
                      </LinearGradient>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          </View>

                    {/* Our Mission Section */}
          <Animated.View style={[
            styles.ourmissionContainer,
            {
              opacity: missionAnim,
              transform: [{ translateY: missionAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [30, 0],
              }) }]
            }
          ]}>
            <Text style={styles.ourmissionTitle}>Our Mission</Text>
            <Text style={styles.ourmissionText}>
              We're dedicated to reducing food waste by connecting donors with local trusts and organizations.
              {'\n\n'}
              Together, we help feed those in need and build stronger, more sustainable communities.
              {'\n\n'}
              <Text style={styles.highlightText}>Every meal shared makes a difference in someone's life.</Text>
            </Text>
            <TouchableOpacity style={styles.ctaButton} onPress={handleDonateFood}>
              <LinearGradient
                colors={['#4CAF50', '#2E7D32']}
                style={styles.ctaGradient}
              >
                <Text style={styles.ctaText}>Start Donating Today</Text>
                <Icon name="arrow-forward" size={20} color="#fff" style={styles.ctaIcon} />
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          {/* Our Features Section */}
          <Animated.View style={[
            styles.featuresContainer,
            {
              opacity: featuresAnim,
              transform: [{ translateY: featuresAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [30, 0],
              }) }]
            }
          ]}>
            <Text style={styles.sectionTitle}>Our Features</Text>
            <View style={styles.featuresCard}>
              <View style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <Icon name="security" size={24} color="#1565C0" />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>Secure & Verified</Text>
                  <Text style={styles.featureSubtitle}>All donors and organizations are verified for safety</Text>
                </View>
              </View>

              <View style={styles.featureDivider} />

              <View style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <Icon name="location-on" size={24} color="#FF9800" />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>Location-Based Matching</Text>
                  <Text style={styles.featureSubtitle}>Find nearby food donation opportunities instantly</Text>
                </View>
              </View>

              <View style={styles.featureDivider} />

              <View style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <Icon name="notifications" size={24} color="#4CAF50" />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>Real-time Notifications</Text>
                  <Text style={styles.featureSubtitle}>Get instant updates on donation requests and pickups</Text>
                </View>
              </View>

              <View style={styles.featureDivider} />

              <View style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <Icon name="support-agent" size={24} color="#8E24AA" />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>24/7 Support</Text>
                  <Text style={styles.featureSubtitle}>Our chatbot and support team are always here to help</Text>
                </View>
              </View>
            </View>
          </Animated.View>
          

          <View style={styles.aboutContainer}>
            <Text style={styles.aboutTitle}>About FoodConnect</Text>
            <Text style={styles.aboutText}>
              We are a socially driven platform dedicated to reducing food waste and fighting hunger
              {'\n\n'}
              By connecting restaurants, events, households, and NGOs, we ensure
              that surplus food reaches those who need it most
              {'\n\n'}
              Our platform bridges the gap between surplus food providers and hunger relief organizations,
              ensuring safe and timely redistribution
            </Text>
          </View>


        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E8F5E8',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  appTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginTop: -30,
  },
  appSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  actionsContainer: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 20,
    textAlign: 'center',
  },
  actionCardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: (width - 60) / 2,
    marginBottom: 20,
  },
  cardBackground: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  cardGradient: {
    padding: 20,
    minHeight: 160,
  },
  cardContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 15,
    borderRadius: 25,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 18,
  },
  featuresContainer: {
    marginBottom: 40,
  },
  featuresCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  featureIcon: {
    backgroundColor: '#F1F8E9',
    padding: 12,
    borderRadius: 15,
    marginRight: 15,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E7D32',
    marginBottom: 4,
  },
  featureSubtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  featureDivider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 8,
  },
  ourmissionContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 20,
  },
  ourmissionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 15,
    textAlign: 'center',
  },
  ourmissionText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  highlightText: {
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  // CTA Button Styles
  ctaButton: {
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  ctaGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  ctaText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 10,
  },
  ctaIcon: {
    marginLeft: 5,
  },

  aboutContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 30,
    marginTop: 20,
  },
  aboutTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 15,
    textAlign: 'center',
  },
  aboutText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  iconImage: {
    width: 100,
    height: 100,
    marginTop: 15,
  },
});

export default HomePage;