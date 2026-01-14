import { Box, Button, Checkbox, FormControlLabel, FormGroup, Slider, TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useEffect, useState } from 'react';



export function PasswordGenrator() {
    const [length, setLength] = useState(8)
    const [password, setPassword] = useState("")
    const [numberAllow, setNumberAllow] = useState(false)
    const [characterAllow, setcharaterAllow] = useState(false)


    useEffect(() => {
        let pass: string = ""
        let str: string = "QWERTYUIPASDFGHJKLZXCVBNMasdfghjklqwertyuipzxcvbnm"

        if (numberAllow) str += "123456789"
        if (characterAllow) str += "!@#$%^&*"
        for (let i = 1; i <= length; i++) {
            let char = Math.floor(Math.random() * str.length)
            pass += str.charAt(char)
        }
        setPassword(pass)


    }, [length, numberAllow, characterAllow])

    return (
        <>
            <Card variant="outlined">
                <CardContent>
                    <h1>Password Genrator</h1>
                    <TextField
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        value={password}
                        aria-readonly
                    />

                    <br /><br />

                    <Button variant="contained">Copy</Button>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Slider
                            value={length}
                            min={6}
                            max={20}
                            onChange={(_, newValue) => setLength(newValue as number)}
                        />
                        <Typography>
                            length:{length}
                        </Typography>
                    </Box>

                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox
                                checked={numberAllow}
                                onChange={(e) => setNumberAllow(e.target.checked)}


                            />} label="Numbers" />
                        <FormControlLabel
                            control={<Checkbox
                                checked={characterAllow}
                                onChange={(e) => setcharaterAllow(e.target.checked)}

                            />} label="Character" />
                    </FormGroup>
                </CardContent>
            </Card>
        </>
    )
}