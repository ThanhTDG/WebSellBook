import React, { useState, useEffect } from 'react';
import CategoryItem from './CategoryItem';
import './Categories.scss';
import * as categoriesSv from '../../apiServices/categoryService';
import { FakeData } from '../../variables/FakeData';
import LoadingCategory from './Loading/LoadingCategory';

const Categories = (props) => {
    const [isLoading, setIsLoading] = useState(true)
    const [apiCategories, setApiCategories] = useState([])
    const fetchApi = async () => {
        const categoriesResult = await categoriesSv.categories()
        setIsLoading(false)
        setApiCategories(categoriesResult)
        console.log(categoriesResult)
    }
    useEffect(() => {
        setIsLoading(true)
        fetchApi()
    }, [])
    return (
        <div>
            {
                isLoading === false ?
                    apiCategories.map((apiCategory) => (
                        <div>
                            <div className='category-title'>{apiCategory.name}</div>
                            <div className='categories-bounder'>
                                {
                                    apiCategory.children.map((category) => (
                                        <CategoryItem
                                            isHaveChild={category.hasOwnProperty('children')}
                                            isParent={true}
                                            onAddTag={props.onAddTag}
                                            category={category}
                                            color={'var(--Pink)'} />
                                    ))
                                }
                            </div>
                        </div>
                    )) :
                    <div>
                        {
                            FakeData.books.map((book) => (
                                <LoadingCategory />
                            ))
                        }
                    </div>
            }

        </div>
    );
}

export default Categories;
