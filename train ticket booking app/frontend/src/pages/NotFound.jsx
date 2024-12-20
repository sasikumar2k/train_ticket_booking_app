import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
    const navigate = useNavigate()
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img src="https://www.cloudns.net/blog/wp-content/uploads/2023/10/Error-404-Page-Not-Found.png" height='500' alt="" />
            </div>
            <button onClick={() => { navigate("/") }} style={{ marginLeft: "680px" }} type="button" class="btn btn-primary">Go back to home page</button>
        </>

    )
}
