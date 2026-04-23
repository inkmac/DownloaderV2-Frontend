const zh = {
    navigator: {
        download: '下载',
        cookie: '提取 Cookie',
        info: '软件说明',
    },
    download: {
        title: '视频下载器',
        supportedWebsites: {
            title: '支持的网站列表',
            tooltip: '点击查看当前支持的网站'
        },
        videoUrl: '视频 URL',
        videoUrlInput: '请输入视频链接 (例如: https://www.example.com/video/...)',
        videoStream: '视频流 (Video)',
        videoFormatChoice: '选择视频分辨率',
        audioStream: '音频流 (Audio)',
        audioFormatChoice: '选择音质',
        extractFormat: '解析可用格式',
        download: '立即下载',
        terminal: '下载过程输出',
    },
    cookie: {
        title: 'Cookie 提取',
        browser: '目标浏览器',
        browserPlaceholder: '选择浏览器',
        website: '目标网站',
        websitePlaceholder: '选择预设网站',
        start: '开始提取 Cookie',
        terminal: '提取 cookie 过程中输出',
        log: {
            fetching: '[INFO] 正在从 {browser} 提取 {website} 的 Cookie...\n'
        }
    },
    settings: {
        title: '设置',
        videoPath: '视频保存路径',
        videoPathPlaceholder: '请选择保存路径',
        cookiePath: 'Cookie 存储路径',
        cookiePathPlaceholder: '请选择 Cookie 路径',
        tooltip: {
            selectVideo: '选择 Video 保存文件夹',
            openVideo: '打开 Video 保存文件夹',
            selectCookie: '选择 Cookie 保存文件夹',
            openCookie: '打开 Cookie 保存文件夹'
        },
        success: '成功修改路径',
        close: '关闭'
    },
    info: {
        title: '关于软件与开源声明',
        intent: {
            title: '项目初衷',
            content: '本软件（DownloaderV2）是一个基于 {bold} 核心开发的 GUI 封装工具，旨在为学术研究及个人学习提供便利。'
        },
        repo: {
            title: '源码托管',
            frontend: '前端：',
            backend: '后端：'
        },
        disclaimer: {
            title: '免责声明',
            illegal: {
                label: '严禁非法分发：',
                content: '作者不鼓励、不支持任何形式的非法分发本软件的行为。'
            },
            copyright: {
                label: '版权合规：',
                content: '本工具仅供个人学习及技术交流使用。请勿利用本软件下载、存储或分发受版权保护的内容。用户需自行承担因不当使用导致的法律责任。'
            },
            tech: {
                label: '技术归属：',
                content: '本软件仅作为 UI 交互层，核心下载功能由开源项目 yt-dlp 提供。'
            }
        },
        footer: {
            maintained: 'Maintained by inkmac',
            report: '提交Bug反馈'
        }
    },
    common: {
        reportIssue: '在 GitHub 上反馈问题',
    },
    terminal: {
        default: '等待任务开始...'
    },
    api: {

    }
}

export default zh