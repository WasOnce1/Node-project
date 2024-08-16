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
        
        
        stage('Docker Push') {
           steps {
                withCredentials([usernamePassword(credentialsId: 'docker_cred', passwordVariable: 'DOCKERHUB_PASSWORD', usernameVariable: 'DOCKERHUB_USERNAME')]) { 
                sh 'docker login -u $DOCKERHUB_USERNAME -p $DOCKERHUB PASSWORD"
                sh 'docker tag my-app:1.0 amehta2910/nodeproject:1.0"
                sh 'docker push amehta2910/nodeproject:1.0"
                sh 'docker logout' 
                    }
                }
            }
        }
    }

