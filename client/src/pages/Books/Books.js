import React, { useState } from 'react';
import BooksStyleSmall from '../../components/Book/Others/Books';
import Categories from '../../components/Category/Categories';
import CategoryTag from '../../components/Category/CategoryTag';
import MyFooter from '../../components/Footer/MyFooter';
import Menu from '../../components/Menu/Menu';
import { FakeData } from '../../variables/FakeData';
import { MyVariable } from '../../variables/variables';
import './Books.scss'
import { CategoriesSelected } from './CategoriesSelected';
import { useLocation } from 'react-router-dom'
import { MyConstVariable } from '../../variables/MyConstVaeiable';

const BooksPage = () => {
    const location = useLocation();
    const { stateName } = location.state;
    const [isAddCategoryTag, setAddCategoryTag] = useState(true)
    function onAddTag(){
        setAddCategoryTag(!isAddCategoryTag)
    }
    function toolBarItemStyle(isActive) {
        return {
            fontSize: '16px',
            fontFamily: isActive === isSelectedToolBarID ? 'MontserratMedium' : 'MontserratRegular',
            color: isActive === isSelectedToolBarID ? 'var(--DarkBlue)' : 'var(--Darkest)',
            borderBottom: isActive === isSelectedToolBarID ? '4px solid var(--DarkBlue)' : 'none',
            textAlign: 'center',
        }
    }
    const [isSelectedToolBarID, setIsSelectedToolBarID] = useState(1)
    function onSelectToolBarItem(order) {
        setIsSelectedToolBarID(order)
    }
    const searchGuideStyle = {
        display: stateName===MyConstVariable.myNullVariable? 'none': 'block'
    }
    return (
        <div>
            <Menu active='Sách'></Menu>
            <div id='books-body'>
                <div className='row books-tool-bar-container books-row'>
                    <div className='col-sm-3' >
                        <div id='category-header' >Danh mục sách</div>
                    </div>
                    <div className='col-sm-9'>
                        <div style={searchGuideStyle}>Kết quả tìm kiếm cho <div id='books-search-text'>{stateName}</div></div>
                    </div>
                </div>
                <div className='row books-row'>
                    <div className='col-sm-3 categories-col-container'>
                        {FakeData.categories.map((category) => (
                            <Categories category={category} onAddTag={onAddTag}/>
                        ))}
                    </div>
                    <div className='col-sm-9'>
                        <div className='d-flex'>
                            {
                                MyVariable.booksToolbar.map((tb) => (
                                    <button className='btn-tb-container' onClick={() => onSelectToolBarItem(tb.id)}>
                                        <div style={toolBarItemStyle(tb.id)}>{tb.title}</div>
                                    </button>
                                ))
                            }
                        </div>
                        <div id='books-tags-container'>
                            {
                                CategoriesSelected.map((tagItem)=>(
                                    <CategoryTag category={tagItem} />
                                ))
                            }
                        </div>
                        <BooksStyleSmall />
                    </div>
                </div>


            </div>

            <MyFooter />
        </div>
    );
}

export default BooksPage;
