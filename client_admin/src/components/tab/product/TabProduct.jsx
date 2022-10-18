import * as React from 'react';
import TabPanel from '../TabPanel';
import { TitleTabProducts } from '../../tab/product/TitleTabProducts'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TableProduct from '../../table/TableProduct';


function TabProduct() {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    console.log("tabproduct");
    return (
        <div>
            <div>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile>
                    {
                        TitleTabProducts.map((title, index) => {
                            return < Tab key={"label-tab-product-" + index} label={title.nameVN} />
                        })
                    }
                </Tabs>
            </div>
            {
                TitleTabProducts.map((title, index) => {
                    return <TabPanel value={value} index={index}>
                        <TableProduct value={title.key} />
                    </TabPanel>
                })
            }
        </div>
    )
}


export default TabProduct