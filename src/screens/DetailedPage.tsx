import { useMutation } from '@apollo/client';
import { RadioButton } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { USER_APPLY_FOR_LOAN } from '../graphqlAPI/mutation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';

const DetailedPage = ({ navigation }: any) => {
    const [alertBG, setAlertBG] = useState('');
    const [authToken, setAuthToken] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [addressValue, setAddressValue] = useState('');
    const [alertStatus, setAlertStatus] = useState(false);
    const [fullNameValue, setFullNameValue] = useState('');
    const [alertTextColor, setAlertTextColor] = useState('');
    const [loanAmountValue, setLoanAmountValue] = useState('');
    const [occupationValue, setOccupationValue] = useState('');
    const [userApplyForLoan] = useMutation(USER_APPLY_FOR_LOAN);
    const [emailAddressValue, setEmailAddressValue] = useState('');
    const [maritalStatusValue, setMaritalStatusValue] = useState('');
    const [panCardNumberValue, setPanCardNumberValue] = useState('');
    const [alertMessageAddress, setAlertMessageAddress] = useState(false);
    const [aadharCardNumberValue, setAadharCardNumberValue] = useState('');
    const [alertMessageFullName, setAlertMessageFullName] = useState(false);
    const [alertMessageOccupation, setAlertMessageOccupation] = useState(false);
    const [alertMessageLoanAmount, setAlertMessageLoanAmount] = useState(false);
    const [alertMessageEmailAddress, setAlertMessageEmailAddress] = useState(false);
    const [alertMessageMaritalStatus, setAlertMessageMaritalStatus] = useState(false);
    const [alertMessagePanCardNumber, setAlertMessagePanCardNumber] = useState(false);
    const [alertMessageAadharCardNumber, setAlertMessageAadharCardNumber] = useState(false);

    useEffect(() => {
        async function fetchLoginData() {
            const value = await AsyncStorage.getItem('AUTH_TOKEN');
            if (value !== null) {
                setAuthToken(value)
            } else {
                console.log("No Login Detail Found")
            }
        }
        fetchLoginData();
    }, [1]);

    async function submitLoanForm() {
        if (fullNameValue === '') {
            setAlertMessageFullName(true)
            setAlertMessageEmailAddress(false)
            setAlertMessageAddress(false)
            setAlertMessageOccupation(false)
            setAlertMessageLoanAmount(false)
            setAlertMessageMaritalStatus(false)
            setAlertMessagePanCardNumber(false)
            setAlertMessageAadharCardNumber(false)
        } else if (emailAddressValue === '') {
            setAlertMessageFullName(false)
            setAlertMessageEmailAddress(true)
            setAlertMessageAddress(false)
            setAlertMessageOccupation(false)
            setAlertMessageLoanAmount(false)
            setAlertMessageMaritalStatus(false)
            setAlertMessagePanCardNumber(false)
            setAlertMessageAadharCardNumber(false)
        } else if (addressValue === '') {
            setAlertMessageFullName(false)
            setAlertMessageEmailAddress(false)
            setAlertMessageAddress(true)
            setAlertMessageOccupation(false)
            setAlertMessageLoanAmount(false)
            setAlertMessageMaritalStatus(false)
            setAlertMessagePanCardNumber(false)
            setAlertMessageAadharCardNumber(false)
        } else if (occupationValue === '') {
            setAlertMessageFullName(false)
            setAlertMessageEmailAddress(false)
            setAlertMessageAddress(false)
            setAlertMessageOccupation(true)
            setAlertMessageLoanAmount(false)
            setAlertMessageMaritalStatus(false)
            setAlertMessagePanCardNumber(false)
            setAlertMessageAadharCardNumber(false)
        } else if (maritalStatusValue === '') {
            setAlertMessageFullName(false)
            setAlertMessageEmailAddress(false)
            setAlertMessageAddress(false)
            setAlertMessageOccupation(false)
            setAlertMessageLoanAmount(false)
            setAlertMessageMaritalStatus(true)
            setAlertMessagePanCardNumber(false)
            setAlertMessageAadharCardNumber(false)
        } else if (loanAmountValue === '') {
            setAlertMessageFullName(false)
            setAlertMessageEmailAddress(false)
            setAlertMessageAddress(false)
            setAlertMessageOccupation(false)
            setAlertMessageLoanAmount(true)
            setAlertMessageMaritalStatus(false)
            setAlertMessagePanCardNumber(false)
            setAlertMessageAadharCardNumber(false)
        } else if (panCardNumberValue === '') {
            setAlertMessageFullName(false)
            setAlertMessageEmailAddress(false)
            setAlertMessageAddress(false)
            setAlertMessageOccupation(false)
            setAlertMessageLoanAmount(false)
            setAlertMessageMaritalStatus(false)
            setAlertMessagePanCardNumber(true)
            setAlertMessageAadharCardNumber(false)
        } else if (aadharCardNumberValue === '') {
            setAlertMessageFullName(false)
            setAlertMessageEmailAddress(false)
            setAlertMessageAddress(false)
            setAlertMessageOccupation(false)
            setAlertMessageLoanAmount(false)
            setAlertMessageMaritalStatus(false)
            setAlertMessagePanCardNumber(false)
            setAlertMessageAadharCardNumber(true)
        } else {
            await userApplyForLoan({
                variables: {
                    addLoansArgs: {
                        loanAmount: loanAmountValue,
                        FullName: fullNameValue,
                        EmailAddress: emailAddressValue,
                        Address: addressValue,
                        Occupation: occupationValue,
                        MaritalStatus: maritalStatusValue,
                        PanCardNumber: panCardNumberValue,
                        AadharCardNumber: aadharCardNumberValue,
                        user_id: await AsyncStorage.getItem('AUTH_USER_ID')
                    }
                }, context: {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                }
            })
                .then(async (res) => {
                    setAlertStatus(true)
                    setAlertBG('#D1E7DD')
                    setAlertTextColor("green")
                    setAlertMessage('Laon Applied Successfully!')
                    setLoanAmountValue('')
                    setFullNameValue('')
                    setEmailAddressValue('')
                    setAddressValue('')
                    setOccupationValue('')
                    setMaritalStatusValue('')
                    setPanCardNumberValue('')
                    setAadharCardNumberValue('')
                    navigation.navigate('VideoCallPage')
                })
                .catch(error => {
                    setAlertMessageFullName(false)
                    setAlertMessageEmailAddress(false)
                    setAlertMessageAddress(false)
                    setAlertMessageOccupation(false)
                    setAlertMessageLoanAmount(false)
                    setAlertMessageMaritalStatus(false)
                    setAlertMessagePanCardNumber(false)
                    setAlertMessageAadharCardNumber(false)
                    setAlertStatus(true)
                    setAlertBG('#F8D7DA')
                    setAlertTextColor("red")
                    setAlertMessage(error?.message)
                });
        }
    }

    useEffect(() => {
        setTimeout(function () {
            if (alertStatus === true) {
                setAlertStatus(false)
            }
        }, 1000);
    },)

    return (
        <ScrollView style={styles.container}>
            {alertStatus ?
                <View style={{ backgroundColor: alertBG, padding: 15, borderRadius: 5, marginBottom: 10 }}>
                    <Text style={{ fontSize: 15, color: alertTextColor }}>{alertMessage}</Text>
                </View>
                :
                <></>
            }
            <View style={{ marginBottom: 5 }}>
                <Text style={styles.labelStyle}>Full Name *</Text>
                <TextInput onChangeText={(value) => setFullNameValue(value)} style={styles.InputStyle} />
                {alertMessageFullName ?
                    <Text style={styles.errorAlert}>Fullname field is required</Text>
                    :
                    <></>
                }
            </View>
            <View style={{ marginBottom: 5 }}>
                <Text style={styles.labelStyle}>Email Address *</Text>
                <TextInput keyboardType='email-address' onChangeText={(value) => setEmailAddressValue(value)} style={styles.InputStyle} />
                {alertMessageEmailAddress ?
                    <Text style={styles.errorAlert}>Email address field is required</Text>
                    :
                    <></>
                }
            </View>
            <View style={{ marginBottom: 5 }}>
                <Text style={styles.labelStyle}>Address *</Text>
                <TextInput onChangeText={(value) => setAddressValue(value)} style={styles.InputStyle} />
                {alertMessageAddress ?
                    <Text style={styles.errorAlert}>Address field is required</Text>
                    :
                    <></>
                }
            </View>
            <View style={{ marginBottom: 5 }}>
                <Text style={styles.labelStyle}>Occupation *</Text>
                <TextInput onChangeText={(value) => setOccupationValue(value)} style={styles.InputStyle} />
                {alertMessageOccupation ?
                    <Text style={styles.errorAlert}>Occupation field is required</Text>
                    :
                    <></>
                }
            </View>
            <View style={{ marginBottom: 5 }}>
                <Text style={styles.labelStyle}>Marital Status *</Text>
                {/* <RNPickerSelect
                    onValueChange={(value) => setMaritalStatusValue(value)}
                    items={[
                        { label: 'Single', value: 'Single' },
                        { label: 'Married', value: 'Married' },
                        { label: 'Divorced', value: 'Divorced' },
                    ]}
                /> */}
                <RadioButton.Group onValueChange={(value) => setMaritalStatusValue(value)} value={maritalStatusValue}>
                    <View style={styles.rowColumncontainer}>
                        <View style={styles.column1}>
                            <RadioButton value="Single" />
                        </View>
                        <View style={styles.column11}>
                            <TouchableOpacity onPress={() => setMaritalStatusValue('Single')}>
                                <Text style={{ fontSize: 15 }}>Single</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.rowColumncontainer}>
                        <View style={styles.column1}>
                            <RadioButton value="Married" />
                        </View>
                        <View style={styles.column11}>
                            <TouchableOpacity onPress={() => setMaritalStatusValue('Married')}>
                                <Text style={{ fontSize: 15 }}>Married</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.rowColumncontainer}>
                        <View style={styles.column1}>
                            <RadioButton value="Divorced" />
                        </View>
                        <View style={styles.column11}>
                            <TouchableOpacity onPress={() => setMaritalStatusValue('Divorced')}>
                                <Text style={{ fontSize: 15 }}>Divorced</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </RadioButton.Group>
                {alertMessageMaritalStatus ?
                    <Text style={styles.errorAlert}>Marital status field is required</Text>
                    :
                    <></>
                }
            </View>
            <View style={{ marginBottom: 5 }}>
                <Text style={styles.labelStyle}>Loan Amount *</Text>
                <TextInput keyboardType='phone-pad' onChangeText={(value) => setLoanAmountValue(value)} style={styles.InputStyle} />
                {alertMessageLoanAmount ?
                    <Text style={styles.errorAlert}>Loan amount field is required</Text>
                    :
                    <></>
                }
            </View>
            <View style={{ marginBottom: 5 }}>
                <Text style={styles.labelStyle}>PAN Card Number *</Text>
                <TextInput keyboardType='phone-pad' onChangeText={(value) => setPanCardNumberValue(value)} style={styles.InputStyle} />
                {alertMessagePanCardNumber ?
                    <Text style={styles.errorAlert}>Pan card number field is required</Text>
                    :
                    <></>
                }
            </View>
            <View style={{ marginBottom: 5 }}>
                <Text style={styles.labelStyle}>Aadhar Card Number *</Text>
                <TextInput keyboardType='phone-pad' onChangeText={(value) => setAadharCardNumberValue(value)} style={styles.InputStyle} />
                {alertMessageAadharCardNumber ?
                    <Text style={styles.errorAlert}>Aadhar card number field is required</Text>
                    :
                    <></>
                }
            </View>
            <View style={{ marginBottom: 50 }}>
                <TouchableOpacity style={{ backgroundColor: 'black', borderRadius: 4, paddingVertical: 10, marginHorizontal: 8 }} onPress={() => submitLoanForm()}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Submit</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 15,
        paddingHorizontal: 10
    },
    labelStyle: {
        fontSize: 16,
        marginLeft: 10,
        color: 'black',
        fontWeight: 'bold'
    },
    InputStyle: {
        fontSize: 15,
        color: 'black',
        borderRadius: 4,
        marginTop: -10,
        marginBottom: 10,
        marginHorizontal: 6,
        borderBottomWidth: 1,
    },
    errorAlert: {
        color: 'red',
        fontSize: 13,
        marginLeft: 10,
        marginBottom: 5
    },
    // radioButtonContainer: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     marginBottom: 10,
    //   },
    //   radioButtonText: {
    //     marginLeft: 10,
    //     fontSize: 16,
    //   },
    rowColumncontainer: {
        flex: 1,
        flexDirection: 'row',
    },
    column1: {
        flex: 1,
        paddingLeft: 5
    },
    column11: {
        flex: 11,
        paddingTop: 7
    },
});

export default DetailedPage;
