import express, {Request, Response} from "express"
import Todos from "./src/mocks/Todos";
import ITodos from "./src/interface/Todos";

const app = express();
const PORT = 5000

app.use(express.json());

app.get("/", (req: Request, res: Response) : Response => {
    return res.status(200).json({message: "jangan pernah mau gagal"})
})

app.get("/todos", (req: Request, res: Response) : Response => {
    return res.status(200).json({data: Todos})
})

app.get("/todos/:id", (req: Request, res: Response): Response => {
    const id = parseInt(req.params.id);

    const data = Todos.find((data) => data.id === id)

    return res.status(200).json(data);
})

app.post("/todos", (req: Request, res: Response): Response => {
    const data: ITodos = req.body
    Todos.push(data);

    return res.status(200).json({ data: Todos})
})


app.delete("/todos/:id", (req: Request, res: Response) : Response => {
    const { id } = req.params
    const data: ITodos[] = Todos.filter((todo) => todo.id !== parseInt(id))

    return res.status(200).json(data);
})


async function localHost() : Promise<void> {
    try {
        app.listen(PORT, () => console.log("Server Succes Running"))
    } catch (error) {
        console.log("Server Error Running");
        process.exit(1);
    }
}
void localHost();

