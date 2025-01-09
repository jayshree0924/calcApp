import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

export default function HomeScreen() {

  const [value, setValue] = useState('');
  const [bracketOpen, setBracketOpen] = useState(false);
  // const [display, setDisplay] = useState();

  

  const takeInput = (val:any) => {
    console.log('Pressed', val)

// to implement the 'AC' functionality
    if (val == 'clear') {
      setValue('0')
    }



// to evaluate the given expression
    else if (val == '=') {
      try {
// if the length of open brackets is same as close brackets then...
        if ((value.match(/\(/g) || []).length == (value.match(/\)/g) || []).length) {
          // setValue('Format Error')
          // console.log('Equal Brackets')

// if the user enters two consecutive operators then slice the previously entered operator with the later one
          if (value.slice(-1) == '+' || value.slice(-1) == '-' || value.slice(-1) == '*' || value.slice(-1) == '/' || value.slice(-1) == '%' || value.slice(-1) == '.') {
            setValue(`${eval(value.replace('()', '0').slice(0,-1))}`)
          }

// if two consecutive blank brackets '()' are passed then treat them as a '0'
          else {
            setValue(`${eval(value.replace('()', '0'))}`)
          }
        }
        // else {
        //   console.log('Unequal Brackets')
        // }
      }
      catch (e) {
        setValue('Format Error...')
      }
    }



// to slice the value at [-1] and go to the value at [0]
    else if (val == 'back') {
      setValue(value.slice(0, -1))
    }



    else if (val == '()') {

// if no number is passed then we can pass the open bracket      
      if (value == '0') {
        setValue('(')
        setBracketOpen(true)
      }

// if an operator is at the previous index then only open bracket can be passed
      else if (value.slice(-1) == '+' || value.slice(-1) == '-' || value.slice(-1) == '*' || value.slice(-1) == '/' || value.slice(-1) == '%' || value.slice(-1) == '.') {
        setValue(value + '(')
        setBracketOpen(true)
      }

// if open bracket is passed then closing bracket will be passed at the next input
      else {
        if (bracketOpen == true) {
          setValue(value + ')')
          setBracketOpen(false)
        }
        else {
          setValue(value + '(')
          setBracketOpen(true)
        }
      }
    }



    else {
      if (value == '0') {
        if (isNaN(val)) {
          setValue(value + val)
        }
        else {
          setValue(val)
        }
      }
      else if (isNaN(val)) {
        if (value.slice(-1) == '+' || value.slice(-1) == '-' || value.slice(-1) == '*' || value.slice(-1) == '/' || value.slice(-1) == '%' || value.slice(-1) == '.') {
          setValue(value.slice(0, -1) + val)
        }
        else {
          setValue(value + val)
        }
        // console.log(value.slice(-1))
        // setValue(value + val)
      }
      else {
        setValue(value + val)
      }
      // console.log(isNaN(val))
    }
  }



  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.input} >{value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
      </View>
      <View style={styles.line}></View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={() => takeInput('clear')}><View style={styles.button}>
            <Text style={styles.specialButton}>AC</Text>
          </View></TouchableOpacity>
          <TouchableOpacity onPress={() => takeInput('()')}><View style={styles.button}>
            <Text style={styles.lightButton}>( )</Text>
          </View></TouchableOpacity>
          <TouchableOpacity onPress={() => takeInput('%')}><View style={styles.button}>
            <Text style={styles.lightButton}>%</Text>
          </View></TouchableOpacity>
          <TouchableOpacity onPress={() => takeInput('/')}><View style={styles.button}>
            <Text style={styles.lightButton}>/</Text>
          </View></TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={() => takeInput('7')}><View style={styles.button}>
            <Text style={styles.darkButton}>7</Text>
          </View></TouchableOpacity>
          <TouchableOpacity onPress={() => takeInput('8')}><View style={styles.button}>
            <Text style={styles.darkButton}>8</Text>
          </View></TouchableOpacity>
          <TouchableOpacity onPress={() => takeInput('9')}><View style={styles.button}>
            <Text style={styles.darkButton}>9</Text>
          </View></TouchableOpacity>
          <TouchableOpacity onPress={() => takeInput('*')}><View style={styles.button}>
            <Text style={styles.lightButton}>*</Text>
          </View></TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={() => takeInput('4')}><View style={styles.button}>
            <Text style={styles.darkButton}>4</Text>
          </View></TouchableOpacity>
          <TouchableOpacity onPress={() => takeInput('5')}><View style={styles.button}>
            <Text style={styles.darkButton}>5</Text>
          </View></TouchableOpacity>
          <TouchableOpacity onPress={() => takeInput('6')}><View style={styles.button}>
            <Text style={styles.darkButton}>6</Text>
          </View></TouchableOpacity>
          <TouchableOpacity onPress={() => takeInput('-')}><View style={styles.button}>
            <Text style={styles.lightButton}>-</Text>
          </View></TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={() => takeInput('1')}><View style={styles.button}>
            <Text style={styles.darkButton}>1</Text>
          </View></TouchableOpacity>
          <TouchableOpacity onPress={() => takeInput('2')}><View style={styles.button}>
            <Text style={styles.darkButton}>2</Text>
          </View></TouchableOpacity>
          <TouchableOpacity onPress={() => takeInput('3')}><View style={styles.button}>
            <Text style={styles.darkButton}>3</Text>
          </View></TouchableOpacity>
          <TouchableOpacity onPress={() => takeInput('+')}><View style={styles.button}>
            <Text style={styles.lightButton}>+</Text>
          </View></TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={() => takeInput('.')}><View style={styles.button}>
            <Text style={styles.darkButton}>.</Text>
          </View></TouchableOpacity>
          <TouchableOpacity onPress={() => takeInput('0')}><View style={styles.button}>
            <Text style={styles.darkButton}>0</Text>
          </View></TouchableOpacity>
          <TouchableOpacity onPress={() => takeInput('back')}><View style={styles.button}>
            <Text style={styles.specialButton}>⌫</Text>
          </View></TouchableOpacity>
          <TouchableOpacity onPress={() => takeInput('=')}><View style={styles.button}>
            <Text style={styles.lightButton}>=</Text>
          </View></TouchableOpacity>
        </View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
  },

  inputContainer: {
    height: 316,
    width: 370,
    backgroundColor: '#000'
  },

  input: {
    fontFamily:'georgia',
    marginHorizontal: 10,
    marginTop: 240,
    fontSize: 50,
    color: '#fff',
    fontWeight: 300,
    textAlign: 'right'
  },

  line: {
    backgroundColor: '#343434',
    height: 2,
    width: 350,
    marginLeft: 15,
    marginBottom: 30
  },

  buttonContainer: {
    backgroundColor: '#000'
  },

  buttonRow: {
    flexDirection: 'row'

  },

  button: {
    color: '#00b5c1',
    marginLeft: 17,
    marginBottom: 17,
    borderRadius: 50,
    height: 75,
    width: 75,

  },

  lightButton: {
    fontFamily:'georgia',
    backgroundColor: '#343434',
    borderRadius: 50,
    height: 75,
    width: 75,
    color: '#64ffb2',
    fontSize: 35,
    textAlign: 'center',
    padding: 10,
  },

  darkButton: {
    fontFamily:'georgia',
    backgroundColor: '#1c1c1c',
    borderRadius: 50,
    height: 75,
    width: 75,
    color: '#fff',
    fontSize: 35,
    textAlign: 'center',
    padding: 10,
  },

  specialButton: {
    fontFamily:'georgia',
    backgroundColor: '#64ffb2',
    borderRadius: 50,
    height: 75,
    width: 75,
    color: '#1c1c1c',
    fontSize: 35,
    textAlign: 'center',
    padding: 10,
  }

})