import * as React from 'react';
import TabProduct from '../tab/product/TabProduct';
import { ProductMgtProvider } from '../../store'
import { Button } from '@mui/material';
function ListProduct() {
    return (
        <ProductMgtProvider>
            <div>
                <h2>
                    Quản lý sách
                </h2>
                <button onclick="activateLasers()">
                    Thêm mới
                </button>
            </div>
            < TabProduct />
        </ProductMgtProvider>

    )

}




export default ListProduct