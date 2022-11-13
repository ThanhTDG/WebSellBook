import React, { useState } from 'react';
import { CategoriesSelected } from '../../pages/Books/CategoriesSelected';
import './CategoryItem.scss';
import { useStore, actions } from '../../store';

const CategoryItem = (props) => {
    const [isSelected, setSelected] = useState(false)
    const [state, dispatch] = useStore()
    const categoryId = {state}
    const categoryButtonStyle = {
        backgroundColor: `${isSelected === false ? 'var(--White)' : props.color}`
    }
    const categoryChildsStyle = {
        display: `${isSelected === true ? 'block' : 'none'}`,
        paddingLeft: '48px'
    }
    function performeCategories(isDisplay) {
        let otherCategories = document.getElementsByClassName('category-item-button')
        for (let i = 0; i < otherCategories.length; i++) {
            if (otherCategories.item(i).id !== `category-item-button-${props.category._id}`) {
                otherCategories.item(i).style.display = isDisplay === true ? 'block' : 'none'
            }
        }
    }
    function onSelected() {
        dispatch(actions.selectCategory(props.category._id))
        setSelected(!isSelected)
        if (props.category.hasOwnProperty('children') === true && isSelected === false) {
            performeCategories(false)
        } else if (props.category.hasOwnProperty('children') === true && isSelected === true) {
            performeCategories(true)
        }
        //set tags
        if(props.category.hasOwnProperty('children') === false && isSelected === false){
            setTagsInBooks()
        }
        if(props.category.hasOwnProperty('children') === false && isSelected === true){
            removeTagsInBook()
        }
    }
    function setTagsInBooks(){
       CategoriesSelected.push(props.category)
       props.onAddTag()
    }
    function removeTagsInBook(){
        CategoriesSelected.pop(props.category)
        props.onAddTag()
    }
    const childCategoryItem = props.category.hasOwnProperty('children') === true ?
        <div id={`category-childs-${props.category._id}`} style={categoryChildsStyle}>
            {props.category.children.map((child) => (
                <CategoryItem onAddTag={props.onAddTag} category={child} color={'var(--DarkBlue)'} />
            ))}
        </div> :
        <span></span>
    var categoryNameStyle = {
        marginRight: '12px',
        color: isSelected === true ? 'var(--White)' : 'var(--Darkest)',
        fontSize: props.category.name.length>20? props.category.name.length>30 ?'10px':'12px':'16px'
    }

    var categoryOptionImage = 'ic-plus-gray.png';
    if (isSelected === false && props.category.hasOwnProperty('children') === false) {
        categoryOptionImage = 'ic-bullet.png'
    } else if (isSelected === true) {
        categoryOptionImage = 'ic-selected.png'
    }

    return (
        <div className='category-item-bounder'>
            <button onClick={()=>onSelected()} className={props.category.hasOwnProperty('children') === true ? 'category-item-button' : 'category-item-button-none-child'} id={`category-item-button-${props.category._id}`} style={categoryButtonStyle}>
                <div id={`category-item-${props.category._id}`} className='category-item-container'>
                    <img id={`category-image-${props.category._id}`}
                        src={require(`../../assets/icons/${categoryOptionImage}`)} alt='ic-plus' />
                    <span style={categoryNameStyle}>{props.category.name}</span>
                </div>
            </button>
            {childCategoryItem}
        </div>
    );
}

export default CategoryItem;
