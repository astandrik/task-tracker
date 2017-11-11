pipeline {
    agent any
    stages {
        stage('Clean') {
            steps {
                sh 'docker stop task-tracker-contain || echo "container task-tracker-contain is not running"'
                sh 'docker rm -f task-tracker-contain || echo "container task-tracker-contain does not exist"'
                sh 'docker rmi task_tracker || echo "image task_tracker does not exist"'
            }
        }
        stage('Build docker') {
            steps {
                sh 'docker build -t task_tracker .'
            }
        }
        stage('Deploy') {
 	        steps {
	           sh 'docker run -p 3000:3000 --name task-tracker-contain task_tracker npm run start:prod &'
	         }
	    }
    }
}
