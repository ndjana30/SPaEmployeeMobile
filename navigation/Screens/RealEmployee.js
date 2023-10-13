import {React,useEffect,useState,useRef} from "react";
import {Alert,View,Text,Image,SafeAreaView,TextInput, StyleSheet, TouchableOpacity} from "react-native";
import { Button, Icon } from "react-native-elements";
import { useRoute } from "@react-navigation/native";
import { Dropdown } from 'react-native-element-dropdown';

import axios from "axios";

export default function RealEmployee({navigation})
{
    const image=require('./logosvg/logo.jpg');
    const[client_id,setClientId] = useState(0);
    const[name,setName] = useState('');
    const[cost,setCost] = useState(0);
    const[type,setType]=useState('');
    const[choice,setChoise]=useState('');
    const token = useRoute().params.token;
    const services=[{label: 'Coiffure Homme', value: 'Coiffure Homme'},
                    {label: 'Coiffure Femme', value: 'Coiffure Femme'},
                    {label: 'Hammam', value: 'Hammam'},
                    {label: 'Sauna', value: 'Sauna'},
                    {label: 'Massage', value: 'Massage'}
                ];
                
    const types=[
        {label:'FIX', value:'FIX'},
        {label:'VARIABLE',value:'VARIABLE'}
    ];
    const config = {
        headers: { Authorization: token }
    };
    const [value, setValue] = useState(null);
    const [valueType, setValueType] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const[error,setError]=useState(false);

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
            Alert.alert(`Product ${response.data.name} \n with cost ${response.data.cost} added` )
            setName('');
            setCost(0);
            setType('');
            setClientId(0);
        })
        .catch(error=>{
            console.info(error);
            setError(true);
        })
             
    }

    return(
        <SafeAreaView>
            <View style={{padding:20}}>
                <View style={{alignItems:"center",alignContent:"center"}}>
                    <Image
                source={image}
                style={{width:300,height:300,backgroundColor:"#FFF",borderWidth:1,borderColor:"#FFF"}}/>
                </View>

                <Text style={{color:"#333",fontSize:28,fontWeight:500,margin:10}}>Add Product</Text>
                <View style={{flexDirection:"row",borderBottomColor:"#666",borderBottomWidth:1, padding:5}}>
                    <Icon name="user" size={20} type="font-awesome" style={{marginTop:15}} />

                    <TextInput 
                    style={styles.TextInput} 
                    keyboardType="numeric"
                    placeholder={error?"wrong client number":"client number"}
                    placeholderTextColor={error?"red":"black"}
                    onChangeText={setClientId}
                    value={client_id} />
                </View>
                <View style={{flexDirection:"row",borderBottomColor:"#666",borderBottomWidth:1, padding:5}}>
                    {/* <Icon name="envelope" size={20} type="font-awesome" style={{marginTop:15}} /> */}
                    <Icon name="caret-up" size={20} type="font-awesome" style={{marginTop:15}} />
                    <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={services}
          itemTextStyle={{color:"black"}}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={value}
          search
          onChange={item=>{
            setValue(item.value);
            setName(item.value);
            setIsFocus(false);
          }}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          
          />
                    {/* <TextInput 
                    style={styles.TextInput} 
                    placeholder="service" 
                    placeholderTextColor="black" 
                    onChangeText={setName}
                    value={name}/> */}
                </View>
                <View style={{flexDirection:"row",borderBottomColor:"#666",borderBottomWidth:1, padding:5}}>
                    <Icon name="caret-up" size={20} type="font-awesome" style={{marginTop:15}} />
                    <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={types}
          itemTextStyle={{color:"black"}}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={valueType}
          search
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValueType(item.value);
            setType(item.value);
            setIsFocus(false);
          }}
          />
                </View>
                <View style={{flexDirection:"row",borderBottomColor:"#666",borderBottomWidth:1, padding:5}}>
                    <Icon name="ticket" size={20} type="font-awesome" style={{marginTop:15}} />
                    <TextInput 
                    keyboardType="numeric"
                    style={styles.TextInput} 
                    placeholder="cost" 
                    placeholderTextColor="black" 
                    onChangeText={setCost}
                    value={cost}/>
                </View>
                <View style={{marginTop:10,flexDirection:"row",padding:5,alignItems:'center',alignSelf:'center'}}>
                    <TouchableOpacity onPress={()=>{
                        addProduct(client_id,name,cost,type);
                        
                    }}
                    style={styles.Button}>
                        <Icon name="arrow-right" size={20} type="font-awesome" style={{marginTop:10}} />
                    </TouchableOpacity>
                    
                </View>
            
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    TextInput:{
        marginLeft:5,
        color:"black",
        fontSize:20,
        width:"90%"
        
    },
    PasswordInput:{
        marginLeft:5,
        color:"black",
        fontSize:20,
        width:"90%"
        
    },
    Button:{
        backgroundColor:"#7D480B",
        borderColor:"#7D480B",
        borderWidth:1,
        borderRadius:20,
        width:80,
        height:40,
        alignSelf:"center",
        alignItems:"center",
        alignContent:"center",
        textAlign:"center",
        textAlignVertical:"center"
    },
    container: {
        backgroundColor: 'white',
        padding: 16,
      },
      dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        width:"100%",
        color:"black",
      },
      icon: {
        marginRight: 5,
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
        color:"black"
      },
      placeholderStyle: {
        fontSize: 16,
        color:"black"
      },
      selectedTextStyle: {
        fontSize: 16,
        color:"black"
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color:"black"
      }
})