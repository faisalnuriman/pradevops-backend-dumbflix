pipeline {
    agent any
    environment {
        // Menyimpan kredensial dalam variabel lingkungan
        GITHUB_TOKEN = credentials('github-fine-grained-token')
        SLACK_TOKEN = credentials('slack-notification-token')
    }
    stages {
        stage('Checkout Code') {
            steps {
                script {
                    // Checkout kode dari GitHub menggunakan token
                    git url: 'https://github.com/faisalnuriman/backend-dumbflix.git', credentialsId: 'github-fine-grained-token'
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    // Membangun Docker image dengan tag 'latest'
                    docker.build("faisalnuriman/backend-server:latest")
                }
            }
        }
        stage('Push to Docker Hub') {
            steps {
                // Gunakan kredensial Docker Hub untuk login dan push image
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    script {
                        docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                            docker.image('faisalnuriman/backend-server:latest').push()
                        }
                    }
                }
            }
        }
    }
    post {
        success {
            // Kirim notifikasi Slack jika build berhasil
            slackSend (channel: '#jenkins', token: "${SLACK_TOKEN}", message: "Build succeeded!")
        }
        failure {
            // Kirim notifikasi Slack jika build gagal
            slackSend (channel: '#jenkins', token: "${SLACK_TOKEN}", message: "Build failed!")
        }
    }
}
