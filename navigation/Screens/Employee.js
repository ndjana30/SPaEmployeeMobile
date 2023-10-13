import React, { useEffect, useState } from "react";
import { Alert, Button, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { Icon } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";


export default function Employee({navigation})
{


    const[client_id,setClientId] = useState(0);
    const[name,setName] = useState('');
    const[cost,setCost] = useState(0);
    const[type,setType]=useState('');
    const[choice,setChoise]=useState('');
    const token = useRoute().params.token;
    const config = {
        headers: { Authorization: token }
    };

    /*
    useEffect(()=>{
        const token = useRoute().params.token;
    const config = {
        headers: { Authorization: token }
    };
        axios.get("https://spa-fq2z.onrender.com/api/v1/auth/connected/see",config)
        .then(response=>
            {console.log(response.data)})
            .catch(error=>{
                console.info(error);
            })
    })
    */

    function addProduct(client_id,name,cost,type)
    {
        
    axios.post("https://spa-fq2z.onrender.com/api/v1/product/add",
    {
        name:name,
        type:type,
        cost:cost,
        client_id:client_id
    },config)
    .then(response=>
        {
            console.log(response.data);
            Alert.alert(`Product ${response.data.name} added` )
            setName('');
            setCost(0);
            setType('');
            setClientId(0);
        })
        .catch(error=>{
            console.info(error);
        })
             
    }

    

    // const route = useRoute();
    
    // const token = route.params.token;
    // const[value,setValue]=useState('');
    

    
    return(
        
        <SafeAreaView>
                    <View>
                        
                        <Picker
                        selectedValue={choice}
                        onValueChange={(itemValue, itemIndex) =>
                            setChoise(itemValue)
                        }>
                            
                        <Picker.Item label="Home" value="Home" />
                        <Picker.Item label="Add Product" value="Add Product" />
                        
                        </Picker>

                    </View>

            <View>
                <Text style={styles.EntryText}>  add user and cost</Text>
                <TextInput style={styles.Inputs}
                    placeholder="client id"
                    placeholderTextColor="black"
                    onChangeText={setClientId}
                    value={client_id}
                />

                <TextInput style={styles.Inputs}
                    placeholder="service name"
                    placeholderTextColor="black"
                    onChangeText={setName}
                    value={name}
                />

                <TextInput style={styles.Inputs}
                    placeholder="cost"
                    
                    placeholderTextColor="black"
                    onChangeText={setCost}
                    value={cost}
                />

                <TextInput style={styles.Inputs}
                    placeholder="type"
                    placeholderTextColor="black"
                    onChangeText={setType}
                    value={type}
                />
                

                <Pressable style={styles.Buttons}
                onPress={()=>{
                    addProduct(client_id,name,cost,type);
                           
                }}
                >
                <Text style={{alignSelf:"center",marginVertical:5}}>Add</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    Inputs:{
        marginVertical:5,
        marginHorizontal:10,
        borderWidth:1,
        borderRadius:20,
        padding:10,
        color:"black"
    },
    EntryText:{
        marginVertical:10,
        marginHorizontal:10,
        alignSelf:"center",
        color:"black"
    },
    Buttons:{
        marginTop:10,
        padding:10,
        alignSelf:"center",
        borderRadius:20,
        width:"30%",
        borderWidth:1,
        borderColor:"lightblue",
        backgroundColor:"lightblue"
        
    }

})

/*
const config = {
    headers: { Authorization: `Bearer ${token}` }
};

const bodyParameters = {
   key: "value"
};

Axios.post( 
  'http://localhost:8000/api/v1/get_token_payloads',
  bodyParameters,
  config
).then(console.log).catch(console.log);
*/