pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/rahulactive/nextjs.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    docker build -t nextjs-app .
                '''
            }
        }

        stage('Run Docker Container') {
            steps {
                sh '''
                    # Stop and remove any existing container
                    docker stop nextjs-container || true
                    docker rm nextjs-container || true

                    # Run the container
                    docker run -d --name nextjs-container -p 3000:3000 nextjs-app
                '''
            }
        }
    }
}

