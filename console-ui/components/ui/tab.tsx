import { Box, Button, Divider, Paper, Tab, Tabs, Typography, Snackbar } from "@mui/material"
import { FileText, Instagram, Youtube, LucideIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import TabPanel from "./tab-panel";
import React from "react";

const TABS = [
    { key: "blog", label: 'Blog', icon: FileText, title: 'Blog Post', dataKey: 'blog', renderContent: (content: string) => <ReactMarkdown>{content}</ReactMarkdown> },
    { key: "instagram", label: 'Instagram Caption', icon: Instagram, title: 'Instagram Caption', dataKey: 'instagram_caption', renderContent: (content: string) => <Typography variant="body2">{content}</Typography> },
    { key: "youtube", label: 'YouTube', icon: Youtube, title: 'YouTube Description', dataKey: 'youtube_description', renderContent: (content: string) => <Typography variant="body2">{content}</Typography> },
]

const ContentPanel = ({ icon: Icon, title, content, dataKey, renderContent, onCopy }: any) => (
    <Paper className="p-4 rounded-3 d-flex flex-column" sx={{ height: 'calc(100vh - 280px)' }}>
        <Box className="d-flex align-items-center justify-content-between">
            <Typography><Icon className="me-2" size={16} color="#7c3aed" /> {title}</Typography>
            <Button variant="outlined" size="small" className="text-capitalize" onClick={() => { navigator.clipboard.writeText(content || ''); onCopy(); }} disabled={!content}>
                Copy
            </Button>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ overflowY: 'auto', flex: 1 }}>
            {content ? renderContent(content) :
                <Box className="d-flex flex-column align-items-center justify-content-center h-100">
                    <Image src="/icons/loader-icon.svg" alt="default" height={150} width={150} />
                    <Typography variant="body2" className="mt-3">Your {title.toLowerCase()} will appear here...</Typography>
                </Box>
            }
        </Box>
    </Paper>
)

const Navigations = ({ tabValue, handleTabChange, data }: any) => {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="Story Generation Tabs">
                {TABS.map((tab, index) => (
                    <Tab label={tab.label} key={tab.key || index} />
                ))}
            </Tabs>
            {TABS.map((tab, index) => (
                <TabPanel value={tabValue} index={index} key={tab.key}>
                    <ContentPanel icon={tab.icon} title={tab.title} content={data?.[tab.dataKey]} dataKey={tab.dataKey} renderContent={tab.renderContent} onCopy={() => setOpen(true)} />
                </TabPanel>
            ))}
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
                message="Copied to clipboard!"
            />
        </>
    )
}

export default Navigations