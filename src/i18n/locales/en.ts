import zh from '@/i18n/locales/zh.ts'

export type MessageSchema = typeof zh

const en: MessageSchema = {
    navigator: {
        download: 'Download',
        cookie: 'Extract Cookie',
        info: 'Software Announcement',
    },
    download: {
        title: 'Video Downloader',
        supportedWebsites: {
            title: 'Supported Websites List',
            tooltip: 'Click to view currently supported websites'
        },
        videoUrl: 'Video URL',
        videoUrlInput: 'Please enter a video link (e.g., https://www.example.com/video/...)',
        videoStream: 'Video Stream',
        videoFormatChoice: 'Select video resolution',
        audioStream: 'Audio Stream',
        audioFormatChoice: 'Select audio quality',
        extractFormat: 'Parse available formats',
        download: 'Download Now',
        terminal: 'Download Process Output',
    },
    cookie: {
        title: 'Cookie Extraction',
        browser: 'Target Browser',
        browserPlaceholder: 'Select Browser',
        website: 'Target Website',
        websitePlaceholder: 'Select Preset Website',
        start: 'Start Extracting Cookie',
        terminal: 'Cookie Extraction Output',
        log: {
            fetching: '[INFO] Extracting {website} cookies from {browser}...\n'
        }
    },
    settings: {
        title: 'Settings',
        videoPath: 'Video Save Path',
        videoPathPlaceholder: 'Please select save path',
        cookiePath: 'Cookie Store Path',
        cookiePathPlaceholder: 'Please select cookie path',
        tooltip: {
            selectVideo: 'Select video save folder',
            openVideo: 'Open video save folder',
            selectCookie: 'Select cookie save folder',
            openCookie: 'Open cookie save folder'
        },
        success: 'Path updated successfully',
        close: 'Close'
    },
    info: {
        title: 'About & Open Source Statement',
        intent: {
            title: 'Project Intent',
            content: 'DownloaderV2 is a GUI wrapper based on the {bold} core, designed for academic research and personal learning.'
        },
        repo: {
            title: 'Source Code',
            frontend: 'Frontend: ',
            backend: 'Backend: '
        },
        disclaimer: {
            title: 'Disclaimer',
            illegal: {
                label: 'Illegal Distribution Prohibited: ',
                content: 'The author does not encourage or support any form of illegal distribution of this software.'
            },
            copyright: {
                label: 'Copyright Compliance: ',
                content: 'This tool is for personal study and technical exchange only. Do not use this software to download, store, or distribute copyrighted content. Users assume all legal responsibilities for improper use.'
            },
            tech: {
                label: 'Technical Attribution: ',
                content: 'This software serves only as a UI layer; core download functionality is provided by the open-source project yt-dlp.'
            }
        },
        footer: {
            maintained: 'Maintained by inkmac',
            report: 'Report Issues on GitHub'
        }
    },
    common: {
        reportIssue: 'Report issues on GitHub',
    },
    terminal: {
        default: 'Waiting for task to start...'
    },
    api: {

    }
}

export default en