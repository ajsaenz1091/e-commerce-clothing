import './directory.styles.scss'

import DirectoryItem from '../directory-item/directory-item.component'

const Directory = ({ categories }) => {

    const renderCategories = () => {
        return categories.map((category) => {
          return <DirectoryItem key={category.id} category={category} />
        })
      }

    return (
        <div className="directory-container">
            {renderCategories()}
        </div>
    )
}

export default Directory