pipeline {
    agent any
    stages {
        stage('Build docker') {
            steps {
                sh 'docker rmi task_tracker_image'
                sh 'rm -rf node_modules/'
                sh 'docker build -t task_tracker_image .'
            }
        }
        stage('Deploy') {
 	        steps {
               sh 'docker rm -f task-tracker-container'
	           sh 'docker run -p 3000:3000 --name task-tracker-container task_tracker_image npm run start:prod &'
	         }
	    }
    }
}
