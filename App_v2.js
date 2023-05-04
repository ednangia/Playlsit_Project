import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import axios from 'axios';

const OpenAICall = () => {
  const [data,setData] = useState([]);
  const apiKey = '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';
  const apiUrl = 'https://api.openai.com/v1/completions';
  const [textInput,setTextInput] = useState('');
  const designedPrompt = "Give me a list of 10 songs that satify the following prompt: ";

  const handleSend = async () =>  {
    const prompt = textInput;
    try {
      const response = await axios.post(apiUrl,{
        model: 'text-davinci-003',
        prompt: designedPrompt + prompt,
        max_tokens: 1024,
        temperature: 0.5,

      },{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`, 

        }
      });
      const text = response.data.choices[0].text;
      setData([{type:'user', 'text':' ' + textInput}, {type: 'bot', 'text': text}])
      setTextInput('');
    } catch (error) {
      console.error(error);
    }
    
    // Add a delay of 200 milliseconds between requests
    await new Promise(resolve => setTimeout(resolve, 20));
  }

  return (
    <View style ={styles.container}>
      <Text style = {styles.title}> Generate Playlist </Text>
      
      <TextInput
            style = {styles.input}
            value = {textInput}
            onChangeText = {text => setTextInput(text)}
            placeholder = "What would you like to listen to?"
        />
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          style={styles.body}
          renderItem = {({item}) => (
            <View style = {{flexDirection:'row', padding:10}}>
              <Text style={{fontWeight:'bold', color: item.type === 'user'?'green' : 'red' }}>{item.type === 'user'?'User' : 'Bot'}</Text>
              <Text style ={styles.bot}>{item.text}</Text>

            </View>
          )}
        />
        

        <TouchableOpacity
         style = {styles.button}
         onPress = {handleSend}
         >
            <Text style = {styles.buttonText}>Generate</Text>

        </TouchableOpacity>


            
    </View>
  )
}

export default OpenAICall

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      
    },

    title:{
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 20,
      marginTop: 70
    },

    body: {
      backgroundColor: '#fffcc',
      width: 400,
      margin: 10

    },
    bot: {
      fontSize:16
    },

    input: {
      borderWidth: 1,
      borderColor: 'black', 
      justifyContent:'center',
      width: 300,
      height:70,
      marginBottom:20,
      borderRadius: 10
      

    },

    button: {
      backgroundColor:'#CF0854',
      width:100,
      height:40,
      borderRadius: 10,
      justifyContent:'center',
      alignItems: 'center',
      marginBottom:40    

    },
    buttonText:{
      fontSize: 16,
      fontWeight: 'bold',
      color: 'black'

    }
  });
