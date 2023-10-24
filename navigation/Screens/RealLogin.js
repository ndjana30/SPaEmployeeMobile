import {React,useEffect,useState,useRef} from "react";
import {Alert,View,Text,Image,SafeAreaView,TextInput, StyleSheet, TouchableOpacity, ActivityIndicator} from "react-native";
import { Button, Icon } from "react-native-elements";
import axios from "axios";
import { useRoute } from "@react-navigation/native";

export default function RealLogin({navigation})
{
    const image=require('./logosvg/logo.jpg')
    const[username,setUsername]=useState('');
    const[password,setPassword]=useState('');
    const[jwtToken,setJwtToken]=useState('');
    const[error,setError]=useState(false);
    const [online,setOnline]=useState(false);
    const[isLoading,setIsLoading]=useState(false);
    return(
        
        <SafeAreaView style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <View style={{padding:20}}>
                <View style={{alignItems:"center",alignContent:"center"}}>
                    <Image
                source={image}
                style={{width:300,height:300,backgroundColor:"#FFF",borderWidth:1,borderColor:"#FFF"}}/>
                </View>

                <Text style={{color:"#333",fontSize:28,fontWeight:500,margin:10}}>Login</Text>
                <View style={{flexDirection:"row",borderBottomColor:"#666",borderBottomWidth:1, padding:5}}>
                    <Icon name="user" size={20} type="font-awesome" style={{marginTop:15}} />
                    <TextInput 
                    style={error?styles.TextInputError:styles.TextInput} 
                    placeholder="username"
                    placeholderTextColor="black"
                    onChangeText={setUsername}
                    value={username}/>
                </View>
                <View style={{flexDirection:"row",borderBottomColor:"#666",borderBottomWidth:1, padding:5}}>
                    <Icon name="lock" size={20} type="font-awesome" style={{marginTop:15}} />
                    <TextInput 
                    style={styles.PasswordInput} 
                    placeholder="password"
                    placeholderTextColor="black"
                    secureTextEntry 
                    onChangeText={setPassword}
                    value={password}/>
                </View>
                {isLoading?(<View>
                    <ActivityIndicator size="large" color="blue"/>
                </View>):void(0)}
                <View style={{marginTop:10,flexDirection:"row",padding:5,alignItems:'center',alignSelf:'center'}}>
                    <TouchableOpacity onPress={()=>{
                        setIsLoading(true);
                        axios.post("https://wellnessspa237.onrender.com/api/v1/auth/employee/login",
                        {
                            username:username,
                            password:password
                        })
                        .then(response=>{
                            response.data.accessToken? navigation.navigate('employee',{name:username,token:response.data.tokenType+response.data.accessToken}) : void(0);
                            setJwtToken(response.data.tokenType+response.data.accessToken);
                            console.log(jwtToken);
                            setIsLoading(false);
                            // setJwtToken("Bearer "+response.data.accessToken);
                            // console.log("jwt:\t"+jwtToken);
                            
                        })
                        .catch(error=>{
                            console.info(error);
                            setError(true);
                            setIsLoading(false);
                            setUsername('wrong credentials');
                            setPassword('wrong credentials');
                        })
                    }}
                    style={styles.Button}>
                        <Text style={{textAlign:"center",textAlignVertical:"center",marginTop:6,color:"#FFF"}}>Login</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={()=>{navigation.navigate("signup")}}
                    >
                        <Text style={{textAlign:"center",textAlignVertical:"center",marginTop:6,color:"#666"}}>No account? Signup</Text>
                    </TouchableOpacity>
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
    TextInputError:{
        marginLeft:5,
        color:"red",
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
    }
})