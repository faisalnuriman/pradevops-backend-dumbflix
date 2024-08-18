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
                    VERSION = sh(script: 'git rev-parse HEAD', returnStdout: true).trim()
                    sh "docker build -t server-backend:latest -f Dockerfile ."
                }
            }
        }
        stage('Push to Docker Hub') {
            steps {
                script {
                    withDockerRegistry([credentialsId: "${DOCKER_CREDENTIALS_ID}", url: 'https://index.docker.io/v1/']) {
                        sh "docker tag server-backend:latest faisalnuriman/server-backend:latest"
                        sh "docker push faisalnuriman/server-backend:latest"
                    }
                }
            }
        }
        stage('Deploy to Server') {
            steps {
                script {
                    sh '''
                    docker stop backend-container || true
                    docker rm backend-container || true
                    docker pull faisalnuriman/server-backend:latest
                    docker run -d --name backend-container -p 5000:5000 faisalnuriman/server-backend:latest
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
