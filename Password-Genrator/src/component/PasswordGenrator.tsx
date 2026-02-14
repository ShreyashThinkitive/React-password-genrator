import { Box, Button, Checkbox, FormControlLabel, FormGroup, Slider, TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useEffect, useState } from 'react';

export function PasswordGenrator() {
    const [length, setLength] = useState(8);
    const [password, setPassword] = useState("");
    const [numberAllow, setNumberAllow] = useState(false);
    const [characterAllow, setCharacterAllow] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);

    useEffect(() => {
        let pass: string = "";
        let str: string = "QWERTYUIPASDFGHJKLZXCVBNMasdfghjklqwertyuipzxcvbnm";

        if (numberAllow) str += "123456789";
        if (characterAllow) str += "!@#$%^&*";
        
        for (let i = 1; i <= length; i++) {
            let char = Math.floor(Math.random() * str.length);
            pass += str.charAt(char);
        }
        setPassword(pass);
        setCopySuccess(false); // Reset copy success when password changes

    }, [length, numberAllow, characterAllow]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(password);
            setCopySuccess(true);
            
            // Reset copy success message after 2 seconds
            setTimeout(() => {
                setCopySuccess(false);
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <>
            <Card variant="outlined">
                <CardContent>
                    <h1>Password Generator</h1>
                    <TextField
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        value={password}
                        InputProps={{
                            readOnly: true,
                        }}
                    />

                    <br /><br />

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button 
                            variant="contained" 
                            onClick={handleCopy}
                            disabled={!password}
                            color={copySuccess ? 'success' : 'primary'}
                        >
                            {copySuccess ? 'Copied!' : 'Copy'}
                        </Button>
                        {copySuccess && (
                            <Typography color="success.main">
                                Password copied to clipboard!
                            </Typography>
                        )}
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
                        <Slider
                            value={length}
                            min={6}
                            max={20}
                            onChange={(_, newValue) => setLength(newValue as number)}
                        />
                        <Typography>
                            Length: {length}
                        </Typography>
                    </Box>

                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox
                                checked={numberAllow}
                                onChange={(e) => setNumberAllow(e.target.checked)}
                            />} 
                            label="Numbers" 
                        />
                        <FormControlLabel
                            control={<Checkbox
                                checked={characterAllow}
                                onChange={(e) => setCharacterAllow(e.target.checked)}
                            />} 
                            label="Characters" 
                        />
                    </FormGroup>
                </CardContent>
            </Card>
        </>
    );
}