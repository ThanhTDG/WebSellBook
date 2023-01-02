import React, { useState, useEffect } from 'react';
import './Address.scss'
import * as AddressServices from '../../../apiServices/AddressServices'
import AddressPagniated from '../../NavButtons/addressPagniated';
import AddAddressButton from './AddAddressButton/AddAddressButton';
import AddressItem from './AddressItem/AddressItem';


const Address = (props) => {
    const [isAddNewAddress, setIsAddNewAddress] = useState(false)
    const [addressData, setAddressDate] = useState([])
    const pagiatedStyle = {
        visibility: isAddNewAddress ? 'hidden' : 'visible'
    }
    const [isRefrest, setIsRefrest] = useState(false)
    const handleVisibilityPagniated = () => {
        setIsAddNewAddress(!isAddNewAddress)
    }
    const getAllAddress = async (page, limit) => {
        const response = await AddressServices.getAll(page, limit)
        setAddressDate(response)
        console.log('all address', response)
    }
    useEffect(() => {
        getAllAddress(1, 12)
    }, [])

    const refrestData = ()=>{
        setIsRefrest(!isRefrest)    
    }

    useEffect(()=>{
        getAllAddress(1, 12)
    }, [isRefrest])

    return (
        <div>
            {
                addressData.length > 0 ? addressData.map((data) => (
                    <AddressItem addressData={data} hidePagniation={handleVisibilityPagniated} refrestData = {refrestData}/>))
                    : ''
            }
            <AddAddressButton hidePagniation={handleVisibilityPagniated} refrestData = {refrestData}/>

            {/* <div style={pagiatedStyle}>
                <AddressPagniated totalPages={12} focePage={0} />
            </div> */}
        </div>
    );
}

export default Address;
