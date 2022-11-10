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
import { Dropdown } from 'bootstrap';

const BooksPage = () => {
    const location = useLocation();
    const { stateName } = location.state;
    const [isAddCategoryTag, setAddCategoryTag] = useState(true)
    const [isShowCategories, setIsShowCategories] = useState(true)
    function onHandleShowCategories(){
        setIsShowCategories(!isShowCategories)
    }
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
    const buttonShowCategoryStyle={
        display: 'none',
    }
    const categoriesContainerStyle={
        display: isShowCategories===true? 'block': 'none'
    }
    return (
        <div>
            <Menu active='Sách'></Menu>
            <div id='books-body'>
                <div className='row books-tool-bar-container books-row'>
                    <div className='col-sm-3 books-responsive-col-1' >
                        <div id='category-header'>Danh mục sách</div>
                        <button onClick={onHandleShowCategories} className='btn-show-categories' style={buttonShowCategoryStyle}>
                            <img src={require(`../../assets/icons/${isShowCategories===true? 'ic-down.png': 'ic-next.png'}`)} alt='ic-more'></img>
                        </button>
                    </div>
                    <div className='col-sm-9'>
                        <div style={searchGuideStyle}>Kết quả tìm kiếm cho <div id='books-search-text'>{stateName}</div></div>
                    </div>
                </div>
                <div className='row books-row'>
                    <div className='col-sm-3 categories-col-container' style={categoriesContainerStyle}>
                        {FakeData.categories.map((category) => (
                            <Categories category={category} onAddTag={onAddTag}/>
                        ))}
                    </div>
                    <div className='col-sm-9 books-responsive-col-4'>
                        <div className='d-flex books-responsive-toolbar-container' >
                            {
                                MyVariable.booksToolbar.map((tb) => (
                                    <button id={`books-btn-tb-${tb.id}`} className='btn-tb-container' onClick={() => onSelectToolBarItem(tb.id)}>
                                        <div className='books-responsive-btn-tb-title' style={toolBarItemStyle(tb.id)}>{tb.title}</div>
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
