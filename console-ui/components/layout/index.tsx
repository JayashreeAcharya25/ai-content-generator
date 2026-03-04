import React from 'react'
import { Box, Divider, Paper, Typography, Grid, TextField, Button, CircularProgress } from '@mui/material'
import { Sparkle, Sparkles } from 'lucide-react'
import Navigations from '../ui/tab'
import Form from '../ui/form'

export default function Layout() {

    const [formData, setFormData] = React.useState({ bulletPoints: '', emotionalAnswers: '' })
    const [tabValue, setTabValue] = React.useState(0)
    const [loading, setLoading] = React.useState(false)
    const [data, setData] = React.useState<any>(null)

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTabValue(newValue)
    }

    const handleGenerate = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/story/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bullet_points: formData.bulletPoints.split('\n').filter(line => line.trim()),
                    emotional_answers: formData.emotionalAnswers.split('\n').filter(line => line.trim())
                })
            })
            console.log('Response status:', response.status)
            const result = await response.json()
            setData(result)
            setFormData({ bulletPoints: '', emotionalAnswers: '' })
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box className="p-4 h-100vh">
            <Typography variant="h4" component="h1" gutterBottom className='text-center' color='primary.main'>
                <Sparkles className="me-2" size={20} /> Your stories. Any moment. Any platform.
            </Typography>
            <Typography variant="caption" className='text-center m-auto d-block mb-4' color='text.secondary'>
                Turn your experiences into powerful blogs, Instagram captions, and YouTube descriptions in seconds.
            </Typography>
            <Divider sx={{ my: 4 }} />
            <Grid container spacing={2}>
                <Grid size={{ lg: 5, md: 6, xs: 12 }}>
                    <Form
                        formData={formData}
                        setFormData={setFormData}
                        handleGenerate={handleGenerate}
                        loading={loading}
                    />
                </Grid>
                <Grid size={{ lg: 7, md: 6, xs: 12 }}>
                    <Navigations tabValue={tabValue} handleTabChange={handleTabChange} data={data} />
                </Grid>
            </Grid>
        </Box>
    )
}
