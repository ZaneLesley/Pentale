import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import routes from './routes'

const router = createBrowserRouter(routes, {
    basename: import.meta.env.VITE_ROOT_URL
});

function App() {
    return (
        <RouterProvider router={router}/>
    )
}

export default App

