pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/rahulactive/nextjs.git'
            }
        }

        stage('Build') {
            steps {
                sh '''
                    npm install
                    npm run build
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    # Optional: Clean old files (be careful with this)
                    rm -rf /var/www/html/*

                    # Copy build files (adjust path if needed)
                    cp -r . /var/www/html/

                    # Restart app with PM2
                    pm2 delete nextjs-app || true
                    npx pm2 start npm --name "nextjs-app" -- start
                '''
            }
        }
    }
}
