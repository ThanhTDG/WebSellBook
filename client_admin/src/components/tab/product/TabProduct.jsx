import TabPanel from '../TabPanel';
import Pagination from '@mui/material/Pagination';
import { TitleTabProducts } from '../../tab/product/TitleTabProducts'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TableProduct from '../../table/product/TableProduct';
import { useProductMgt, actions } from '../../../store'
import SelectNumberOfRows from '../../widget/SelectNumOfRows';
function TabProduct() {
    const [state, dispatch] = useProductMgt();

    const handleSwitchTab = (e, tabSelected) => {
        dispatch(actions.setTabMgtProduct(tabSelected));
    }
    const handleSelectNumOfRows = (e) => {
        dispatch(actions.setCountRowOnPageMgtProduct(e.target.value));
    };
    const handleSelectPage = (e, optionSelected) => {
        dispatch(actions.setPageMgtProduct(optionSelected));
    };
    console.log(state);
    return (
        <div>
            <div>
                <Tabs value={state.selectTab} onChange={handleSwitchTab} aria-label="basic tabs example"
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
                    return <TabPanel value={state.selectTab} index={index}>
                        <h1>{title.nameVN}</h1>
                        <TableProduct />
                        <div className="nav-table">
                            <SelectNumberOfRows handleChange={handleSelectNumOfRows} page={state.page} />
                            <Pagination count={state.maxPage} size="small" page={state.page} onChange={handleSelectPage} />
                        </div>
                    </TabPanel>
                })
            }
        </div>
    )
}


export default TabProduct