import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {ItemList} from '../ItemList/ItemList'

import { useDarkModeContext } from '../../context/DarkModeContext'
import { getProductos } from '../../firebase/firebase'

const ItemListContainer = () => {
  const [productos, setProductos] = useState([])
  const {categoria}= useParams()
  const {darkMode} = useDarkModeContext()
  useEffect(()=>{
    if(categoria){
      getProductos()
      .then(items => {
        items = [...items].sort((a, b)=> a.categoria<b.categoria ? -1 : 1)
        const products = items.filter(prod => prod.stock >0).filter(prod => prod.categoria === categoria)
        const productsList = <ItemList products={products} plantilla={'item'}/>
        setProductos(productsList)
      })
    } else {
    getProductos()
    .then(items => {
      items = [...items].sort((a, b)=> a.categoria<b.categoria ? -1 : 1)
      const products = items.filter(prod=> prod.stock>0)
      const productsList = <ItemList products={products} plantilla={'item'}/>
      setProductos(productsList)
    })
  }
  }, [categoria])
  return (
    <div className='row cardProductos'>
      {productos}      
    </div>
  );
}
export default ItemListContainer;