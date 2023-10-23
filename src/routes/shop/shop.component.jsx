import { useContext } from 'react'
import { ProductContext } from '../../contexts/products.context'

import './shop.styles.scss'
import ProductCard from '../../components/product-card/product-card.component'

const Shop = () => {

    const { products } = useContext(ProductContext)

    const renderProducts = () => {

        return products.map( product => {
           return  <ProductCard key={product.id} product={product} />
        })
    }

    return (
        <div className='products-container'>
            {renderProducts()}
        </div>
    )
}

export default Shop;