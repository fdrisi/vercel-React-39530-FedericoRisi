import { initializeApp } from "firebase/app";
import {getFirestore, collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBe-U81rmUhlBOj-cqvDBBg1MfjdlyI4vA",
  authDomain: "react-39530-federicorisi.firebaseapp.com",
  projectId: "react-39530-federicorisi",
  storageBucket: "react-39530-federicorisi.appspot.com",
  messagingSenderId: "380748534933",
  appId: "1:380748534933:web:89a41d14ddc718be67379c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore()

export const cargarBDD = async () => {
    const promise = await fetch('./json/catalogo.json')
    const productos = await promise.json()
    productos.forEach( async (prod)=>{
        await addDoc(collection(db, "productos"), {
            nombre: prod.nombre,
            volumen: prod.volumen,
            categoria: prod.categoria,
            precio: prod.precio,
            unidades: prod.unidades,
            stock: prod.stock,
            img: prod.img,
        })
    })
}

export const getProductos = async () => {
    const productos = await getDocs(collection(db, "productos"))
    const items = productos.docs.map(prod => {
        return {...prod.data(), id: prod.id}
    })
    return items
}

export const getProducto = async(id) => {
    const producto = await getDoc(doc(db, "productos", id))
    const item = {...producto.data(), id: producto.id}
    return item
}

export const updateProducto = async(id, info) => {
    await updateDoc(doc(db, "productos", id), info)
}

export const deleteProducto = async(id) => {
    await deleteDoc(doc(db, "productos", id))
}

export const createOrdenCompra = async (cliente, productos, precioTotal, fecha) =>{
    const ordenCompra = await addDoc(collection(db, "ordenCompra"), {
        datosCliente: cliente,
        productos: productos,
        precioTotal: precioTotal,
        fecha: fecha
    })
    return ordenCompra
}

export const getOrdenCompra = async(id) => {
    const ordenCompra = await getDoc(doc(db, "ordenCompra", id))
    const oCompra = {...ordenCompra.data(), id: ordenCompra.id}
    return oCompra
}