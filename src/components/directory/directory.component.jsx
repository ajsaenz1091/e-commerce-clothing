import './directory.styles.scss'

import CategoryItem from '../category-item/category-item.component'

const Directory = ({ categories }) => {

    const renderCategories = () => {
        return categories.map((category) => {
          return <CategoryItem key={category.id} category={category} />
        })
      }

    return (
        <div className="directory-container">
            {renderCategories()}
        </div>
    )
}

export default Directory