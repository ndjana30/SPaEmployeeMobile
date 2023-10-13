import React ,{useEffect,useRef}from "react";
import { Alert, Button, Pressable, StyleSheet, Text, TextInput, View ,Animated, ImageBackground} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import axios from "axios";
import AnimatedView from "./AnimatedView";
//https://741b-41-202-219-172.ngrok-free.app



export default function Signup({navigation})
{
    
    const[username,setUsername]=useState('');
    const[password,setPassword]=useState('');
    const[jwtToken,setJwtToken]=useState('');
    const url=require('./spa2.jpg');
    const [errors,setErrors]=useState(false);
    
    return(
        <SafeAreaView>
           

            <View style={styles.big}>
               <ImageBackground source={url}
               
               style={{width:"100%",height:"100%"}}>

               </ImageBackground>
              
           </View>
           <View style={styles.small}>
               <Text style={styles.EntryText}> Signup with username and password</Text>
               <TextInput style={styles.Inputs}
                       placeholder={error?"wrong username or username already taken":"username"}
                       placeholderTextColor={error?"red":"black"}
                       onChangeText={setUsername}
                       value={username}/>

               <TextInput style={styles.Inputs}
                       placeholder={error?"wrong password":"password"}
                       placeholderTextColor={error?"red":"black"}
                       onChangeText={setPassword}
                       value={password}
                       secureTextEntry
                       />
                       <Pressable style={styles.Buttons}
                       onPress={()=>{
                           //console.log(username.replace(/\s/g, ""));
                           
                           axios.post("https://spa-fq2z.onrender.com/api/v1/auth/employee/register",
                    {
                        username:username,
                        password:password
                    })
                    .then(response=>{
                        console.log(response);
                        Alert.alert("Employee registered");
                        navigation.navigate('login');
                    })
                    .catch(error=>{
                        setErrors(true);
                        console.info(error);
                    })
                       }}
                       >
                       <Text style={{alignSelf:"center",marginVertical:5,fontStyle:"italic"}}>Register</Text>
                       </Pressable>
                       <Pressable onPress={()=>{navigation.navigate('login')}}>
                    <Text style={{alignSelf:"center",marginVertical:5,color:"lightblue"}}>Already have an account? Login</Text>
                </Pressable>
               </View>
            {/* <View>
                <Text style={styles.EntryText}> create new username and password</Text>
                <TextInput style={styles.Inputs}
                placeholder="username"
                onChangeText={setUsername}
                placeholderTextColor="black"
                value={username}/>

                <TextInput style={styles.Inputs}
                placeholder="password"
                placeholderTextColor="black"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
                />
                <Pressable style={styles.Buttons}
                onPress={()=>{
                    //console.log(username.replace(/\s/g, ""));
                    axios.post("https://spa-fq2z.onrender.com/api/v1/auth/employee/register",
                    {
                        username:username,
                        password:password
                    })
                    .then(response=>{
                        console.log(response);
                        Alert.alert("Employee registered");
                        navigation.navigate('login');
                    })
                    .catch(error=>{
                        console.info(error);
                    })
                }}
                >
                <Text style={{alignSelf:"center",marginVertical:5}}>Register</Text>
                </Pressable>

                <Pressable onPress={()=>{navigation.navigate('login')}}>
                    <Text style={{alignSelf:"center",marginVertical:5,color:"lightblue"}}>Already have an account? Login</Text>
                </Pressable>
                
            </View> */}
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
        marginTop:5,
        alignSelf:"center",
        borderRadius:20,
        width:"30%",
        borderWidth:1,
        borderColor:"lightblue",
        backgroundColor:"#FCB900"
        
    },big:{
        backgroundColor:"#FCB900",
        width:"100%",
        height:"100%",
        alignItems:"center",
        
    }, 
    small:{
        alignSelf:'center',
        backgroundColor:"#FFF",
        marginTop:150,
        width:"100%",
        height:"100%",
        borderWidth:1,
        borderTopLeftRadius:50,
        borderTopRightRadius:50,
        borderColor:"#FFF",
        zIndex:1,
        position:"absolute"
        
    }

})
