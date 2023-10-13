import {React,useEffect,useState,useRef} from "react";
import {Alert,View,Text,Image,SafeAreaView,TextInput, StyleSheet, TouchableOpacity} from "react-native";
import { Button, Icon } from "react-native-elements";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
export default function RealSignup({navigation})
{
    const image=require('./logosvg/logo.jpg')
    const[username,setUsername]=useState('');
    const[password,setPassword]=useState('');
    const[jwtToken,setJwtToken]=useState('');
    const[error,setError]=useState(false);

    return(
        
        <SafeAreaView style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <View style={{padding:20}}>
                <View style={{alignItems:"center",alignContent:"center"}}>
                    <Image
                source={image}
                style={{width:300,height:300,backgroundColor:"#FFF",borderWidth:1,borderColor:"#FFF"}}/>
                </View>

                <Text style={{color:"#333",fontSize:28,fontWeight:500,margin:10}}>Signup</Text>
                <View style={{flexDirection:"row",borderBottomColor:"#666",borderBottomWidth:1, padding:5}}>
                    <Icon name="user" size={20} type="font-awesome" style={{marginTop:15}} />

                    <TextInput 
                    style={styles.TextInput} 
                    placeholder={error?"username already taken":"username"}
                    placeholderTextColor={error?"red":"black"}
                    onChangeText={setUsername}
                    value={username} />
                </View>
                <View style={{flexDirection:"row",borderBottomColor:"#666",borderBottomWidth:1, padding:5}}>
                    <Icon name="lock" size={20} type="font-awesome" style={{marginTop:15}} />
                    <TextInput 
                    style={styles.PasswordInput} 
                    placeholder="password" 
                    placeholderTextColor={error?"red":"black"}
                    secureTextEntry 
                    onChangeText={setPassword}
                    value={password}/>
                </View>
                <View style={{marginTop:10,flexDirection:"row",padding:5,alignItems:'center',alignSelf:'center'}}>
                    <TouchableOpacity onPress={()=>{
                        axios.post("https://spa-fq2z.onrender.com/api/v1/auth/employee/register",
                        {
                            username:username,
                            password:password
                        })
                        .then(response=>{
                            console.log(response);
                            Alert.alert("registration succesfull");
                            navigation.navigate('login');
                        })
                        .catch(error=>{
                            console.info(error);
                            setError(true);
                        })
                    }}
                    style={styles.Button}>
                        <Text style={{textAlign:"center",textAlignVertical:"center",marginTop:6,color:"#FFF"}}>signup</Text>
                    </TouchableOpacity>
                    
                </View>
                <TouchableOpacity onPress={()=>{navigation.navigate("login")}}
                    >
                        <Text style={{textAlign:"center",textAlignVertical:"center",marginTop:6,color:"#666"}}>Already have an account? Login</Text>
                    </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    TextInput:{
        marginLeft:5,
        color:"black",
        fontSize:12,
        width:"90%"
        
    },
    PasswordInput:{
        marginLeft:5,
        color:"black",
        fontSize:12,
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
    }
})