pipeline {
    agent {
        label 'backend-node' // Menggunakan agen dengan label 'backend-node'
    }

    environment {
        SLACK_CHANNEL = '#jenkins'
        SLACK_CREDENTIAL_ID = 'slack-notification-token'
        GITHUB_CREDENTIALS_ID = 'github-fine-grained-token'
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials'
    }

    triggers {
        pollSCM('* * * * *') // Polling SCM setiap menit
    }

    stages {
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    doGenerateSubmoduleConfigurations: false,
                    extensions: [],
                    submoduleCfg: [],
                    userRemoteConfigs: [[
                        url: 'https://github.com/faisalnuriman/backend-dumbflix.git',
                        credentialsId: "${GITHUB_CREDENTIALS_ID}"
                    ]]
                ])
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    // Mengambil versi dari commit SHA
                    VERSION = sh(script: 'git rev-parse HEAD', returnStdout: true).trim()
                    // Membangun Docker image dengan tag yang sesuai
                    sh "docker build -t faisalnuriman/backend-server:${VERSION} ."
                }
            }
        }
        stage('Push to Docker Hub') {
            steps {
                script {
                    // Login ke Docker Hub
                    withDockerRegistry([credentialsId: "${DOCKER_CREDENTIALS_ID}", url: 'https://index.docker.io/v1/']) {
                        sh "docker login" // Login ke Docker Hub
                        // Tag Docker image
                        sh "docker tag faisalnuriman/backend-server:${VERSION} faisalnuriman/backend-server:latest"
                        // Push Docker image ke Docker Hub
                        sh "docker push faisalnuriman/backend-server:${VERSION}"
                        sh "docker push faisalnuriman/backend-server:latest"
                    }
                }
            }
        }
        stage('Deploy to Server') {
            steps {
                script {
                    // Menghentikan dan menghapus container yang sedang berjalan
                    sh '''
                    docker stop backend-container || true
                    docker rm backend-container || true
                    // Mengambil Docker image terbaru
                    docker pull faisalnuriman/backend-server:${VERSION}
                    // Menjalankan container baru dari image terbaru
                    docker run -d --name backend-container -p 5000:5000 faisalnuriman/backend-server:${VERSION}
                    '''
                }
            }
        }
    }

    post {
        success {
            slackSend(
                channel: env.SLACK_CHANNEL,
                message: "Pipeline sukses: ${env.JOB_NAME} #${env.BUILD_NUMBER} dengan version = ${VERSION}",
                tokenCredentialId: env.SLACK_CREDENTIAL_ID
            )
        }
        failure {
            slackSend(
                channel: env.SLACK_CHANNEL,
                message: "Pipeline gagal: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                tokenCredentialId: env.SLACK_CREDENTIAL_ID
            )
        }
        unstable {
            slackSend(
                channel: env.SLACK_CHANNEL,
                message: "Pipeline tidak stabil: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                tokenCredentialId: env.SLACK_CREDENTIAL_ID
            )
        }
    }
}
