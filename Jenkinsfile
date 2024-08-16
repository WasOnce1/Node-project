pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY_URL = 'https://hub.docker.com/repositories/amehta2910/'
        DOCKER_USERNAME = credentials('DOCKER_USERNAME')  // Use Jenkins credentials ID
        DOCKER_PASSWORD = credentials('DOCKER_PASSWORD')  // Use Jenkins credentials ID
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t my-app:1.0 .'
                }
            }
        
        
        stage('Push Docker Image') {
            steps {
                script {
                    // Login to Docker registry
                    docker.withRegistry(DOCKER_REGISTRY_URL, "${DOCKER_USERNAME}:${DOCKER_PASSWORD}") {
                        docker.image('my-app').push('1.0')
                    }
                }
            }
        }
    }
}
