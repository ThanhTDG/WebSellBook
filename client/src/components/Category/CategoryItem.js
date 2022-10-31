import React, { useState } from 'react';
import { CategoriesSelected } from '../../pages/Books/CategoriesSelected';
import './CategoryItem.scss'

const CategoryItem = (props) => {
    const [isSelected, setSelected] = useState(false)
    const [onTag, setTag] = useState(0)
    const isParent = props.isParent;
    const categoryButtonStyle = {
        backgroundColor: `${isSelected === false ? 'var(--LightGray)' : props.color}`
    }
    const categoryChildsStyle = {
        display: `${isSelected === true ? 'block' : 'none'}`,
        paddingLeft: '48px'
    }
    function performeCategories(isDisplay) {
        let otherCategories = document.getElementsByClassName('category-item-button')
        for (let i = 0; i < otherCategories.length; i++) {
            if (otherCategories.item(i).id !== `category-item-button-${props.category.id}`) {
                otherCategories.item(i).style.display = isDisplay === true ? 'block' : 'none'
            }
        }
    }
    function onSelected() {
        setSelected(!isSelected)
        if (props.category.hasOwnProperty('child') === true && isSelected === false) {
            performeCategories(false)
        } else if (props.category.hasOwnProperty('child') === true && isSelected === true) {
            performeCategories(true)
        }
        //set tags
        if(props.category.hasOwnProperty('child') === false && isSelected === false){
            setTagsInBooks()
        }
        if(props.category.hasOwnProperty('child') === false && isSelected === true){
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
    const childCategoryItem = props.category.hasOwnProperty('child') === true ?
        <div id={`category-childs-${props.category.id}`} style={categoryChildsStyle}>
            {props.category.child.map((child) => (
                <CategoryItem onAddTag={props.onAddTag} category={child} color={'var(--Blue)'} />
            ))}
        </div> :
        <span></span>
    var categoryNameStyle = {
        marginRight: '12px',
        color: props.color === 'var(--Blue)' && isSelected === true ? 'var(--White)' : 'var(--Darkest)',
        fontSize: props.category.name.length>20? props.category.name.length>30 ?'10px':'12px':'16px'
    }

    var categoryOptionImage = 'ic-plus-gray.png';
    if (isSelected === false && props.category.hasOwnProperty('child') === false) {
        categoryOptionImage = 'ic-bullet.png'
    } else if (isSelected === true) {
        categoryOptionImage = 'ic-selected.png'
    }

    return (
        <div className='category-item-bounder'>
            <button onClick={onSelected} className={props.category.hasOwnProperty('child') === true ? 'category-item-button' : 'category-item-button-none-child'} id={`category-item-button-${props.category.id}`} style={categoryButtonStyle}>
                <div id={`category-item-${props.category.id}`} className='category-item-container'>
                    <img id={`category-image-${props.category.id}`}
                        src={require(`../../assets/icons/${categoryOptionImage}`)} alt='ic-plus' />
                    <span style={categoryNameStyle}>{props.category.name}</span>
                </div>
            </button>
            {childCategoryItem}
        </div>
    );
}

export default CategoryItem;
