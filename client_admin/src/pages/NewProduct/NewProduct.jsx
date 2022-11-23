import React from 'react';
import Product from '~/components/Form/Product/Product';
import styles from './newProduct.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function NewProduct() {
    return (
        <Product></Product>
    )
}

export default NewProduct