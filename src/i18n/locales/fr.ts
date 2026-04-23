import zh from "@/i18n/locales/zh.ts";

export type MessageSchema = typeof zh

const fr: MessageSchema = {
    navigator: {
        download: 'Télécharger',
        cookie: 'Extraire les Cookies',
        info: 'Annonce du Logiciel',
    },
    download: {
        title: 'Téléchargeur Vidéo',
        supportedWebsites: {
            title: 'Liste des sites supportés',
            tooltip: 'Cliquez pour voir les sites actuellement supportés'
        },
        videoUrl: 'URL de la vidéo',
        videoUrlInput: 'Veuillez saisir un lien vidéo (ex: https://www.example.com/video/...)',
        videoStream: 'Flux Vidéo',
        videoFormatChoice: 'Choisir la résolution vidéo',
        audioStream: 'Flux Audio',
        audioFormatChoice: 'Choisir la qualité audio',
        extractFormat: 'Analyser les formats disponibles',
        download: 'Télécharger maintenant',
        terminal: 'Sortie du processus de téléchargement',
    },
    cookie: {
        title: 'Extraction de Cookie',
        browser: 'Navigateur cible',
        browserPlaceholder: 'Choisir le navigateur',
        website: 'Site cible',
        websitePlaceholder: 'Choisir le site prédéfini',
        start: 'Commencer l\'extraction',
        terminal: 'Sortie de l\'extraction des cookies',
        log: {
            fetching: '[INFO] Extraction des cookies de {website} depuis {browser}...\n'
        }
    },
    settings: {
        title: 'Paramètres',
        videoPath: 'Chemin d\'enregistrement vidéo',
        videoPathPlaceholder: 'Veuillez sélectionner un chemin',
        cookiePath: 'Chemin de stockage des cookies',
        cookiePathPlaceholder: 'Veuillez sélectionner un chemin',
        tooltip: {
            selectVideo: 'Choisir le dossier des vidéos',
            openVideo: 'Ouvrir le dossier des vidéos',
            selectCookie: 'Choisir le dossier des cookies',
            openCookie: 'Ouvrir le dossier des cookies'
        },
        success: 'Chemin mis à jour avec succès',
        close: 'Fermer'
    },
    info: {
        title: 'À propos et Déclaration Open Source',
        intent: {
            title: 'Intention du projet',
            content: 'DownloaderV2 est un outil GUI basé sur le noyau {bold}, conçu pour la recherche académique et l\'apprentissage personnel.'
        },
        repo: {
            title: 'Code Source',
            frontend: 'Front-end : ',
            backend: 'Back-end : '
        },
        disclaimer: {
            title: 'Clause de non-responsabilité',
            illegal: {
                label: 'Distribution illégale interdite : ',
                content: 'L\'auteur n\'encourage ni ne soutient aucune forme de distribution illégale de ce logiciel.'
            },
            copyright: {
                label: 'Conformité aux droits d\'auteur : ',
                content: 'Cet outil est destiné uniquement à l\'étude personnelle et à l\'échange technique. Ne pas utiliser ce logiciel pour télécharger, stocker ou distribuer du contenu protégé par le droit d\'auteur. L\'utilisateur assume toute responsabilité légale en cas d\'utilisation inappropriée.'
            },
            tech: {
                label: 'Attribution technique : ',
                content: 'Ce logiciel sert uniquement de couche UI ; la fonctionnalité de téléchargement principale est fournie par le projet open-source yt-dlp.'
            }
        },
        footer: {
            maintained: 'Maintenu par inkmac',
            report: 'Signaler un bug sur GitHub'
        }
    },
    common: {
        reportIssue: 'Signaler un problème sur GitHub',
    },
    terminal: {
        default: 'En attente du début de la tâche...'
    },
    api: {

    }
}

export default fr