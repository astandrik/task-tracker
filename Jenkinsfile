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
        stage('Build dockers') {
            steps {
                sh 'docker build -t task_tracker .'
                sh 'docker build -f ./DataBaseDockerfile -t task_tracker_server .'
            }
        }
        stage('Deploy') {
 	        steps {
	           sh 'docker run -p 3000:80 --name task-tracker-contain task_tracker npm run start:prod &'
               sh 'docker run -p 3010:3000 --name task-tracker-server-contain task_tracker_server node index.js'
	         }
	    }
    }
}
