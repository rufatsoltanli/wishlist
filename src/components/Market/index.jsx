import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Market() {
    const [data, setData] = useState([])



    const [basket, setBasket] = useState(localStorage.getItem("basket")
        ? JSON.parse(localStorage.getItem("basket")) : []
    )

    const [wishList, setWishList] = useState(localStorage.getItem("wishList")
        ? JSON.parse(localStorage.getItem("wishList")) : []
    )

    useEffect(() => {
        localStorage.setItem("wishList", JSON.stringify(wishList))
    }, [wishList])

    useEffect(() => {
        localStorage.setItem("basket", JSON.stringify(basket))
    }, [basket])


    useEffect(() => {
        axios.get("https://northwind.vercel.app/api/products")
            .then(function (response) {

                setData(response.data)
            })
    }, [])


    function addToWishList(newWisdhed) {
        setWishList([...wishList, { ...newWisdhed, wished: false }])


    }
    console.log(wishList);
    function wishToggle(x) {
        x.wished = !x.wished
    }

    function addToBasket(newItem) {
        let elementIndex = basket.findIndex((x) => x.id === newItem.id)
        console.log(elementIndex);
        if (elementIndex !== -1) {
            const newBasket = [...basket]
            newBasket[elementIndex].count++;
            setBasket(newBasket)
        } else {
            setBasket([...basket, { ...newItem, count: 1 }])

        }



    }
    function setCountValue(isAdded, item) {
        let elementIndex = basket.findIndex((x) => x.id === item.id)
        const newBasket = [...basket]

        if (isAdded) {
            newBasket[elementIndex].count++;
            setBasket(newBasket)

        }
        else {
            if (newBasket[elementIndex].count > 0) {
                newBasket[elementIndex].count--;
                setBasket(newBasket)
            }

        }
    }
    function removeFromBasket(id) {
        setBasket(basket.filter((x) => x.id !== id))
    }

    return (

        <div>
            <h1>Umumi hisse</h1>
            <h3 >Wish List</h3>
            <div className="wishList">
                {
                    wishList.map(
                        (newItem) => {
                            return


                        }

                    )
                }
            </div>
            <h3 >Basket</h3>
            <div className="basket">
                {
                    basket.map(
                        (newItem) => {
                            return <ul key={newItem.id}>
                                <li>{newItem.id}</li>
                                <li>{newItem.name}</li>
                                <li>Say: {newItem.count}
                                    <button onClick={() => setCountValue(true, newItem)}>+</button>
                                    <button onClick={() => setCountValue(false, newItem)}>-</button>
                                </li>
                                <button onClick={() => removeFromBasket(newItem.id)}>Remove from Basket</button>
                            </ul>
                        }
                    )
                }
            </div>
            <h2>products</h2>

            <div className="products">
                {
                    data.map(
                        (x) => {
                            return <ul key={x.id}>
                                <li>{x.id}</li>
                                <li>{x.name}</li>
                                <li><button onClick={() => addToBasket(x)}>Add to Basket</button></li>
                                <li><button onClick={() => { addToWishList(x); wishToggle(x) }}>Add to Wish List</button></li>
                                <li></li>
                            </ul>
                        }
                    )
                }
            </div>
        </div >
    )
}

export default Market