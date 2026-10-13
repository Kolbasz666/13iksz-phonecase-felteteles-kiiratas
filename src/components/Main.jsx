import axios from "axios"
import { use, useEffect, useState } from "react"

function Main({ bg_color }) {
    const serverURL = "http://127.1.1.1:3000"

    const [phonecase, setPhonecase] = useState([])
    //make, phoneModel, price, stock, color
    const [make, setMake] = useState("")
    const [phoneModel, setPhoneModel] = useState("")
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)
    const [color, setColor] = useState("")

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const [showLogin, setShowLogin] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false)

    async function Logout() {
        localStorage.clear()
        setLoggedIn(false)
    }

    async function Login() {
        try {
            const response = await axios.post(serverURL + '/login', { email, password })
            localStorage.setItem('token', response.data.token)
            setLoggedIn(true)
        } catch (error) {
            console.log(error);
            alert('Sikertelen bejelentkezés')
        }
    }

    async function Reg() {
        try {
            const response = await axios.post(serverURL + '/reg', { email, username, password })
            alert('Sikeres regisztráció')
        } catch (error) {
            console.log(error);
            alert('Sikertelen regisztráció')
        }
    }

    async function LoadPhonecases() {
        try {
            const response = await axios.get(serverURL + "/phonecase")
            setPhonecase(response.data)
        }
        catch (error) {
            console.log(error)
            alert("Phonecases get : error")
        }
    }

    async function CreatePhonecase() {
        try {
            const response = await axios.post(serverURL + "/phonecase", { make, phoneModel, price, stock, color })
            LoadPhonecases()
        }
        catch (error) {
            console.log(error)
            alert("Phonecases post: error")
        }
    }

    async function deletePhonecases(id) {
        try {
            const response = await axios.delete(serverURL + "/phonecase/" + id, { headers: { authorization: localStorage.getItem('token') } })
            LoadPhonecases()
        }
        catch (error) {
            console.log(error)
            alert("phonecases delete: error")
        }

    }

    useEffect(() => {
        LoadPhonecases()
    }, [])


    return <main style={{ backgroundColor: 'rgb(230,210,190)' }} className="p-3 container">
        <div className="row">
            <div className="col-8">
                <section>
                    <h2>Phonecases</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Make</th>
                                <th>phoneModel</th>
                                <th>color</th>
                                <th>price</th>
                                <th>stock</th>
                                {
                                    loggedIn ? <th>Delete</th> : <></>
                                }

                            </tr>
                        </thead>
                        <tbody>
                            {phonecase.map((onePhonecase) => <tr key={onePhonecase.id}>
                                <td>{onePhonecase.make}</td>
                                <td>{onePhonecase.phoneModel}</td>
                                <td>{onePhonecase.color}</td>
                                <td>{onePhonecase.price}</td>
                                <td>{onePhonecase.stock}</td>
                                {
                                    loggedIn ? <td>
                                        <button className="btn btn-danger" onClick={() => deletePhonecases(onePhonecase.id)}>X</button>
                                    </td> : <></>
                                }

                            </tr>)}
                        </tbody>
                    </table>
                </section>
            </div>
            <div className="col-4">
                {
                    loggedIn ? <section>
                        <input type="text" className="form-control mb-2" placeholder="make" value={make} onChange={(e) => setMake(e.target.value)} />
                        <input type="text" className="form-control mb-2" placeholder="phoneModel" value={phoneModel} onChange={(e) => setPhoneModel(e.target.value)} />
                        <input type="text" className="form-control mb-2" placeholder="color" value={color} onChange={(e) => setColor(e.target.value)} />
                        <input type="text" className="form-control mb-2" placeholder="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                        <input type="text" className="form-control mb-2" placeholder="stock" value={stock} onChange={(e) => setStock(e.target.value)} />
                        <button className="btn btn-success" onClick={CreatePhonecase}>Create</button>
                    </section> : <></>
                }

                <section>
                    {
                        loggedIn ? <button className="btn btn-danger" onClick={Logout}>Kijelentkezés</button> : <>
                            {
                                showLogin ? <>
                                    <h2>Bejelentkezés</h2>
                                    <input className="form-control mb-2" type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <input className="form-control mb-2" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <button onClick={Login} className="btn btn-primary me-2">Login</button><button className="btn btn-secondary" onClick={() => setShowLogin(false)}>Registration</button>
                                </> :
                                    <>
                                        <h2>Regisztráció</h2>
                                        <input className="form-control mb-2" type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                        <input className="form-control mb-2" type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        <input className="form-control mb-2" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        <button onClick={Reg} className="btn btn-primary me-2">Registration</button><button className="btn btn-secondary" onClick={() => setShowLogin(true)}>Login</button>
                                    </>
                            }

                        </>
                    }
                </section>
            </div>
        </div>



    </main>
}

export default Main