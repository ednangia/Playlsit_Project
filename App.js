import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { TextInput, StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';




export default function App() {
  let [isLoading,setIsLoading] = useState(true);
  let [error, setError] = useState();
  let [response, setResponse] = useState();

  useEffect(() => { //newly added
    fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoading(false);
          setResponse(result);
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        }
      )
  }, []);


  const getContent = () => { //newly added
    if(isLoading) {
      return <ActivityIndicator size ="large" />; 
    }

    if (error) {
      return <Text> {error} </Text>;
    }
    
    console.log(response);
    return <Text> Bitcoin USD: {response["bpi"]["USD"].rate} </Text>;

  };
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([
    { id: 1, name: 'Song 1' },
    { id: 2, name: 'Song 2' },
    { id: 3, name: 'Song 3' },
    { id: 4, name: 'Song 4' },
    { id: 5, name: 'Song 5' },
  ]);
  const [filteredData, setFilteredData] = useState([]);
  const [displayQuery, setDisplayQuery] = useState('');

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSearch = (query) => {
    const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchQuery(query);
    setFilteredData(filteredData);
    setDisplayQuery(query);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemButton}>
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      <Text>Playlist Project</Text>
      <StatusBar style="auto" />
      <TextInput
        placeholder="Search songs..."
        onChangeText={handleSearch}
        value={searchQuery}
        style={styles.searchBar}
      />
      {getContent()}
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Text style={styles.queryText}>Search Query: {displayQuery}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  itemButton: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  itemText: {
    color: '#000',
    fontSize: 18,
    textAlign: 'center',
  },
  queryText: {
    marginTop: 20,
    fontSize: 16,
  },
});
