import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput,View } from 'react-native'
import { TouchableOpacity, TouchableOpacityProps, GestureResponderEvent } from 'react-native';
import React, { useState } from 'react'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

//Form validation
import * as Yup from 'yup'
import { Formik } from 'formik'
const passwordSchema=Yup.object().shape({
  passwordLength:Yup.number()
  .min(4,'Shoud be min of 4 character')
  .max(16,'shoud be max of 16 charater')
  .required('Length is require')
})


export default function App() {

  const [Password , setPassword]=useState('')
  const [isPasswordGanerated , setPasswordGanerated]=useState(false)
  useState(false)
  const [lowercase ,setLowercase]=useState(false)
  const [uppercase ,setUppercase]=useState(false)
  const [number, setNumber]=useState(false)
  const [symbol ,setSymbol]=useState(false)
  
 const ganeratePasswordString=(passwordLength:number) =>{
  let charactterList=''
  const uppercaseChar='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercaseChar='abcdefghijklmnopqrstuvwxyz'
  const digitChar='1234567890'
  const specialChar='!@#$%^&*()_+'

  if (lowercase) {
    charactterList+=lowercaseChar
  }
  if (uppercase) {
    charactterList+=uppercaseChar
  }
  if (number) {
    charactterList+=digitChar
  }
  if (symbol) {
    charactterList+=specialChar
  }

  const passwordResult=createPassword(charactterList,passwordLength)
  setPassword(passwordResult)
  setPasswordGanerated(true)

 }
const createPassword=(characters:String , passwordLength:number)=>{
  let result=''
  for (let i = 0; i<passwordLength; i++) {
  const charactersIndex=  Math.round(Math.random()*characters.length)
  result+=characters.charAt(charactersIndex)
      }
      return result
      console.log("hitesh");
}
const resetPassword=()=>{
  setPassword('')
  setPasswordGanerated(false)
  setLowercase(false)
  setUppercase(false)
  setNumber(false)
  setSymbol(false)
}
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Ganerator</Text>
          <Formik
       initialValues={{ passwordLength:'' }}
       validationSchema={passwordSchema}
       onSubmit={values=>{
        console.log(values);
        ganeratePasswordString(+values.passwordLength) 
       }}
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleSubmit,
        handleReset
       }) => (
         <>
          <View style={styles.inputWrapper}>
          <View style={styles.inputColumn}>
            <Text style={styles.heading}>Password Length</Text>
            {touched.passwordLength && errors.passwordLength && (
              <Text>{errors.passwordLength}</Text>
            )}
          </View>
          <TextInput style={styles.inputStyle} value={values.passwordLength} onChangeText={handleChange('passwordLength')} 
          placeholder='Ex. 8' keyboardType='numeric'
          ></TextInput>
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.heading}>Include lowercase</Text>
            <BouncyCheckbox disableBuiltInState isChecked={lowercase} onPress={()=>setLowercase(!lowercase)} fillColor='#29ABB7'></BouncyCheckbox>
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.heading}>Include uppercase</Text>
            <BouncyCheckbox disableBuiltInState isChecked={uppercase} onPress={()=>setUppercase(!uppercase)} fillColor='blue'></BouncyCheckbox>
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.heading}>Include number</Text>
            <BouncyCheckbox disableBuiltInState isChecked={number} onPress={()=>setNumber(!number)} fillColor='black'></BouncyCheckbox>
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.heading}>Include symbol</Text>
            <BouncyCheckbox disableBuiltInState isChecked={symbol} onPress={()=>setSymbol(!symbol)} fillColor='pink'></BouncyCheckbox>
          </View>

          <View style={styles.formActions}>
            <TouchableOpacity disabled={!isValid} 
            style={styles.primaryBtn} 
            onPress={()=>{
              handleSubmit();
            }} ><Text style={styles.primaryBtnTxt}>Ganerate password</Text></TouchableOpacity>
            <TouchableOpacity style={styles.secondaryBtn} 
            onPress={()=>{
              handleReset();
              resetPassword()
            }}
            ><Text style={styles.secondaryBtnTxt} >Reset</Text></TouchableOpacity>
          </View>
         </>
       )}
     </Formik>
        </View>
        {
          isPasswordGanerated? (
            <View style={[styles.card , styles.cardElevated]}>
              <Text style={styles.subTitle}>Result:</Text>
              <Text style={styles.description}>Long press to copy</Text>
              <Text style={styles.generatedPassword} selectable={true}>{Password}</Text>
            </View>
          ):null
        }
      </SafeAreaView>
    </ScrollView>
  )
}



const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    marginTop:35
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#000'
  },
})