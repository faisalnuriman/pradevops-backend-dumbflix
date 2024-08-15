pipeline {
    agent any

    environment {
        SLACK_CHANNEL = '#jenkins'  // Ganti dengan nama saluran Slack yang sesuai
        SLACK_CREDENTIAL_ID = 'slack-token'  // ID kredensial Slack webhook di Jenkins
        DOCKER_IMAGE = 'faisalnuriman/backend-server:latest'
    }

    triggers {
        pollSCM('* * * * *')  // Polling SCM setiap menit
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
                        url: 'git@github.com:faisalnuriman/backend-dumbflix.git',
                        credentialsId: 'github-faisalnuriman'
                    ]]
                ])
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'  // Instal dependensi Node.js
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'  // Jalankan build jika diperlukan
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    VERSION = sh(script: 'git rev-parse HEAD', returnStdout: true).trim()  // Ambil versi dari commit hash
                    sh 'docker build -t ${DOCKER_IMAGE} .'  // Bangun Docker image
                    sh 'docker tag ${DOCKER_IMAGE} ${DOCKER_IMAGE}:${VERSION}'  // Tandai Docker image dengan versi
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    sh 'docker push ${DOCKER_IMAGE}:${VERSION}'  // Push Docker image ke Docker Hub
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh 'docker pull ${DOCKER_IMAGE}:${VERSION}'  // Tarik Docker image dari Docker Hub
                    sh 'docker stop backend-container || true'  // Hentikan container lama jika ada
                    sh 'docker rm backend-container || true'  // Hapus container lama jika ada
                    sh 'docker run -d -p 5000:5000 --name backend-container ${DOCKER_IMAGE}:${VERSION}'  // Jalankan container baru
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
