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

    async function Login() {

    }

    async function Reg() {

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
            const response = await axios.delete(serverURL + "/phonecase/" + id)
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


    return <main>
        <section>
            <h2>Phonecases</h2>
            <table>
                <thead>
                    <tr>
                        <th>Make</th>
                        <th>phoneModel</th>
                        <th>color</th>
                        <th>price</th>
                        <th>stock</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {phonecase.map((onePhonecase) => <tr key={onePhonecase.id}>
                        <td>{onePhonecase.make}</td>
                        <td>{onePhonecase.phoneModel}</td>
                        <td>{onePhonecase.color}</td>
                        <td>{onePhonecase.price}</td>
                        <td>{onePhonecase.stock}</td>
                        <td>
                            <button onClick={() => deletePhonecases(onePhonecase.id)}>X</button>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </section>
        <section>
            <input type="text" placeholder="make" value={make} onChange={(e) => setMake(e.target.value)} />
            <input type="text" placeholder="phoneModel" value={phoneModel} onChange={(e) => setPhoneModel(e.target.value)} />
            <input type="text" placeholder="color" value={color} onChange={(e) => setColor(e.target.value)} />
            <input type="text" placeholder="price" value={price} onChange={(e) => setPrice(e.target.value)} />
            <input type="text" placeholder="stock" value={stock} onChange={(e) => setStock(e.target.value)} />
            <button onClick={CreatePhonecase}>Create</button>
        </section>
        <section>
            {
                showLogin ? <>
                    <h2>Bejelentkezés</h2>
                    <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="text" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={Login}>Login</button><button onClick={ () => setShowLogin(false) }>Registration</button>
                </> :
                    <>
                        <h2>Regisztráció</h2>
                        <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="text" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button onClick={Reg}>Registration</button><button onClick={ () => setShowLogin(true) }>Login</button>
                    </>
            }



        </section>
    </main>
}

export default Main