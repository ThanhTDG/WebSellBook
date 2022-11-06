import * as React from 'react';
import { Button } from '~/components/Button';
import { TabProduct } from '~/components/tab/product';
import { ProductMgtProvider } from '~/stores'

function Products() {
    return (
        <div className='products'>
            <div>

            </div>
            <h2>
                Quản lý sách
            </h2>
            <Button primary> Thêm mới </Button>
            <div>

                <ProductMgtProvider>
                    < TabProduct />
                </ProductMgtProvider>
            </div>

        </div>

    )
}

export default Products