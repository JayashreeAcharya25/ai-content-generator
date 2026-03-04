import { Button, CircularProgress, Divider, Paper, TextField, Typography } from '@mui/material'
import { Sparkles } from 'lucide-react'
import React from 'react'

const FORM_FIELDS = [
    { key: 'bulletPoints', label: 'Bullet Points (one per line)', rows: 4 },
    { key: 'emotionalAnswers', label: 'Emotional Answers (one per line)', rows: 4 },
]

const Form = ({ formData, setFormData, handleGenerate, loading }: any) => {
    const handleChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [key]: e.target.value })
    }

    return (
        <Paper className="px-5 py-3 rounded-3 d-flex flex-column h-100">
            <Typography variant="h6" className='mb-0 mt-2'>
                <Sparkles className="me-2" size={14} /> Share your experience below
            </Typography>
            <Divider sx={{ my: 3 }} />

            {FORM_FIELDS.map((field) => (
                <TextField
                    key={field.key}
                    label={field.label}
                    multiline
                    rows={field.rows}
                    fullWidth
                    variant="outlined"
                    value={formData[field.key]}
                    onChange={handleChange(field.key)}
                    sx={{ mb: 2 }}
                />
            ))}

            <Button
                variant="contained"
                className='text-capitalize '
                onClick={handleGenerate}
                disabled={!formData.bulletPoints.trim() || !formData.emotionalAnswers.trim() || loading}
            >
                {loading ?
                    <><CircularProgress size={12} className="me-2 text-white" /> Generating...</> :
                    <><Sparkles className="me-2" size={12} /> Generate Story</>}
            </Button>
        </Paper>
    )
}

export default Form;
