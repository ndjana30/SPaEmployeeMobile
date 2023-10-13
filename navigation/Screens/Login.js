import axios from "axios";
import React, { useState } from "react";
import { Alert, Button, Pressable, StyleSheet, Text, TextInput, View ,ImageBackground} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


function verifyCredentials(username,password)
{
    console.log("username is\t"+ username+ "\t and \t" +"password is\t"+password)
    
}

export default function Login({navigation})
{
    const[username,setUsername]=useState('');
    const[password,setPassword]=useState('');
    const[jwtToken,setJwtToken]=useState('');
    
    
    return(
        <SafeAreaView >
           
            <View style={styles.big}>
               
                <View style={styles.small}>
                <Text style={styles.EntryText}> Enter username and password</Text>
                <TextInput style={styles.Inputs}
                        placeholder="username"
                        placeholderTextColor="black"
                        onChangeText={setUsername}
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
                            axios.post("https://spa-fq2z.onrender.com/api/v1/auth/employee/login",
                            {
                                username:username,
                                password:password
                            })
                            .then(response=>{
                                response.data.accessToken? navigation.navigate('employee',{name:username,token:response.data.tokenType+response.data.accessToken}) : void(0);
                                setJwtToken(response.data.tokenType+response.data.accessToken);
                                console.log(jwtToken);
                                // setJwtToken("Bearer "+response.data.accessToken);
                                // console.log("jwt:\t"+jwtToken);
                                
                            })
                            .catch(error=>{
                                console.info(error);
                            })
                            
                        }}
                        >
                        <Text style={{alignSelf:"center",marginVertical:5,fontStyle:"italic"}}>Login</Text>
                        </Pressable>

                        <Pressable onPress={()=>{navigation.navigate('signup')}}>
                    <Text style={{alignSelf:"center",marginVertical:5,color:"lightblue"}}>Don't have an account? Signup</Text>
                </Pressable>
                </View>
            </View>
            {/* <View>
                <View style={styles.Form}>
                        <Text style={styles.EntryText}> Enter username and password</Text>
                        <TextInput style={styles.Inputs}
                        placeholder="username"
                        placeholderTextColor="black"
                        onChangeText={setUsername}
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
                            axios.post("https://spa-fq2z.onrender.com/api/v1/auth/employee/login",
                            {
                                username:username,
                                password:password
                            })
                            .then(response=>{
                                response.data.accessToken? navigation.navigate('employee',{name:username,token:response.data.tokenType+response.data.accessToken}) : void(0);
                                setJwtToken(response.data.tokenType+response.data.accessToken);
                                console.log(jwtToken);
                                // setJwtToken("Bearer "+response.data.accessToken);
                                // console.log("jwt:\t"+jwtToken);
                                
                            })
                            .catch(error=>{
                                console.info(error);
                            })
                            
                        }}
                        >
                        <Text style={{alignSelf:"center",marginVertical:5}}>Login</Text>
                        </Pressable>
                </View>
                
                

                
            </View> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Inputs:{
        marginVertical:5,
        marginHorizontal:10,
        borderWidth:1,
        borderBottomColor:"black",
        borderRadius:20,
        padding:15,
        color:"black",
        fontStyle:"italic"
    },
    EntryText:{
        marginVertical:10,
        marginHorizontal:10,
        alignSelf:"center",
        color:"black",
        fontStyle:"italic"
        
    },
    Buttons:{
        marginTop:5,
        alignSelf:"center",
        borderRadius:20,
        width:"30%",
        borderWidth:1,
        borderColor:"lightblue",
        backgroundColor:"#FCB900"
        
    },
    Form:{
        marginHorizontal:30,
        paddingTop:15,
        borderColor:"lightblue",
        zIndex:1,
        

    },
    big:{
        backgroundColor:"#FCB900",
        width:"100%",
        height:"100%",
        alignItems:"center",
        
    }, 
    small:{
        alignSelf:'center',
        backgroundColor:"#FFF",
        marginTop:50,
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