import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const MyHistoryPage = ({ navigation }) => {
  // Sample donation history data
  const [donationHistory] = useState([
    {
      id: '1',
      foodName: 'Rice & Curry',
      quantity: '10 plates',
      category: 'Vegetarian',
      date: '2025-08-28',
      time: '2:30 PM',
      status: 'Collected',
      recipient: 'Hope Foundation NGO',
      address: 'MG Road, Bangalore',
      volunteerName: 'Arjun Kumar',
      volunteerPhone: '+91 9876543210',
      impact: '15 people fed',
    },
    {
      id: '2',
      foodName: 'Sandwiches & Juice',
      quantity: '25 pieces',
      category: 'Vegetarian',
      date: '2025-08-30',
      time: '6:45 PM',
      status: 'Pending',
      recipient: 'Street Children Shelter',
      address: 'HSR Layout, Bangalore',
      impact: '20+ people to be fed',
    },
    {
      id: '3',
      foodName: 'Biryani',
      quantity: '8 kg',
      category: 'Non-Vegetarian',
      date: '2025-08-26',
      time: '1:15 PM',
      status: 'Collected',
      recipient: 'Elder Care Home',
      address: 'Koramangala, Bangalore',
      volunteerName: 'Priya Sharma',
      volunteerPhone: '+91 9123456789',
      impact: '30 elderly people fed',
    },
    {
      id: '4',
      foodName: 'Fresh Vegetables',
      quantity: '15 kg',
      category: 'Raw Ingredients',
      date: '2025-08-25',
      time: '4:20 PM',
      status: 'Cancelled',
      recipient: 'Community Kitchen',
      address: 'Whitefield, Bangalore',
      reason: 'Donor cancelled due to emergency',
    },
  ]);

  const [filter, setFilter] = useState('All'); // All, Collected, Pending, Cancelled

  const getFilteredData = () => {
    if (filter === 'All') return donationHistory;
    return donationHistory.filter(item => item.status === filter);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Collected':
        return '#4CAF50';
      case 'Pending':
        return '#FF9800';
      case 'Cancelled':
        return '#F44336';
      default:
        return '#757575';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Collected':
        return 'check-circle';
      case 'Pending':
        return 'schedule';
      case 'Cancelled':
        return 'cancel';
      default:
        return 'help';
    }
  };

  const renderFilterButton = (filterType) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        filter === filterType && styles.activeFilter
      ]}
      onPress={() => setFilter(filterType)}
    >
      <Text style={[
        styles.filterText,
        filter === filterType && styles.activeFilterText
      ]}>
        {filterType}
      </Text>
    </TouchableOpacity>
  );

  const renderDonationItem = ({ item }) => (
    <View style={styles.donationCard}>
      <View style={styles.cardHeader}>
        <View style={styles.foodInfo}>
          <Text style={styles.foodName}>{item.foodName}</Text>
          <Text style={styles.quantity}>{item.quantity}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Icon name={getStatusIcon(item.status)} size={16} color="#fff" />
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.detailRow}>
          <Icon name="schedule" size={16} color="#4A7C59" />
          <Text style={styles.detailText}>{item.date} at {item.time}</Text>
        </View>

        <View style={styles.detailRow}>
          <Icon name="category" size={16} color="#4A7C59" />
          <Text style={styles.detailText}>{item.category}</Text>
        </View>

        <View style={styles.detailRow}>
          <Icon name="location-on" size={16} color="#4A7C59" />
          <Text style={styles.detailText}>{item.recipient}</Text>
        </View>

        <View style={styles.detailRow}>
          <Icon name="place" size={16} color="#4A7C59" />
          <Text style={styles.detailText}>{item.address}</Text>
        </View>

        {item.volunteerName && (
          <View style={styles.detailRow}>
            <Icon name="person" size={16} color="#4A7C59" />
            <Text style={styles.detailText}>
              Collected by: {item.volunteerName}
            </Text>
          </View>
        )}

        {item.impact && (
          <View style={styles.impactRow}>
            <Icon name="favorite" size={16} color="#E74C3C" />
            <Text style={styles.impactText}>{item.impact}</Text>
          </View>
        )}

        {item.reason && (
          <View style={styles.detailRow}>
            <Icon name="info" size={16} color="#F44336" />
            <Text style={[styles.detailText, { color: '#F44336' }]}>
              {item.reason}
            </Text>
          </View>
        )}
      </View>

      {item.volunteerPhone && (
        <TouchableOpacity style={styles.contactButton}>
          <Icon name="phone" size={18} color="#4CAF50" />
          <Text style={styles.contactText}>Contact Volunteer</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderStats = () => {
    const totalDonations = donationHistory.length;
    const collectedDonations = donationHistory.filter(item => item.status === 'Collected').length;
    const pendingDonations = donationHistory.filter(item => item.status === 'Pending').length;

    return (
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{totalDonations}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{collectedDonations}</Text>
          <Text style={styles.statLabel}>Collected</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{pendingDonations}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={['#A5D6A7', '#C8E6C9', '#A5D6A7']} style={styles.container}>
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
          <Text style={styles.pageTitle}>My Donation History</Text>
          <Text style={styles.pageSubtitle}>Track your impact and contributions</Text>
        </View>

        {/* Stats Section */}
        {renderStats()}

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {renderFilterButton('All')}
            {renderFilterButton('Collected')}
            {renderFilterButton('Pending')}
            {renderFilterButton('Cancelled')}
          </ScrollView>
        </View>

        {/* Donation History List */}
        <FlatList
          data={getFilteredData()}
          keyExtractor={(item) => item.id}
          renderItem={renderDonationItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Icon name="history" size={64} color="#81C784" />
              <Text style={styles.emptyText}>No donations found</Text>
              <Text style={styles.emptySubtext}>
                {filter === 'All' 
                  ? "You haven't made any donations yet"
                  : `No ${filter.toLowerCase()} donations found`
                }
              </Text>
            </View>
          }
        />
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
  headerSection: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 50,
    padding: 8,
  },
  logo: {
    marginBottom: 10,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginTop:-15,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 5,
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#4A7C59',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 15,
    paddingVertical: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  statLabel: {
    fontSize: 14,
    color: '#4A7C59',
    marginTop: 4,
  },
  filterContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.7)',
    marginRight: 10,
  },
  activeFilter: {
    backgroundColor: '#4CAF50',
  },
  filterText: {
    color: '#2E7D32',
    fontWeight: '600',
  },
  activeFilterText: {
    color: '#fff',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  donationCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 4,
  },
  quantity: {
    fontSize: 14,
    color: '#4A7C59',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  cardBody: {
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#4A7C59',
    marginLeft: 8,
    flex: 1,
  },
  impactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    padding: 8,
    backgroundColor: '#FFF5F5',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#E74C3C',
  },
  impactText: {
    fontSize: 14,
    color: '#C0392B',
    marginLeft: 8,
    fontWeight: '600',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F8E9',
    paddingVertical: 10,
    borderRadius: 8,
  },
  contactText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#4A7C59',
    textAlign: 'center',
  },
    iconImage: {
    width: 100,
    height: 100,
    marginTop: 40,
  },
});

export default MyHistoryPage;
