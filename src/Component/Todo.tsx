import { useState } from "react";
import TextField from "@mui/material/TextField";
import Select from '@mui/material/Select';
import DeleteIcon from '@mui/icons-material/Delete'; 
import EditIcon from '@mui/icons-material/Edit';
import { Button, Container, Alert, IconButton, List, MenuItem, Typography, ListItem } from "@mui/material";

interface Todo {
    id: number;
    task: string;
    status: "started" | "progress" | "completed"; // Fixed spelling
}

export function getColor(status: string) {
    switch (status) {
        case "started":
            return "orange";
        case "progress":
            return "pink";
        case "completed":
            return "lightgreen"; // Fixed color format
        default:
            return "gray"; // Fallback color
    }
}

export default function Todo() {
    const [task, setTask] = useState<string>("");
    const [todos, setTodos] = useState<Todo[]>([]);
    const [alert, setAlert] = useState<boolean>(false);
    const [status, setStatus] = useState<"started" | "progress" | "completed">("started");
    const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
    const [originalTask, setOriginalTask] = useState<string>("");

    const addTodo = () => {
        setAlert(false);
        const isDuplicate = todos.some(item => item.task.toLowerCase() === task.trim().toLowerCase());

        if (isDuplicate) {
            setAlert(true);
            setTimeout(() => setAlert(false), 6000);
            return;
        }

        if (task.trim()) {
            setTodos([...todos, { id: Date.now(), task, status }]);
            setTask("");
        } else {
            setAlert(true);
        }
    };

    const updateTodo = () => {
        if (task.trim() && editingTaskId !== null) {
            const updatedTodos = todos.map(item =>
                item.id === editingTaskId ? { ...item, task } : item
            );
            setTodos(updatedTodos);
            setTask("");
            setEditingTaskId(null);
            setOriginalTask("");
        }
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const handleEdit = (id: number, task: string) => {
        setTask(task);
        setOriginalTask(task);
        setEditingTaskId(id);
    };

    const isTaskUnchanged = task.trim() === originalTask;

    return (
        <>
            {alert && <Alert severity="warning">Please enter a valid task or task already exists.</Alert>}
            <Container
                maxWidth="sm"
                sx={{
                    backgroundColor: "#edddec",
                    borderRadius: "2rem",
                    padding: "50px",
                }}
            >
                <Typography variant="h3" gutterBottom>TODO APP</Typography>
                <TextField
                    variant="outlined"
                    label="New Task"
                    value={task}
                    onChange={(event) => setTask(event.target.value)}
                    fullWidth
                    sx={{ marginBottom: 3 }}
                />
                <Select
                    labelId="status-select-label"
                    id="status-select"
                    value={status}
                    onChange={(event) => setStatus(event.target.value as "started" | "progress" | "completed")}
                    fullWidth
                    sx={{ mb: 3 }}
                >
                    <MenuItem value="started">Started</MenuItem>
                    <MenuItem value="progress">Progress</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                </Select>

                <Button
                    variant="contained"
                    fullWidth
                    sx={{ mb: 3, backgroundColor: "#a1D6B2", color: "black" }}
                    onClick={editingTaskId !== null ? updateTodo : addTodo}
                    disabled={isTaskUnchanged && editingTaskId !== null}
                >
                    {editingTaskId ? "Edit Task" : "Add Task"}
                </Button>

                <List>
                    {todos.map((item) => (
                        <ListItem
                            key={item.id}
                            secondaryAction={
                                <>
                                    <Button
                                        color="secondary"
                                        sx={{
                                            backgroundColor: getColor(item.status),
                                            color: "black",
                                        }}
                                    >
                                        {item.status}
                                    </Button>
                                    <IconButton onClick={() => handleEdit(item.id, item.task)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => deleteTodo(item.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </>
                            }
                        >
                            {item.task}
                        </ListItem>
                    ))}
                </List>
            </Container>
        </>
    );
}
  