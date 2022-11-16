import React from 'react';
import CategoryItem from './CategoryItem';
import './Categories.scss'

const Categories = (props) => {
    const category = props.category;
    return (
        <div>
            <div className='category-title'>{category.name}</div>
            <div className='categories-bounder'>
                {category.child.map((category) => (
                    <CategoryItem onAddTag={props.onAddTag} category={category} isParent={true} color={'var(--Orange)'} />
                ))}
            </div>
        </div>
    );
}

export default Categories;
