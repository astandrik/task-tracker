pipeline {
    agent any
    stages {
        stage('Build docker') {
            steps {
                sh 'docker rmi task_tracker || echo "image task_tracker does not exist"'
                sh 'rm -rf node_modules/'
                sh 'docker build -t task_tracker .'
            }
        }
        stage('Deploy') {
 	        steps {
               sh 'docker rm -f task-tracker-contain || echo "container task-tracker-contain does not exist"'
	           sh 'docker run -p 3000:3000 --name task-tracker-contain task_tracker npm run start:prod &'
	         }
	    }
    }
}
