import React, { useState, useEffect } from 'react';
import { CategoriesSelected } from '../../pages/Books/CategoriesSelected';
import './CategoryItem.scss';
import { useStore, actions } from '../../store';

const CategoryItem = (props) => {
    const [isSelected, setSelected] = useState(false)
    const [state, dispatch] = useStore()
    const categoryId = { state }
    const categoryChildId = { state }

    //style
    const categoryButtonStyle = {
        backgroundColor: isSelected === false ? 'var(--White)' : props.color,
        color: isSelected === true ? 'var(--White)' : 'var(--Darkest)',
        paddingRight: '24px',
        fontSize: props.category.name.length > 20 ? props.category.name.length > 30 ? '10px' : '12px' : '16px',

    }
    const categoryChildsStyle = {
        display: `${isSelected === true ? 'block' : 'none'}`,
        paddingLeft: '48px'
    }

    var categoryOptionImage = 'ic-plus-gray.png';
    if (isSelected === false && props.isHaveChild === false) {
        categoryOptionImage = 'ic-bullet.png'
    } else if (isSelected === true) {
        categoryOptionImage = 'ic-selected.png'
    }


    function performeCategories(isDisplay) {
        let otherCategories = document.getElementsByClassName('category-item-button')
        for (let i = 0; i < otherCategories.length; i++) {
            if (otherCategories.item(i).id !== `category-item-button-${props.category._id}`) {
                otherCategories.item(i).style.display = isDisplay === true ? 'block' : 'none'
            }
        }
    }

    useEffect(() => {
        try {
            let otherChild = document.getElementsByClassName('category-children-item')
            for (let i = 0; i < otherChild.length; i++) {
                otherChild.item(i).style.backgroundColor = 'var(--White)'
                otherChild.item(i).style.color = 'var(--Darkest)'
            }

            let selectedChild = document.getElementById(`category-children-item-${state.categoryChildId}`)
            selectedChild.style.backgroundColor = 'var(--DarkBlue)'
            selectedChild.style.color = 'var(--White)'
        }catch(error){

        }
    }, [state.categoryChildId])

    // useEffect(() => {
    //     try {
    //         let otherChild = document.getElementsByClassName('category-children-item')
    //         for (let i = 0; i < otherChild.length; i++) {
    //             otherChild.item(i).style.backgroundColor = 'var(--White)'
    //             otherChild.item(i).style.color = 'var(--Darkest)'
    //         }
    //     }catch(error){
            
    //     }
    // }, [state.categoryId])

    // function performeChild() {
    //     let otherChild = document.getElementsByClassName('category-children-item')
    //     for (let i = 0; i < otherChild.length; i++) {
    //         if (otherChild.item(i).id !== `category-children-item-${props.category._id}`) {
    //             //otherChild.item(i).style.display = isDisplay === true ? 'block' : 'none'
    //             otherChild.item(i).style.backgroundColor = 'var(--White)'
    //             otherChild.item(i).style.color = 'var(--Darkest)'
    //             //console.log(otherChild.item(i).style)
    //         }
    //     }
    // }
    
    function onSelected() {
        if (props.isParent === true) {
            dispatch(actions.selectCategory(props.category._id))
            setSelected(!isSelected)
        } else {
            dispatch(actions.selectCategoryChild(props.category._id))
            dispatch(actions.selectCategory(props.category._id))
        }

        if (props.isParent === true && isSelected === false) {
            performeCategories(false)
        } else if (props.isParent === true && isSelected === true) {
            performeCategories(true)
        }
        if (props.isParent === false) {
            //performeChild()
        }
        //set tags
        // if(props.isHaveChild === false && isSelected === false){
        //     setTagsInBooks()
        // }
        // if(props.isHaveChild === false && isSelected === true){
        //     removeTagsInBook()
        // }
    }
    // function setTagsInBooks() {
    //     CategoriesSelected.push(props.category)
    //     props.onAddTag()
    // }
    // function removeTagsInBook() {
    //     CategoriesSelected.pop(props.category)
    //     props.onAddTag()
    // }

    const childCategoryItem = props.isHaveChild === true ?
        <div id={`category-childs-${props.category._id}`} style={categoryChildsStyle}>
            {props.category.children.map((child) => (
                <CategoryItem
                    isHaveChild={child.hasOwnProperty('children')}
                    isParent={false}
                    onAddTag={props.onAddTag}
                    category={child}
                    color={'var(--DarkBlue)'} />
            ))}
        </div> :
        <span></span>


    return (
        <div className='category-item-bounder'>
            <button onClick={() => onSelected()}
                className={props.isParent === true ? 'category-item-button' : 'category-children-item'}
                id={props.isParent === true ? `category-item-button-${props.category._id}` : `category-children-item-${props.category._id}`}
                style={categoryButtonStyle}>
                <div id={`category-item-${props.category._id}`} className='category-item-container'>
                    <img id={`category-image-${props.category._id}`}
                        src={require(`../../assets/icons/${categoryOptionImage}`)} alt='ic-plus' />
                    {/* <span style={categoryNameStyle}>{props.category.name}</span> */}
                    {props.category.name}
                </div>
            </button>
            {childCategoryItem}
        </div>
    );
}

export default CategoryItem;
